'use client';

import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useState } from 'react';

export function WalletInfo() {
  const { primaryWallet, user } = useDynamicContext();
  const [copied, setCopied] = useState(false);

  if (!primaryWallet) return null;

  const address = primaryWallet.address;
  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-xl">
      {/* Connected badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-sm font-medium text-emerald-400">Connected</span>
      </div>

      {/* Wallet label */}
      <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
        Wallet Address
      </p>

      {/* Address + copy */}
      <div className="flex items-center justify-between gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/10">
        {/* Full on desktop, short on mobile */}
        <span className="font-mono text-sm text-white break-all hidden sm:block">
          {address}
        </span>
        <span className="font-mono text-sm text-white sm:hidden">
          {shortAddress}
        </span>

        <button
          onClick={handleCopy}
          aria-label="Copy address"
          className="shrink-0 text-gray-400 hover:text-white transition-colors"
        >
          {copied ? (
            <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      </div>

      {/* User alias if available */}
      {user?.alias && (
        <p className="mt-3 text-xs text-gray-500">
          Alias: <span className="text-gray-300">{user.alias}</span>
        </p>
      )}

      {/* Wallet connector name */}
      {primaryWallet.connector && (
        <p className="mt-1 text-xs text-gray-500">
          Wallet:{' '}
          <span className="text-gray-300 capitalize">
            {primaryWallet.connector.name}
          </span>
        </p>
      )}
    </div>
  );
}
