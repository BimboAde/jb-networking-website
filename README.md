This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## CMS, APIs, and Admin Dashboard

This project includes a Supabase-backed CMS with RESTful API endpoints and an Admin dashboard.

### Environment Variables

Required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_URL` (same as above)
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_EMAIL` (for seeding)
- `ADMIN_PASSWORD` (for seeding)

Email notifications (optional):
- `RESEND_API_KEY`
- `ADMIN_EMAIL` (also used as recipient)
- `FROM_EMAIL`

### Database Setup

Apply SQL schema to your Supabase project:
- File: `supabase/schema.sql`

This creates:
- `team_members`, `images`, `locations`
- `app_users` (maps to Supabase `auth.users`), with roles: `user` | `admin`
- Read-only RLS for anon; writes are gated by server-side auth in API routes

### Seeding

Seed content (team, locations, images):
```bash
npm run seed
```

Seed initial admin user:
```bash
export ADMIN_EMAIL=admin@example.com
export ADMIN_PASSWORD=ChangeMe123!
npm run seed:admin
```

### Admin Dashboard

- Login: `/admin/login`
- Dashboard: `/admin` with sections for Team, Locations, Images

Authentication:
- Uses Supabase Auth. Sign in on `/admin/login`
- API write operations require `Authorization: Bearer <access_token>`; the dashboard handles this automatically
- Middleware gates `/admin/*` and redirects to `/admin/login` if unauthenticated

### REST API

Base path: `/api/v1`
- `GET /team-members` | `POST /team-members`
- `GET /team-members/:id` | `PATCH /team-members/:id` | `DELETE /team-members/:id`
- `GET /locations` | `POST /locations`
- `GET /locations/:id` | `PATCH /locations/:id` | `DELETE /locations/:id`
- `GET /images?category=...&label=...` | `POST /images`
- `GET /images/:id` | `PATCH /images/:id` | `DELETE /images/:id`

Notes:
- GET endpoints are public (read-only)
- Mutations require admin auth (Supabase access token bearer)

