import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 w-64 glass border-r border-y-0 border-l-0 z-50 hidden md:flex flex-col">
      <div className="p-6">
        <h1 className="text-3xl font-extrabold tracking-tight">
          <span className="gradient-text">Omni</span>Pay
        </h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {[
          { name: 'Dashboard', path: '/' },
          { name: 'Transactions', path: '/transactions' },
          { name: 'Wallets', path: '/wallets' },
          { name: 'Settings', path: '/settings' },
        ].map((item) => (
          <Link 
            key={item.name} 
            href={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              item.name === 'Dashboard' 
                ? 'bg-brand-500/20 text-white shadow-inner border border-brand-500/30 font-semibold' 
                : 'text-zinc-400 hover:text-white hover:bg-white/5 font-medium'
            }`}
          >
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      
      <div className="p-6">
        <div className="flex items-center gap-3 p-4 glass rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-500 to-accent-500 flex items-center justify-center font-bold text-white shadow-lg">
            JD
          </div>
          <div>
            <p className="text-sm font-semibold text-white">John Doe</p>
            <p className="text-xs text-zinc-400">Pro Account</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
