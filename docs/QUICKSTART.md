# 🚀 Quick Start - Team Member Guide

**Welcome to the AI Banking Assistant Hackathon Team!**

This is your 5-minute quick start guide to get up and running.

---

## ⚡ Super Quick Setup (5 minutes)

### Step 1: Clone the Repo
```bash
git clone <repo-url>
cd ai-bank-assistant
```

### Step 2: Install Dependencies
```bash
npm install
```

This might take 2-3 minutes. ☕

### Step 3: Configure Environment

**Option A: Use Mock OpenAI (Recommended for hackathon - No API costs!)**
```bash
# Navigate to API folder
cd apps/api

# Create environment file
New-Item -Path .env -ItemType File

# Add this line to .env
Add-Content -Path .env -Value "USE_MOCK_OPENAI=true"
```

**Option B: Use Real OpenAI (If you have an API key)**
```bash
# Create .env file
New-Item -Path apps/api/.env -ItemType File

# Add your API key
Add-Content -Path apps/api/.env -Value "OPENAI_API_KEY=sk-your-actual-key-here"
```

### Step 4: Start Development Servers
```bash
# From project root
npm run dev
```

This starts:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001

### Step 5: Test It Works!

1. Open http://localhost:3000 in your browser
2. Click on the **Chat** tab
3. Try typing: "What's my checking account balance?"
4. You should see a response from the AI! 🎉

---

## ✅ You're Ready!

**Next steps:**
1. Read `HACKATHON_GUIDE.md` for the full plan
2. Check `TEAM_TASKS.md` for your specific assignments
3. Join the team Slack/Discord channel
4. Attend the kickoff meeting (9am today!)

---

## 📁 Project Structure (Quick Overview)

```
ai-bank-assistant/
├── apps/
│   ├── web/              ← Frontend (Next.js) - Port 3000
│   │   └── src/
│   │       ├── app/      ← Pages (page.tsx)
│   │       └── components/ ← React components
│   │
│   └── api/              ← Backend (Express) - Port 3001
│       └── src/
│           ├── routes/   ← API endpoints
│           └── services/ ← Business logic
│
├── packages/
│   ├── shared/           ← Shared TypeScript types
│   └── ai-engine/        ← AI conversation logic
│
└── [docs]                ← Read these!
    ├── HACKATHON_GUIDE.md
    ├── TEAM_TASKS.md
    ├── DEMO_SCRIPT.md
    └── SETUP.md
```

---

## 🎯 Your First Task

Based on your role:

### Frontend Developers
**File to start with:** `apps/web/src/components/ChatInterface.tsx`
- This is the main chat component
- Make changes and see them live at http://localhost:3000

### Backend Developers
**File to start with:** `apps/api/src/routes/conversation.ts`
- This handles chat messages
- Test with Postman or the frontend

### Full-Stack Developers
**Files to explore:**
- Frontend: `apps/web/src/app/page.tsx`
- Backend: `apps/api/src/index.ts`
- Shared types: `packages/shared/src/types.ts`

---

## 🛠️ Useful Commands

### Development
```bash
# Start everything
npm run dev

# Start only frontend
npm run dev --filter=web

# Start only backend
npm run dev --filter=api
```

### Building
```bash
# Build everything
npm run build

# Build specific app
npm run build --filter=web
```

### Git Workflow
```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Check status
git status

# Add changes
git add .

# Commit
git commit -m "Add feature: description"

# Push to GitHub
git push origin feature/your-feature-name
```

---

## 💻 Development Tips

### Hot Reload
- **Frontend:** Changes auto-refresh in browser
- **Backend:** Server restarts automatically
- **Shared packages:** Might need manual restart

### VS Code Extensions (Recommended)
- ESLint
- Prettier
- TypeScript
- TailwindCSS IntelliSense

### Browser DevTools
- **Frontend issues:** F12 → Console tab
- **API issues:** F12 → Network tab

---

## 🐛 Troubleshooting

