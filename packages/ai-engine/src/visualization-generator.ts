import { VisualizationData, ChartType, SpendingPattern } from '@bank-app/shared';

export class VisualizationGenerator {
  /**
   * Generate spending breakdown pie chart
   */
  static generateSpendingBreakdown(patterns: SpendingPattern[]): VisualizationData {
    return {
      type: 'pie',
      title: 'Spending Breakdown by Category',
      data: patterns.map((pattern, index) => ({
        label: pattern.category,
        value: pattern.amount,
        color: this.getCategoryColor(pattern.category, index),
        metadata: {
          percentage: pattern.percentage,
          trend: pattern.trend,
        },
      })),
      config: {
        showLegend: true,
        animate: true,
      },
    };
  }

  /**
   * Generate income vs expenses comparison
   */
  static generateIncomeVsExpenses(data: {
    labels: string[];
    income: number[];
    expenses: number[];
  }): VisualizationData {
    const chartData = data.labels.map((label, index) => ({
      label,
      value: data.income[index] - data.expenses[index],
      metadata: {
        income: data.income[index],
        expenses: data.expenses[index],
      },
    }));

    return {
      type: 'bar',
      title: 'Income vs Expenses',
      data: chartData,
      config: {
        xAxisLabel: 'Month',
        yAxisLabel: 'Amount ($)',
        showLegend: true,
        animate: true,
      },
    };
  }

  /**
   * Generate savings trend line chart
   */
  static generateSavingsTrend(data: {
    labels: string[];
    values: number[];
  }): VisualizationData {
    return {
      type: 'line',
      title: 'Savings Trend Over Time',
      data: data.labels.map((label, index) => ({
        label,
        value: data.values[index],
        color: '#10b981',
      })),
      config: {
        xAxisLabel: 'Date',
        yAxisLabel: 'Balance ($)',
        showLegend: false,
        animate: true,
      },
    };
  }

  /**
   * Generate category spending trend
   */
  static generateCategoryTrend(
    category: string,
    data: { labels: string[]; values: number[] }
  ): VisualizationData {
    return {
      type: 'area',
      title: `${category} Spending Trend`,
      data: data.labels.map((label, index) => ({
        label,
        value: data.values[index],
        color: this.getCategoryColor(category, 0),
      })),
      config: {
        xAxisLabel: 'Date',
        yAxisLabel: 'Amount ($)',
        showLegend: false,
        animate: true,
      },
    };
  }

  private static getCategoryColor(category: string, index: number): string {
    const colorMap: Record<string, string> = {
      food: '#ef4444',
      dining: '#f97316',
      shopping: '#f59e0b',
      transportation: '#10b981',
      utilities: '#3b82f6',
      entertainment: '#8b5cf6',
      healthcare: '#ec4899',
      savings: '#14b8a6',
      other: '#6b7280',
    };

    const defaultColors = [
      '#ef4444', '#f97316', '#f59e0b', '#10b981',
      '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6',
    ];

    return colorMap[category.toLowerCase()] || defaultColors[index % defaultColors.length];
  }
}

export default VisualizationGenerator;
