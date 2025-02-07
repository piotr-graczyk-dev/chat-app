import { Tabs } from '@components/ui/Tabs';
import Icon from '@react-native-vector-icons/feather';
import React from 'react';
import { useStyles } from 'react-native-unistyles';

const homeIcon = Icon.getImageSourceSync('home', 24);
const exploreIcon = Icon.getImageSourceSync('compass', 24);

export default function TabLayout() {
  const { theme } = useStyles();
  return (
    <Tabs
      barTintColor={theme.colors.surfaceVariant}
      tabBarInactiveTintColor={theme.colors.onSurfaceVariant}
      activeIndicatorColor={theme.colors.primaryContainer}
      tabBarActiveTintColor={theme.colors.primary}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: () => homeIcon,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: () => exploreIcon,
        }}
      />
    </Tabs>
  );
}
