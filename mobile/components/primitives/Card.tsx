import React, { PropsWithChildren } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

type Props = ViewProps & {
  elevated?: boolean;
};

export function Card({ children, elevated = false, style, ...rest }: PropsWithChildren<Props>) {
  const { theme } = useTheme();
  const styles = useStyles(theme);
  return (
    <View style={[styles.base, elevated && styles.elevated, style]} {...rest}>
      {children}
    </View>
  );
}

const useStyles = (theme: ReturnType<typeof useTheme>['theme']) =>
  StyleSheet.create({
    base: {
      backgroundColor: theme.palette.surface,
      borderRadius: theme.radius.lg,
      padding: theme.space[4],
      borderWidth: 1,
      borderColor: theme.palette.border,
    },
    elevated: {
      ...theme.shadow.md,
    },
  });

