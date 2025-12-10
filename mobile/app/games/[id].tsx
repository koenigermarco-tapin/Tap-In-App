import React from 'react';
import { Redirect, useLocalSearchParams } from 'expo-router';

export default function GameDetailRedirect() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const safeId = Array.isArray(id) ? id[0] : id;
  return <Redirect href={`/(tabs)/games/${safeId ?? ''}`} />;
}

