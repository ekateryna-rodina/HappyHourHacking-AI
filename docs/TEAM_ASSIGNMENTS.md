# Team Task Assignments - 3-Day Hackathon

**Team:** 3 Backend + 3 Frontend Developers  
**Timeline:** Monday Dec 15 - Thursday Dec 18, 2025  
**Core Features:** Balance Check, Transfer Money, Transaction History, Spending Analysis

**Note:** ✅ All components and API routes already exist! Pick tasks from the lists below based on your skills and interests.

---

## 📅 Day 1 - Monday, Dec 15: Core Features Working

### Feature 1: Account Balance & Summary

**Backend Tasks:**
- [ ] Review existing mock data in `apps/api/src/routes/accounts.ts`
- [ ] Enhance account data to be more realistic for demo:
  - Change to demo user "Sarah" (age 28)
  - Update balances: Checking $3,847.52, Savings $8,000.00
  - Add more account types if needed (credit card, investment)
- [ ] Test GET `/api/accounts` endpoint returns updated data
- [ ] Verify account details endpoint works
- [ ] Ensure proper error handling and response format

**Frontend Tasks:**
- [ ] Review `apps/web/src/components/AccountSummary.tsx`
- [ ] Enhance account card design (icons, colors, spacing)
- [ ] Add account type icons (💳 checking, 💰 savings)
- [ ] Show masked account numbers (****1234)
- [ ] Add total balance calculation
- [ ] Test API integration and add loading states

---

### Feature 2: Transaction History

**Backend Tasks:**
- [ ] Review existing mock transactions in `apps/api/src/routes/transactions.ts`
- [ ] Replace basic mock data with 50-100 realistic transactions:
  - Varied merchants (Starbucks, Whole Foods, Shell, Uber, Netflix, etc.)
  - Multiple categories (dining, groceries, transport, utilities, entertainment)
  - Mix of recent dates (last 30 days)
  - Balance of income (salary, deposits) and expenses
  - Different amounts ($5-$1,200 range)
- [ ] Test query parameters work (accountId, category, dates)
- [ ] Verify transaction filtering logic
- [ ] Add merchant search functionality if needed

**Frontend Tasks:**
- [ ] Create transaction list/table component (or enhance existing)
- [ ] Display: date, merchant, amount, category, account
- [ ] Add color coding: income (green), expense (red)
- [ ] Add category icons (🍔 dining, 🚗 transport)
- [ ] Fetch and display transactions from API
- [ ] Add loading skeleton while fetching

---

### Feature 3: AI Chat Interface

**Backend Tasks:**
- [ ] Review `apps/api/src/routes/conversation.ts`
- [ ] Review `packages/ai-engine/src/conversation-engine.ts`
- [ ] Configure mock OpenAI mode: `USE_MOCK_OPENAI=true`
- [ ] Test chat understands core queries:
  - "What's my balance?"
  - "Show my transactions"
  - "Where did I spend my money?"
- [ ] Improve response formatting (friendly, conversational)

**Frontend Tasks:**
- [ ] Review `apps/web/src/components/ChatInterface.tsx`
- [ ] Review `apps/web/src/components/MessageBubble.tsx`
- [ ] Test chat sends messages to `/api/conversation`
- [ ] Enhance message styling (colors, spacing, typography)
- [ ] Add user vs AI avatars
- [ ] Add typing indicator
- [ ] Add message timestamps
- [ ] Test with all core queries

---

### Feature 4: Spending Insights & Charts

**Backend Tasks:**
- [ ] Review `apps/api/src/routes/insights.ts`
- [ ] Review `packages/ai-engine/src/insight-engine.ts`
- [ ] Calculate spending by category (for pie chart)
- [ ] Calculate spending by time period (for bar chart)
- [ ] Format data for Recharts library
- [ ] Test `/api/insights` endpoint returns chart data

**Frontend Tasks:**
- [ ] Review `apps/web/src/components/ChartVisualization.tsx`
- [ ] Review `apps/web/src/components/InsightsPanel.tsx`
- [ ] Build/enhance pie chart for spending by category
- [ ] Add custom colors and tooltips
- [ ] Fetch data from `/api/insights`
- [ ] Add loading states for charts
- [ ] Test charts render correctly

---

### Feature 5: Money Transfer

