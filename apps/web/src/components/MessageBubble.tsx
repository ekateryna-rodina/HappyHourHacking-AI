'use client';

import { ChatMessage, TableData, VisualizationData } from '@bank-app/shared';
import ChartVisualization from './ChartVisualization';

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

// Simple Table Renderer
function TableRenderer({ table }: { table: TableData }) {
  return (
    <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
      <thead>
        <tr>
          {table.columns.map((col, idx) => (
            <th key={idx} className="border px-2 py-1 bg-gray-200 text-left">{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.rows.map((row, idx) => (
          <tr key={idx} className="even:bg-gray-50">
            {row.map((cell, i) => (
              <td key={i} className="border px-2 py-1">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