### "npm install" fails
```bash
# Clear cache and retry
npm cache clean --force
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Port already in use
```bash
# Kill process on port 3000 (frontend)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# Kill process on port 3001 (backend)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3001).OwningProcess | Stop-Process
```

### Frontend can't reach backend
Check `apps/web/src/lib/api-client.ts`:
```typescript
const API_URL = 'http://localhost:3001';
```

### Changes not showing
```bash
# Hard refresh browser
Ctrl + Shift + R (Windows)
Cmd + Shift + R (Mac)

# Or restart dev servers
Ctrl + C (kill servers)
npm run dev (restart)
```

### TypeScript errors
```bash
# Check types
npm run build

# Often fixed by restarting VS Code
Ctrl + Shift + P → "Reload Window"
```

---

## 📚 Key Files to Know

### Frontend
| File | Purpose |
|------|---------|
| `apps/web/src/app/page.tsx` | Main landing page |
| `apps/web/src/components/ChatInterface.tsx` | Chat UI component |
| `apps/web/src/components/ChartVisualization.tsx` | Charts and graphs |
| `apps/web/src/lib/api-client.ts` | API calls to backend |
| `apps/web/tailwind.config.js` | Styling configuration |

### Backend
| File | Purpose |
|------|---------|
| `apps/api/src/index.ts` | Server entry point |
| `apps/api/src/routes/conversation.ts` | Chat endpoint |
| `apps/api/src/routes/accounts.ts` | Account endpoints |
| `apps/api/src/routes/transactions.ts` | Transaction endpoints |
| `packages/ai-engine/src/conversation-engine.ts` | AI logic |

### Shared
| File | Purpose |
|------|---------|
| `packages/shared/src/types.ts` | TypeScript types used across apps |
| `packages/shared/src/utils.ts` | Shared utility functions |

---

## 🎨 Making Your First Change

### Example: Change the Chat Placeholder Text

1. **Open file:** `apps/web/src/components/ChatInterface.tsx`

2. **Find this line** (around line 150):
```tsx
placeholder="Ask me anything about your finances..."
```

3. **Change to:**
```tsx
placeholder="Try: What's my balance? or Show my spending"
```

4. **Save file** - Browser auto-refreshes!

5. **Commit your change:**
```bash
git add apps/web/src/components/ChatInterface.tsx
git commit -m "Update chat placeholder text"
git push
```

**Congrats! You just made your first contribution! 🎉**

---

## 📞 Getting Help

### Resources (in order)
1. **This file** - Quick answers
2. **SETUP.md** - Detailed setup guide
3. **HACKATHON_GUIDE.md** - Full strategy
4. **Team Slack/Discord** - Ask your teammates
5. **Team Lead** - Escalate if stuck >30min

### Common Questions

**Q: What's my task for today?**
→ Check `TEAM_TASKS.md` - your name should be assigned

**Q: Which branch should I work on?**
→ Create a feature branch: `git checkout -b feature/your-name-feature`

**Q: When do we sync as a team?**
→ 9am standup, 1pm sync, 6pm demo (daily)

**Q: Can I use ChatGPT/Copilot?**
→ Yes! AI tools are great for hackathons

**Q: What if I break something?**
→ Don't panic! Git lets you undo. Ask team lead for help.

---

## 🎯 Success Checklist

Before the kickoff meeting, make sure you can:
- [ ] Run `npm run dev` successfully
- [ ] Open http://localhost:3000 and see the app
- [ ] Send a chat message and get a response
- [ ] Make a code change and see it reflected
- [ ] Commit and push to GitHub

**All checked?** You're ready to rock! 🚀

---

## 🏆 Hackathon Mindset

**Remember:**
- **Done > Perfect** - Ship working code
- **Ask questions** - No question is dumb
- **Help teammates** - We win as a team
- **Take breaks** - Avoid burnout
- **Have fun!** - This is a learning experience

**Let's build something amazing together! 💪**

---

## 📋 Quick Reference

### Ports
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

### Main Commands
- Start dev: `npm run dev`
- Build: `npm run build`
- Test: `npm run test`

### Git Workflow
1. Create branch: `git checkout -b feature/name`
2. Make changes
3. Commit: `git commit -m "message"`
4. Push: `git push`

### Team Communication
- Slack/Discord: [Channel name]
- Daily Standups: 9am
- Demos: 6pm daily

---

**Questions? See you at the kickoff meeting!**

*Last updated: December 15, 2025*
