import { ThemeButton } from '@components/ui/ThemeButton';
import { Image } from 'expo-image';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';

export default function HomeScreen() {
  const { styles } = useStyles(stylesheet);
  const isDark = UnistylesRuntime.themeName === 'dark';
  const { t } = useTranslation();

  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      <StatusBar style={isDark ? 'light' : 'dark'} animated />
      <Image
        contentFit="contain"
        style={styles.image}
        source={
          isDark
            ? require('@assets/images/logo-dark.png')
            : require('@assets/images/logo.png')
        }
      />
      <Text variant="headlineLarge">{t('title')}</Text>
      <ThemeButton />
    </View>
  );
}

const stylesheet = createStyleSheet(({ sizes, colors }) => ({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  image: {
    width: '40%',
    aspectRatio: 1 / 1,
    marginVertical: sizes.md,
  },
  unused: {
    color: 'red',
  },
}));
