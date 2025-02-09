import FormField from '@components/ui/FormField';
import { zodResolver } from '@hookform/resolvers/zod';
import Icon from '@react-native-vector-icons/feather';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Image, Pressable, View } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';
import { Button } from 'react-native-paper';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { z } from 'zod';

const userProfileSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  profilePicture: z.string().nullable(),
});

type UserProfile = z.infer<typeof userProfileSchema>;

const DEFAULT_PROFILE: UserProfile = {
  name: 'Test User',
  email: 'test@example.com',
  profilePicture: null,
};

const USER_PROFILE_KEY = 'userProfile';

const AnimatedButton = Animated.createAnimatedComponent(Button);

export default function SettingsScreen() {
  const { styles, theme } = useStyles(stylesheet);
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] =
    useMMKVObject<UserProfile>(USER_PROFILE_KEY);

  const { t } = useTranslation(['common', 'auth']);

  const userData = userProfile ?? DEFAULT_PROFILE;

  const { control, handleSubmit, reset, formState, setValue, watch } =
    useForm<UserProfile>({
      defaultValues: userData,
      resolver: zodResolver(userProfileSchema),
      mode: 'onChange',
    });

  const profilePicture = watch('profilePicture');

  const saveProfile = handleSubmit(data => {
    setUserProfile(data);
    setIsEditing(false);
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      setIsEditing(true);
      setValue('profilePicture', result.assets[0].uri, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={pickImage} style={styles.profileImageContainer}>
          {profilePicture ? (
            <Image
              source={{ uri: profilePicture }}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Icon
                name="user"
                size={40}
                color={theme.colors.onSurfaceVariant}
              />
            </View>
          )}
          <View style={styles.editImageButton}>
            <Icon name="camera" size={16} color={theme.colors.onPrimary} />
          </View>
        </Pressable>
      </View>

      <View style={styles.form}>
        <FormField control={control} name="email" label={t('auth:email')} />

        <FormField control={control} name="name" label={t('auth:name')} />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode={'contained'}
          disabled={isEditing && (!formState.isValid || !formState.isDirty)}
          onPress={() => {
            if (isEditing) {
              saveProfile();
            } else {
              setIsEditing(true);
            }
          }}>
          {isEditing ? t('common:save') : t('common:edit')}
        </Button>
        {isEditing && (
          <AnimatedButton
            entering={FadeInUp}
            exiting={FadeOutUp}
            mode="outlined"
            onPress={() => {
              setIsEditing(false);
              reset(userData);
            }}>
            {t('cancel')}
          </AnimatedButton>
        )}
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet(({ colors, sizes }) => ({
  container: {
    flex: 1,
    padding: sizes.xxl,
  },
  header: {
    alignItems: 'center',
    marginVertical: 24,
  },
  buttonContainer: {
    gap: sizes.lg,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editImageButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  form: {
    marginTop: 24,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    color: colors.onBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    paddingVertical: 4,
  },
  inputDisabled: {
    borderBottomColor: colors.surfaceVariant,
    color: colors.onSurfaceVariant,
  },
  button: {
    marginTop: 'auto',
    backgroundColor: colors.surfaceVariant,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    fontSize: 16,
    color: colors.onSurfaceVariant,
    fontWeight: '600',
  },
  saveButtonText: {
    color: colors.onPrimary,
  },
}));
