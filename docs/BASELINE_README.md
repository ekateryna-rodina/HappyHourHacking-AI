# Bank App - UI Baseline

This is a UI-only baseline version of the Bank App project. The user interface is fully implemented, but the business logic has been removed. This serves as a starting point for your team to implement the backend functionality.

## What's Included ✅

### Frontend (apps/web)
- ✅ **Full UI Components** - All React components are implemented and styled
  - `ChatInterface` - Main chat UI with message history
  - `MessageBubble` - Individual message display
  - `ChatHistory` - Sidebar with search, grouping, export
  - `AccountSummary` - Account cards and details modal
  - `ChartVisualization` - Recharts integration for data visualization
  - `MessageBubble` - Markdown rendering for rich responses

- ✅ **Layouts & Pages** 
  - Dashboard page with accounts overview
  - Chat page with conversation interface
  - Responsive design (mobile & desktop)
  - Tailwind CSS styling

- ✅ **State Management**
  - LocalStorage persistence for chat history
  - React hooks for component state
  - Hydration-safe implementation

### Backend (apps/api)
- ✅ **API Structure** - Express routes are set up
  - `/api/conversation/message` - Chat message endpoint (placeholder)
  - `/api/accounts` - Get user accounts (mock data)
  - `/api/accounts/:id` - Get account details (mock data)
  - `/api/auth/login` - Authentication endpoint (mock)
  - `/api/auth/register` - Registration endpoint (mock)

- ✅ **Server Setup**
  - Express server with CORS
  - Error handling middleware
  - TypeScript configuration
  - Hot reload with tsx

### Shared (packages/shared)
- ✅ **Type Definitions** - Complete TypeScript types
  - `ChatMessage` - Message structure
  - `Account` - Account data
  - `Transaction` - Transaction data
  - `IntentType` - Intent enumeration
  - `VisualizationData` - Chart data structure
  - `ApiResponse` - Standard API response format

### Infrastructure
- ✅ **Monorepo Setup** - Turborepo configuration
- ✅ **Build System** - TypeScript, Next.js, Express
- ✅ **Development Tools** - ESLint, Prettier configs
- ✅ **Environment Setup** - Example .env files

## What Needs Implementation ⚠️

### Critical (Required for MVP)

#### 1. Conversation Logic (`apps/api/src/routes/conversation.ts`)
```typescript
// TODO: Implement conversation processing
// - Add AI/NLP integration (OpenAI, Anthropic, or custom)
// - Intent classification (check_balance, transfer_money, etc.)
// - Entity extraction (amounts, account types, dates)
// - Route to appropriate business logic handlers
```

**Implementation Options:**
- **Option A:** OpenAI GPT-4 with function calling (like original implementation)
- **Option B:** Anthropic Claude with structured outputs
- **Option C:** Custom NLP model (Rasa, Dialogflow, etc.)
- **Option D:** Simple keyword matching for MVP

#### 2. Account Management (`apps/api/src/services/account-service.ts`)
```typescript
// TODO: Implement account service
// - Database integration (PostgreSQL, MongoDB, etc.)
// - Balance tracking and updates
// - Transaction history
// - Transfer logic with validation
// - Audit logging
```

**Required Methods:**
- `getBalances(userId)` - Fetch user account balances
- `getAccount(accountId)` - Get account details
- `transfer(from, to, amount)` - Execute transfer with validation
- `getTransactions(accountId, filters)` - Fetch transaction history

#### 3. Database Schema
```sql
-- TODO: Create database tables
-- Recommended tables:
-- - users (id, email, password_hash, created_at)
-- - accounts (id, user_id, type, balance, status)
-- - transactions (id, account_id, amount, type, category, date)
-- - transfers (id, from_account, to_account, amount, status, created_at)
```

**Setup Steps:**
1. Choose database (PostgreSQL recommended)
2. Set up migrations (using Prisma, TypeORM, or Drizzle)
3. Create seed data for development
4. Add connection pooling

#### 4. Authentication & Authorization
```typescript
// TODO: Implement real auth
// Current: Mock JWT tokens (insecure)
// - Use bcrypt for password hashing
// - Implement proper JWT signing
// - Add refresh token logic
// - Add role-based access control
```

**Security Requirements:**
- Hash passwords with bcrypt (cost factor 10+)
- Use secure JWT secret (256-bit minimum)
- Implement token expiration and refresh
- Add rate limiting to prevent brute force
- Validate all user inputs

### Important (Production-Ready)

#### 5. Input Validation
```typescript
// TODO: Add validation middleware
// - Use Zod or Joi for schema validation
// - Validate all request bodies
// - Sanitize user inputs
// - Add type guards
```

#### 6. Error Handling
```typescript
// TODO: Improve error handling
// - Create custom error classes
// - Add error logging (Winston, Pino)
// - Return consistent error responses
// - Add error boundaries in React
```

#### 7. Testing
```typescript
// TODO: Write tests
// Backend:
// - Unit tests for business logic (Jest)
// - Integration tests for API endpoints (Supertest)
// - Database tests with test containers

// Frontend:
// - Component tests (React Testing Library)
// - E2E tests (Playwright or Cypress)
```

#### 8. Data Visualization (`packages/ai-engine`)
```typescript
// TODO: Implement spending analysis
// - Aggregate transactions by category
// - Calculate trends and patterns
// - Generate chart data
// - Add time period filtering
```

