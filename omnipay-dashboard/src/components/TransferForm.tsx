'use client';
import { useState, useEffect } from 'react';
import { searchUsers, transferFunds, WalletUserLookupDto } from '@/lib/api';

export default function TransferForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Sender State
  const [senderQuery, setSenderQuery] = useState('');
  const [senderResults, setSenderResults] = useState<WalletUserLookupDto[]>([]);
  const [selectedSender, setSelectedSender] = useState<WalletUserLookupDto | null>(null);
  const [showSenderDropdown, setShowSenderDropdown] = useState(false);

  // Receiver State
  const [receiverQuery, setReceiverQuery] = useState('');
  const [receiverResults, setReceiverResults] = useState<WalletUserLookupDto[]>([]);
  const [selectedReceiver, setSelectedReceiver] = useState<WalletUserLookupDto | null>(null);
  const [showReceiverDropdown, setShowReceiverDropdown] = useState(false);
  
  const [amount, setAmount] = useState('');

  // Debounce sender searches
  useEffect(() => {
    if (!senderQuery || selectedSender?.name === senderQuery) {
      setSenderResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      const results = await searchUsers(senderQuery);
      setSenderResults(results);
      setShowSenderDropdown(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [senderQuery, selectedSender]);

  // Debounce receiver searches
  useEffect(() => {
    if (!receiverQuery || selectedReceiver?.name === receiverQuery) {
      setReceiverResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      const results = await searchUsers(receiverQuery);
      setReceiverResults(results);
      setShowReceiverDropdown(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [receiverQuery, selectedReceiver]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSender || !selectedReceiver) {
      alert("Please select valid users from the list.");
      return;
    }
    
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');
    
    const result = await transferFunds(selectedSender.walletId, selectedReceiver.walletId, parseFloat(amount));
    
    setIsLoading(false);
    
    if (result.success) {
      setSuccessMessage(result.message);
      setTimeout(() => {
        setSuccessMessage('');
        setSenderQuery('');
        setReceiverQuery('');
        setAmount('');
        setSelectedSender(null);
        setSelectedReceiver(null);
      }, 3000);
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <div className="glass-card flex flex-col h-full">
      <h3 className="text-xl font-bold text-white mb-1">Quick Transfer</h3>
      <p className="text-sm text-zinc-400 mb-6">Send money instantly to any user.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          
          {/* Sender Search */}
          <div className="relative">
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5 ml-1">Sender</label>
            <input 
              type="text" 
              placeholder="Search user..." 
              className="input-field" 
              value={senderQuery}
              onChange={(e) => {
                setSenderQuery(e.target.value);
                setSelectedSender(null);
              }}
              onFocus={() => { if (senderResults.length > 0) setShowSenderDropdown(true); }}
              onBlur={() => setTimeout(() => setShowSenderDropdown(false), 200)}
              required 
            />
            {showSenderDropdown && senderResults.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl max-h-48 overflow-y-auto overflow-x-hidden p-1 animate-fade-in-up">
                {senderResults.map((u) => (
                  <div 
                    key={u.walletId} 
                    className="px-3 py-2 hover:bg-brand-500/20 text-sm text-zinc-200 cursor-pointer rounded-lg truncate transition-colors"
                    onClick={() => {
                      setSelectedSender(u);
                      setSenderQuery(u.name);
                      setShowSenderDropdown(false);
                    }}
                  >
                    {u.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Receiver Search */}
          <div className="relative">
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5 ml-1">Receiver</label>
            <input 
              type="text" 
              placeholder="Search recipient..." 
              className="input-field" 
              value={receiverQuery}
              onChange={(e) => {
                setReceiverQuery(e.target.value);
                setSelectedReceiver(null);
              }}
              onFocus={() => { if (receiverResults.length > 0) setShowReceiverDropdown(true); }}
              onBlur={() => setTimeout(() => setShowReceiverDropdown(false), 200)}
              required 
            />
            {showReceiverDropdown && receiverResults.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl max-h-48 overflow-y-auto overflow-x-hidden p-1 animate-fade-in-up">
                {receiverResults.map((u) => (
                  <div 
                    key={u.walletId} 
                    className="px-3 py-2 hover:bg-brand-500/20 text-sm text-zinc-200 cursor-pointer rounded-lg truncate transition-colors"
                    onClick={() => {
                      setSelectedReceiver(u);
                      setReceiverQuery(u.name);
                      setShowReceiverDropdown(false);
                    }}
                  >
                    {u.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5 ml-1">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-medium">$</span>
              <input 
                type="number" 
                min="1" 
                step="0.01" 
                placeholder="0.00" 
                className="input-field pl-8" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required 
              />
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          {successMessage && (
            <div className="mb-4 text-sm font-medium text-emerald-400 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 text-center animate-fade-in-up">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mb-4 text-sm font-medium text-red-400 bg-red-500/10 p-3 rounded-xl border border-red-500/20 text-center animate-fade-in-up">
              {errorMessage}
            </div>
          )}
          <button type="submit" disabled={isLoading} className="btn-primary w-full h-12 flex justify-center items-center text-sm">
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Transfer Funds'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
