'use client';

import { DynamicWidget, useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { WalletInfo } from './WalletInfo';

export function ConnectSection() {
  const { primaryWallet } = useDynamicContext();

  return (
    <>
      {/* Connect button or wallet info card */}
      {!primaryWallet ? (
        <div className="mt-10 flex flex-col items-center gap-4">
          <DynamicWidget />
          <p className="text-xs text-gray-500">
            No account required. Connect instantly.
          </p>
        </div>
      ) : (
        <WalletInfo />
      )}
    </>
  );
}
