'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'rOS_unlocked';

export function useToolGate() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Intentional: sync gate state from localStorage once after mount (avoids SSR/client mismatch).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsUnlocked(localStorage.getItem(STORAGE_KEY) === 'true');
    setIsHydrated(true);
  }, []);

  function unlock() {
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsUnlocked(true);
  }

  return { isUnlocked, isHydrated, unlock };
}
