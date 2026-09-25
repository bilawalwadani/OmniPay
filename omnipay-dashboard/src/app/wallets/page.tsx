export default function WalletsPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 animate-fade-in-up mt-20">
      <div className="glass-card max-w-md w-full text-center py-12 px-8">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 mx-auto flex items-center justify-center mb-6 shadow-inner">
          <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold text-white mb-3">Wallets</h2>
        <p className="text-zinc-400 text-sm">We are currently building the wallet management feature. Please check back later!</p>
      </div>
    </div>
  );
}
