import OpenAI from 'openai';
import { ConversationContext, IntentType } from '@bank-app/shared';
import { mockChatCompletion } from './mock-openai';

// Toggle between real OpenAI and mock server
const USE_MOCK_OPENAI = process.env.USE_MOCK_OPENAI === 'true';

export class ConversationEngine {
  private openai: OpenAI | null = null;
  private systemPrompt: string;

  constructor(apiKey: string) {
    // Only initialize OpenAI if not using mock
    if (!USE_MOCK_OPENAI) {
      const cleanApiKey = apiKey.trim().replace(/\n/g, '');
      console.log('🔑 Initializing OpenAI with key length:', cleanApiKey.length);
      this.openai = new OpenAI({ apiKey: cleanApiKey });
    } else {
      console.log('🎭 Using Mock OpenAI Server - No API calls will be made');
      this.openai = null;
    }
    this.systemPrompt = this.buildSystemPrompt();
  }

  private buildSystemPrompt(): string {
    return `You are a helpful banking assistant. Your role is to:
1. Help users with banking operations (check balance, transfers, bill payments)
2. Provide financial insights and spending analysis
3. Answer questions about loan eligibility and banking products
4. Generate data visualizations when appropriate
5. Maintain a friendly, professional, and secure conversation

IMPORTANT RULES:
- Always verify user intent before executing transactions
- Never share sensitive information without proper context
- Suggest visualizations when discussing spending patterns or trends
- Be concise but informative
- Ask clarifying questions when needed

When responding, identify the user's intent and extract relevant entities (amounts, account types, dates, categories, etc.).`;
  }

