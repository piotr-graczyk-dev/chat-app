import React from 'react';
import { Button } from 'react-native-paper';
import { UnistylesRuntime } from 'react-native-unistyles';

export const ThemeButton = () => {
  const isDark = UnistylesRuntime.themeName === 'dark';

  return (
    <Button
      mode="contained"
      onPress={() => UnistylesRuntime.setTheme(isDark ? 'light' : 'dark')}>
      Change theme
    </Button>
  );
};
