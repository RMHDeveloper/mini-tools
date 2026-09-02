
import React, { useState, useEffect } from 'react';

const AdBudgetPlanner: React.FC = () => {
  const [targetRevenue, setTargetRevenue] = useState<number>(0);
  const [expectedROAS, setExpectedROAS] = useState<number>(4);
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    if (expectedROAS <= 0) {
      setResult(null);
      return;
    }
    setResult(targetRevenue / expectedROAS);
  }, [targetRevenue, expectedROAS]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Target Monthly Revenue (₹)</label>
          <input 
            type="number" 
            value={targetRevenue || ''} 
            onChange={(e) => setTargetRevenue(Number(e.target.value))}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            placeholder="e.g. 10,00,000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Expected ROAS (e.g. 4.0)</label>
          <input 
            type="number" 
            value={expectedROAS || ''} 
            onChange={(e) => setExpectedROAS(Number(e.target.value))}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            placeholder="4.0"
          />
        </div>
      </div>

      {result !== null && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 text-center">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">Required Ad Budget</p>
            <p className="text-5xl font-black text-slate-900 dark:text-white mb-2">₹{result.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
            <div className="mt-6 p-4 bg-white dark:bg-slate-800 rounded-xl text-left border border-slate-200 dark:border-slate-700">
              <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Assumptions:</h4>
              <ul className="text-xs text-slate-500 space-y-1.5 list-disc list-inside">
                <li>Campaign will maintain a consistent ROAS of {expectedROAS}x.</li>
                <li>Budget is allocated exclusively for ad spend (excludes management fees).</li>
                <li>Conversion rates remain steady throughout the scaling process.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdBudgetPlanner;
