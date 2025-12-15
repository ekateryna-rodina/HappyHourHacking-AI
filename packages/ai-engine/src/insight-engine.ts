import {
  Transaction,
  SpendingPattern,
  FinancialInsight,
  BudgetRecommendation,
} from '@bank-app/shared';

export class InsightEngine {
  /**
   * Analyze spending patterns from transactions
   */
  static analyzeSpendingPatterns(
    transactions: Transaction[],
    period: 'week' | 'month' | 'quarter' = 'month'
  ): SpendingPattern[] {
    const categoryTotals = new Map<string, number>();
    let totalSpending = 0;

    for (const tx of transactions) {
      if (tx.type === 'debit') {
        const amount = Math.abs(tx.amount);
        categoryTotals.set(
          tx.category,
          (categoryTotals.get(tx.category) || 0) + amount
        );
        totalSpending += amount;
      }
    }

    const patterns: SpendingPattern[] = [];
    for (const [category, amount] of categoryTotals) {
      patterns.push({
        category,
        amount,
        percentage: (amount / totalSpending) * 100,
        trend: 'stable', // TODO: Calculate actual trend
      });
    }

    return patterns.sort((a, b) => b.amount - a.amount);
  }

  /**
   * Generate personalized financial insights
   */
  static generateInsights(
    transactions: Transaction[],
    previousTransactions: Transaction[]
  ): FinancialInsight[] {
    const insights: FinancialInsight[] = [];

    // Detect unusual spending
    const currentSpending = this.calculateTotalSpending(transactions);
    const previousSpending = this.calculateTotalSpending(previousTransactions);
    const change = ((currentSpending - previousSpending) / previousSpending) * 100;

    if (Math.abs(change) > 20) {
      insights.push({
        id: `insight-${Date.now()}-1`,
        type: 'alert',
        title: change > 0 ? 'Increased Spending Detected' : 'Decreased Spending',
        description: `Your spending ${change > 0 ? 'increased' : 'decreased'} by ${Math.abs(change).toFixed(1)}% compared to last month.`,
        priority: Math.abs(change) > 50 ? 'high' : 'medium',
        actionable: true,
        relatedData: { change, currentSpending, previousSpending },
        createdAt: new Date(),
      });
    }

    // Identify top spending categories
    const patterns = this.analyzeSpendingPatterns(transactions);
    if (patterns.length > 0 && patterns[0].percentage > 30) {
      insights.push({
        id: `insight-${Date.now()}-2`,
        type: 'spending',
        title: `High ${patterns[0].category} Spending`,
        description: `${patterns[0].category} accounts for ${patterns[0].percentage.toFixed(1)}% of your spending this month.`,
        priority: 'medium',
        actionable: true,
        relatedData: patterns[0],
        createdAt: new Date(),
      });
    }

    return insights;
  }

  /**
   * Generate budget recommendations
   */
  static generateBudgetRecommendations(
    patterns: SpendingPattern[],
    income: number
  ): BudgetRecommendation[] {
    const recommendations: BudgetRecommendation[] = [];
    const recommendedPercentages: Record<string, number> = {
      housing: 30,
      food: 15,
      transportation: 15,
      utilities: 10,
      entertainment: 10,
      savings: 20,
    };

    for (const pattern of patterns) {
      const recommendedPercentage = recommendedPercentages[pattern.category.toLowerCase()] || 10;
      const recommendedLimit = (income * recommendedPercentage) / 100;

      if (pattern.amount > recommendedLimit * 1.2) {
        recommendations.push({
          category: pattern.category,
          currentSpending: pattern.amount,
          recommendedLimit,
          reasoning: `Your ${pattern.category} spending is ${((pattern.amount / recommendedLimit - 1) * 100).toFixed(0)}% above the recommended ${recommendedPercentage}% of income.`,
        });
      }
    }

    return recommendations;
  }

  /**
   * Predict future balance based on trends
   */
  static predictFutureBalance(
    currentBalance: number,
    transactions: Transaction[],
    monthsAhead: number = 3
  ): number {
    const monthlyChange = this.calculateAverageMonthlyChange(transactions);
    return currentBalance + monthlyChange * monthsAhead;
  }

  private static calculateTotalSpending(transactions: Transaction[]): number {
    return transactions
      .filter((tx) => tx.type === 'debit')
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  }

  private static calculateAverageMonthlyChange(transactions: Transaction[]): number {
    if (transactions.length === 0) return 0;

    const income = transactions
      .filter((tx) => tx.type === 'credit')
      .reduce((sum, tx) => sum + tx.amount, 0);

    const expenses = transactions
      .filter((tx) => tx.type === 'debit')
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

    return income - expenses;
  }
}

export default InsightEngine;
