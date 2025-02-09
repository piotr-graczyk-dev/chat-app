import { Redirect, Slot } from 'expo-router';

import { useAuth } from '@/contexts/auth';

export default function RootLayout() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return <Slot />;
}
