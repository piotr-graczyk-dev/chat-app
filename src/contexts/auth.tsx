import { createContext, useCallback, useContext } from 'react';

import { useStorageState } from '@/hooks/useStorageState';

// Define types for our context
type AuthContextType = {
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  session: string | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  signIn: async () => false,
  signOut: async () => {},
  session: null,
  isLoading: false,
});

// Auth provider props type
type AuthProviderProps = {
  children: React.ReactNode;
};

// Create a hook for using the auth context
export function useAuth() {
  const value = useContext(AuthContext);
  if (__DEV__) {
    if (!value) {
      throw new Error('useAuth must be wrapped in a <AuthProvider />');
    }
  }
  return value;
}

export const AUTH_STORAGE_KEY = 'user-session';

export function AuthProvider({ children }: AuthProviderProps) {
  const [[isLoading, session], setSession] = useStorageState(AUTH_STORAGE_KEY);

  const signIn = useCallback(
    async (email: string, password: string) => {
      // Mock authentication - replace with real authentication later
      if (email === 'test@example.com' && password === 'password123') {
        const userSession = JSON.stringify({
          email,
          token: 'mock-jwt-token',
          timestamp: Date.now(),
        });

        await setSession(userSession);
        return true;
      }
      return false;
    },
    [setSession],
  );

  const signOut = useCallback(async () => {
    await setSession(null);
  }, [setSession]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
