import { ImLookin } from '@components/screens/explore/ImLookin';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function ExploreScreen() {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.container}>
      <ImLookin />
    </View>
  );
}

const stylesheet = createStyleSheet(({ colors }) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
}));