**Backend Tasks:**
- [ ] Review existing transfer endpoint in `apps/api/src/routes/transactions.ts`
- [ ] Enhance POST `/api/transactions/transfer` logic:
  - Add validation for sufficient funds
  - Actually update account balances (in mock data)
  - Create TWO transaction records (debit from source, credit to destination)
  - Add better error messages
- [ ] Test transfer flow thoroughly
- [ ] Handle edge cases (same account, negative amounts, invalid accounts)t)
- [ ] Return success/error responses
- [ ] Handle edge cases (same account, negative amounts)

**Frontend Tasks:**
- [ ] Build money transfer form component
- [ ] Add account selection dropdowns (from/to)
- [ ] Add amount input with validation
- [ ] Show confirmation modal before transfer
- [ ] Display success/error messages (toast notifications)
- [ ] Refresh account balances after successful transfer
- [ ] Add transfer to transaction history

---

### Feature 6: Enhanced Transaction Filtering & Search

**Backend Tasks:**
- [ ] Add filtering support to transactions endpoint
  - Filter by category
  - Filter by date range
  - Filter by amount range
- [ ] Add sorting options (date, amount, merchant)
- [ ] Add pagination support (limit, offset)
- [ ] Optimize query performance

**Frontend Tasks:**
- [ ] Add date range picker component
- [ ] Add category filter dropdown
- [ ] Add search input for merchant name
- [ ] Add sort controls (date ↕, amount ↕)
- [ ] Implement pagination or infinite scroll
- [ ] Show active filters visually
- [ ] Add "Clear filters" button

---

### Feature 7: AI Context & Smart Suggestions

**Backend Tasks:**
- [ ] Add conversation context/memory
  - Remember previous queries in session
  - Reference prior context in responses
- [ ] Generate smart follow-up suggestions
  - After balance check: "Want to see transactions?"
  - After spending analysis: "Should I create a budget?"
- [ ] Add quick action buttons to responses
- [ ] Improve intent classification accuracy

**Frontend Tasks:**
- [ ] Display quick action buttons in chat
- [ ] Add sample query suggestions
  - "Try asking: What's my balance?"
- [ ] Show helpful prompts for new users
- [ ] Implement auto-scroll to latest message
- [ ] Add "Enter" key to send message
- [ ] Clear input field after sending

---

### Feature 8: Advanced Insights & Trends

**Backend Tasks:**
- [ ] Add spending trends over time
  - Week-over-week comparison
  - Month-over-month comparison
- [ ] Generate AI-powered insights
  - "You spent 20% more on dining this month"
  - "Your top expense is rent at $1,200"
- [ ] Calculate top merchants by spending
- [ ] Add income vs expenses comparison
- [ ] Return formatted insights for display

**Frontend Tasks:**
- [ ] Build bar chart for time-based spending
- [ ] Build line chart for spending trends
- [ ] Display AI insights in InsightsPanel
  - Show personalized tips
  - Highlight key metrics
- [ ] Make charts interactive (hover tooltips)
- [ ] Add chart legend and labels

---

## 📅 Day 3 - Wednesday, Dec 17: Polish & Demo Prep

### Polish Task: UI/UX Improvements

**Backend Tasks:**
- [ ] Add detailed error messages for all endpoints
- [ ] Add request validation middleware
- [ ] Add API logging for debugging
- [ ] Performance optimization
- [ ] Test all edge cases
- [ ] Fix bugs from integration testing

**Frontend Tasks:**
- [ ] Add smooth animations (fade in, slide in)
- [ ] Polish all component styling
- [ ] Add hover effects and transitions
- [ ] Mobile responsive improvements
- [ ] Accessibility improvements (ARIA labels, keyboard nav)
- [ ] Add error boundary components
- [ ] Improve loading states everywhere

---

### Polish Task: Data & Demo Preparation

**Backend Tasks:**
- [ ] Create realistic demo user data
  - User: "Sarah", age 28, saving for home
  - Accounts: Checking $3,847, Savings $8,000
  - Recent transactions: mix of income/expenses
- [ ] Add demo-specific insights
  - Savings goal: $10,000 (80% complete)
  - Top category: Dining $450/month
- [ ] Prepare exact demo queries that work perfectly
- [ ] Test entire demo flow multiple times

