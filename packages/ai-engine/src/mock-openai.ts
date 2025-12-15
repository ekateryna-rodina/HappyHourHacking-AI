/**
 * Mock OpenAI Server
 * Easy-to-configure mock responses for testing without OpenAI API access
 */

export interface MockResponse {
  intent: string;
  entities?: Record<string, any>;
  response?: string;
}

/**
 * Request/Response Map
 * Add more patterns here to customize mock responses
 */
export const MOCK_RESPONSES: Record<string, MockResponse> = {
  // Balance checking
  'balance': {
    intent: 'check_balance',
    entities: {},
    response: "I'll check your account balances for you."
  },
  'checking balance': {
    intent: 'check_balance',
    entities: { accountType: 'checking' },
    response: "I'll check your checking account balance."
  },
  'savings balance': {
    intent: 'check_balance',
    entities: { accountType: 'savings' },
    response: "I'll check your savings account balance."
  },
  'credit balance': {
    intent: 'check_balance',
    entities: { accountType: 'credit' },
    response: "I'll check your credit card balance."
  },

  // Transaction history
  'transactions': {
    intent: 'view_transactions',
    entities: { limit: 10 },
    response: "I'll show you your recent transactions."
  },
  'recent transactions': {
    intent: 'view_transactions',
    entities: { limit: 10 },
    response: "Here are your recent transactions."
  },
  'last payments': {
    intent: 'view_transactions',
    entities: { limit: 5 },
    response: "I'll show you your last payments."
  },
  'payment history': {
    intent: 'view_transactions',
    entities: { limit: 10 },
    response: "I'll show you your payment history."
  },

  // Spending analysis
  'spending': {
    intent: 'spending_analysis',
    entities: { period: 'month' },
    response: "Let me analyze your spending patterns for this month."
  },
  'spending this month': {
    intent: 'spending_analysis',
    entities: { period: 'month' },
    response: "I'll analyze your spending for this month."
  },
  'analyze spending': {
    intent: 'spending_analysis',
    entities: { period: 'month' },
    response: "Let me analyze your spending patterns."
  },
  'spending on dining': {
    intent: 'spending_analysis',
    entities: { period: 'month', category: 'dining' },
    response: "Let me analyze your dining spending for this month."
  },

  // Transfers
  'transfer': {
    intent: 'transfer_money',
    entities: { amount: 500, fromAccount: 'checking', toAccount: 'savings' },
    response: "I can help you transfer money between accounts."
  },
  'transfer 500 to savings': {
    intent: 'transfer_money',
    entities: { amount: 500, fromAccount: 'checking', toAccount: 'savings' },
    response: "I'll transfer $500 from checking to savings."
  },
  'transfer 1000 to checking': {
    intent: 'transfer_money',
    entities: { amount: 1000, fromAccount: 'savings', toAccount: 'checking' },
    response: "I'll transfer $1000 from savings to checking."
  },

  // Loan eligibility
  'loan': {
    intent: 'loan_eligibility',
    entities: { loanType: 'personal' },
    response: "Let me check your loan eligibility."
  },
  'home loan': {
    intent: 'loan_eligibility',
    entities: { loanType: 'home' },
    response: "I'll check your eligibility for a home loan."
  },
  'car loan': {
    intent: 'loan_eligibility',
    entities: { loanType: 'auto' },
    response: "I'll check your eligibility for a car loan."
  },
  'eligible for': {
    intent: 'loan_eligibility',
    entities: { loanType: 'home' },
    response: "Let me check your eligibility."
  },

  // General greeting
  'hello': {
    intent: 'general',
    entities: {},
    response: "Hello! I'm your AI banking assistant. How can I help you today?"
  },
  'hi': {
    intent: 'general',
    entities: {},
    response: "Hi! What can I help you with?"
  },
  'help': {
    intent: 'general',
    entities: {},
    response: "I can help you check balances, analyze spending, transfer money, and check loan eligibility. What would you like to do?"
  },
};

/**
 * Find the best matching mock response for a user message
 */
