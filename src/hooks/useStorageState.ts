import * as SecureStore from 'expo-secure-store';
import { useCallback, useEffect, useReducer } from 'react';
import { Platform } from 'react-native';

type UseStateHook<T> = [
  [boolean, T | null],
  (value: T | null) => Promise<void>,
];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null],
): UseStateHook<T> {
  return useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null,
    ): [boolean, T | null] => [false, action],
    initialValue,
  ) as unknown as UseStateHook<T>;
}

async function setStorageItemAsync(key: string, value: string | null) {
  if (Platform.OS === 'web') {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    if (value === null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

export function useStorageState(key: string): UseStateHook<string> {
  const [state, setState] = useAsyncState<string>();

  useEffect(() => {
    async function loadStorageValue() {
      try {
        if (Platform.OS === 'web') {
          const value = localStorage.getItem(key);
          setState(value);
        } else {
          const value = await SecureStore.getItemAsync(key);
          setState(value);
        }
      } catch (e) {
        console.error('Failed to load storage value:', e);
      }
    }
    loadStorageValue();
  }, [key, setState]);

  const setValue = useCallback(
    async (value: string | null) => {
      await setStorageItemAsync(key, value);
      setState(value);
    },
    [key, setState],
  );

  return [state, setValue];
}
