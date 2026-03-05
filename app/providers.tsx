'use client';

import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { useEffect, useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  // Prevent SSR — Dynamic.xyz SDK requires browser APIs (window, localStorage)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Render children without wallet context during SSR / static generation
    return <>{children}</>;
  }

  return (
    <DynamicContextProvider
      settings={{
        // Get your Environment ID at https://app.dynamic.xyz/dashboard/developer
        environmentId:
          process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID ??
          'REPLACE_WITH_YOUR_ENVIRONMENT_ID',
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      {children}
    </DynamicContextProvider>
  );
}
