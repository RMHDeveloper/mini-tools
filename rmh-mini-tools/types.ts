
export enum ToolCategory {
  ALL = 'All Tools',
  GST = 'GST & Tax',
  PERFORMANCE = 'Performance',
  COMPLIANCE = 'Compliance',
  LEGAL = 'Legal'
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
}

export interface GstCalculationResult {
  baseAmount: number;
  gstAmount: number;
  totalAmount: number;
  steps: string[];
}

export interface AdPerformanceResult {
  value: number;
  label: string;
  interpretation: 'Good' | 'Average' | 'Poor';
}

export interface LabelRequirement {
  mandatory: string[];
  conditional: string[];
  mistakes: string[];
}
