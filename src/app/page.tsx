import MetricCard from '@/components/MetricCard';
import TransferForm from '@/components/TransferForm';
import TransactionHistory from '@/components/TransactionHistory';

export default function Home() {
  return (
    <div className="space-y-8 pb-10">
      <header className="flex flex-col gap-2 opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <h2 className="text-4xl font-extrabold tracking-tight text-white">Dashboard</h2>
        <p className="text-zinc-400 text-sm md:text-base">Welcome back, <span className="text-zinc-300 font-medium">John Doe</span>! Here's your financial overview.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <MetricCard title="Total Balance" value="$12,450.00" change="+4.5%" isPositive={true} />
        </div>
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <MetricCard title="Total Spent" value="$3,240.50" change="-1.2%" isPositive={false} />
        </div>
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <MetricCard title="Active Wallets" value="3" change="+1" isPositive={true} />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 h-full opacity-0 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
          <TransferForm />
        </div>
        <div className="lg:col-span-2 h-full opacity-0 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          <TransactionHistory />
        </div>
      </section>
    </div>
  );
}
