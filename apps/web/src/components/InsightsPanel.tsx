'use client';

import { useEffect, useState } from 'react';
import { SpendingPattern, VisualizationData } from '@bank-app/shared';
import { TrendingUp, AlertCircle, Lightbulb } from 'lucide-react';
import ChartVisualization from './ChartVisualization';
import { apiClient } from '@/lib/api-client';

export default function InsightsPanel() {
  const [spendingData, setSpendingData] = useState<{
    patterns: SpendingPattern[];
    visualization: VisualizationData;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    try {
      const response = await apiClient.getSpendingInsights('month');
      if (response.success && response.data) {
        setSpendingData(response.data);
      }
    } catch (error) {
      console.error('Failed to load insights:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading insights...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-700 to-accent-dark text-white rounded-lg shadow-lg p-8">
        <div className="flex items-center gap-4">
          <Lightbulb size={40} className="text-white" />
          <div>
            <h2 className="text-3xl font-serif font-bold">Financial Insights</h2>
            <p className="text-neutral-100 mt-1">AI-powered analysis of your spending patterns</p>
          </div>
        </div>
      </div>

      {/* Spending Visualization */}
      {spendingData?.visualization && (
        <ChartVisualization data={spendingData.visualization} />
      )}

      {/* Spending Breakdown */}
      {spendingData?.patterns && (
        <div className="card">
          <h3 className="text-2xl font-serif font-semibold text-primary-800 mb-6">Spending by Category</h3>
          <div className="space-y-3">
            {spendingData.patterns.map((pattern, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors border border-neutral-200">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-2xl">{getCategoryIcon(pattern.category)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 capitalize text-lg">{pattern.category}</p>
                    <p className="text-sm text-neutral-600">{pattern.percentage.toFixed(1)}% of total spending</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xl text-neutral-900">${pattern.amount.toFixed(2)}</p>
                  <div className="flex items-center gap-1 text-sm mt-1">
                    {pattern.trend === 'up' && (
                      <>
                        <TrendingUp size={14} className="text-red-600" />
                        <span className="text-red-600 font-medium">Increasing</span>
                      </>
                    )}
                    {pattern.trend === 'down' && (
                      <>
                        <TrendingUp size={14} className="text-green-600 rotate-180" />
                        <span className="text-green-600 font-medium">Decreasing</span>
                      </>
                    )}
                    {pattern.trend === 'stable' && (
                      <span className="text-neutral-500 font-medium">Stable</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="card bg-primary-50 border-2 border-primary-200">
        <div className="flex gap-4">
          <AlertCircle className="text-primary-700 flex-shrink-0" size={28} />
          <div>
            <h4 className="font-serif font-bold text-primary-900 text-xl mb-3">AI Recommendation</h4>
            <p className="text-neutral-800 leading-relaxed">
              Based on your spending patterns, consider setting a budget for dining expenses.
              You've spent 30% more on dining this month compared to last month. Our AI suggests
              redirecting some of this spending to your savings goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    dining: '🍽️',
    shopping: '🛍️',
    transportation: '🚗',
    utilities: '💡',
    entertainment: '🎬',
    healthcare: '🏥',
    food: '🥗',
    savings: '💰',
    other: '📦',
  };
  return icons[category.toLowerCase()] || '📊';
}
