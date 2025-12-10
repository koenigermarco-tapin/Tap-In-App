import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewProps,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Text } from './Text';

type Props = TextInputProps & {
  label?: string;
  helperText?: string;
  error?: string;
  containerProps?: ViewProps;
};

export function Input({
  label,
  helperText,
  error,
  containerProps,
  style,
  editable = true,
  ...rest
}: Props) {
  const { theme } = useTheme();
  const styles = useStyles(theme);
  const borderColor = error ? theme.palette.danger : theme.palette.border;
  const textColor = editable ? theme.palette.text : theme.palette.textMuted;

  return (
    <View style={styles.container} {...containerProps}>
      {label && (
        <Text variant="label" muted>
          {label}
        </Text>
      )}
      <TextInput
        style={[styles.input, { borderColor, color: textColor }, style]}
        placeholderTextColor={theme.palette.textMuted}
        editable={editable}
        {...rest}
      />
      {error ? (
        <Text variant="caption" style={{ color: theme.palette.danger }}>
          {error}
        </Text>
      ) : helperText ? (
        <Text variant="caption" muted>
          {helperText}
        </Text>
      ) : null
      }
    </View>
  );
}

const useStyles = (theme: ReturnType<typeof useTheme>['theme']) =>
  StyleSheet.create({
    container: {
      gap: theme.space[1],
    },
    input: {
      borderWidth: 1,
      borderRadius: theme.radius.md,
      paddingHorizontal: theme.space[3],
      paddingVertical: theme.space[2],
      backgroundColor: theme.palette.surfaceMuted,
      fontFamily: theme.font.family,
      fontSize: 16,
    },
  });

