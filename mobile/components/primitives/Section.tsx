import React, { PropsWithChildren } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { Text } from './Text';
import { useTheme } from '../../theme/ThemeProvider';

type Props = ViewProps & {
  title?: string;
  description?: string;
  spacing?: 'sm' | 'md' | 'lg';
};

export function Section({
  title,
  description,
  spacing = 'md',
  children,
  style,
  ...rest
}: PropsWithChildren<Props>) {
  const { theme } = useTheme();
  const styles = useStyles(theme);
  const spaceMap = { sm: theme.space[3], md: theme.space[4], lg: theme.space[5] };

  return (
    <View style={[{ gap: theme.space[2], marginBottom: spaceMap[spacing] }, style]} {...rest}>
      {(title || description) && (
        <View style={styles.header}>
          {title && <Text variant="title">{title}</Text>}
          {description && (
            <Text variant="body" muted>
              {description}
            </Text>
          )}
        </View>
      )}
      {children}
    </View>
  );
}

const useStyles = (theme: ReturnType<typeof useTheme>['theme']) =>
  StyleSheet.create({
    header: {
      gap: theme.space[1],
    },
  });

