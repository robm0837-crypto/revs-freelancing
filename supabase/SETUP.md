# Supabase login and admin setup

Do these in order. Each step is small.

## 1. Add the Supabase settings to Vercel

In Supabase: **Project Settings -> API** (or "API Keys"). Copy the Project URL and the
publishable (anon) key.

In Vercel: **Project -> Settings -> Environment Variables**. Add both for
Production and Preview:

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | your Project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | your publishable (anon) key |

Redeploy afterward so the site picks them up.

## 2. Set the allowed web addresses

Supabase: **Authentication -> URL Configuration**

- **Site URL:** `https://revs-pearl.vercel.app`
- **Redirect URLs:** add `https://revs-pearl.vercel.app/**`

## 3. Change the invite email link

Supabase: **Authentication -> Email Templates -> Invite user**. Replace the link in
the template with:

```html
<h2>You have been invited</h2>
<p>
  <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=invite">
    Accept invitation
  </a>
</p>
```

## 4. Run the database script

Supabase: **SQL Editor -> New query**. Paste the contents of
`supabase/profiles-and-admin.sql` and click **Run**. This creates the roles table
and makes `robm0837@gmail.com` an administrator.

## 5. Send the invite and sign in

Supabase: **Authentication -> Users -> Invite user**, enter your email, then click
**Accept invitation** in the email. Choose a password. You land on `/admin`.
Next time, sign in at `/login`.

## Optional: make it invite-only

Supabase: **Authentication -> Sign In / Providers -> Email**. Turn off
"Allow new users to sign up". Then only invited people can have accounts.
(Even without this, only people marked `admin` in the profiles table can see `/admin`.)
