import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import BackButton from "../components/BackButton";

const PARTICIPANTS = ["Derek", "Darren", "Jeffrey", "Jacob"];
const PER_PERSON = 100;
const POOL_TOTAL = PARTICIPANTS.length * PER_PERSON; // 400
const STORAGE_KEY = "badminton-budget";

const today = () => new Date().toISOString().slice(0, 10);

const emptyPaid = () =>
  PARTICIPANTS.reduce((acc, name) => ({ ...acc, [name]: false }), {});

const newPool = () => ({
  id: Date.now(),
  createdAt: new Date().toISOString(),
  paid: emptyPaid(),
});

const loadState = () => {
  const fallback = { pools: [], expenses: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return {
      pools: Array.isArray(parsed.pools) ? parsed.pools : [],
      expenses: Array.isArray(parsed.expenses) ? parsed.expenses : [],
    };
  } catch {
    return fallback;
  }
};

const formatMoney = (n) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

const BadmintonBudgetTracking = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(loadState);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(today);

  useEffect(() => {
    document.title = "Badminton Budget Tracker | Derek Huang";
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Always keep one active pool to check people into.
  useEffect(() => {
    if (state.pools.length === 0) {
      setState((prev) =>
        prev.pools.length === 0 ? { ...prev, pools: [newPool()] } : prev
      );
    }
  }, [state.pools.length]);

  const { pools, expenses } = state;
  const currentPool = pools.length ? pools[pools.length - 1] : null;

  const contributed = useMemo(
    () =>
      pools.reduce(
        (sum, pool) =>
          sum +
          PARTICIPANTS.filter((name) => pool.paid?.[name]).length * PER_PERSON,
        0
      ),
    [pools]
  );

  const spent = useMemo(
    () => expenses.reduce((sum, e) => sum + e.amount, 0),
    [expenses]
  );

  const balance = contributed - spent;
  const paidCount = currentPool
    ? PARTICIPANTS.filter((name) => currentPool.paid?.[name]).length
    : 0;
  const allPaid = !!currentPool && paidCount === PARTICIPANTS.length;

  const refreshPool = () => {
    if (!allPaid) return;
    setState((prev) => ({ ...prev, pools: [...prev.pools, newPool()] }));
  };

  const togglePaid = (name) => {
    if (!currentPool) return;
    setState((prev) => {
      const updated = prev.pools.map((pool) =>
        pool.id === currentPool.id
          ? { ...pool, paid: { ...pool.paid, [name]: !pool.paid?.[name] } }
          : pool
      );
      return { ...prev, pools: updated };
    });
  };

  const addExpense = (e) => {
    e.preventDefault();
    const value = parseFloat(amount);
    if (!Number.isFinite(value) || value <= 0) return;
    setState((prev) => ({
      ...prev,
      expenses: [
        ...prev.expenses,
        {
          id: Date.now(),
          amount: value,
          description: description.trim() || "Untitled expense",
          date: date || today(),
        },
      ],
    }));
    setAmount("");
    setDescription("");
    setDate(today());
  };

  const deleteExpense = (id) => {
    setState((prev) => ({
      ...prev,
      expenses: prev.expenses.filter((e) => e.id !== id),
    }));
  };

  const resetAll = () => {
    if (window.confirm("Clear all pools and expenses? This cannot be undone.")) {
      setState({ pools: [], expenses: [] });
    }
  };

  const sortedExpenses = useMemo(
    () => [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date)),
    [expenses]
  );

  const cardClass =
    "rounded-2xl border border-[#92ACA0]/30 bg-white/80 dark:bg-[#243b35]/80 p-6 shadow-md backdrop-blur";

  return (
    <div className="bg-linear-65 from-white to-[#DDE5ED] dark:from-[#1a2f2a] dark:to-[#1a2f2a] min-h-screen">
      <div className="max-w-2xl mx-auto p-10 text-[#3e5d58] dark:text-[#e8f0ee]">
        <h1 className="text-4xl mt-10 font-bold mb-2">Badminton Budget Tracker</h1>
        <p className="mb-6 text-lg text-[#3e5d58]/80 dark:text-[#a3c4bc]">
          {PARTICIPANTS.join(", ")} — {formatMoney(PER_PERSON)} each per pool
          ({formatMoney(POOL_TOTAL)} total).
        </p>

        {/* Balance card */}
        <div className={`${cardClass} mb-6`}>
          <p className="text-sm font-semibold uppercase tracking-wider text-[#92ACA0]">
            Pool balance
          </p>
          <p
            className={`mt-1 text-5xl font-bold ${
              balance <= 0 ? "text-[#A6192E]" : ""
            }`}
          >
            {formatMoney(balance)}
          </p>
          {balance <= 0 && (
            <p className="mt-2 text-sm font-medium text-[#A6192E]">
              Pool empty — time to refresh.
            </p>
          )}
          <div className="mt-4 flex gap-6 text-sm text-[#3e5d58]/80 dark:text-[#a3c4bc]">
            <span>
              Pooled in:{" "}
              <span className="font-semibold text-[#3e5d58] dark:text-[#e8f0ee]">
                {formatMoney(contributed)}
              </span>
            </span>
            <span>
              Spent:{" "}
              <span className="font-semibold text-[#3e5d58] dark:text-[#e8f0ee]">
                {formatMoney(spent)}
              </span>
            </span>
          </div>
        </div>

        {/* Current pool / payment confirmation */}
        <div className={`${cardClass} mb-6`}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Current pool</h2>
              {currentPool && (
                <p className="text-sm text-[#3e5d58]/80 dark:text-[#a3c4bc]">
                  {allPaid
                    ? "Fully funded — ready for a new pool"
                    : `${paidCount} of ${PARTICIPANTS.length} paid in`}
                </p>
              )}
            </div>
            <button
              onClick={refreshPool}
              disabled={!allPaid}
              title={
                allPaid
                  ? "Start a fresh pool"
                  : "Everyone must pay in before you can refresh"
              }
              className={`shrink-0 rounded-lg px-4 py-2 font-semibold text-white transition-colors ${
                allPaid
                  ? "bg-[#92ACA0] hover:bg-[#6f8a84]"
                  : "cursor-not-allowed bg-[#92ACA0]/40"
              }`}
            >
              Refresh pool (+{formatMoney(POOL_TOTAL)})
            </button>
          </div>

          {currentPool && (
            <div className="mt-4 space-y-2">
              <p className="text-xs text-[#3e5d58]/70 dark:text-[#a3c4bc]">
                Check each person once they&apos;ve paid their {formatMoney(PER_PERSON)} —
                only confirmed contributions count toward the balance.
              </p>
              {PARTICIPANTS.map((name) => {
                const paid = currentPool.paid?.[name];
                return (
                  <label
                    key={name}
                    className="flex cursor-pointer items-center justify-between rounded-lg border border-[#92ACA0]/30 px-4 py-2.5 transition-colors hover:bg-[#92ACA0]/10"
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={!!paid}
                        onChange={() => togglePaid(name)}
                        className="h-5 w-5 accent-[#92ACA0]"
                      />
                      <span className="font-medium">{name}</span>
                    </span>
                    <span
                      className={`text-sm font-semibold ${
                        paid
                          ? "text-[#92ACA0]"
                          : "text-[#3e5d58]/60 dark:text-[#a3c4bc]"
                      }`}
                    >
                      {paid ? `Paid ${formatMoney(PER_PERSON)}` : "Unpaid"}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Add expense */}
        <div className={`${cardClass} mb-6`}>
          <h2 className="text-xl font-semibold mb-4">Add expense</h2>
          <form onSubmit={addExpense} className="space-y-3">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-lg border border-[#92ACA0]/40 bg-white/70 dark:bg-[#1a2f2a]/40 px-3 py-2 focus:border-[#92ACA0] focus:outline-none sm:w-32"
                required
              />
              <input
                type="text"
                placeholder="Description (e.g. Court booking)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg border border-[#92ACA0]/40 bg-white/70 dark:bg-[#1a2f2a]/40 px-3 py-2 focus:border-[#92ACA0] focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-lg border border-[#92ACA0]/40 bg-white/70 dark:bg-[#1a2f2a]/40 px-3 py-2 focus:border-[#92ACA0] focus:outline-none sm:w-44"
              />
              <button
                type="submit"
                className="rounded-lg bg-[#92ACA0] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#6f8a84]"
              >
                Add expense
              </button>
            </div>
          </form>
        </div>

        {/* Expense list */}
        <div className={`${cardClass} mb-6`}>
          <h2 className="text-xl font-semibold mb-4">
            Expenses{" "}
            <span className="text-sm font-normal text-[#3e5d58]/70 dark:text-[#a3c4bc]">
              ({expenses.length})
            </span>
          </h2>
          {sortedExpenses.length === 0 ? (
            <p className="text-sm text-[#3e5d58]/70 dark:text-[#a3c4bc]">
              No expenses logged yet.
            </p>
          ) : (
            <ul className="space-y-2">
              {sortedExpenses.map((e) => (
                <li
                  key={e.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-[#92ACA0]/30 px-4 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{e.description}</p>
                    <p className="text-xs text-[#3e5d58]/70 dark:text-[#a3c4bc]">
                      {e.date}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="font-semibold">−{formatMoney(e.amount)}</span>
                    <button
                      onClick={() => deleteExpense(e.id)}
                      aria-label="Delete expense"
                      className="text-[#3e5d58]/50 transition-colors hover:text-[#A6192E] dark:text-[#a3c4bc]"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between">
          <BackButton label="Back home" onClick={() => navigate("/")} />
          <button
            onClick={resetAll}
            className="text-sm font-medium text-[#3e5d58]/60 transition-colors hover:text-[#A6192E] dark:text-[#a3c4bc]"
          >
            Reset all
          </button>
        </div>
      </div>
    </div>
  );
};

export default BadmintonBudgetTracking;
