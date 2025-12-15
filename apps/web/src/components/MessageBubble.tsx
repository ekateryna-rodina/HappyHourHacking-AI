'use client';

import { useState, useEffect } from 'react';
import { ChatMessage } from '@bank-app/shared';
import { User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import ChartVisualization from './ChartVisualization';

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const [mounted, setMounted] = useState(false);
  const isUser = message.role === 'user';

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${
          isUser ? 'bg-primary-700' : 'bg-neutral-200'
        }`}
      >
        {isUser ? <User size={18} className="text-white" /> : <Bot size={18} className="text-primary-700" />}
      </div>

      {/* Message Content */}
      <div className={`flex flex-col max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-lg px-5 py-3 shadow-sm ${
            isUser
              ? 'bg-primary-700 text-white'
              : 'bg-neutral-100 text-neutral-900 border border-neutral-200'
          }`}
        >
          <ReactMarkdown className="text-sm prose prose-sm max-w-none">
            {message.content}
          </ReactMarkdown>
        </div>

        {/* Visualization if present */}
        {message.metadata?.visualizationData && (
          <div className="mt-3 w-full">
            <ChartVisualization data={message.metadata.visualizationData} />
          </div>
        )}

        {/* Timestamp */}
        {mounted && (
          <span className="text-xs text-neutral-500 mt-1">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        )}
      </div>
    </div>
  );
}
