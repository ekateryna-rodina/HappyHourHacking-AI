# Setup Guide - AI-Powered Conversational Banking

## Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- OpenAI API Key

### Installation Steps

1. **Install Dependencies**
```bash
npm install
```

2. **Configure Backend Environment**
```bash
cp apps/api/.env.example apps/api/.env
```

Edit `apps/api/.env` and add your credentials:
```env
OPENAI_API_KEY=sk-your-actual-openai-api-key
JWT_SECRET=your-random-secret-string
```

3. **Start Development Servers**
```bash
npm run dev
```

This starts:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

### First-Time Usage

1. Open http://localhost:3000
2. Click the Chat tab
3. Try these sample prompts:
   - "What's my checking account balance?"
   - "Show me my spending this month"
   - "Transfer $500 to savings"
   - "Am I eligible for a home loan?"

## Project Structure Overview

```
bank-app/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # Express backend
├── packages/
│   ├── shared/       # Shared types & utilities
│   └── ai-engine/    # AI conversation logic
```

## Key Features Implemented

✅ **Conversational Chat Interface**
- Natural language banking operations
- AI-powered intent classification
- Real-time message streaming

✅ **Dynamic Visualizations**
- Spending breakdowns (pie charts)
- Income vs expenses (bar charts)
- Savings trends (line charts)
- Generated inline in chat

✅ **Financial Insights**
- Spending pattern analysis
- Category-based tracking
- AI-generated recommendations

✅ **Account Management**
- Multi-account support
- Balance checking
- Transaction history

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **Recharts** - Data visualization
- **Axios** - API communication

### Backend
- **Node.js** + **Express** - REST API
- **TypeScript** - Type safety
- **JWT** - Authentication
- **OpenAI API** - AI conversation

### Architecture
- **Turborepo** - Monorepo management
- **Shared packages** - Type safety across stack

## Development Commands

```bash
# Start all apps
npm run dev

# Start specific app
npm run dev --filter=web
npm run dev --filter=api

# Build for production
npm run build

# Build specific package
turbo run build --filter=@bank-app/shared

# Format code
npm run format

# Lint
npm run lint
```

## Authentication (Mock)

Currently uses mock authentication:
- Any email/password combination works
- JWT token stored in localStorage
- Middleware validates token on protected routes

**Production TODO:** Integrate real user database and password hashing.

## Next Steps for Production

### Database Integration
1. Set up PostgreSQL database
2. Create Prisma schema (`prisma/schema.prisma`)
3. Replace mock data in API routes with Prisma queries
4. Run migrations: `npx prisma migrate dev`

### Security Enhancements
1. Add rate limiting (already configured)
2. Implement proper password validation
3. Add 2FA support
4. Secure API keys with vault service

### AI Improvements
1. Add conversation memory/context window
2. Implement sentiment analysis
3. Add multi-language support
4. Fine-tune prompts for banking domain

### Features to Add
1. Bill payment scheduling
2. Savings goals tracking
3. Budget alerts
4. Investment portfolio analysis
5. Credit score monitoring

## Troubleshooting

### Frontend can't reach API
- Verify `NEXT_PUBLIC_API_URL=http://localhost:3001` in `apps/web/.env.local`
- Check CORS settings in `apps/api/src/index.ts`

### OpenAI errors
- Verify `OPENAI_API_KEY` is set in `apps/api/.env`
- Check API quota/billing on OpenAI dashboard

### Build errors
- Run `npm install` in root directory
- Ensure Node.js version >= 18
- Clear `.next` and `node_modules`, reinstall

## Project Status

✅ Core architecture complete
✅ AI conversation engine working
✅ Frontend UI implemented
✅ Backend API functional
✅ Mock data for testing

🔄 Database integration pending
🔄 Production authentication pending
🔄 Advanced AI features pending

## Contributing

See `.github/copilot-instructions.md` for AI agent guidance and coding conventions.
