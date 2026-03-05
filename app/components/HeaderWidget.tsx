'use client';

import { DynamicWidget, useDynamicContext } from '@dynamic-labs/sdk-react-core';

export function HeaderWidget() {
  const { primaryWallet } = useDynamicContext();

  if (!primaryWallet) return null;

  return <DynamicWidget />;
}
