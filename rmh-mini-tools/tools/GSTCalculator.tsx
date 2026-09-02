
import React, { useState, useEffect } from 'react';

const GSTCalculator: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [rate, setRate] = useState<number>(18);
  const [type, setType] = useState<'exclusive' | 'inclusive'>('exclusive');
  const [result, setResult] = useState<{ base: number, gst: number, total: number } | null>(null);

  useEffect(() => {
    if (amount <= 0) {
      setResult(null);
      return;
    }

    if (type === 'exclusive') {
      const gst = (amount * rate) / 100;
      setResult({ base: amount, gst, total: amount + gst });
    } else {
      const base = amount / (1 + rate / 100);
      setResult({ base, gst: amount - base, total: amount });
    }
  }, [amount, rate, type]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Amount (₹)</label>
          <input 
            type="number" 
            value={amount || ''} 
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            placeholder="Enter amount"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">GST Rate (%)</label>
          <select 
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          >
            <option value={0}>0%</option>
            <option value={5}>5%</option>
            <option value={18}>18%</option>
            <option value={40}>40%</option>
          </select>
        </div>
      </div>

      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
        <button 
          onClick={() => setType('exclusive')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${type === 'exclusive' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' : 'text-slate-500'}`}
        >
          GST Exclusive
        </button>
        <button 
          onClick={() => setType('inclusive')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${type === 'inclusive' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' : 'text-slate-500'}`}
        >
          GST Inclusive
        </button>
      </div>

      {result && (
        <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center md:text-left">
              <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-bold">Base Amount</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">₹{result.base.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-bold">GST Amount ({rate}%)</p>
              <p className="text-2xl font-bold text-primary">₹{result.gst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
              <div className="mt-1 flex gap-2 justify-center md:justify-start">
                <span className="text-[10px] text-slate-400">CGST: ₹{(result.gst / 2).toFixed(2)}</span>
                <span className="text-[10px] text-slate-400">SGST: ₹{(result.gst / 2).toFixed(2)}</span>
              </div>
            </div>
            <div className="text-center md:text-left">
              <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-bold">Total Amount</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">₹{result.total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 text-xs text-slate-600 dark:text-slate-400">
            <h4 className="font-bold mb-2 uppercase text-slate-400">Calculation Steps:</h4>
            <ol className="list-decimal list-inside space-y-1">
              {type === 'exclusive' ? (
                <>
                  <li>Input Amount: ₹{amount}</li>
                  <li>Calculation: (Amount × Rate) / 100</li>
                  <li>Result: ({amount} × {rate}) / 100 = ₹{result.gst.toFixed(2)}</li>
                  <li>Total: Base + GST = ₹{result.total.toFixed(2)}</li>
                </>
              ) : (
                <>
                  <li>Total Inclusive Amount: ₹{amount}</li>
                  <li>Calculation: Amount / (1 + (Rate/100))</li>
                  <li>Base Result: {amount} / {1 + rate/100} = ₹{result.base.toFixed(2)}</li>
                  <li>GST Result: Total - Base = ₹{result.gst.toFixed(2)}</li>
                </>
              )}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default GSTCalculator;
