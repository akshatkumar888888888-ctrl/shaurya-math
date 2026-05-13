# 🚀 Shaurya Math — Full Deployment Guide
## Supabase (Backend) + Vercel (Frontend)

---

## STEP 1 — Set Up Supabase (Backend Database)

### 1.1 Create a Supabase Project
1. Go to **https://supabase.com** and sign up (free)
2. Click **"New Project"**
3. Fill in:
   - **Project name:** `shaurya-math`
   - **Database password:** (save this somewhere safe)
   - **Region:** `Southeast Asia (Singapore)` ← closest to India
4. Click **"Create new project"** and wait ~2 minutes

### 1.2 Run the Database Setup SQL
1. In your Supabase project, click **"SQL Editor"** in the left sidebar
2. Click **"New Query"**
3. Open the file `supabase-setup.sql` from your project folder
4. Copy ALL the content and paste it into the SQL editor
5. Click **"Run"** (green button)
6. You should see: `Success. No rows returned`

### 1.3 Get Your API Keys
1. In Supabase, go to **Settings → API** (left sidebar → gear icon)
2. Copy these two values:
   - **Project URL** → looks like `https://abcdefgh.supabase.co`
   - **anon public** key → a long JWT token starting with `eyJ...`
3. Keep these ready for Step 3

---

## STEP 2 — Prepare Your Code for Deployment

### 2.1 Install Dependencies
Open your terminal in the project folder and run:
```bash
npm install
```

### 2.2 Create the .env File
In the project root folder, create a file named **`.env`** (no extension):
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_ADMIN_PASSWORD=your-secure-admin-password
```
Replace the values with what you copied from Supabase in Step 1.3.

### 2.3 Test Locally (Optional but Recommended)
```bash
npm run dev
```
Open http://localhost:3000 — test the contact form, admissions form, and /toppers page.

---

## STEP 3 — Push to GitHub

### 3.1 Create a GitHub Account
Go to **https://github.com** and sign up if you don't have one.

### 3.2 Create a New Repository
1. Click **"New"** (green button on GitHub)
2. Repository name: `shaurya-math`
3. Set to **Public** or **Private** (both work)
4. Click **"Create repository"**

### 3.3 Push Your Code
In your terminal (inside the project folder):
```bash
git init
git add .
git commit -m "Initial commit — Shaurya Math website"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/shaurya-math.git
git push -u origin main
```
> Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

---

## STEP 4 — Deploy on Vercel

### 4.1 Create a Vercel Account
Go to **https://vercel.com** and sign up using your **GitHub account** (click "Continue with GitHub").

### 4.2 Import Your Project
1. On the Vercel dashboard, click **"Add New… → Project"**
2. Find **`shaurya-math`** in the repository list
3. Click **"Import"**

### 4.3 Configure Build Settings
Vercel should auto-detect Vite. Verify these settings:
| Setting | Value |
|---|---|
| Framework Preset | **Vite** |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

### 4.4 Add Environment Variables ← CRITICAL STEP
Before clicking Deploy, scroll down to **"Environment Variables"** and add:

| Name | Value |
|---|---|
| `VITE_SUPABASE_URL` | `https://your-project-id.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `your-anon-key-here` |
| `VITE_ADMIN_PASSWORD` | `your-secure-password` |

> ⚠️ **Never put these in your code or commit `.env` to GitHub!**

### 4.5 Deploy!
Click **"Deploy"** and wait ~2 minutes.

You'll get a URL like: **`https://shaurya-math.vercel.app`** 🎉

---

## STEP 5 — Post-Deployment Checklist

- [ ] Open your Vercel URL and test all pages
- [ ] Submit the contact form → check Supabase: `Table Editor → inquiries`
- [ ] Go to `/admin` and login with your VITE_ADMIN_PASSWORD
- [ ] Verify toppers show up on `/toppers`
- [ ] Test WhatsApp button opens correct number
- [ ] Test on mobile (use your phone!)

---

## STEP 6 — Custom Domain (Optional)

To use a domain like `www.shauryamath.in`:
1. Buy a domain from **GoDaddy**, **Namecheap**, or any registrar (~₹500–800/yr)
2. In Vercel → your project → **Settings → Domains**
3. Add your domain
4. Vercel will show you DNS records to add at your registrar
5. Add those records (takes 1–24 hours to activate)

---

## Admin Dashboard
Access at: `https://your-site.vercel.app/admin`
Password: whatever you set as `VITE_ADMIN_PASSWORD`

From the admin dashboard you can:
- View all inquiry form submissions
- Update inquiry status (new → contacted → enrolled → closed)
- Add/remove toppers on the Wall of Fame
- Mark toppers as "featured" (shows as big card)
- Add/remove/show-hide testimonials

---

## Re-Deploying After Changes
After making any code changes:
```bash
git add .
git commit -m "your change description"
git push
```
Vercel auto-deploys every time you push to `main`. ✅

---

## Getting Help
- **Supabase docs:** https://supabase.com/docs
- **Vercel docs:** https://vercel.com/docs
- **Your project URL:** set by Vercel after deployment
