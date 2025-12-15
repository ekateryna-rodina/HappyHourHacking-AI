import { Router, Request, Response } from 'express';
import { InsightEngine, VisualizationGenerator } from '@bank-app/ai-engine';
import { Transaction, SpendingPattern } from '@bank-app/shared';
import { authenticateToken } from '../middleware/auth';

const router = Router();

/**
 * GET /api/insights/spending
 * Get spending patterns and analysis
 */
router.get('/spending', async (req: Request, res: Response) => {
  try {
    const { period = 'month' } = req.query;

    // Mock transactions for analysis
    const mockTransactions: Transaction[] = [
      {
        id: 'tx-1',
        accountId: 'acc-1',
        type: 'debit',
        amount: -350.00,
        category: 'dining',
        description: 'Restaurants',
        status: 'completed',
        timestamp: new Date(),
      },
      {
        id: 'tx-2',
        accountId: 'acc-1',
        type: 'debit',
        amount: -500.00,
        category: 'shopping',
        description: 'Retail',
        status: 'completed',
        timestamp: new Date(),
      },
      {
        id: 'tx-3',
        accountId: 'acc-1',
        type: 'debit',
        amount: -200.00,
        category: 'transportation',
        description: 'Gas and transit',
        status: 'completed',
        timestamp: new Date(),
      },
    ];

    const patterns = InsightEngine.analyzeSpendingPatterns(
      mockTransactions,
      period as 'week' | 'month' | 'quarter'
    );

    // Generate visualization
    const visualization = VisualizationGenerator.generateSpendingBreakdown(patterns);

    res.json({
      success: true,
      data: {
        patterns,
        visualization,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'ANALYSIS_ERROR',
        message: 'Failed to analyze spending',
      },
    });
  }
});

/**
 * GET /api/insights/financial-health
 * Get overall financial health insights
 */
router.get('/financial-health', async (req: Request, res: Response) => {
  try {
    // Mock data
    const currentTransactions: Transaction[] = [];
    const previousTransactions: Transaction[] = [];

    const insights = InsightEngine.generateInsights(
      currentTransactions,
      previousTransactions
    );

    res.json({
      success: true,
      data: insights,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'INSIGHTS_ERROR',
        message: 'Failed to generate insights',
      },
    });
  }
});

export default router;