  async processMessage(
    userMessage: string,
    context: ConversationContext
  ): Promise<{
    response: string;
    intent: IntentType;
    entities: Record<string, any>;
    requiresAction: boolean;
  }> {
    // Use mock response if enabled
    if (USE_MOCK_OPENAI) {
      const mockCompletion = mockChatCompletion(userMessage);
      const responseMessage = mockCompletion.choices[0].message;
      
      console.log('🎭 Mock response message:', JSON.stringify(responseMessage, null, 2));
      
      const intent = this.classifyIntent(userMessage, responseMessage);
      const entities = this.extractEntities(userMessage, responseMessage);
      
      console.log('🎭 Extracted intent:', intent);
      console.log('🎭 Extracted entities:', JSON.stringify(entities, null, 2));
      
      const responseText = responseMessage.content || 
        this.generateResponseFromFunctionCall(responseMessage.function_call, entities);
      
      return {
        response: responseText,
        intent,
        entities,
        requiresAction: !!responseMessage.function_call,
      };
    }

    // Real OpenAI API call
    const messages = this.buildMessageHistory(context, userMessage);

    const completion = await this.openai!.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages,
      functions: this.getFunctionDefinitions(),
      function_call: 'auto',
    });

    const responseMessage = completion.choices[0].message;
    
    console.log('🤖 Real OpenAI response:', JSON.stringify(responseMessage, null, 2));
    
    // Extract intent and entities
    const intent = this.classifyIntent(userMessage, responseMessage);
    const entities = this.extractEntities(userMessage, responseMessage);
    
    console.log('🤖 Extracted intent:', intent);
    console.log('🤖 Extracted entities:', JSON.stringify(entities, null, 2));
    
    // If function call but no content, generate a helpful response
    let responseText = responseMessage.content || '';
    if (!responseText && responseMessage.function_call) {
      responseText = this.generateResponseFromFunctionCall(responseMessage.function_call, entities);
    }
    
    return {
      response: responseText,
      intent,
      entities,
      requiresAction: !!responseMessage.function_call,
    };
  }

  private generateResponseFromFunctionCall(functionCall: any, entities: Record<string, any>): string {
    const functionName = functionCall.name;
    
    switch (functionName) {
      case 'check_account_balance':
        return `I'll check your ${entities.accountType || 'account'} balance for you. Let me retrieve that information...`;
      case 'view_transactions':
        return `I'll show you your recent transactions.`;
      case 'transfer_money':
        return `I can help you transfer $${entities.amount || '0'} from ${entities.fromAccount || 'your account'} to ${entities.toAccount || 'another account'}.`;
      case 'analyze_spending':
        return `Let me analyze your spending patterns for the ${entities.period || 'selected'} period.`;
      case 'check_loan_eligibility':
        return `Let me check your eligibility for a ${entities.loanType || 'loan'}.`;
      default:
        return `I understand you'd like help with that. Let me assist you.`;
    }
  }

  private buildMessageHistory(
    context: ConversationContext,
    newMessage: string
  ): Array<{ role: 'system' | 'user' | 'assistant'; content: string }> {
    const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      { role: 'system', content: this.systemPrompt },
    ];

    // Add recent conversation history (last 10 messages)
    const recentMessages = context.messages.slice(-10);
    for (const msg of recentMessages) {
      if (msg.role !== 'system') {
        messages.push({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        });
      }
    }

    messages.push({ role: 'user', content: newMessage });
    return messages;
  }

  private getFunctionDefinitions() {
    return [
      {
        name: 'check_account_balance',
        description: 'Check the balance of a user account. If no specific account type is mentioned by the user, omit the accountType parameter to show all balances.',
        parameters: {
          type: 'object',
          properties: {
            accountType: {
              type: 'string',
              enum: ['checking', 'savings', 'credit'],
              description: 'Type of account to check. Only include if user specifically mentions checking, savings, or credit account.',
            },
          },
        },
      },
      {
        name: 'view_transactions',
        description: 'View transaction history for an account. IMPORTANT: If user asks for "payments", "last payments", "what I paid", or "bills paid", set paymentsOnly=true to show only outgoing money (debits). For "transactions" or "history", show all transactions.',
        parameters: {
          type: 'object',
          properties: {
            accountType: {
              type: 'string',
              enum: ['checking', 'savings', 'credit'],
              description: 'Type of account to view transactions for.',
            },
            limit: {
              type: 'number',
              description: 'Number to return: 3 for "last" (last 3 items), 5 for "recent" (recent 5 items), 10 for general queries.',
            },
            paymentsOnly: {
              type: 'boolean',
              description: 'MUST be true when user says "payment(s)", "paid", "pay", "bill(s)". False for "transactions" or "history".',
            },
          },
        },
      },
      {
        name: 'transfer_money',
        description: 'Transfer money between accounts',
        parameters: {
          type: 'object',
          properties: {
            fromAccount: { type: 'string' },
            toAccount: { type: 'string' },
            amount: { type: 'number' },
            description: { type: 'string' },
          },
          required: ['fromAccount', 'toAccount', 'amount'],
        },
      },
      {
        name: 'analyze_spending',
        description: 'Analyze spending patterns and categorize expenses for a time period. Use this when user asks to analyze, categorize, or break down spending.',
        parameters: {
          type: 'object',
          properties: {
            period: {
              type: 'string',
              enum: ['week', 'month', 'quarter', 'year'],
            },
            category: { 
              type: 'string',
              description: 'Specific spending category to analyze (e.g., dining, shopping, transportation, utilities)',
            },
          },
          required: ['period'],
        },
      },
      {
        name: 'check_loan_eligibility',
        description: 'Check eligibility for a loan product',
        parameters: {
          type: 'object',
          properties: {
            loanType: {
              type: 'string',
              enum: ['home', 'auto', 'personal', 'business'],
            },
            amount: { type: 'number' },
          },
          required: ['loanType'],
        },
      },
    ];
  }

  private classifyIntent(userMessage: string, aiResponse: any): IntentType {
    if (aiResponse.function_call) {
      const functionName = aiResponse.function_call.name;
      const intentMap: Record<string, IntentType> = {
        check_account_balance: 'check_balance',
        view_transactions: 'view_transactions',
        transfer_money: 'transfer_money',
        analyze_spending: 'spending_analysis',
        check_loan_eligibility: 'loan_eligibility',
      };
      return intentMap[functionName] || 'general_inquiry';
    }

    // Fallback intent classification
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('balance')) return 'check_balance';
    if (lowerMessage.includes('transfer') || lowerMessage.includes('send')) return 'transfer_money';
    if (lowerMessage.includes('transaction') || lowerMessage.includes('history') || lowerMessage.includes('payment')) return 'view_transactions';
    if (lowerMessage.includes('spending') || lowerMessage.includes('expense')) return 'spending_analysis';
    if (lowerMessage.includes('loan') || lowerMessage.includes('eligible')) return 'loan_eligibility';

    return 'general_inquiry';
  }

  private extractEntities(userMessage: string, aiResponse: any): Record<string, any> {
    if (aiResponse.function_call) {
      try {
        return JSON.parse(aiResponse.function_call.arguments);
      } catch {
        return {};
      }
    }

    // Basic entity extraction
    const entities: Record<string, any> = {};
    
    // Extract amounts
    const amountMatch = userMessage.match(/\$?(\d+(?:,\d{3})*(?:\.\d{2})?)/);
    if (amountMatch) {
      entities.amount = parseFloat(amountMatch[1].replace(/,/g, ''));
    }

    // Extract time periods
    const periodMatch = userMessage.match(/\b(week|month|quarter|year|today|yesterday)\b/i);
    if (periodMatch) {
      entities.period = periodMatch[1].toLowerCase();
    }

    return entities;
  }
}

export default ConversationEngine;
