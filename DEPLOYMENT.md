# Paxton Auto Spares Deployment Checklist

## 1. Local Demo

Run the website:

```powershell
npm run dev
```

Open:

- Website: http://localhost:3000
- Admin: http://localhost:3000/admin
- Demo admin password: `paxton-demo-2026`
- Owner content studio: open Admin, then expand "Owner Content Studio"

## 2. Production Environment Variables

Create these in Vercel or `.env.local`:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_PASSWORD=client-private-password
ADMIN_SESSION_TOKEN=long-random-session-token
```

Generate a strong session token with:

```powershell
node -e "console.log(crypto.randomUUID() + crypto.randomUUID())"
```

## 3. Supabase Database

Create a Supabase project, open SQL Editor, and run:

```sql
create table if not exists public.quote_requests (
  id uuid primary key,
  name text not null,
  phone text not null,
  vehicle text not null,
  category text not null,
  details text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.quote_requests enable row level security;

create table if not exists public.site_content (
  id text primary key,
  content jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;
```

The app uses the Supabase service role key only inside server API routes.

## 4. Client Onboarding Details

Replace these only after the client confirms:

- Real WhatsApp number
- Real phone number
- Real email
- Final logo
- Real product brands
- Confirmed business hours
- Confirmed Google Maps listing
- Real shop/product photos

Known demo details:

- Plot 37802 Nationalist Rd, Lusaka 10101
- Along Nationalist Road Plaza
- G8XP+W4 Lusaka
- Facebook-listed phone used for demo: `+260 967 771 609`

Important: Facebook/Google image URLs can expire. For production, upload confirmed client photos to Cloudinary, Supabase Storage, or another stable media host, then paste those URLs into the Owner Content Studio.

## 5. Deploy To Vercel

Install/login if needed:

```powershell
npx vercel login
```

Deploy preview:

```powershell
npx vercel
```

Deploy production:

```powershell
npx vercel --prod
```

After deployment, set environment variables in Vercel and redeploy.
