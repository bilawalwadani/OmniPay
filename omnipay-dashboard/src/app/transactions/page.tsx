export default function TransactionsPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 animate-fade-in-up mt-20">
      <div className="glass-card max-w-md w-full text-center py-12 px-8">
        <div className="w-16 h-16 rounded-full bg-brand-500/10 mx-auto flex items-center justify-center mb-6 shadow-inner">
          <svg className="w-8 h-8 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold text-white mb-3">Transactions</h2>
        <p className="text-zinc-400 text-sm">We are currently building the full transaction history feature. Please check back later!</p>
      </div>
    </div>
  );
}
