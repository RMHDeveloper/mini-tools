
import React, { useState } from 'react';

const ProductLabelChecker: React.FC = () => {
  const [category, setCategory] = useState('General');
  const [isPackaged, setIsPackaged] = useState(true);

  const getRequirements = () => {
    const mandatory = [
      'Common name of the product',
      'Net Quantity',
      'Month and Year of Manufacture/Import',
      'Maximum Retail Price (MRP) - Inclusive of all taxes',
      'Name and Address of the Manufacturer/Importer',
      'Consumer Care details (Phone & Email)'
    ];

    const conditional = [];
    if (category === 'Food/FSSAI') {
      mandatory.push('FSSAI Logo and License Number');
      mandatory.push('Veg/Non-Veg Symbol');
      mandatory.push('List of Ingredients in descending order');
      mandatory.push('Nutritional Information');
      mandatory.push('Best Before / Expiry Date');
    } else if (category === 'Cosmetics') {
      mandatory.push('Ingredients list (INCI nomenclature)');
      mandatory.push('Batch Number');
      mandatory.push('Import License Number (if applicable)');
    }

    if (isPackaged) {
      conditional.push('Net weight / Volume in standard units (kg, g, l, ml)');
    }

    return { mandatory, conditional, mistakes: [
      'Using font size smaller than prescribed for specific units',
      'MRP not being the most prominent numerical info',
      'Missing the "Inclusive of all taxes" text with MRP',
      'Consumer care contact being unreachable'
    ]};
  };

  const reqs = getRequirements();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Product Category</label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          >
            <option value="General">General Commodities</option>
            <option value="Food/FSSAI">Food Products (FSSAI)</option>
            <option value="Cosmetics">Cosmetics & Personal Care</option>
            <option value="Electronics">Electronics (BIS/WPC)</option>
          </select>
        </div>
        <div className="flex items-center gap-3 h-full pt-6">
          <input 
            type="checkbox" 
            id="isPackaged"
            checked={isPackaged}
            onChange={(e) => setIsPackaged(e.target.checked)}
            className="w-5 h-5 accent-primary rounded"
          />
          <label htmlFor="isPackaged" className="text-sm font-medium text-slate-700 dark:text-slate-300">Is it Pre-Packaged?</label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Mandatory Disclosures
          </h4>
          <ul className="space-y-2">
            {reqs.mandatory.map((item, idx) => (
              <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg">
                <svg className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              Common Compliance Mistakes
            </h4>
            <ul className="space-y-2">
              {reqs.mistakes.map((item, idx) => (
                <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2 bg-red-50 dark:bg-red-900/10 p-2 rounded-lg">
                  <svg className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 text-[10px] text-slate-500 leading-relaxed italic">
            Based on Legal Metrology (Packaged Commodities) Rules, 2011 and specific regulators like FSSAI for food products.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLabelChecker;
