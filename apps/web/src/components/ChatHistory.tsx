'use client';

import { useState, useEffect } from 'react';
import { Clock, Trash2, Search, MessageSquare } from 'lucide-react';
import { ChatMessage } from '@bank-app/shared';

const STORAGE_KEY = 'bank-app-chat-history';

interface ChatHistoryProps {
  onSelectConversation?: (messages: ChatMessage[]) => void;
  onClose?: () => void;
  onClearAll?: () => void;
}

export default function ChatHistory({ onSelectConversation, onClose, onClearAll }: ChatHistoryProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [groupedMessages, setGroupedMessages] = useState<Record<string, ChatMessage[]>>({});

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const loadedMessages = parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(loadedMessages);
        groupMessagesByDate(loadedMessages);
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
  };

  const groupMessagesByDate = (msgs: ChatMessage[]) => {
    const grouped: Record<string, ChatMessage[]> = {};
    
    msgs.forEach(msg => {
      const date = new Date(msg.timestamp);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let label = '';
      if (date.toDateString() === today.toDateString()) {
        label = 'Today';
      } else if (date.toDateString() === yesterday.toDateString()) {
        label = 'Yesterday';
      } else if (date > new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)) {
        label = 'This Week';
      } else if (date > new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)) {
        label = 'This Month';
      } else {
        label = 'Older';
      }

      if (!grouped[label]) {
        grouped[label] = [];
      }
      grouped[label].push(msg);
    });

    setGroupedMessages(grouped);
  };

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear all chat history? This cannot be undone.')) {
      localStorage.removeItem(STORAGE_KEY);
      setMessages([]);
      setGroupedMessages({});
      // Notify parent component to clear its state too
      if (onClearAll) {
        onClearAll();
      }
    }
  };

  const deleteMessage = (messageId: string) => {
    const updated = messages.filter(msg => msg.id !== messageId);
    setMessages(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    groupMessagesByDate(updated);
  };

  const filteredMessages = messages.filter(msg =>
    msg.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMessagePreview = (msg: ChatMessage) => {
    const preview = msg.content.substring(0, 100);
    return preview.length < msg.content.length ? preview + '...' : preview;
  };

  const exportHistory = () => {
    const dataStr = JSON.stringify(messages, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `chat-history-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const sortOrder = ['Today', 'Yesterday', 'This Week', 'This Month', 'Older'];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-neutral-900">Chat History</h2>
          <div className="flex gap-2">
            <button
              onClick={exportHistory}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              title="Export history"
            >
              Export
            </button>
            <button
              onClick={clearHistory}
              className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
              title="Clear all history"
            >
              <Trash2 size={14} />
              Clear All
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Stats */}
        <div className="mt-3 text-sm text-neutral-600">
          {messages.length} messages · {Math.ceil(messages.length / 2)} conversations
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="mx-auto mb-3 text-neutral-300" size={48} />
            <p className="text-neutral-500">No chat history yet</p>
            <p className="text-sm text-neutral-400 mt-1">Your conversations will appear here</p>
          </div>
        ) : searchTerm ? (
          // Search results
          <div className="space-y-3">
            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                className="p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-medium ${
                        msg.role === 'user' ? 'text-primary-600' : 'text-neutral-600'
                      }`}>
                        {msg.role === 'user' ? 'You' : 'Assistant'}
                      </span>
                      <span className="text-xs text-neutral-400">
                        {new Date(msg.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-700">{getMessagePreview(msg)}</p>
                  </div>
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className="text-neutral-400 hover:text-red-600 transition-colors"
                    title="Delete message"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Grouped by date
          <div className="space-y-6">
            {sortOrder.map((label) => {
              const msgs = groupedMessages[label];
              if (!msgs || msgs.length === 0) return null;

              return (
                <div key={label}>
                  <h3 className="text-sm font-semibold text-neutral-500 mb-3 flex items-center gap-2">
                    <Clock size={14} />
                    {label}
                  </h3>
                  <div className="space-y-2">
                    {msgs.map((msg) => (
                      <div
                        key={msg.id}
                        className="p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs font-medium ${
                                msg.role === 'user' ? 'text-primary-600' : 'text-neutral-600'
                              }`}>
                                {msg.role === 'user' ? 'You' : 'Assistant'}
                              </span>
                              <span className="text-xs text-neutral-400">
                                {new Date(msg.timestamp).toLocaleTimeString([], { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </span>
                            </div>
                            <p className="text-sm text-neutral-700">{getMessagePreview(msg)}</p>
                          </div>
                          <button
                            onClick={() => deleteMessage(msg.id)}
                            className="opacity-0 group-hover:opacity-100 text-neutral-400 hover:text-red-600 transition-all"
                            title="Delete message"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
