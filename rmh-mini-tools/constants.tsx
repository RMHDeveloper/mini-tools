
import React from 'react';
import { Tool, ToolCategory } from './types';

export const TOOLS: Tool[] = [
  {
    id: 'gst-calc',
    name: 'GST Calculator',
    description: 'Calculate GST inclusive or exclusive amounts quickly and accurately.',
    category: ToolCategory.GST,
    icon: 'calculate'
  },
  {
    id: 'gst-rate',
    name: 'GST Rate Finder',
    description: 'Easily find the applicable GST rate for products and services.',
    category: ToolCategory.GST,
    icon: 'manage_search'
  },
  {
    id: 'hsn-finder',
    name: 'HSN Code Finder',
    description: 'Search HSN codes to ensure accurate taxation.',
    category: ToolCategory.GST,
    icon: 'grid_3x3'
  },
  {
    id: 'roas-calc',
    name: 'ROAS Calculator',
    description: 'Calculate Return on Ad Spend for campaigns.',
    category: ToolCategory.PERFORMANCE,
    icon: 'trending_up'
  },
  {
    id: 'conv-rate',
    name: 'Conversion Rate Calculator',
    description: 'Determine website conversion rate.',
    category: ToolCategory.PERFORMANCE,
    icon: 'percent'
  },
  {
    id: 'cpa-calc',
    name: 'CPA Calculator',
    description: 'Calculate cost per acquisition.',
    category: ToolCategory.PERFORMANCE,
    icon: 'attach_money'
  },
  {
    id: 'ad-budget',
    name: 'Ad Budget Planner',
    description: 'Plan advertising spend based on revenue goals.',
    category: ToolCategory.PERFORMANCE,
    icon: 'savings'
  },
  {
    id: 'label-checker',
    name: 'Product Label Requirement Checker',
    description: 'Verify mandatory product label requirements.',
    category: ToolCategory.COMPLIANCE,
    icon: 'inventory_2'
  },
  {
    id: 'page-checker',
    name: 'Mandatory Website Pages Checker',
    description: 'Identify mandatory pages for your business website.',
    category: ToolCategory.COMPLIANCE,
    icon: 'article'
  },
  {
    id: 'policy-gen',
    name: 'Website Policy Generator',
    description: 'Generate standard legal policies for your Indian business.',
    category: ToolCategory.LEGAL,
    icon: 'gavel'
  }
];

export const CATEGORIES = [
  ToolCategory.ALL,
  ToolCategory.GST,
  ToolCategory.PERFORMANCE,
  ToolCategory.COMPLIANCE,
  ToolCategory.LEGAL
];

export const DISCLAIMER_TEXT = "Disclaimer: This information is provided for general guidance only and should not be considered legal, tax, or professional advice. Always verify with a certified professional.";

export const ICONS: Record<string, React.ReactNode> = {
  calculate: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  manage_search: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
    </svg>
  ),
  grid_3x3: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  ),
  trending_up: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  percent: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l10-16M7 8a4 4 0 110-8 4 4 0 010 8zm10 16a4 4 0 110-8 4 4 0 010 8z" />
    </svg>
  ),
  attach_money: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  savings: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  inventory_2: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  article: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  gavel: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  )
};