### Nice-to-Have (Future Enhancements)

- **File Uploads** - Receipt scanning, document upload
- **Notifications** - Email/SMS for transactions
- **Multi-language** - i18n support
- **Dark Mode** - Theme switching
- **Export Features** - PDF statements, CSV downloads
- **Advanced Analytics** - ML-based insights
- **Real-time Updates** - WebSocket for live data

## Getting Started

### Prerequisites
- Node.js 18+ (v24.11.0 tested)
- pnpm (recommended) or npm
- Database (PostgreSQL, MySQL, or MongoDB)

### Installation

1. **Clone and Install**
```bash
git clone <your-repo>
cd bank-app
pnpm install
```

2. **Set Up Environment Variables**

Create `.env` files in both `apps/api` and `apps/web`:

**apps/api/.env:**
```env
PORT=3001
NODE_ENV=development
DATABASE_URL=postgresql://user:pass@localhost:5432/bankapp
JWT_SECRET=your-super-secret-key-change-me
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
```

**apps/web/.env.local:**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

3. **Start Development Servers**

```bash
# Terminal 1: Start API server
cd apps/api
pnpm dev

# Terminal 2: Start web app
cd apps/web
pnpm dev
```

Visit http://localhost:3000 to see the UI.

## Project Structure

```
bank-app/
├── apps/
│   ├── api/                 # Express backend
│   │   ├── src/
│   │   │   ├── routes/      # API endpoints (NEEDS LOGIC)
│   │   │   ├── services/    # Business logic (EMPTY - IMPLEMENT HERE)
│   │   │   ├── middleware/  # Auth, validation, etc.
│   │   │   └── index.ts     # Server entry point
│   │   └── package.json
│   └── web/                 # Next.js frontend (COMPLETE UI)
│       ├── src/
│       │   ├── app/         # Next.js 14 app router
│       │   ├── components/  # React components (✅ DONE)
│       │   └── lib/         # Utilities
│       └── package.json
├── packages/
│   ├── shared/              # Shared types (✅ COMPLETE)
│   │   └── src/types.ts
│   └── ai-engine/           # AI logic (NEEDS IMPLEMENTATION)
│       └── src/
├── DECISION_FRAMEWORK.md    # Go/No-Go decision guide
└── package.json             # Root workspace config
```

## Implementation Roadmap

### Week 1: Foundation
- [ ] Set up database and create schema
- [ ] Implement user authentication
- [ ] Create account service with basic CRUD
- [ ] Add input validation middleware

### Week 2: Core Features
- [ ] Implement balance checking logic
- [ ] Add transaction history fetching
- [ ] Implement transfer functionality
- [ ] Add basic error handling

### Week 3: Conversation Layer
- [ ] Choose and integrate AI/NLP solution
- [ ] Implement intent classification
- [ ] Add entity extraction
- [ ] Connect conversation to business logic

### Week 4: Polish & Testing
- [ ] Write unit and integration tests
- [ ] Add logging and monitoring
- [ ] Security hardening
- [ ] Performance optimization

## Key Files to Implement

### High Priority
1. `apps/api/src/routes/conversation.ts` - ⚠️ Placeholder only
2. `apps/api/src/services/account-service.ts` - ⚠️ Needs complete rewrite
3. `apps/api/src/middleware/auth.ts` - ⚠️ Mock only, not secure
4. `packages/ai-engine/src/*` - ⚠️ All files need implementation

### Medium Priority
5. Database migrations (create new files)
6. Validation schemas (create new files)
7. Error handling classes (create new files)
8. Test files (create new directories)

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `PORT` | Yes | API server port | `3001` |
| `DATABASE_URL` | Yes | Database connection string | `postgresql://...` |
| `JWT_SECRET` | Yes | Secret for JWT signing | `random-256-bit-key` |
| `CORS_ORIGIN` | Yes | Frontend URL for CORS | `http://localhost:3000` |
| `NODE_ENV` | No | Environment | `development` |
| `OPENAI_API_KEY` | Optional | If using OpenAI | `sk-...` |

## Architecture Decisions to Make

1. **AI Provider** - OpenAI, Anthropic, open-source, or custom?
2. **Database** - PostgreSQL, MySQL, MongoDB?
3. **ORM** - Prisma, TypeORM, Drizzle, or raw SQL?
4. **Authentication** - JWT, sessions, or third-party (Auth0, Clerk)?
5. **Hosting** - AWS, Vercel, Render, Railway?
6. **Monitoring** - Sentry, DataDog, custom?

## Current Limitations

⚠️ **This is a UI-only baseline. The following do NOT work:**
- Chat messages return placeholder responses only
- Account balances are hardcoded mock data
- Transfers are not persisted (no database)
- Authentication is not enforced
- No data validation
- No error recovery
- No tests

## Support & Documentation

- See `DECISION_FRAMEWORK.md` for go/no-go decision criteria
- Review type definitions in `packages/shared/src/types.ts` for data structures
- Check existing UI components for integration examples
- Original AI implementation removed - refer to git history if needed

## License

[Your License Here]

## Team Notes

This baseline was created to provide a clean starting point. The UI is production-quality,
but all business logic needs to be implemented according to your requirements.

**Estimated effort to MVP:** 3-4 weeks with 2 developers (see DECISION_FRAMEWORK.md)

Good luck! 🚀
