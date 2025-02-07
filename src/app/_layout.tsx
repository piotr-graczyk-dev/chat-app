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
import { useStyles } from 'react-native-unistyles';

SplashScreen.preventAutoHideAsync();

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
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: clientPersister }}>
      <KeyboardProvider>
        <PaperProvider theme={theme}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: theme.colors.background,
              },
            }}
          />
        </PaperProvider>
      </KeyboardProvider>
    </PersistQueryClientProvider>
  );
}
