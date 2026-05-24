# 🟠 Nthoppa — Financial Freedom for Everyone

> Empowering underserved communities in Botswana with smart financial tools, insurance, savings, and education.

[![Live Demo](https://img.shields.io/badge/Live-nthoppaweb.vercel.app-orange?style=for-the-badge&logo=vercel)](https://nthoppaweb.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?style=for-the-badge&logo=supabase)](https://supabase.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)

---

## 📱 What is Nthoppa?

Nthoppa is a full-stack fintech platform targeting unbanked and underserved populations in Southern Africa. It provides a unified digital platform for financial services including digital wallets, community savings (motshelo), micro-lending, insurance, financial education, and a rewards system — all built for the Botswana market.

---

## ✨ Features

- **🏦 Digital Wallet** — Send, receive, and manage money digitally
- **🤝 Motshelo (Community Savings)** — Traditional rotating savings groups, digitised
- **🛡️ NthoppaSure Marketplace** — Insurance and financial products from top providers
- **💰 Micro-lending** — Accessible loans for individuals and small businesses
- **📚 Financial Education** — Gamified learning modules with progress tracking
- **🤖 AI Financial Advisor** — Personalised financial recommendations powered by AI
- **💬 WhatsApp Chatbot** — Financial services via WhatsApp
- **📟 USSD Support** — Access for feature phone users
- **🏆 Nthoppa Coins** — Rewards, leaderboard and gamification system
- **📊 Credit Scoring** — Real-time credit assessment tools
- **🏭 SMME Pipeline** — SME incubation and business development pipeline
- **🔒 AES-256 Encryption** — Enterprise-grade security with OAuth 2.0

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.4 (App Router + Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS + Shadcn UI |
| Animations | Framer Motion |
| Database | Supabase PostgreSQL (with PgBouncer pooling) |
| ORM | Prisma 5.22.0 |
| Auth | JWT (httpOnly cookies, role-based) |
| Middleware | Next.js Edge Middleware (`middleware.ts`) |
| Hosting | Vercel (auto-deploy from `master`) |
| Storage | Supabase Storage |

---

## 👥 User Roles & Demo Login

The platform supports 5 distinct user roles, each with a dedicated portal and dashboard. Use the **Quick Demo** buttons on the login page for instant one-click access:

| Role | Email | Password | Dashboard |
|------|-------|----------|-----------|
| 🏃 Agent | agent@nthoppa.com | agent123 | `/dashboard/main` |
| 👤 Client/User | client@nthoppa.com | client123 | `/client/dashboard` |
| 🏢 HR Manager | hr@nthoppa.com | hr123 | `/hr/dashboard` |
| 🏪 Merchant | merchant@nthoppa.com | merchant123 | `/merchant/dashboard` |
| 👑 Admin | admin@nthoppa.com | admin123 | `/admin/dashboard` |

> 💡 The **Switch Role** floating widget (bottom-right corner) lets you switch between portals instantly without logging out.

---

## 🏢 Portal Overview

### 🏃 Agent Portal (`/dashboard`)
- Register and manage clients
- View territory and performance analytics
- Manage Motshelo groups
- Access AI Advisor and Credit Scoring tools
- Communications and reporting

### 👤 Client Portal (`/client`)
- Personal dashboard with savings goals
- Motshelo group membership
- Loan applications
- Financial education courses
- Transaction history and Nthoppa Coins rewards

### 🏢 HR Portal (`/hr`)
- Employee financial wellness tracking
- Payroll management
- Salary advance requests
- Leave management

### 🏪 Merchant Portal (`/merchant`)
- QR code payment management
- Transaction history and analytics
- Sales reporting

### 👑 Admin Portal (`/admin`)
- Agent registration and management
- Merchant onboarding
- NthoppaSure insurance management
- SME Pipeline oversight
- Investor view and platform reports

---

## 🤝 Ecosystem Partners

| Partner | Category | Status |
|---------|----------|--------|
| **Stanbic Bank** | Strategic Banking Partner | 🟢 Live |
| **CreditYame** | Credit Scoring — Formal | 🟢 Live |
| **iPachi Capital** | SMME Pipeline — Informal | 🟢 Live |
| **Seriti Insights** | BI & Data Analytics | 🟢 Live |
| **Seipone.ai** | AI Solutions | 🟡 Beta |

---

## 📄 Legal & Compliance

- Governed by the **Botswana Data Protection Act No. 18 of 2024**
- Registered Data Protection Officer: info@nthoppa.com
- IDPC registered: [www.idpc.org.bw](https://www.idpc.org.bw)
- Pursuing **Bank of Botswana Regulatory Sandbox** admission
- [Privacy Policy](https://nthoppaweb.vercel.app/privacy-policy) | [Terms & Conditions](https://nthoppaweb.vercel.app/terms) | [Cookie Policy](https://nthoppaweb.vercel.app/cookie-policy)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm
- Supabase account (for database)

### Installation

```bash
# Clone the repository
git clone https://github.com/bida23-211/Nthoppa-web-app.git
cd Nthoppa-web-app

# Install dependencies
npm install --legacy-peer-deps

# Set up environment variables
cp .env.example .env
```

### Environment Variables

Create a `.env` file with the following (see `.env.example`):

```env
# Supabase connection pooler URL (port 6543) — use this for runtime queries
DATABASE_URL="postgresql://postgres.xxxx:password@aws-1-eu-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"

# Supabase direct URL (port 5432) — use this for migrations
DIRECT_URL="postgresql://postgres:password@db.xxxx.supabase.co:5432/postgres"

# JWT Secret — minimum 32 characters
JWT_SECRET="your-secure-jwt-secret-minimum-32-chars"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

NODE_ENV="development"
```

### Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to Supabase
npx prisma db push

# Seed demo data (creates all demo users and sample data)
npx prisma db seed
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
nthoppa/
├── app/
│   ├── admin/              # Admin portal (dashboard, agents, merchants)
│   ├── client/             # Client/User portal
│   ├── dashboard/          # Agent portal
│   ├── hr/                 # HR Manager portal
│   ├── merchant/           # Merchant portal
│   ├── login/              # Authentication page (5 role tabs + quick demo)
│   ├── privacy-policy/     # Full privacy policy page
│   ├── terms/              # Terms & Conditions
│   ├── cookie-policy/      # Cookie Policy
│   ├── disclaimer/         # Disclaimer
│   └── api/                # 28 API routes
│       ├── auth/           # login, logout, check, register
│       ├── agents/         # Agent CRUD
│       ├── users/          # User management
│       ├── motshelo/       # Community savings
│       ├── courses/        # Education
│       ├── gamification/   # Coins & leaderboard
│       ├── ai/             # AI recommendations
│       ├── communications/ # Messaging
│       └── notifications/  # Notifications
├── components/
│   ├── landing/            # Landing page sections (Navbar, Hero, Footer etc.)
│   ├── layout/             # DashboardLayout, AdminLayout
│   ├── providers/          # React context providers
│   └── ui/                 # Shadcn UI components
├── lib/                    # Utilities (jwt, prisma, auth, gamification etc.)
├── middleware.ts            # Next.js Edge Middleware (auth + role protection)
├── prisma/
│   ├── schema.prisma       # Database schema (16 models)
│   └── seed.js             # Demo data seeder
└── public/
    ├── nthoppa-logo.png
    ├── Nthoppa_FinTech_Privacy_Policy.pdf
    └── partners/           # Partner logos
```

---

## 🗄️ Database Models

The Prisma schema includes 16 models:

`User` · `Agent` · `Communication` · `Report` · `AgentAchievement` · `GamificationEvent` · `FinancialProfile` · `Transaction` · `MotsheloGroup` · `MotsheloMember` · `Course` · `UserCourseProgress` · `ConsentRecord` · `Notification` · `Subscriber` · `WaitlistEntry`

---

## 🌍 Deployment

The app is deployed on **Vercel** with automatic deployments on every push to `master`.

**Live URL:** [https://nthoppaweb.vercel.app](https://nthoppaweb.vercel.app)

### Vercel Environment Variables Required

Set these in **Vercel Dashboard → Settings → Environment Variables**:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Supabase pooler URL (port 6543) |
| `DIRECT_URL` | Supabase direct URL (port 5432) |
| `JWT_SECRET` | JWT signing secret (32+ chars) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `NODE_ENV` | Set to `production` |

### Deploy Your Own Instance

1. Fork this repository
2. Connect to [Vercel](https://vercel.com)
3. Add all environment variables above
4. Deploy — Vercel auto-deploys on every push to `master`

---

## 📊 Platform Stats (Demo)

- **10,234+** Clients Served
- **BWP 2.4M** Pula Transacted
- **1,245** Active Agents
- **89pts** Average Credit Score

---

## 📞 Contact

| Channel | Details |
|---------|---------|
| 📧 Email | info@nthoppa.com |
| 📞 Phone | +267 75 736 600 |
| 📍 Location | Gaborone, Botswana 🇧🇼 |
| 🌐 Website | [nthoppaweb.vercel.app](https://nthoppaweb.vercel.app) |

---

## 📄 License

This project is proprietary software developed for **Nthoppa (Pty) Ltd**.  
© 2026 Nthoppa Financial Technologies. All rights reserved.

---

Built with ❤️ in **Gaborone, Botswana** 🇧🇼

> *"Botswana's #1 Fintech Platform"*