**Frontend Tasks:**
- [ ] Polish demo user profile display
- [ ] Ensure smooth transitions between views
- [ ] Test all features work on demo laptop
- [ ] Fix any visual bugs or glitches
- [ ] Add finishing touches (icons, emojis, spacing)
- [ ] Test on different browsers

---

### Rehearsal Task: Demo Day Preparation

**Everyone:**
- [ ] **3:00 PM:** First rehearsal (rough run-through)
  - Test all features work
  - Note any bugs or issues
- [ ] **3:30 PM:** Fix critical bugs found in rehearsal
- [ ] **5:00 PM:** Second rehearsal (smoother)
  - Time each section
  - Practice transitions
- [ ] **5:30 PM:** Dinner break
- [ ] **7:00 PM:** Third rehearsal (polished)
  - Final timing check
  - Polish any rough spots
- [ ] **8:00 PM:** Final equipment test
  - Load demo data
  - Clear browser cache
  - Test on presentation laptop
  - Record backup video
- [ ] **9:00 PM:** Go home and rest! 😴

---

## 🎬 Day 4 - Thursday, Dec 18: DEMO DAY! 🎉

### Pre-Demo Checklist (30 min before)
- [ ] All team members present
- [ ] Demo environment tested
- [ ] Servers running (localhost:3000 and :3001)
- [ ] Demo data loaded (Sarah's account)
- [ ] Backup video ready
- [ ] Presentation slides ready (if any)
- [ ] Team confident and energized!

### Demo Flow (6 minutes)
1. **Intro** (30s): Meet Sarah, our user
2. **Balance Check** (1min): "What's my balance?" via chat
3. **Transactions** (1min): "Show my transactions this month"
4. **Spending Charts** (1.5min): "Where did my money go?" → Visualizations
5. **Transfer** (1.5min): "Transfer $500 to savings" → Confirmation
6. **AI Insights** (30s): Show personalized tips
7. **Close** (30s): "Banking should be conversational"

---

## 📋 Task Selection Guide

### Pick tasks based on your strengths:

**Love APIs & Data?**
→ Backend tasks: accounts, transactions, insights

**Love AI & NLP?**
→ Backend tasks: conversation engine, intent classification

**Love UI Design?**
→ Frontend tasks: styling, animations, polish

**Love Charts & Data Viz?**
→ Frontend/Backend: insights, charts, visualizations

**Love Forms & Validation?**
→ Frontend/Backend: transfer feature, filters

**Good at Everything?**
→ Help others, fix bugs, integrate features

---

## 💡 Tips for Success

### Communication:
- **Check off tasks** in this doc when complete
- **Daily standup** at 9am (15 min)
- **Integration sync** at 1pm (quick check)
- **Evening demo** at 6pm (show progress)

### Working Together:
- **Backend done?** Help frontend integrate
- **Frontend blocked?** Use mock data temporarily
- **Found a bug?** Fix it or report it immediately
- **Stuck for 30min?** Ask for help!

### Quality:
- **Test everything** before marking complete
- **Mobile responsive** matters for demo
- **Error handling** prevents demo disasters
- **Polish** makes the difference between good and great

---

## 🚀 Quick Reference

### Running the App:
```bash
# Start everything
npm run dev

# Just frontend
npm run dev -- --filter=web

# Just backend
npm run dev -- --filter=api
```

### Testing:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- API Docs: Check `apps/api/src/routes/` files

### Demo Queries:
- "What's my checking account balance?"
- "Show me transactions from last week"
- "Where did I spend my money this month?"
- "Transfer $500 from checking to savings"
- "What's my biggest expense category?"

---

**Let's build something amazing! Pick your tasks and let's go! 🚀**

### Backend Developer 1: **Account & Transaction APIs** (`routes/accounts.ts` & `routes/transactions.ts`)

#### Day 1 (Monday, Dec 15)
- [ ] Review existing code in `apps/api/src/routes/accounts.ts` and `transactions.ts`
- [ ] Enhance mock data with realistic demo data
  - Add 5+ accounts per user (checking, savings, credit card)
  - Add 50-100 realistic transactions with varied merchants
  - Include transaction categories (groceries, dining, transport, etc.)
- [ ] Test all existing endpoints work:
  - GET `/api/accounts`
  - GET `/api/transactions`
- [ ] Add query parameter support to transactions endpoint
  - Filter by: accountId, startDate, endDate, category
- [ ] Add transaction search by merchant name

**Deliverable:** Enhanced APIs with rich demo data

---

#### Day 2 (Tuesday, Dec 16)
- [ ] Implement money transfer POST endpoint
  - Validate sufficient funds
  - Update both account balances
  - Create transfer transaction records
  - Return success/error responses
- [ ] Add transaction pagination
- [ ] Add sorting options (by date, amount)
- [ ] Improve error handling with helpful messages
- [ ] Add request validation middleware

**Deliverable:** Robust transaction APIs with transfers working

---

#### Day 3 (Wednesday, Dec 17)
- [ ] Bug fixes from frontend integration
- [ ] Performance optimization
- [ ] Add detailed API logging
- [ ] Test all edge cases
- [ ] Prepare demo scenario data
- [ ] Help with rehearsal

---

### Backend Developer 2: **AI Conversation Engine** (`routes/conversation.ts` & `packages/ai-engine`)

#### Day 1 (Monday, Dec 15)
- [ ] Review existing conversation engine in `packages/ai-engine/src/conversation-engine.ts`
- [ ] Enhance intent classification for core features:
  - GET_BALANCE: "What's my balance?", "How much do I have?"
  - TRANSFER_MONEY: "Transfer $X to Y", "Send money to savings"
  - GET_TRANSACTIONS: "Show transactions", "What did I spend?"
  - GET_SPENDING: "Where did my money go?", "Spending breakdown"
- [ ] Test existing `/api/conversation` endpoint
- [ ] Configure mock OpenAI mode (`USE_MOCK_OPENAI=true`)
- [ ] Improve response formatting for better UX

**Deliverable:** Chat understands all 4 core queries

---

#### Day 2 (Tuesday, Dec 16)
- [ ] Add context awareness to conversations
  - Remember what was asked previously
  - Provide smart follow-up suggestions
- [ ] Improve natural language responses
  - Friendly, conversational tone
  - Include relevant emojis
  - Format numbers as currency
- [ ] Add quick action buttons in responses
  - "View Transactions", "Transfer Money", etc.
- [ ] Test with various phrasings of same queries

**Deliverable:** Natural, helpful AI conversations

---

#### Day 3 (Wednesday, Dec 17)
- [ ] Polish AI responses for demo
- [ ] Add error handling for unclear queries
- [ ] Create demo script with exact queries
- [ ] Bug fixes from testing
- [ ] Rehearse demo flow

---

### Backend Developer 3: **Insights & Analytics** (`routes/insights.ts` & `packages/ai-engine/insight-engine.ts`)

#### Day 1 (Monday, Dec 15)
- [ ] Review existing code in `apps/api/src/routes/insights.ts`
- [ ] Review `packages/ai-engine/src/insight-engine.ts`
- [ ] Enhance spending analysis calculations
  - Spending by category (pie chart data)
  - Spending by time period (bar chart data)
  - Top merchants
  - Income vs expenses
- [ ] Test existing `/api/insights` endpoint
- [ ] Format data for frontend charts (Recharts compatible)

**Deliverable:** Rich spending analytics working

---

#### Day 2 (Tuesday, Dec 16)
- [ ] Add spending trends over time
  - Weekly/monthly comparisons
#### Day 3 (Wednesday, Dec 17)
- [ ] Add more insight types (savings goals, predictions)
- [ ] Polish insight messages
- [ ] Test with demo data
- [ ] Bug fixes and optimization
- [ ] Help prepare demo

---

## 🎨 Frontend Team (3 People)

### Frontend Developer 1: **Chat Interface** (`components/ChatInterface.tsx`, `MessageBubble.tsx`)

#### Day 1 (Monday, Dec 15)
- [ ] Review existing `ChatInterface.tsx` and `MessageBubble.tsx` components
- [ ] Test chat functionality with backend
  - Send messages to `/api/conversation`
  - Display responses
- [ ] Enhance message display
  - Add message timestamps
  - Improve styling (colors, spacing, typography)
  - Add user avatar vs AI avatar
- [ ] Add typing indicator while waiting for response
- [ ] Add loading skeleton for messages
- [ ] Test with all 4 core queries

**Deliverable:** Polished chat experience
- [ ] Build chat interface component
  - Message input field
  - Send button
  - Message history display
- [ ] Implement message bubbles
  - User messages (right-aligned)
  - AI responses (left-aligned)
  - Timestamp display
- [ ] Connect chat to backend API
  - POST to `/api/chat`
  - Display responses

**Deliverable:** Working chat interface that communicates with backend

---

#### Day 2 (Tuesday, Dec 16)
- [ ] Add message types support
  - Text messages
  - Chart/visualization messages
  - Action buttons (Quick replies)
#### Day 2 (Tuesday, Dec 16)
- [ ] Add quick action buttons in chat
  - "View Transactions", "Transfer Money", "See Spending"
- [ ] Implement message variations
  - Support chart messages
  - Support action button messages
  - Support formatted lists
- [ ] Add sample query suggestions
  - Show helpful prompts: "Try: What's my balance?"
- [ ] Improve UX
  - Auto-scroll to latest message
  - Enter key to send
  - Clear input after send
  - Disable send while loading

**Deliverable:** Rich interactive chat

---

#### Day 3 (Wednesday, Dec 17)
- [ ] Add smooth animations (fade in messages)
- [ ] Mobile responsive polish
- [ ] Accessibility (keyboard nav, ARIA labels)
- [ ] Error handling UI (retry button)
- [ ] Final polish and testing

---

### Frontend Developer 2: **Accounts & Transactions** (`components/AccountSummary.tsx`)

#### Day 1 (Monday, Dec 15)
- [ ] Review existing `AccountSummary.tsx` component
- [ ] Enhance account cards design
  - Add account type icons (💳 checking, 💰 savings, etc.)
  - Show account numbers (masked: ****1234)
  - Color coding by account type
  - Improve card layout and spacing
- [ ] Add total balance calculation across all accounts
- [ ] Test API integration with `/api/accounts`
- [ ] Add loading states and error handling
- [ ] Make cards clickable to view details

**Deliverable:** Beautiful account overview
  - Date range picker
  - Category filter dropdown
  - Amount range slider
- [ ] Implement search functionality
#### Day 2 (Tuesday, Dec 16)
- [ ] Build transaction history table/list
  - Show: date, merchant, amount, category, account
  - Color coding: income (green), expense (red)
  - Category icons (🍔 dining, 🚗 transport, etc.)
- [ ] Add transaction filters
  - Date range picker
  - Category dropdown
  - Account filter
- [ ] Add search by merchant name
- [ ] Implement sorting (by date, amount)
- [ ] Add pagination or infinite scroll

**Deliverable:** Full transaction browsing

---

#### Day 3 (Wednesday, Dec 17)
- [ ] Add transaction details modal
- [ ] Polish table design (hover effects, spacing)
- [ ] Mobile responsive improvements
- [ ] Add export to CSV button
- [ ] Bug fixes and testing

---

### Frontend Developer 3: **Charts & Insights** (`components/ChartVisualization.tsx`, `InsightsPanel.tsx`)

#### Day 1 (Monday, Dec 15)
- [ ] Review existing `ChartVisualization.tsx` component
- [ ] Review existing `InsightsPanel.tsx` component
- [ ] Test integration with `/api/insights` endpoint
- [ ] Enhance spending pie chart
  - Show spending by category
  - Custom colors for each category
  - Tooltips with percentages
  - Legend with category names
- [ ] Build bar chart for time-based spending
  - Weekly or monthly view
  - Compare multiple periods
- [ ] Add chart loading states

**Deliverable:** Beautiful spending visualizations
  - Bar chart: Spending by time period
#### Day 2 (Tuesday, Dec 16)
- [ ] Add money transfer UI
  - Form: From account, To account, Amount
  - Account dropdown selection
  - Amount input with validation
- [ ] Implement transfer flow
  - Confirmation modal before transfer
  - Success/error toast messages
  - Update balances after transfer
- [ ] Add line chart for spending trends
  - Show spending over time
  - Trend line visualization
- [ ] Display AI insights in InsightsPanel
  - Show personalized tips
  - Highlight key metrics
- [ ] Make charts interactive (hover tooltips)

**Deliverable:** Transfer feature + rich insights

---

#### Day 3 (Wednesday, Dec 17)
- [ ] Polish chart styling and colors
- [ ] Add chart animations on load
- [ ] Make charts responsive for mobile
- [ ] Integrate charts into chat messages
- [ ] Add more visualizations if time permits
- [ ] Bug fixes and final polishon Points

### Backend ↔ Frontend Communication

**APIs to implement:**

```typescript
// Accounts
GET  /api/accounts              → List all accounts
GET  /api/accounts/:id          → Get account details
GET  /api/accounts/:id/balance  → Get account balance

// Transactions
GET  /api/transactions          → List transactions (with filters)
GET  /api/transactions/:id      → Get transaction details
POST /api/transactions/transfer → Transfer money

// Chat & Insights
POST /api/chat                  → Send chat message
GET  /api/insights/spending     → Get spending analysis
```

**Daily Integration Syncs:**
- 1:00 PM - Quick integration check
- 6:00 PM - Demo together, fix integration bugs

---

## 📋 Daily Team Sync (9am, 15min)

### Monday Morning Kickoff:
- Backend: Review API structure together
- Frontend: Review component hierarchy
- Agree on API contracts (request/response formats)
- Set up shared Postman/API documentation

### Daily Standup Questions:
1. What did I complete?
2. What am I working on today?
3. Any blockers or API changes needed?

---

## 🎯 Success Metrics

### By End of Day 1:
- [ ] Backend: All 4 core APIs working
- [ ] Frontend: Can call all 4 core features via UI
- [ ] Integration: Chat can check balance and show transactions

### By End of Day 2:
- [ ] Backend: Spending analysis + AI insights working
- [ ] Frontend: Charts displaying, transfers working smoothly
- [ ] Integration: Full demo flow works end-to-end

### By End of Day 3:
- [ ] All features polished and bug-free
- [ ] Demo rehearsed 3 times
- [ ] Backup video recorded

---

## 🚨 Important Notes

### For Backend Team:
- **Use mock data** - Don't worry about real database
- **Mock OpenAI** - Set `USE_MOCK_OPENAI=true` to avoid API costs
- **Consistent API format**:
  ```json
  {
    "success": true,
    "data": { ... },
    "message": "Operation successful"
  }
  ```
- **CORS enabled** for `http://localhost:3000`
- **Document your APIs** - Frontend needs to know request/response format

### For Frontend Team:
- **Mock data first** - Don't wait for backend, use mock responses
- **Error handling** - Always handle API failures gracefully
- **Loading states** - Show spinners while fetching data
- **TypeScript types** - Use types from `packages/shared/src/types.ts`
- **Consistent styling** - Use Tailwind classes, follow existing patterns

### Communication:
- **API changes?** Notify in team chat immediately
- **Stuck?** Ask for help after 30 minutes
- **Integration issues?** Pair program to debug together

---

## 🎬 Demo Day (Thursday Dec 18)

### Demo Flow (6 minutes):
1. **Intro** (30s): "Meet Sarah, she's managing her finances..."
2. **Chat Balance Check** (1min): "What's my balance?"
3. **Show Transactions** (1min): "Show my transactions this month"
4. **Spending Analysis** (1.5min): "Where did my money go?" → Charts appear
5. **Transfer Money** (1.5min): "Transfer $500 to savings" → Confirmation → Success
6. **AI Insights** (30s): Show personalized spending tips
7. **Close** (30s): "Banking should be conversational"

### Team Speaking Roles:
- **Backend Lead:** Explain AI architecture
- **Frontend Lead:** Show UI/UX features
- **Full Team:** Q&A support

---

## ✅ Quick Reference

### Backend Ports:
- API Server: `http://localhost:3001`

### Frontend Ports:
- Web App: `http://localhost:3000`

### Environment Setup:
```bash
# Backend: apps/api/.env
USE_MOCK_OPENAI=true
PORT=3001
CORS_ORIGIN=http://localhost:3000

# Start backend
npm run dev -- --filter=api

# Start frontend  
npm run dev -- --filter=web
```

### Test Queries for Demo:
- "What's my checking account balance?"
- "Show me all transactions from last week"
- "Where did I spend my money this month?"
- "Transfer $200 from checking to savings"
- "What's my biggest expense category?"

---

**Let's build something amazing! 🚀**

*Remember: Done > Perfect. Focus on the demo!*
