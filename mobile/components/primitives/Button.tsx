import React from 'react';
import { ActivityIndicator, Pressable, PressableProps, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Text } from './Text';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type Props = PressableProps & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  iconLeft,
  iconRight,
  fullWidth,
  style,
  disabled,
  ...rest
}: Props) {
  const { theme } = useTheme();
  const styles = useStyles(theme);
  const variantStyle = styles[variant];
  const sizeStyle = styles[size];

  const contentColor =
    variant === 'ghost' || variant === 'secondary' ? theme.palette.text : theme.palette.textOnAccent;

  const opacity = disabled || loading ? 0.6 : 1;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        variantStyle,
        sizeStyle,
        fullWidth && styles.fullWidth,
        { opacity: pressed ? 0.9 * opacity : opacity },
        style as ViewStyle,
      ]}
      disabled={disabled || loading}
      {...rest}
    >
      {({ pressed }) => (
        <>
          {loading ? (
            <ActivityIndicator color={contentColor} />
          ) : (
            <>
              {iconLeft}
              <Text
                style={[styles.label, { color: contentColor }]}
                numberOfLines={1}
                accessible={false}
              >
                {children}
              </Text>
              {iconRight}
            </>
          )}
        </>
      )}
    </Pressable>
  );
}

const useStyles = (theme: ReturnType<typeof useTheme>['theme']) =>
  StyleSheet.create({
    base: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.radius.md,
      gap: 8,
      borderWidth: 1,
      borderColor: 'transparent',
    },
    fullWidth: {
      width: '100%',
    },
    primary: {
      backgroundColor: theme.palette.primary,
      borderColor: theme.palette.primaryAlt,
    },
    secondary: {
      backgroundColor: theme.palette.surfaceMuted,
      borderColor: theme.palette.border,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    sm: {
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
    md: {
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    lg: {
      paddingVertical: 16,
      paddingHorizontal: 20,
    },
    label: {
      fontWeight: theme.weight.semibold as any,
      fontSize: 16,
    },
  });

