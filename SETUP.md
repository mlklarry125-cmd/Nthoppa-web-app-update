# Nthoppa — localStorage → Prisma/SQLite Migration Guide

## What's included

| File | Description |
|------|-------------|
| `prisma/schema.prisma` | Full Prisma 5 schema (User, Agent, Communication, Report) |
| `prisma/seed.ts` | Seeds sample agents + users; prints admin password hash |
| `lib/prisma.ts` | Prisma client singleton (dev-safe) |
| `lib/auth.ts` | JWT sign/verify helpers shared by all API routes |
| `lib/api.ts` | Full typed frontend fetch wrapper |
| `lib/storage.ts` | Drop-in replacement — same function names, now calls API |
| `app/api/auth/login/route.ts` | POST login — bcrypt + JWT cookie |
| `app/api/auth/logout/route.ts` | POST logout — clears both cookies |
| `app/api/users/route.ts` | GET list + POST create |
| `app/api/users/[id]/route.ts` | GET, PUT, DELETE single user |
| `app/api/agents/route.ts` | GET list + POST create (admin only) |
| `app/api/agents/[id]/route.ts` | GET, PUT, DELETE single agent |
| `app/api/communications/route.ts` | GET list + POST send |
| `app/api/reports/route.ts` | GET list + POST generate |
| `app/dashboard/main/page.tsx` | Refactored — all storage in useEffect |
| `app/dashboard/reports/page.tsx` + `components/` | Split into 3 components |
| `app/dashboard/communications/page.tsx` + `components/` | Split into 3 components |
| `app/admin/agents/page.tsx` + `components/` | Split into 3 components |
| `.env.local` | Template with all required variables |

---

## Step-by-step setup

### 1. Copy files into your project

Copy every file from this deliverable into the matching path in your project root.

### 2. Install dependencies (already in your package.json)

```bash
npm install
```

If `bcryptjs` or `jsonwebtoken` types are missing:

```bash
npm install bcryptjs jsonwebtoken
npm install -D @types/bcryptjs @types/jsonwebtoken
```

### 3. Set up environment variables

Edit `.env.local`:

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="<long-random-string>"
ADMIN_EMAIL="admin@nthoppa.com"
ADMIN_PASSWORD_HASH="<bcrypt-hash-of-your-admin-password>"
```

To generate a bcrypt hash for your admin password:

```bash
node -e "const b=require('bcryptjs'); b.hash('your_password_here', 10).then(console.log)"
```

Or just run the seed script in the next step — it prints the hash for you.

### 4. Create the database and run migrations

```bash
npx prisma migrate dev --name init
```

This creates `prisma/dev.db` and applies the schema.

### 5. Seed sample data

```bash
npx prisma db seed
```

This creates sample agents (all with password `password123`) and users,
and **prints the bcrypt hash for admin password `admin123`** — copy it into `.env.local`.

> To change the admin password used in seeding, set `ADMIN_PASSWORD` env var before running:
> `ADMIN_PASSWORD=mysecret npx prisma db seed`

### 6. Run the app

```bash
npm run dev
```

### 7. Log in

| Role | Login Email | Password |
|------|-------------|----------|
| Admin | `admin@nthoppa.com` | `admin123` (or whatever you set) |
| Agent | `john@nthoppa.com` | `password123` |
| Agent | `sarah@nthoppa.com` | `password123` |

---

## Key architectural decisions

### Auth flow
- Login → POST `/api/auth/login` → server sets **HTTP-only cookie** (`agent_session` or `admin_session`)
- Cookie contains a signed JWT (7-day expiry)
- Every API route calls `verifyAuth()` which reads and verifies the cookie
- `localStorage` is **only** used to cache display info (name, territory) for the UI — never for actual auth
- Middleware (`middleware.ts`) checks cookies for route protection — unchanged from your original

### Storage API is now async
The old `getUsers()` returned data synchronously from localStorage. The new version
returns a `Promise`. If you have pages that call these functions outside of `useEffect`,
wrap them:

```tsx
// Before (old):
const users = getUsers();

// After (new) — inside useEffect:
useEffect(() => {
  getUsers().then(setUsers);
}, []);
```

### Passwords
- Agent passwords are **bcrypt-hashed** before storage
- The seed script hashes `password123` for all sample agents
- Admin password is stored as a bcrypt hash in `.env.local` (never in the DB)
- The login route uses `bcrypt.compare()` for both roles

### Prisma 5 notes
- `@db.Text` is **not supported** on SQLite in Prisma 5 — removed from schema (SQLite `TEXT` is the default)
- Use `npx prisma studio` to browse the database visually
- Use `npx prisma migrate reset` to wipe and re-seed during development
