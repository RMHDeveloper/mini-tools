
import React, { useState } from 'react';

const WebsitePolicyGenerator: React.FC = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    websiteUrl: '',
    email: '',
    address: '',
    policyType: 'Privacy Policy'
  });
  const [generatedPolicy, setGeneratedPolicy] = useState('');

  const handleGenerate = () => {
    const { businessName, websiteUrl, email, address, policyType } = formData;
    if (!businessName || !websiteUrl) {
      alert('Please fill in at least Business Name and Website URL');
      return;
    }

    let policy = '';
    const date = new Date().toLocaleDateString('en-IN');
    const contactEmail = email || '[CONTACT EMAIL]';
    const businessAddress = address || '[BUSINESS ADDRESS]';

    switch (policyType) {
      case 'Privacy Policy':
        policy = `# Privacy Policy for ${businessName}\n\nLast updated: ${date}\n\nAt ${businessName}, accessible from ${websiteUrl}, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by ${businessName} and how we use it.\n\n### 1. Information Collection and Use\nFor a better experience, while using our service, we may require you to provide us with certain personally identifiable information, including but not limited to Name, Email, and Phone Number. \n\n### 2. Cookies and Web Beacons\nLike any other website, ${businessName} uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited.\n\n### 3. Compliance with Indian Laws\nThis policy is designed to comply with the Information Technology Act, 2000 and the Information Technology (Reasonable security practices and procedures and sensitive personal data or information) Rules, 2011.\n\n### 4. Consent\nBy using our website, you hereby consent to our Privacy Policy and agree to its terms.\n\n### Contact Us\nIf you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at ${contactEmail}.`;
        break;

      case 'Terms & Conditions':
        policy = `# Terms and Conditions for ${businessName}\n\nLast updated: ${date}\n\nWelcome to ${businessName}!\n\nThese terms and conditions outline the rules and regulations for the use of ${businessName}'s Website, located at ${websiteUrl}.\n\n### 1. Interpretation and Definitions\nThe words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.\n\n### 2. Intellectual Property Rights\nOther than the content you own, under these Terms, ${businessName} and/or its licensors own all the intellectual property rights and materials contained in this Website.\n\n### 3. Governing Law & Jurisdiction\nThese Terms will be governed by and interpreted in accordance with the laws of India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in India for the resolution of any disputes.\n\n### Contact Us\nIf you have any questions about these Terms, please contact us at ${contactEmail}.`;
        break;

      case 'Refund Policy':
        policy = `# Refund & Cancellation Policy for ${businessName}\n\nLast updated: ${date}\n\n### 1. Cancellation\nYou can cancel your order within 24 hours of purchase. Once the shipping process has started, the order cannot be cancelled.\n\n### 2. Refunds\nWe offer a full refund if the item is returned within 7 days of delivery in its original condition. Refunds will be processed within 5-7 working days to the original payment method.\n\n### 3. Non-Refundable Items\nCertain types of items cannot be returned, like perishable goods (such as food, flowers, or plants), custom products (such as special orders or personalized items), and personal care goods.\n\n### Contact Us\nFor any refund queries, email us at ${contactEmail}.`;
        break;

      case 'Shipping Policy':
        policy = `# Shipping Policy for ${businessName}\n\nLast updated: ${date}\n\n### 1. Processing Time\nAll orders are processed within 2-3 business days. Orders are not shipped or delivered on weekends or holidays.\n\n### 2. Shipping Rates & Delivery Estimates\nShipping charges for your order will be calculated and displayed at checkout. Standard delivery across India usually takes 5-7 business days.\n\n### 3. Shipment Confirmation & Order Tracking\nYou will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s).\n\n### 4. Damages\n${businessName} is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim.`;
        break;

      case 'Disclaimer':
        policy = `# Disclaimer for ${businessName}\n\nLast updated: ${date}\n\n### 1. General Information\nThe information provided by ${businessName} on ${websiteUrl} is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied.\n\n### 2. Professional Disclaimer\nThe site cannot and does not contain legal/tax/financial advice. The information is provided for general informational and educational purposes only and is not a substitute for professional advice.\n\n### 3. External Links Disclaimer\nThe Site may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy by us.`;
        break;

      default:
        policy = `# ${policyType} for ${businessName}\n\nThis policy is currently being updated for ${websiteUrl}. Please contact us at ${contactEmail} for details.`;
    }

    setGeneratedPolicy(policy);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPolicy);
    alert('Policy copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Business Name</label>
          <input 
            type="text" 
            value={formData.businessName} 
            onChange={(e) => setFormData({...formData, businessName: e.target.value})}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
            placeholder="e.g. Acme Solutions"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Website URL</label>
          <input 
            type="text" 
            value={formData.websiteUrl} 
            onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
            placeholder="e.g. acme.in"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Policy Type</label>
          <select 
            value={formData.policyType}
            onChange={(e) => setFormData({...formData, policyType: e.target.value})}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
          >
            <option>Privacy Policy</option>
            <option>Terms & Conditions</option>
            <option>Refund Policy</option>
            <option>Shipping Policy</option>
            <option>Disclaimer</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Contact Email</label>
          <input 
            type="email" 
            value={formData.email} 
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
            placeholder="support@acme.in"
          />
        </div>
      </div>

      <div className="col-span-full">
        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Business Address (Optional)</label>
        <textarea 
          value={formData.address} 
          onChange={(e) => setFormData({...formData, address: e.target.value})}
          rows={2}
          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
          placeholder="Enter physical address for policy inclusion..."
        />
      </div>

      <button 
        onClick={handleGenerate}
        className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-orange-600 transition-all shadow-lg shadow-primary/10"
      >
        Generate Policy
      </button>

      {generatedPolicy && (
        <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900 dark:text-white">Generated {formData.policyType}</h4>
            <button 
              onClick={copyToClipboard}
              className="text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy Text
            </button>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-h-80 overflow-y-auto whitespace-pre-wrap text-sm text-slate-600 dark:text-slate-400 font-mono leading-relaxed">
            {generatedPolicy}
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsitePolicyGenerator;