export function findMockResponse(message: string): MockResponse {
  const normalizedMessage = message.toLowerCase().trim();

  // Check for specific account type mentions
  const accountTypeMatch = normalizedMessage.match(/\b(checking|savings|credit)\b/);
  
  // Check for spending categories
  const categoryMatch = normalizedMessage.match(/\b(dining|shopping|transportation|utilities|groceries|entertainment|healthcare|travel)\b/);
  
  // Spending analysis with category
  if ((normalizedMessage.includes('spend') || normalizedMessage.includes('spending')) && categoryMatch) {
    const period = normalizedMessage.match(/\b(week|month|quarter|year)\b/)?.[1] || 'month';
    return {
      intent: 'spending_analysis',
      entities: { period, category: categoryMatch[1] },
      response: `Let me analyze your ${categoryMatch[1]} spending for the ${period} period.`
    };
  }
  
  // General spending analysis
  if (normalizedMessage.includes('spend') || normalizedMessage.includes('spending')) {
    const period = normalizedMessage.match(/\b(week|month|quarter|year)\b/)?.[1] || 'month';
    return {
      intent: 'spending_analysis',
      entities: { period },
      response: `Let me analyze your spending patterns for the ${period} period.`
    };
  }
  
  // Payment-specific queries (only outgoing transactions)
  if (normalizedMessage.match(/\b(payment|paid|pay)\b/) && 
      !normalizedMessage.includes('analyze') && 
      !normalizedMessage.includes('spending')) {
    const limit = normalizedMessage.includes('last') ? 3 : 5;
    return {
      intent: 'view_transactions',
      entities: { accountType: accountTypeMatch?.[1], limit, paymentsOnly: true },
      response: accountTypeMatch 
        ? `I'll show you recent payments from your ${accountTypeMatch[1]} account.`
        : "I'll show you your recent payments."
    };
  }
  
  // Transaction history queries (all transactions)
  if (normalizedMessage.match(/\b(transaction|history|recent)\b/) && 
      !normalizedMessage.includes('analyze') && 
      !normalizedMessage.includes('spending')) {
    return {
      intent: 'view_transactions',
      entities: { accountType: accountTypeMatch?.[1], limit: 10 },
      response: accountTypeMatch 
        ? `I'll show you recent transactions for your ${accountTypeMatch[1]} account.`
        : "I'll show you your recent transactions."
    };
  }
  
  // Balance queries with specific account type
  if (normalizedMessage.includes('balance') && accountTypeMatch) {
    return {
      intent: 'check_balance',
      entities: { accountType: accountTypeMatch[1] },
      response: `I'll check your ${accountTypeMatch[1]} account balance.`
    };
  }

  // Try exact match first
  if (MOCK_RESPONSES[normalizedMessage]) {
    return MOCK_RESPONSES[normalizedMessage];
  }

  // Try partial matches
  for (const [pattern, response] of Object.entries(MOCK_RESPONSES)) {
    if (normalizedMessage.includes(pattern)) {
      return response;
    }
  }

  // Default response
  return {
    intent: 'general',
    entities: {},
    response: "I understand you need help. Could you please rephrase your question?"
  };
}

/**
 * Mock OpenAI Chat Completion
 */
export function mockChatCompletion(userMessage: string): any {
  const mockResponse = findMockResponse(userMessage);

  return {
    id: `mock-${Date.now()}`,
    object: 'chat.completion',
    created: Math.floor(Date.now() / 1000),
    model: 'mock-gpt-4',
    choices: [
      {
        index: 0,
        message: {
          role: 'assistant',
          content: mockResponse.response || '',
          function_call: mockResponse.intent !== 'general' ? {
            name: getMockFunctionName(mockResponse.intent),
            arguments: JSON.stringify(mockResponse.entities || {})
          } : undefined
        },
        finish_reason: 'stop'
      }
    ],
    usage: {
      prompt_tokens: 50,
      completion_tokens: 20,
      total_tokens: 70
    }
  };
}

/**
 * Map intent to function name
 */
function getMockFunctionName(intent: string): string {
  const intentToFunction: Record<string, string> = {
    'check_balance': 'check_account_balance',
    'view_transactions': 'view_transactions',
    'spending_analysis': 'analyze_spending',
    'transfer_money': 'transfer_money',
    'loan_eligibility': 'check_loan_eligibility',
  };

  return intentToFunction[intent] || 'general_query';
}

/**
 * Add custom mock response at runtime
 */
export function addMockResponse(pattern: string, response: MockResponse): void {
  MOCK_RESPONSES[pattern.toLowerCase()] = response;
}
