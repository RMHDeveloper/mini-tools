
import React, { useState, useEffect } from 'react';

const ROASCalculator: React.FC = () => {
  const [revenue, setRevenue] = useState<number>(0);
  const [spend, setSpend] = useState<number>(0);
  const [result, setResult] = useState<{ roas: number, interpretation: string, color: string } | null>(null);

  useEffect(() => {
    if (spend <= 0) {
      setResult(null);
      return;
    }

    const roas = revenue / spend;
    let interpretation = 'Average';
    let color = 'text-yellow-500';

    if (roas >= 4) {
      interpretation = 'Good';
      color = 'text-green-500';
    } else if (roas < 2) {
      interpretation = 'Poor';
      color = 'text-red-500';
    }

    setResult({ roas, interpretation, color });
  }, [revenue, spend]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Total Revenue (₹)</label>
          <input 
            type="number" 
            value={revenue || ''} 
            onChange={(e) => setRevenue(Number(e.target.value))}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            placeholder="0.00"
          />
        </div>
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
      </div>

      {result && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 text-center">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">Campaign ROAS</p>
            <p className="text-5xl font-black text-slate-900 dark:text-white mb-2">{result.roas.toFixed(2)}x</p>
            <p className={`text-sm font-bold ${result.color} uppercase tracking-wider`}>
              Performance: {result.interpretation}
            </p>
            <div className="mt-6 text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              For every ₹1 spent on advertising, you generated ₹{result.roas.toFixed(2)} in revenue.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ROASCalculator;
