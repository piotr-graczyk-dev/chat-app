import React from 'react';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  useController,
} from 'react-hook-form';
import { View } from 'react-native';
import {
  HelperText,
  Text,
  TextInput,
  TextInputProps,
} from 'react-native-paper';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type FormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  disabled?: boolean;
  error?: string;
  rules?: object;
} & TextInputProps;

export default function FormField<T extends FieldValues>({
  control,
  name,
  label,
  disabled = false,
  rules = { required: true },
}: FormFieldProps<T>) {
  const { styles } = useStyles(stylesheet);

  const { fieldState } = useController({ control, name, rules });

  return (
    <View style={styles.field}>
      <Text variant="labelMedium">{label}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value }, fieldState }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            disabled={disabled}
            error={!!fieldState.error}
          />
        )}
      />
      <HelperText type="error" visible={!!fieldState.error}>
        {fieldState.error?.message}
      </HelperText>
    </View>
  );
}

const stylesheet = createStyleSheet(({ sizes }) => ({
  field: {
    gap: sizes.md,
  },
}));
