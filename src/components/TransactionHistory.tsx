const TRANSACTIONS = [
  { id: 'tx_123', name: 'Transfer to Alice', date: 'Today, 2:45 PM', amount: '-$150.00', status: 'Completed', isNegative: true },
  { id: 'tx_124', name: 'Deposit from Bank', date: 'Yesterday, 9:00 AM', amount: '+$500.00', status: 'Completed', isNegative: false },
  { id: 'tx_125', name: 'Transfer to Bob', date: 'Sep 21, 4:20 PM', amount: '-$50.00', status: 'Completed', isNegative: true },
  { id: 'tx_126', name: 'Subscription Payment', date: 'Sep 20, 10:15 AM', amount: '-$19.99', status: 'Completed', isNegative: true },
];

export default function TransactionHistory() {
  return (
    <div className="glass-card h-full flex flex-col">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Recent Transactions</h3>
          <p className="text-sm text-zinc-400">Your latest financial activity.</p>
        </div>
        <button className="text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors bg-brand-500/10 hover:bg-brand-500/20 px-3 py-1.5 rounded-lg">
          View All
        </button>
      </div>
      
      <div className="space-y-3 flex-1">
        {TRANSACTIONS.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300 cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-black/40 shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg ${tx.isNegative ? 'text-zinc-300' : 'text-emerald-400'}`}>
                {tx.isNegative ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                )}
              </div>
              <div>
                <p className="font-semibold text-sm text-zinc-100 group-hover:text-white transition-colors">{tx.name}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{tx.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold text-sm ${tx.isNegative ? 'text-zinc-100' : 'text-emerald-400'}`}>{tx.amount}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{tx.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
