import { Router, Request, Response } from 'express';
import { Transaction } from '@bank-app/shared';
import { authenticateToken } from '../middleware/auth';

const router = Router();

/**
 * GET /api/transactions
 * Get user transactions with optional filtering
 */
router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { accountId, category, startDate, endDate, limit = 50 } = req.query;

    // Mock transactions (replace with database query)
    const mockTransactions: Transaction[] = [
      {
        id: 'tx-1',
        accountId: 'acc-1',
        type: 'debit',
        amount: -45.50,
        category: 'dining',
        description: 'Restaurant payment',
        merchantName: 'Italian Bistro',
        status: 'completed',
        timestamp: new Date('2024-12-10'),
      },
      {
        id: 'tx-2',
        accountId: 'acc-1',
        type: 'debit',
        amount: -120.00,
        category: 'shopping',
        description: 'Online purchase',
        merchantName: 'Amazon',
        status: 'completed',
        timestamp: new Date('2024-12-09'),
      },
      {
        id: 'tx-3',
        accountId: 'acc-1',
        type: 'credit',
        amount: 2500.00,
        category: 'income',
        description: 'Salary deposit',
        status: 'completed',
        timestamp: new Date('2024-12-01'),
      },
    ];

    res.json({
      success: true,
      data: mockTransactions,
      pagination: {
        page: 1,
        pageSize: Number(limit),
        total: mockTransactions.length,
        hasMore: false,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'FETCH_ERROR',
        message: 'Failed to fetch transactions',
      },
    });
  }
});

/**
 * POST /api/transactions/transfer
 * Create a money transfer
 */
router.post('/transfer', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { fromAccountId, toAccountId, amount, description } = req.body;

    if (!fromAccountId || !toAccountId || !amount) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_FIELDS',
          message: 'From account, to account, and amount are required',
        },
      });
    }

    // Mock transfer (replace with actual transfer logic)
    const transfer = {
      id: `transfer-${Date.now()}`,
      fromAccountId,
      toAccountId,
      amount,
      description,
      status: 'completed',
      createdAt: new Date(),
    };

    res.json({
      success: true,
      data: transfer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'TRANSFER_ERROR',
        message: 'Failed to process transfer',
      },
    });
  }
});

export default router;
