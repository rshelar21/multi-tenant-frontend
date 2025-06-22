'use client';
import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue?: T) {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(
        localStorage.getItem(key) || JSON.stringify(initialValue)
      );
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
