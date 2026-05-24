# 🟠 Nthoppa — Financial Freedom for Everyone

> Empowering underserved communities in Botswana with smart financial tools, insurance, savings, and education.

[![Live Demo](https://img.shields.io/badge/Live-nthoppaweb.vercel.app-orange?style=for-the-badge&logo=vercel)](https://nthoppaweb.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?style=for-the-badge&logo=supabase)](https://supabase.com)

---

## 📱 What is Nthoppa?

Nthoppa is a full-stack fintech platform targeting unbanked and underserved populations in Southern Africa. It provides a unified digital platform for financial services including digital wallets, community savings (motshelo), micro-lending, insurance, and financial education.

---

## ✨ Features

- **Digital Wallet** — Send, receive, and manage money digitally
- **Motshelo (Community Savings)** — Traditional rotating savings groups, digitised
- **NthoppaSure Marketplace** — Insurance and financial products from top providers
- **Micro-lending** — Accessible loans for individuals and small businesses
- **Financial Education** — Gamified learning modules and credit scoring
- **WhatsApp Chatbot** — Financial services via WhatsApp
- **USSD Support** — Access for feature phone users
- **Nthoppa Coins** — Rewards and gamification system
- **Stanbic Services** — Banking, loans, savings, and payment products via Stanbic Bank

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.4 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + Shadcn UI |
| Database | Supabase PostgreSQL |
| ORM | Prisma 5.22.0 |
| Auth | JWT (jsonwebtoken) |
| Hosting | Vercel |
| Storage | Supabase Storage |

---

## 👥 User Roles

The platform supports 5 distinct user roles, each with a dedicated dashboard:

| Role | Email | Password | Dashboard |
|------|-------|----------|-----------|
| 🏃 Agent | agent@nthoppa.com | agent123 | `/dashboard/main` |
| 👤 Client | client@nthoppa.com | client123 | `/client/dashboard` |
| 🏢 HR Manager | hr@nthoppa.com | hr123 | `/hr/dashboard` |
| 🏪 Merchant | merchant@nthoppa.com | merchant123 | `/merchant/dashboard` |
| 👑 Admin | admin@nthoppa.com | admin123 | `/admin/dashboard` |

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

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation

```bash
# Clone the repository
git clone https://github.com/bida23-211/Nthoppa-web-app.git
cd Nthoppa-web-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### Environment Variables

Create a `.env` file with the following:

```env
DATABASE_URL="your_supabase_connection_string"
DIRECT_URL="your_supabase_direct_url"
JWT_SECRET="your_jwt_secret_min_32_chars"
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your_service_role_key"
NODE_ENV="development"
```

### Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed demo data
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
│   ├── admin/          # Admin dashboard
│   ├── client/         # Client portal
│   ├── dashboard/      # Agent dashboard
│   ├── hr/             # HR Manager portal
│   ├── merchant/       # Merchant portal
│   ├── login/          # Authentication
│   └── api/            # API routes
├── components/
│   ├── ui/             # Shadcn UI components
│   └── layout/         # Layout components
├── lib/                # Utilities & helpers
├── prisma/             # Database schema & seed
└── public/
    └── partners/       # Partner logos
```

---

## 🌍 Deployment

The app is deployed on **Vercel** with automatic deployments from the `master` branch.

**Live URL:** https://nthoppaweb.vercel.app

To deploy your own instance:

1. Fork this repository
2. Connect to Vercel
3. Add all environment variables in Vercel dashboard
4. Deploy

---

## 📊 Platform Stats (Demo)

- **10,234+** Clients Served
- **BWP 2.4M** Million Pula Transacted
- **1,245** Active Agents
- **89pts** Average Credit Score

---

## 📄 License

This project is proprietary software developed for **Nthoppa Financial Technologies**.
© 2026 Nthoppa Financial Technologies. All rights reserved.

---

## 👨‍💻 Development Team

Built with ❤️ in **Gaborone, Botswana** 🇧🇼

> *"Botswana's #1 Fintech Platform"*
