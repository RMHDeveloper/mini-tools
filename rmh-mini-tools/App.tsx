
import React, { useState, useMemo } from 'react';
import Layout from './components/Layout';
import ToolCard from './components/ToolCard';
import { TOOLS, CATEGORIES, DISCLAIMER_TEXT } from './constants';
import { ToolCategory } from './types';

// Tool Components
import GSTCalculator from './tools/GSTCalculator';
import GSTRateFinder from './tools/GSTRateFinder';
import HSNCodeFinder from './tools/HSNCodeFinder';
import ROASCalculator from './tools/ROASCalculator';
import ConversionRateCalculator from './tools/ConversionRateCalculator';
import CPACalculator from './tools/CPACalculator';
import AdBudgetPlanner from './tools/AdBudgetPlanner';
import ProductLabelChecker from './tools/ProductLabelChecker';
import WebsitePagesChecker from './tools/WebsitePagesChecker';
import WebsitePolicyGenerator from './tools/WebsitePolicyGenerator';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ToolCategory>(ToolCategory.ALL);

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === ToolCategory.ALL || tool.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const renderTool = () => {
    switch (selectedToolId) {
      case 'gst-calc': return <GSTCalculator />;
      case 'gst-rate': return <GSTRateFinder />;
      case 'hsn-finder': return <HSNCodeFinder />;
      case 'roas-calc': return <ROASCalculator />;
      case 'conv-rate': return <ConversionRateCalculator />;
      case 'cpa-calc': return <CPACalculator />;
      case 'ad-budget': return <AdBudgetPlanner />;
      case 'label-checker': return <ProductLabelChecker />;
      case 'page-checker': return <WebsitePagesChecker />;
      case 'policy-gen': return <WebsitePolicyGenerator />;
      default: return null;
    }
  };

  const handleToolClick = (id: string) => {
    setSelectedToolId(id);
    setActiveTab('tool');
  };

  const handleBackToDashboard = () => {
    setSelectedToolId(null);
    setActiveTab('dashboard');
  };

  if (activeTab === 'tool' && selectedToolId) {
    const tool = TOOLS.find(t => t.id === selectedToolId);
    return (
      <Layout onSearchChange={setSearchQuery} activeTab={activeTab}>
        <div className="mb-6 flex items-center gap-4">
          <button 
            onClick={handleBackToDashboard}
            className="p-2 bg-gray-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <div>
            <h2 className="text-xl font-bold dark:text-white">{tool?.name}</h2>
            <p className="text-sm text-slate-500">{tool?.category}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-200 dark:border-slate-800 shadow-sm mb-12">
          {renderTool()}
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800 italic text-[10px] text-slate-400 text-center uppercase tracking-widest leading-relaxed">
            {DISCLAIMER_TEXT}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      onSearchChange={setSearchQuery} 
      activeTab={activeTab}
    >
      <div className="flex overflow-x-auto no-scrollbar gap-2 mb-6 -mx-4 px-4">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-5 py-2 rounded-full text-xs font-medium transition-all ${activeCategory === cat 
              ? 'bg-primary text-white shadow-lg shadow-primary/20' 
              : 'bg-white dark:bg-dark-card text-slate-600 dark:text-slate-400 border border-gray-200 dark:border-slate-800 hover:border-primary/30'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTools.length > 0 ? (
          filteredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} onClick={handleToolClick} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="mb-4 text-slate-300 dark:text-slate-700 flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-slate-500">No tools found matching your search.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default App;
