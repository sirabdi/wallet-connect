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

        // 'in-app-browser': user stays in Chrome/Safari. Dynamic uses WalletConnect's
        // relay server to bridge between Chrome and the wallet app. Chrome sends a
        // WalletConnect URI → MetaMask opens, user approves → relay notifies Chrome.
        // This avoids the "stuck loading" issue caused by 'redirect' on Android Chrome,
        // where the approval happens in a different browser context that Chrome can't see.
        //
        // IMPORTANT: For this to work with MetaMask/Trust/Coinbase on mobile you need
        // a WalletConnect Project ID set in your Dynamic dashboard:
        //   app.dynamic.xyz → Configurations → Integrations → WalletConnect Project ID
        // Get a free Project ID at https://cloud.walletconnect.com
        mobileExperience: 'in-app-browser',

        // 'universal' uses HTTPS universal links as the deep-link format when opening
        // the wallet app from Chrome. More reliable than 'native' (URI schemes like
        // metamask://) across different Android versions and manufacturers.
        deepLinkPreference: 'universal',
      }}
    >
      {children}
    </DynamicContextProvider>
  );
}
