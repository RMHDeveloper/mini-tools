
import React, { useState } from 'react';

const WebsitePagesChecker: React.FC = () => {
  const [businessType, setBusinessType] = useState('E-commerce');
  const [monetization, setMonetization] = useState('Direct Sales');

  const getPages = () => {
    const mandatory = ['Privacy Policy', 'Terms & Conditions', 'Contact Us'];
    const conditional = [];
    const recommended = ['About Us', 'FAQ'];

    if (businessType === 'E-commerce' || monetization === 'Direct Sales') {
      mandatory.push('Shipping Policy');
      mandatory.push('Return & Refund Policy');
      mandatory.push('Cancellation Policy');
    }

    if (businessType === 'SaaS' || businessType === 'Professional Services') {
      mandatory.push('Service Level Agreement (SLA)');
    }

    if (monetization === 'Ads') {
      mandatory.push('Cookie Policy');
    }

    return { mandatory, conditional, recommended };
  };

  const pages = getPages();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Business Type</label>
          <select 
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          >
            <option value="E-commerce">E-commerce / Retail</option>
            <option value="SaaS">SaaS / Software</option>
            <option value="Content/Blog">Content / Blog</option>
            <option value="Professional Services">Professional Services</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Monetization Type</label>
          <select 
            value={monetization}
            onChange={(e) => setMonetization(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          >
            <option value="Direct Sales">Direct Sales (Products/Services)</option>
            <option value="Ads">Display Advertising</option>
            <option value="Affiliate">Affiliate Marketing</option>
            <option value="Free">No Monetization</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-2xl p-5">
          <h4 className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest mb-4">Mandatory</h4>
          <ul className="space-y-2">
            {pages.mandatory.map((p, idx) => (
              <li key={idx} className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-2xl p-5">
          <h4 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">Recommended</h4>
          <ul className="space-y-2">
            {pages.recommended.map((p, idx) => (
              <li key={idx} className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Trust Factor</h4>
          <p className="text-[10px] text-slate-500 leading-relaxed italic">
            For Indian payment gateways (like Razorpay, Cashfree), specific policies like Refund and Shipping are strictly verified before onboarding.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WebsitePagesChecker;
