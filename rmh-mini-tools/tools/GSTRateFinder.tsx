
import React, { useState } from 'react';
import { findGstRate } from '../services/geminiService';

const GSTRateFinder: React.FC = () => {
  const [product, setProduct] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!product.trim()) return;
    setLoading(true);
    setError('');
    try {
      const data = await findGstRate(product);
      setResult(data);
    } catch (err) {
      setError('Could not fetch the GST rate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Product or Service Name</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            value={product} 
            onChange={(e) => setProduct(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            placeholder="e.g. Cotton T-shirt, Consulting Services, Spare Parts"
          />
          <button 
            onClick={handleSearch}
            disabled={loading || !product.trim()}
            className="bg-primary text-white px-6 rounded-xl font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Search'}
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {result && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="bg-primary text-white w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold flex-shrink-0">
              {result.rate}%
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{result.category}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{result.justification}</p>
              <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-500">
                <span className="font-bold text-primary mr-1">NOTE:</span> {result.verificationNote}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GSTRateFinder;
