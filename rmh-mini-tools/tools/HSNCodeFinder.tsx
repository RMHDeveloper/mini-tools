
import React, { useState } from 'react';
import { findHsnCode } from '../services/geminiService';

const HSNCodeFinder: React.FC = () => {
  const [product, setProduct] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!product.trim()) return;
    setLoading(true);
    setError('');
    try {
      const data = await findHsnCode(product, category);
      setResult(data);
    } catch (err) {
      setError('Could not fetch the HSN details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Product Name</label>
          <input 
            type="text" 
            value={product} 
            onChange={(e) => setProduct(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            placeholder="e.g. Ground-Nut Oil"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Category (Optional)</label>
          <input 
            type="text" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            placeholder="e.g. Edible Oil"
          />
        </div>
      </div>

      <button 
        onClick={handleSearch}
        disabled={loading || !product.trim()}
        className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        {loading ? (
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : 'Find HSN Details'}
      </button>

      {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}

      {result && result.items && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Search Results</h4>
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">{result.items.length} Matches</span>
          </div>
          
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th className="p-4 text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 w-1/3">HSN Code</th>
                  <th className="p-4 text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {result.items.map((item: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-mono font-bold text-primary text-sm">{item.hsnCode}</td>
                    <td className="p-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="text-[10px] text-slate-400 dark:text-slate-500 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl italic leading-relaxed">
            {result.disclaimer}
          </div>
        </div>
      )}
    </div>
  );
};

export default HSNCodeFinder;
