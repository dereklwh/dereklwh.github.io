import { useEffect } from 'react';

const SITE = 'Derek Huang';

export default function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE}` : SITE;
  }, [title]);
}
