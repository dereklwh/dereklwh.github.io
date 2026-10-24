import { useState, useEffect, useRef } from 'react';

const CONFIG_KEY = 'badminton-sync';
const SAVE_DELAY = 1000;

function readConfig() {
  try {
    const cached = JSON.parse(localStorage.getItem(CONFIG_KEY));
    if (cached?.url && cached?.token) return cached;
  } catch {
    // ignore bad or blocked storage
  }
  return null;
}

function isEmpty(state) {
  return state.expenses.length === 0 && state.pools.length === 0;
}

// Anything beyond the blank pool the page creates on its own
function hasData(state) {
  return (
    state.expenses.length > 0 ||
    state.pools.length > 1 ||
    state.pools.some((pool) => Object.values(pool.paid ?? {}).some(Boolean))
  );
}

async function request(config, options) {
  const url = options ? config.url : `${config.url}?token=${encodeURIComponent(config.token)}`;
  // A plain string body keeps this a "simple" request, which Apps Script needs (no CORS preflight)
  const response = await fetch(url, options);
  const data = await response.json();
  if (data.error) throw new Error(data.error);
  return data;
}

// Mirrors the tracker state to a Google Sheet through an Apps Script web app.
// The local copy stays the fast path; the Sheet is loaded once, then saved after each change.
export default function useSheetSync(state, setState) {
  const [config, setConfigState] = useState(readConfig);
  const [status, setStatus] = useState(config ? 'loading' : 'off');
  const [loaded, setLoaded] = useState(false);
  const lastSavedRef = useRef(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  const setConfig = (next) => {
    try {
      if (next) localStorage.setItem(CONFIG_KEY, JSON.stringify(next));
      else localStorage.removeItem(CONFIG_KEY);
    } catch {
      // config just won't survive a reload
    }
    setConfigState(next);
  };

  // Load from the Sheet whenever a connection is set up
  useEffect(() => {
    setLoaded(false);
    lastSavedRef.current = null;
    if (!config) {
      setStatus('off');
      return;
    }
    let cancelled = false;
    setStatus('loading');

    request(config)
      .then((remote) => {
        if (cancelled) return;
        // First sync: an empty Sheet gets this device's data instead of wiping it
        if (!(isEmpty(remote) && hasData(stateRef.current))) {
          lastSavedRef.current = JSON.stringify(remote);
          setState(remote);
          setStatus('synced');
        }
        setLoaded(true);
      })
      .catch((error) => {
        if (cancelled) return;
        console.error('Error loading from Google Sheets:', error);
        setStatus(error.message === 'unauthorized' ? 'unauthorized' : 'error');
      });

    return () => {
      cancelled = true;
    };
  }, [config, setState]);

  // Save shortly after each change, once the Sheet has been loaded
  useEffect(() => {
    if (!config || !loaded) return;
    const body = JSON.stringify(state);
    if (body === lastSavedRef.current) return;

    setStatus('saving');
    const timer = setTimeout(async () => {
      try {
        await request(config, {
          method: 'POST',
          body: JSON.stringify({ token: config.token, state }),
        });
        lastSavedRef.current = body;
        setStatus('synced');
      } catch (error) {
        console.error('Error saving to Google Sheets:', error);
        setStatus('error');
      }
    }, SAVE_DELAY);

    return () => clearTimeout(timer);
  }, [config, state, loaded]);

  return { config, setConfig, status };
}
