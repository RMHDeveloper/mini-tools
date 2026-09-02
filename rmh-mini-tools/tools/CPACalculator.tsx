
import React, { useState, useEffect } from 'react';

const CPACalculator: React.FC = () => {
  const [spend, setSpend] = useState<number>(0);
  const [conversions, setConversions] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    if (conversions <= 0) {
      setResult(null);
      return;
    }
    setResult(spend / conversions);
  }, [spend, conversions]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Total Ad Spend (₹)</label>
          <input 
            type="number" 
            value={spend || ''} 
            onChange={(e) => setSpend(Number(e.target.value))}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Total Conversions</label>
          <input 
            type="number" 
            value={conversions || ''} 
            onChange={(e) => setConversions(Number(e.target.value))}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            placeholder="0"
          />
        </div>
      </div>

      {result !== null && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 text-center">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">Cost Per Acquisition (CPA)</p>
            <p className="text-5xl font-black text-slate-900 dark:text-white mb-2">₹{result.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
            <div className="mt-4 text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Compare this with your average order value (AOV). If CPA is greater than AOV, your campaign is running at a loss (excluding LTV).
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CPACalculator;
