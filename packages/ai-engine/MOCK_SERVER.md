# Mock OpenAI Server

A simple mock implementation for testing the banking AI assistant without requiring OpenAI API access.

## Quick Start

### Enable Mock Mode

In `apps/api/.env`:
```env
USE_MOCK_OPENAI=true
```

### Disable Mock Mode (Use Real OpenAI)

```env
USE_MOCK_OPENAI=false
OPENAI_API_KEY=your-actual-api-key
```

## How It Works

The mock server uses pattern matching to identify user intent and return pre-configured responses. No external API calls are made.

## Adding Custom Responses

Edit `packages/ai-engine/src/mock-openai.ts` and add to the `MOCK_RESPONSES` map:

```typescript
export const MOCK_RESPONSES: Record<string, MockResponse> = {
  // Your custom pattern
  'my custom query': {
    intent: 'check_balance',  // Intent type
    entities: { accountType: 'checking' },  // Extracted entities
    response: 'Custom response here'  // AI response
  },
  
  // Add more patterns...
};
```

## Available Intents

- `check_balance` - Check account balances
- `spending_analysis` - Analyze spending patterns
- `transfer_money` - Transfer between accounts
- `loan_eligibility` - Check loan eligibility
- `general` - General conversation

## Pattern Matching

The mock server tries:
1. **Exact match** - Looks for exact phrase
2. **Partial match** - Checks if message contains the pattern
3. **Default response** - Falls back if no match found

### Examples

```typescript
// Exact match
'balance' → matches "balance"

// Partial match
'what is my checking balance' → matches "checking balance"

// Case insensitive
'BALANCE' → matches "balance"
```

## Pre-configured Patterns

### Balance Queries
- `balance` - All accounts
- `checking balance` - Checking only
- `savings balance` - Savings only
- `credit balance` - Credit only

### Spending Analysis
- `spending` - Monthly spending
- `spending this month`
- `analyze spending`

### Transfers
- `transfer` - General transfer
- `transfer 500 to savings`
- `transfer 1000 to checking`

### Loan Eligibility
- `loan` - General loan
- `home loan`
- `car loan`
- `eligible for`

### General
- `hello`, `hi` - Greetings
- `help` - Show capabilities

## Adding Responses at Runtime

You can also add responses programmatically:

```typescript
import { addMockResponse } from '@bank-app/ai-engine/mock-openai';

addMockResponse('pay my bills', {
  intent: 'bill_payment',
  entities: { category: 'utilities' },
  response: 'I can help you pay your bills.'
});
```

## Testing

With mock mode enabled:

1. Start the server: `npm run dev`
2. Ask questions in the chat
3. Check console for: `🎭 Using Mock OpenAI Server`

## Switching Back to Real OpenAI

1. Set `USE_MOCK_OPENAI=false` in `.env`
2. Ensure `OPENAI_API_KEY` is set
3. Restart the server

The AI will now use real OpenAI API calls.

## Benefits

✅ **No API costs** - Test without spending money  
✅ **Works offline** - No internet required  
✅ **Corporate networks** - Bypass firewall restrictions  
✅ **Fast responses** - Instant, no API latency  
✅ **Predictable** - Same input = same output  
✅ **Easy to extend** - Just add to the map  

## Limitations

⚠️ **Static responses** - Can't handle complex variations  
⚠️ **No learning** - Doesn't adapt to context  
⚠️ **Limited patterns** - Only responds to configured phrases  
⚠️ **Simple matching** - Basic string matching only  

For production, use real OpenAI for better natural language understanding.
