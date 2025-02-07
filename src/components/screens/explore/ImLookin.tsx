import { useBearStore } from '@store/useBearStore';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Text } from 'react-native-paper';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export const ImLookin = () => {
  const { styles } = useStyles(stylesheet);
  const { increase, bears } = useBearStore();
  const { t } = useTranslation(['imlookin']);

  return (
    <Animated.View
      entering={SlideInDown.duration(1000)}
      style={styles.container}>
      <Text variant="headlineLarge">{t('title')}</Text>
      <Text variant="headlineLarge">{bears}</Text>
      <Button onPress={() => increase(1)}>{t('increase')}</Button>
    </Animated.View>
  );
};

const stylesheet = createStyleSheet(() => ({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    aspectRatio: 1 / 3,
  },
}));
