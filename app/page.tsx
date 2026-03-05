'use client';

import dynamic from 'next/dynamic';

// Client components that require browser APIs / wallet context — loaded client-side only
const ConnectSection = dynamic(
  () => import('@/app/components/ConnectSection').then((m) => m.ConnectSection),
  { ssr: false }
);

const HeaderWidget = dynamic(
  () => import('@/app/components/HeaderWidget').then((m) => m.HeaderWidget),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-white">
      {/* Gradient background blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-purple-600/20 blur-[120px]"
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm">
            W
          </div>
          <span className="font-semibold text-sm tracking-tight">
            WalletConnect
          </span>
        </div>
        {/* Shows manage/disconnect widget in header once connected */}
        <HeaderWidget />
      </header>

      {/* Hero content */}
      <section className="relative z-10 flex flex-col items-center justify-center px-5 pt-20 pb-10 sm:pt-32 sm:px-10 text-center">
        {/* Badge */}
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-300">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
          Powered by Dynamic.xyz
        </span>

        <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          Connect Your{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Crypto Wallet
          </span>
        </h1>

        <p className="mt-5 max-w-lg text-base text-gray-400 sm:text-lg">
          Seamlessly connect MetaMask, Trust Wallet, Coinbase Wallet, and 600+
          other wallets. Works on both desktop and mobile.
        </p>

        {/* Supported wallets chips */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {['MetaMask', 'Trust Wallet', 'Coinbase', 'WalletConnect', 'Rainbow'].map(
            (name) => (
              <span
                key={name}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
              >
                {name}
              </span>
            )
          )}
        </div>

        {/* Dynamic client-only: connect button or wallet info */}
        <ConnectSection />
      </section>

      {/* Features grid */}
      <section className="relative z-10 mx-auto mt-20 grid max-w-3xl grid-cols-1 gap-4 px-5 sm:grid-cols-3 sm:px-10 pb-20">
        {[
          {
            icon: '🔒',
            title: 'Non-custodial',
            desc: 'Your keys, your crypto. We never hold your assets.',
          },
          {
            icon: '⚡',
            title: 'Instant Connect',
            desc: 'Sub-second wallet connection with no seed phrase required.',
          },
          {
            icon: '📱',
            title: 'Mobile Ready',
            desc: 'Works perfectly on any device — phone, tablet, or desktop.',
          },
        ].map(({ icon, title, desc }) => (
          <div
            key={title}
            className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 backdrop-blur-sm hover:border-white/10 transition-colors"
          >
            <div className="mb-3 text-2xl">{icon}</div>
            <h3 className="mb-1 text-sm font-semibold text-white">{title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 px-5 py-6 text-center text-xs text-gray-600 sm:px-10">
        Built with{' '}
        <a
          href="https://www.dynamic.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 hover:underline"
        >
          Dynamic.xyz
        </a>{' '}
        &amp;{' '}
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 hover:underline"
        >
          Next.js
        </a>
      </footer>
    </main>
  );
}

