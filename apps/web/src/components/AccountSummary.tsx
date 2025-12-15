'use client';

import { useEffect, useState } from 'react';
import { Account, Transaction } from '@bank-app/shared';
import { formatCurrency } from '@bank-app/shared';
import { Wallet, X, ArrowUpRight, ArrowDownLeft, Calendar } from 'lucide-react';
import { apiClient } from '@/lib/api-client';

export default function AccountSummary() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [accountTransactions, setAccountTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const response = await apiClient.getAccounts();
      if (response.success && response.data) {
        setAccounts(response.data);
      }
    } catch (error) {
      console.error('Failed to load accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAccountDetails = async (account: Account) => {
    setSelectedAccount(account);
    
    // Start with mock transactions
    const mockTransactions: Transaction[] = [
      {
        id: 'tx-001',
        accountId: account.id,
        type: 'credit',
        amount: 2500.00,
        category: 'salary',
        description: 'Monthly Salary Deposit',
        status: 'completed',
        timestamp: new Date('2025-12-01'),
      },
      {
        id: 'tx-002',
        accountId: account.id,
        type: 'debit',
        amount: -120.50,
        category: 'utilities',
        description: 'Electric Bill Payment',
        status: 'completed',
        timestamp: new Date('2025-12-03'),
      },
      {
        id: 'tx-003',
        accountId: account.id,
        type: 'debit',
        amount: -85.20,
        category: 'dining',
        description: 'Restaurant - Downtown Bistro',
        status: 'completed',
        timestamp: new Date('2025-12-05'),
      },
      {
        id: 'tx-004',
        accountId: account.id,
        type: 'debit',
        amount: -450.00,
        category: 'shopping',
        description: 'Online Purchase - Amazon',
        status: 'completed',
        timestamp: new Date('2025-12-07'),
      },
    ];
    
    try {
      // Fetch real transfer history
      console.log('🔍 Fetching transfer history...');
      const response = await fetch('http://localhost:3001/api/accounts/transfers/history');
      console.log('📡 Response status:', response.status);
      const data = await response.json();
      console.log('📦 Transfer data received:', data);
      
      if (data.success && data.data) {
        // Convert transfers to transaction format and filter by account
        const transfers = data.data;
        const accountType = account.accountType;
        console.log('🔍 Filtering transfers for account type:', accountType);
        console.log('🔍 Total transfers:', transfers.length);
        
        const transactionsFromTransfers: Transaction[] = transfers
          .filter((t: any) => t.fromAccount === accountType || t.toAccount === accountType)
          .map((t: any) => {
            const isDebit = t.fromAccount === accountType;
            return {
              id: t.id,
              accountId: account.id,
              type: isDebit ? 'debit' : 'credit',
              amount: isDebit ? -t.amount : t.amount,
              category: 'transfer',
              description: isDebit 
                ? `Transfer to ${t.toAccount}` 
                : `Transfer from ${t.fromAccount}`,
              status: 'completed',
              timestamp: new Date(t.timestamp),
            };
          });
        
        console.log('✅ Converted transactions from transfers:', transactionsFromTransfers);
        
        // Combine mock transactions with real transfers and sort by timestamp
        const allTransactions = [...mockTransactions, ...transactionsFromTransfers]
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        
        console.log('📊 Total transactions to display:', allTransactions.length);
        setAccountTransactions(allTransactions);
      } else {
        console.log('⚠️ No transfer data or unsuccessful response');
        // Just use mock transactions if transfer fetch fails
        setAccountTransactions(mockTransactions);
      }
    } catch (error) {
      console.error('❌ Failed to load transfers:', error);
      // Fallback to mock transactions
      setAccountTransactions(mockTransactions);
    }
  };

  const closeDetails = () => {
    setSelectedAccount(null);
    setAccountTransactions([]);
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const checkingTotal = accounts
    .filter(acc => acc.accountType === 'checking')
    .reduce((sum, acc) => sum + acc.balance, 0);
  const savingsTotal = accounts
    .filter(acc => acc.accountType === 'savings')
    .reduce((sum, acc) => sum + acc.balance, 0);

  if (loading) {
    return <div className="text-center py-8">Loading accounts...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Total Balance Card */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-600 text-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-white font-semibold uppercase tracking-wide mb-2">Total Balance</p>
            <h2 className="text-4xl font-serif font-bold text-white mb-2" style={{ lineHeight: '1.2' }}>
              {formatCurrency(totalBalance)}
            </h2>
            <p className="text-white text-sm">Across all accounts</p>
          </div>
          <Wallet size={56} className="text-white opacity-30" />
        </div>
      </div>

      {/* Individual Accounts */}
      <div className="grid md:grid-cols-2 gap-6">
        {accounts.map((account) => (
          <div key={account.id} className="card hover:shadow-xl transition-all duration-200 border-l-4 border-primary-600">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-serif font-semibold text-primary-800 capitalize">{account.accountType}</h3>
                <p className="text-sm text-neutral-600 mt-1">{account.accountNumber}</p>
              </div>
              <span
                className={`px-3 py-1 rounded text-xs font-semibold uppercase ${
                  account.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-neutral-100 text-neutral-800'
                }`}
              >
                {account.status}
              </span>
            </div>

            <div className="flex items-end justify-between mt-6">
              <div>
                <p className="text-3xl font-bold text-neutral-900">{formatCurrency(account.balance)}</p>
                <p className="text-sm text-neutral-500 mt-1 uppercase">{account.currency}</p>
              </div>
              <button 
                onClick={() => loadAccountDetails(account)}
                className="btn-primary text-sm px-4 py-2"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Account Details Modal */}
      {selectedAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-primary-700 to-primary-600 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-serif font-bold capitalize">{selectedAccount.accountType} Account</h3>
                <p className="text-sm text-neutral-100 mt-1">{selectedAccount.accountNumber}</p>
              </div>
              <button 
                onClick={closeDetails}
                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* Account Info */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                  <p className="text-sm text-neutral-600 mb-1">Current Balance</p>
                  <p className="text-2xl font-bold text-neutral-900">{formatCurrency(selectedAccount.balance)}</p>
                </div>
                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                  <p className="text-sm text-neutral-600 mb-1">Total (All Accounts)</p>
                  <p className="text-2xl font-bold text-primary-700">{formatCurrency(totalBalance)}</p>
                </div>
                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                  <p className="text-sm text-neutral-600 mb-1">Account Status</p>
                  <p className="text-lg font-semibold text-green-700 capitalize">{selectedAccount.status}</p>
                </div>
                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                  <p className="text-sm text-neutral-600 mb-1">Currency</p>
                  <p className="text-lg font-semibold text-neutral-900">{selectedAccount.currency}</p>
                </div>
              </div>

              {/* Recent Transactions */}
              <div>
                <h4 className="text-xl font-serif font-semibold text-primary-800 mb-4">Recent Transactions</h4>
                <div className="space-y-3">
                  {accountTransactions.map((transaction) => (
                    <div 
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-neutral-50 hover:bg-neutral-100 rounded-lg border border-neutral-200 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {transaction.type === 'credit' ? (
                            <ArrowDownLeft className="text-green-700" size={20} />
                          ) : (
                            <ArrowUpRight className="text-red-700" size={20} />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900">{transaction.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar size={14} className="text-neutral-500" />
                            <p className="text-sm text-neutral-600">
                              {new Date(transaction.timestamp).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}
                            </p>
                            <span className="text-neutral-400">•</span>
                            <span className="text-xs text-neutral-500 capitalize">{transaction.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${
                          transaction.type === 'credit' ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {transaction.type === 'credit' ? '+' : ''}{formatCurrency(transaction.amount)}
                        </p>
                        <p className="text-xs text-neutral-500 capitalize">{transaction.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-3">
                <button className="btn-primary flex-1">Download Statement</button>
                <button className="btn-secondary flex-1">Transfer Funds</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
