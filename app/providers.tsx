'use client';

import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { useSyncExternalStore } from 'react';

// useSyncExternalStore-based mount check — avoids setState-in-effect lint warning
// Returns false on the server, true on the client after hydration
function subscribe() { return () => {}; }
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function Providers({ children }: { children: React.ReactNode }) {
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

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

        // Mobile: redirect to the wallet app (MetaMask / Coinbase / Trust etc.)
        // which opens the dApp inside the wallet's built-in browser — same as OpenSea.
        // 'in-app-browser' (default) tries to stay in the current browser context
        // which often fails because mobile browsers block wallet APIs.
        mobileExperience: 'redirect',

        // Use HTTPS universal links when deep-linking to wallet apps on mobile.
        // 'native' (default) uses custom URI schemes (e.g. metamask://) which can
        // fail on some devices if the app is not installed.
        // 'universal' falls back gracefully to the wallet's website if not installed.
        deepLinkPreference: 'universal',
      }}
    >
      {children}
    </DynamicContextProvider>
  );
}
