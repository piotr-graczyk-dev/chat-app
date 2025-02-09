import { Link, Stack } from 'expo-router';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function NotFoundScreen() {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Text>This screen doesn't exist.</Text>
      <Link href="/" style={styles.link}>
        <Text>Go to home screen!</Text>
      </Link>
    </View>
  );
}

const stylesheet = createStyleSheet(({ colors }) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  link: {
    color: colors.primary,
  },
}));
