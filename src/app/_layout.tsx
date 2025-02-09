import '../../unistyles';
import '../localization/i18n';

import { clientPersister, queryClient } from '@api/queryClient';
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  useFonts,
} from '@expo-google-fonts/montserrat';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { PaperProvider } from 'react-native-paper';
import {
  UnistylesProvider,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';

import { AuthProvider } from '@/contexts/auth';

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
  });
  const { theme } = useStyles();

  if (!loaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: clientPersister }}>
        <KeyboardProvider>
          <PaperProvider theme={theme}>
            <UnistylesProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                  animation: 'fade',
                  statusBarStyle:
                    UnistylesRuntime.themeName === 'dark' ? 'light' : 'dark',
                  contentStyle: {
                    backgroundColor: theme.colors.background,
                  },
                }}
              />
            </UnistylesProvider>
          </PaperProvider>
        </KeyboardProvider>
      </PersistQueryClientProvider>
    </AuthProvider>
  );
}
