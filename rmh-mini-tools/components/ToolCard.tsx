
import React from 'react';
import { Tool } from '../types';
import { ICONS } from '../constants';

interface ToolCardProps {
  tool: Tool;
  onClick: (id: string) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick }) => {
  return (
    <div 
      onClick={() => onClick(tool.id)}
      className="bg-white dark:bg-dark-card border border-gray-200 dark:border-slate-800 rounded-2xl p-5 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer flex items-start gap-4"
    >
      <div className="w-12 h-12 flex-shrink-0 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
        {ICONS[tool.icon] || <span className="text-xs">?</span>}
      </div>
      <div className="flex-1 min-w-0">
        <div className="mb-1">
          <h3 className="font-semibold text-slate-900 dark:text-white leading-tight">
            {tool.name}
          </h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {tool.description}
        </p>
      </div>
      <div className="self-center text-slate-300 dark:text-slate-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

export default ToolCard;
