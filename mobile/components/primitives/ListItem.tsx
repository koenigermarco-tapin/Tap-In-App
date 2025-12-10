import React from 'react';
import { Pressable, PressableProps, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Text } from './Text';

type Props = PressableProps & {
  title: string;
  subtitle?: string;
  meta?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
};

export function ListItem({
  title,
  subtitle,
  meta,
  leading,
  trailing,
  style,
  disabled,
  ...rest
}: Props) {
  const { theme } = useTheme();
  const styles = useStyles(theme);
  const opacity = disabled ? 0.5 : 1;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        { opacity: pressed ? 0.9 * opacity : opacity },
        style as ViewStyle,
      ]}
      disabled={disabled}
      {...rest}
    >
      {leading && <View style={styles.leading}>{leading}</View>}
      <View style={styles.texts}>
        <Text variant="title">{title}</Text>
        {subtitle && (
          <Text variant="body" muted numberOfLines={2}>
            {subtitle}
          </Text>
        )}
      </View>
      {meta && (
        <Text variant="caption" muted style={styles.meta}>
          {meta}
        </Text>
      )}
      {trailing && <View style={styles.trailing}>{trailing}</View>}
    </Pressable>
  );
}

const useStyles = (theme: ReturnType<typeof useTheme>['theme']) =>
  StyleSheet.create({
    base: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.space[3],
      paddingHorizontal: theme.space[3],
      paddingVertical: theme.space[2],
      borderRadius: theme.radius.md,
      backgroundColor: theme.palette.surfaceMuted,
    },
    leading: {
      width: 40,
      height: 40,
      borderRadius: theme.radius.md,
      backgroundColor: theme.palette.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    texts: {
      flex: 1,
      gap: theme.space[0],
    },
    meta: {
      marginLeft: theme.space[2],
    },
    trailing: {
      marginLeft: theme.space[2],
    },
  });

