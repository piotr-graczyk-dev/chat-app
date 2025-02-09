import FormField from '@components/ui/FormField';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { SplashScreen, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Button, HelperText, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { z } from 'zod';

import { useAuth } from '@/contexts/auth';

const schema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(8).max(50),
});

type FormData = z.infer<typeof schema>;

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: 'test@example.com',
      password: 'password123',
    },
  });

  const { signIn } = useAuth();
  const { t } = useTranslation('auth');
  const { styles } = useStyles(stylesheet);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const success = await signIn(data.email, data.password);
      if (success) {
        router.replace('/(root)/(drawer)');
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
        setError('root', {
          type: 'manual',
          message: 'Invalid email or password',
        });
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    } catch (e) {
      if (__DEV__) {
        console.warn(e);
      }
      setError('root', {
        type: 'manual',
        message: 'An error occurred during login',
      });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const onLayout = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaView style={styles.container} onLayout={onLayout}>
      <KeyboardAwareScrollView>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
        />
        <Text variant="headlineMedium" style={styles.title}>
          {t('login')}
        </Text>

        {errors.root && (
          <HelperText type="error" style={styles.rootError}>
            {errors.root.message}
          </HelperText>
        )}

        <FormField control={control} name="email" label="Email" />

        <FormField control={control} name="password" label="Password" />

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={styles.button}>
          {t('sign_in')}
        </Button>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const stylesheet = createStyleSheet(({ colors, sizes }) => ({
  container: {
    flex: 1,
    padding: sizes.lg,
  },
  title: {
    textAlign: 'center',
    marginBottom: sizes.xl,
  },
  input: {
    marginBottom: sizes.sm,
  },
  button: {
    marginTop: sizes.md,
  },
  error: {
    marginBottom: sizes.md,
    marginLeft: sizes.sm,
  },
  rootError: {
    textAlign: 'center',
    marginBottom: sizes.md,
    padding: sizes.sm,
    backgroundColor: colors.errorContainer,
    borderRadius: sizes.sm,
  },
  logo: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center',
    marginBottom: sizes.md,
  },
}));
