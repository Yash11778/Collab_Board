# 🚨 VERCEL 404 FIX - FOLLOW THESE EXACT STEPS

## Problem: 404 NOT_FOUND Error

This happens because Vercel settings are not configured properly for the monorepo structure.

---

## ✅ SOLUTION: Configure Vercel Settings Manually

### Step 1: Go to Vercel Dashboard

1. Visit: https://vercel.com/yash11778/collab-board
2. Go to **Settings** tab

---

### Step 2: Update Project Settings

#### A. General Settings:

**Root Directory:**
```
hackathon
```
⚠️ **VERY IMPORTANT!** Set this to `hackathon`

**Framework Preset:**
```
Vite
```

**Build Command:**
```
npm run build
```
(Leave as default)

**Output Directory:**
```
dist
```
(Leave as default)

**Install Command:**
```
npm install
```
(Leave as default)

---

### Step 3: Add Environment Variable

Go to **Settings** → **Environment Variables**

Add:
```
Name: VITE_SERVER_URL
Value: https://your-backend-url.vercel.app
```

⚠️ Replace with your actual backend URL!

---

### Step 4: Redeploy

1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click **⋯** (three dots)
4. Click **Redeploy**
5. ✅ **Check "Use existing Build Cache"** (optional)
6. Click **Redeploy**

---

## 🎯 WHY THIS FIXES THE 404:

**Before:**
- Vercel tries to build from root directory
- Can't find package.json in root
- Build fails → 404

**After:**
- Root Directory = `hackathon`
- Vercel finds package.json in hackathon folder
- Builds properly with Vite
- Routes work correctly ✅

---

## 📋 Quick Checklist:

- [ ] Root Directory = `hackathon`
- [ ] Framework = Vite
- [ ] VITE_SERVER_URL environment variable added
- [ ] Redeployed project
- [ ] Wait 2-3 minutes for deployment
- [ ] Test: https://collab-board.vercel.app

---

## 🐛 Still Getting 404?

### Check Deployment Logs:

1. Go to **Deployments**
2. Click on latest deployment
3. Check **Building** logs
4. Look for errors like:
   - "package.json not found"
   - "Build failed"
   - "Command not found"

### If Build Failed:

Make sure these files exist in `hackathon` folder:
- ✅ package.json
- ✅ vite.config.js
- ✅ index.html
- ✅ src/ folder

---

## 🚀 Alternative: Create New Vercel Project

If settings don't save properly:

1. **Delete current deployment** (optional)
2. **Create new project:**
   - Go to: https://vercel.com/new
   - Import: `Yash11778/Collab_Board`
   - **Root Directory:** `hackathon` ⚠️
   - **Framework:** Vite
   - Add environment variable: `VITE_SERVER_URL`
   - Deploy!

---

## 💡 Important Notes:

1. **Root Directory is CRITICAL:**
   - Without setting `hackathon`, Vercel looks in wrong place
   - This causes 404 NOT_FOUND error

2. **vercel.json location:**
   - Root vercel.json is for routing
   - hackathon/vercel.json is for build config
   - Both are needed!

3. **After changing settings:**
   - ALWAYS redeploy
   - Settings don't apply to old deployments
   - Only new deployments use new settings

---

**Follow these steps exactly and 404 will be fixed!** 🎉
