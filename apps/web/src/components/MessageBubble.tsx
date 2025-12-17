'use client';

import { useState } from 'react';
import { ChatMessage, TableData, VisualizationData } from '@bank-app/shared';
import ChartVisualization from './ChartVisualization';
import { AlertTriangle, X, ShieldAlert, Flag } from 'lucide-react';

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`p-4 rounded-lg max-w-[70%] ${isUser ? 'bg-blue-100' : 'bg-gray-100'}`}>
        {/* Text content */}
        {message.content && (
          <p className="whitespace-pre-wrap">{message.content}</p>
        )}

        {/* Chart content */}
        {message.metadata?.visualizationData && (
          <div className="mt-4">
            <ChartVisualization data={message.metadata.visualizationData} />
          </div>
        )}

        {/* Table content */}
        {message.metadata?.tableData && (
          <div className="mt-4 overflow-x-auto">
            <TableRenderer table={message.metadata.tableData} />
          </div>
        )}
      </div>
    </div>
  );
}

// Simple Table Renderer with Dispute Option
function TableRenderer({ table }: { table: TableData }) {
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [disputeReason, setDisputeReason] = useState('');
  const [disputeDescription, setDisputeDescription] = useState('');
  const [disputedTransactions, setDisputedTransactions] = useState<Set<number>>(new Set());

  const handleDisputeClick = (rowIndex: number) => {
    const transactionId = table.rows[rowIndex][0]; // Assuming first column is transaction ID or date
    setSelectedTransaction(transactionId);
    setShowDisputeModal(true);
  };

  const handleSubmitDispute = () => {
    if (!selectedTransaction || !disputeReason) {
      alert('Please select a reason for dispute');
      return;
    }

    // Find the row index for this transaction
    const rowIndex = table.rows.findIndex(row => row[0] === selectedTransaction);
    if (rowIndex !== -1) {
      setDisputedTransactions(prev => new Set(prev).add(rowIndex));
    }

    alert('Dispute marked successfully! Our team will review it within 2-3 business days.');
    setShowDisputeModal(false);
    setDisputeReason('');
    setDisputeDescription('');
    setSelectedTransaction(null);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr>
              <th className="border px-3 py-2 bg-gray-200 text-center font-semibold whitespace-nowrap w-20">
                <ShieldAlert size={16} className="inline" />
              </th>
              {table.columns.map((col, idx) => (
                <th key={idx} className="border px-3 py-2 bg-gray-200 text-left font-semibold whitespace-nowrap">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIdx) => {
              const isDisputed = disputedTransactions.has(rowIdx);
              return (
                <tr key={rowIdx} className={`${isDisputed ? 'bg-red-50 border-l-4 border-l-red-500' : 'even:bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                  <td className="border px-3 py-2 text-center">
                    {isDisputed ? (
                      <span className="inline-flex items-center justify-center" title="Transaction Disputed">
                        <Flag size={18} className="text-red-600 fill-red-600" />
                      </span>
                    ) : (
                      <button
                        onClick={() => handleDisputeClick(rowIdx)}
                        className="text-orange-600 hover:text-orange-800 inline-flex items-center justify-center"
                        title="Click to dispute this transaction"
                      >
                        <AlertTriangle size={18} />
                      </button>
                    )}
                  </td>
                  {row.map((cell, cellIdx) => (
                    <td key={cellIdx} className="border px-3 py-2 whitespace-nowrap">{cell}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Dispute Modal */}
      {showDisputeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Dispute Transaction</h3>
              <button
                onClick={() => setShowDisputeModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Transaction: <span className="font-semibold">{selectedTransaction}</span>
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Dispute *
              </label>
              <select
                value={disputeReason}
                onChange={(e) => setDisputeReason(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a reason...</option>
                <option value="unauthorized">Unauthorized Transaction</option>
                <option value="duplicate">Duplicate Charge</option>
                <option value="incorrect_amount">Incorrect Amount</option>
                <option value="not_received">Product/Service Not Received</option>
                <option value="defective">Defective Product/Service</option>
                <option value="cancelled">Transaction Was Cancelled</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Details (Optional)
              </label>
              <textarea
                value={disputeDescription}
                onChange={(e) => setDisputeDescription(e.target.value)}
                placeholder="Provide any additional information about this dispute..."
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDisputeModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitDispute}
                disabled={!disputeReason}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Dispute
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
