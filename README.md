# AI-Powered Conversational Banking

A modern banking application that transforms traditional app interactions into natural, conversational experiences powered by AI.

---

## 🚀 **HACKATHON TEAM: START HERE!**

### 📍 **All Hackathon Docs:** [docs/HACKATHON_INDEX.md](docs/HACKATHON_INDEX.md) ← **Click Here!**

**Quick Links:**
- ⚡ **[docs/QUICKSTART.md](docs/QUICKSTART.md)** - Get running in 5 minutes
- 📅 **[docs/HACKATHON_GUIDE.md](docs/HACKATHON_GUIDE.md)** - Complete 3-day strategy
- ✅ **[docs/TEAM_TASKS.md](docs/TEAM_TASKS.md)** - Daily task assignments
- 🎤 **[docs/DEMO_SCRIPT.md](docs/DEMO_SCRIPT.md)** - Presentation guide
- 💡 **[docs/FEATURE_IDEAS.md](docs/FEATURE_IDEAS.md)** - 30+ features to build
- 📋 **[docs/TEAM_LEAD_CHECKLIST.md](docs/TEAM_LEAD_CHECKLIST.md)** - For team lead

**Timeline:** Dec 15-18, 2025 (3 days + Demo Day) | **Team:** 8 people | **Let's win! 🏆**

---

## 🎯 Key Features

- **Conversational Banking**: Natural language interactions for all banking operations
- **Financial Insights**: AI-driven spending analysis and personalized recommendations
- **Dynamic Visualizations**: Real-time charts and graphs within chat interface
- **Predictive Analytics**: Forecast balances, savings growth, and upcoming expenses
- **Loan Eligibility**: Instant product qualification checks

## 🏗️ Architecture

This is a monorepo using Turborepo with the following structure:

```
apps/
  web/          - Next.js frontend (conversational UI)
  api/          - Node.js/Express backend (banking operations)
packages/
  shared/       - Shared TypeScript types and utilities
  ui/           - Reusable React components
  ai-engine/    - AI conversation and intent processing
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
npm install
```

### Development

```bash
# Start all apps in development mode
npm run dev

# Start specific app
npm run dev --filter=web
npm run dev --filter=api
```

### Build

```bash
npm run build
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, TailwindCSS
- **Backend**: Node.js, Express, TypeScript
- **AI**: OpenAI API / Azure OpenAI
- **Visualizations**: Recharts, Chart.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js

## 📝 Environment Variables

Create `.env.local` files in respective apps:

**apps/web/.env.local**:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret
```

**apps/api/.env.local**:
```
DATABASE_URL=postgresql://user:password@localhost:5432/bankapp
OPENAI_API_KEY=your-openai-key
JWT_SECRET=your-jwt-secret
```

## 📚 Documentation

- **[docs/SETUP.md](docs/SETUP.md)** - Detailed setup instructions
- **[docs/HACKATHON_INDEX.md](docs/HACKATHON_INDEX.md)** - Complete hackathon guide index
- **[docs/DECISION_FRAMEWORK.md](docs/DECISION_FRAMEWORK.md)** - Architecture decisions and trade-offs

## 🧪 Testing

```bash
npm run test
```

## 📄 License

Private - All Rights Reserved
