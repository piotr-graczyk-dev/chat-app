import { useAuth } from '@contexts/auth';
import Icon from '@react-native-vector-icons/feather';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import * as Haptics from 'expo-haptics';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';

import { setTheme } from '../../../../unistyles';

export default function DrawerLayout() {
  const { theme, styles } = useStyles(stylesheet);
  const { signOut } = useAuth();
  const { t } = useTranslation('common');
  const { i18n } = useTranslation();

  return (
    <GestureHandlerRootView style={styles.container}>
      <Drawer
        drawerContent={props => (
          <DrawerContentScrollView
            {...props}
            contentContainerStyle={styles.drawerContent}>
            <View>
              <DrawerItemList {...props} />
            </View>
            <View>
              <DrawerItem
                labelStyle={{ color: theme.colors.onBackground }}
                label={t('theme')}
                onPress={() => {
                  Haptics.selectionAsync();
                  props.navigation.toggleDrawer();
                  setTheme(
                    UnistylesRuntime.themeName === 'dark' ? 'light' : 'dark',
                  );
                }}
                icon={props => (
                  <Icon
                    name={
                      UnistylesRuntime.themeName === 'dark' ? 'sun' : 'moon'
                    }
                    {...props}
                    color={theme.colors.onBackground}
                  />
                )}
              />
              <DrawerItem
                labelStyle={{ color: theme.colors.onBackground }}
                label={t('language')}
                onPress={() => {
                  Haptics.selectionAsync();
                  props.navigation.toggleDrawer();
                  i18n.changeLanguage(i18n.language === 'en' ? 'pl' : 'en');
                }}
                icon={props => (
                  <CountryFlag
                    {...props}
                    isoCode={i18n.language === 'en' ? 'pl' : 'gb'}
                    size={20}
                  />
                )}
              />
              <DrawerItem
                labelStyle={{ color: theme.colors.error }}
                label={t('sign_out')}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  props.navigation.toggleDrawer();
                  signOut();
                }}
                icon={() => (
                  <Icon name="log-out" size={24} color={theme.colors.error} />
                )}
              />
            </View>
          </DrawerContentScrollView>
        )}
        screenOptions={{
          drawerStyle: {
            backgroundColor: theme.colors.background,
          },
          sceneStyle: {
            backgroundColor: theme.colors.surface,
          },
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.primary,
          drawerActiveTintColor: theme.colors.primary,
          drawerInactiveTintColor: theme.colors.onBackground,
          drawerActiveBackgroundColor: theme.colors.primaryContainer,
        }}>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: t('chat'),
            title: t('chat'),
            drawerIcon: props => <Icon name="message-circle" {...props} />,
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: t('profile'),
            title: t('profile'),
            drawerIcon: props => <Icon name="user" {...props} />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const stylesheet = createStyleSheet(() => ({
  container: {
    flex: 1,
  },
  drawerContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
}));
