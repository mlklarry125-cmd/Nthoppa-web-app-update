# Nthoppa deployment setup

The application is a Next.js App Router project with Prisma and Supabase/PostgreSQL. Both Vercel and Netlify can detect and build it without a custom platform configuration file.

## Production source

- Repository: `mlklarry125-cmd/Nthoppa-web-app-update`
- Production branch: `master`
- Install command: `npm install --legacy-peer-deps`
- Build command: `npm run build`
- Framework preset: Next.js
- Root directory: repository root

## Required environment variables

Add the following variables in each deployment platform. Never commit their real values to GitHub.

```env
DATABASE_URL=
DIRECT_URL=
JWT_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
NODE_ENV=production
```

### Database URLs

- `DATABASE_URL`: Supabase pooled PostgreSQL connection string for runtime queries.
- `DIRECT_URL`: Supabase direct PostgreSQL connection string for migrations and Prisma operations.

### Authentication

- `JWT_SECRET`: strong random value of at least 32 characters.
- `NEXTAUTH_SECRET`: strong random value of at least 32 characters if NextAuth is used.
- `NEXTAUTH_URL`: the final production URL for the platform deployment.

## Vercel

1. Create a new Vercel project and import `mlklarry125-cmd/Nthoppa-web-app-update`.
2. Select the Next.js framework preset.
3. Confirm `master` as the production branch.
4. Add all required environment variables for Production and Preview.
5. Deploy.

After connection, pushes to non-production branches create previews and merges to `master` create production deployments.

## Netlify

1. Add a new site from an existing Git repository.
2. Select `mlklarry125-cmd/Nthoppa-web-app-update`.
3. Confirm `master` as the production branch.
4. Use `npm run build` as the build command.
5. Add all required environment variables.
6. Deploy.

Netlify detects modern Next.js projects automatically through its OpenNext adapter. Do not pin an old Next.js plugin unless a specific compatibility issue requires it.

## Post-deployment checks

- Landing page loads without console errors.
- Login and role-based redirects work.
- `/api/auth/check` responds correctly.
- Prisma can connect to Supabase.
- User, agent, merchant, HR, and admin portals load.
- Images and partner logos are available.
- Preview deployments do not expose production secrets unnecessarily.
