x# 🚀 DEPLOY TO VERCEL - COMPLETE GUIDE

## ✅ PRE-DEPLOYMENT VERIFICATION COMPLETE!

Your project is **READY FOR DEPLOYMENT**. Follow these steps carefully for a successful one-shot deployment.

---

## 📋 WHAT YOU NEED (Before Starting)

### 1. **MongoDB Atlas Database** (FREE)
   - Sign up: https://www.mongodb.com/cloud/atlas
   - Create a FREE cluster (M0 Sandbox)
   - Create database user with password
   - Add `0.0.0.0/0` to Network Access (for Vercel)
   - Get your connection string

### 2. **GitHub Account**
   - Your code needs to be on GitHub

### 3. **Vercel Account** (FREE)
   - Sign up: https://vercel.com
   - Connect your GitHub account

### 4. **Your Generated JWT Secret**
   ```
   257da4b5300c116f8c1a4917cc3990a0bed84b07d42827647cd9021c1b767f1a
   ```
   ⚠️ **Keep this secret! You'll need it in Step 5.**

---

## 🎯 DEPLOYMENT STEPS

### **STEP 1: Push to GitHub** (5 minutes)

```powershell
# Make sure you're in the project root
cd "d:\HACKATHONS\demo raisoni"

# Add all files
git add .

# Commit changes
git commit -m "Ready for Vercel deployment"

# Create a new repo on GitHub (if you haven't already)
# Then push your code:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

---

### **STEP 2: Set Up MongoDB Atlas** (10 minutes)

1. **Go to:** https://www.mongodb.com/cloud/atlas/register

2. **Create Account** (Google sign-in works)

3. **Create FREE Cluster:**
   - Choose M0 (FREE)
   - Select region closest to you
   - Name it: `collabboard`

4. **Create Database User:**
   - Database Access → Add New User
   - Username: `collabuser` (or your choice)
   - Password: Click "Autogenerate Secure Password" → **COPY IT!**
   - Database User Privileges: Read and write to any database

5. **Network Access:**
   - Network Access → Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

6. **Get Connection String:**
   - Clusters → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your password from step 4
   - Example result:
     ```
     mongodb+srv://collabuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/collabboard?retryWrites=true&w=majority
     ```
   - **SAVE THIS!** You'll need it in Step 5.

---

### **STEP 3: Deploy Backend to Vercel** (10 minutes)

1. **Go to:** https://vercel.com/dashboard

2. **Click:** "Add New" → "Project"

3. **Import your GitHub repository**

4. **IMPORTANT - Configure Project:**
   - **Framework Preset:** Other
   - **Root Directory:** Click "Edit" → Type: `backend` → Save
   - **Build Command:** Leave empty
   - **Output Directory:** Leave empty
   - **Install Command:** `npm install`

5. **Add Environment Variables** (Click "Environment Variables" dropdown):
   
   Add these 5 variables one by one:
   
   | Variable Name | Value |
   |--------------|-------|
   | `MONGODB_URI` | Your connection string from Step 2 |
   | `JWT_SECRET` | `257da4b5300c116f8c1a4917cc3990a0bed84b07d42827647cd9021c1b767f1a` |
   | `NODE_ENV` | `production` |
   | `PORT` | `5000` |
   | `IN_MEMORY_DB` | `false` |

6. **Click "Deploy"** and wait (~2 minutes)

7. **✅ Copy your backend URL:**
   - After deployment, you'll see: `https://your-backend-name.vercel.app`
   - **SAVE THIS URL!** You'll need it in Step 4.

8. **Test it works:**
   - Open: `https://your-backend-name.vercel.app/api/test`
   - Should show: `{"message":"API is working"}`

---

### **STEP 4: Deploy Frontend to Vercel** (10 minutes)

1. **Go back to:** https://vercel.com/dashboard

2. **Click:** "Add New" → "Project"

3. **Import the SAME GitHub repository** (yes, again!)

4. **IMPORTANT - Configure Project:**
   - **Framework Preset:** Vite
   - **Root Directory:** Click "Edit" → Type: `hackathon` → Save
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

5. **Add Environment Variables:**
   
   Add this 1 variable:
   
   | Variable Name | Value |
   |--------------|-------|
   | `VITE_SERVER_URL` | Your backend URL from Step 3 (e.g., `https://your-backend-name.vercel.app`) |
   
   ⚠️ **IMPORTANT:** No trailing slash!

6. **Click "Deploy"** and wait (~2 minutes)

7. **✅ Copy your frontend URL:**
   - After deployment: `https://your-frontend-name.vercel.app`
   - **SAVE THIS URL!** You'll need it in Step 5.

---

### **STEP 5: Update Backend CORS** (5 minutes)

⚠️ **CRITICAL STEP** - Without this, frontend can't connect to backend!

1. **Go to your BACKEND project** in Vercel dashboard

2. **Click:** Settings → Environment Variables

3. **Add New Variable:**
   
   | Variable Name | Value |
   |--------------|-------|
   | `FRONTEND_URL` | Your frontend URL from Step 4 (e.g., `https://your-frontend-name.vercel.app`) |

4. **Redeploy Backend:**
   - Go to "Deployments" tab
   - Click "..." on the latest deployment
   - Click "Redeploy"
   - Wait ~1 minute

---

### **STEP 6: TEST YOUR APP** (5 minutes)

1. **Open your frontend URL:** `https://your-frontend-name.vercel.app`

2. **Register a new account:**
   - Click "Register"
   - Enter username, email, password
   - Click "Register"

3. **Create a board:**
   - Click "Create New Board"
   - Enter a name
   - Click "Create"

4. **Test features:**
   - ✅ Draw something
   - ✅ Send a chat message
   - ✅ Open board in another browser tab (test collaboration)
   - ✅ Check if cursor positions sync

5. **✅ If everything works, YOU'RE DONE!** 🎉

---

## 🐛 TROUBLESHOOTING

### Issue: "Cannot connect to backend"
**Solution:**
- Check if `VITE_SERVER_URL` in frontend matches your backend URL
- Make sure backend is deployed and responding
- Test backend URL directly: `https://your-backend-name.vercel.app/api/test`

### Issue: "CORS Error" in browser console
**Solution:**
- Make sure you completed Step 5
- Verify `FRONTEND_URL` is set in backend environment variables
- Redeploy backend after adding the variable

### Issue: "MongoDB connection failed"
**Solution:**
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas Network Access allows 0.0.0.0/0
- Test database user credentials

### Issue: "Socket connection failed"
**Solution:**
- Check browser console for specific error
- Verify `VITE_SERVER_URL` is set correctly
- Make sure CORS is configured (Step 5)

### Issue: "404 when refreshing pages"
**Solution:**
- Already fixed! The `hackathon/vercel.json` handles this
- If still happening, verify `vercel.json` exists in hackathon folder

---

## 📝 YOUR DEPLOYMENT INFORMATION

Fill this out for reference:

**MongoDB Connection String:**
```
_______________________________________________________
```

**JWT Secret:**
```
257da4b5300c116f8c1a4917cc3990a0bed84b07d42827647cd9021c1b767f1a
```

**Backend URL:**
```
https://_________________________________.vercel.app
```

**Frontend URL:**
```
https://_________________________________.vercel.app
```

**GitHub Repository:**
```
https://github.com/_______________/_______________
```

---

## 🎉 SUCCESS!

Your CollabBoard is now live with:
- ✅ Scalable frontend on Vercel
- ✅ Serverless backend on Vercel
- ✅ Real-time WebSocket collaboration
- ✅ MongoDB data persistence
- ✅ Secure JWT authentication
- ✅ Auto-deployment on git push

**Share your app:** Copy your frontend URL and share it with anyone!

---

## 🔄 UPDATING YOUR APP

When you make changes:

```powershell
git add .
git commit -m "Your changes"
git push
```

Vercel will automatically redeploy both frontend and backend!

---

## 💡 PRO TIPS

1. **Monitor your app:** Vercel dashboard → Your project → Analytics
2. **Check logs:** Vercel dashboard → Your project → Deployments → View Function Logs
3. **Custom domain:** Vercel dashboard → Your project → Settings → Domains
4. **Environment variables:** Can be updated anytime in Settings → Environment Variables
5. **Rollback:** If something breaks, Vercel → Deployments → Click "..." on previous version → "Promote to Production"

---

## 🆘 NEED HELP?

1. Check Vercel deployment logs for errors
2. Check browser console (F12) for frontend errors
3. Test backend directly: `https://your-backend.vercel.app/api/test`
4. Verify all environment variables are set correctly
5. Make sure MongoDB is accessible (Network Access: 0.0.0.0/0)

---

**Estimated Total Time:** 45 minutes

**Cost:** $0 (All free tiers)

**Difficulty:** ⭐⭐⭐ (Medium - but we've automated most of it!)

---

## ✅ DEPLOYMENT COMPLETE CHECKLIST

Before marking this as done, verify:

- [ ] Backend responds at `/api/test`
- [ ] Frontend loads without errors
- [ ] Can register a new user
- [ ] Can login
- [ ] Can create a board
- [ ] Can draw on canvas
- [ ] Can send chat messages
- [ ] Multiple tabs can see each other's cursors
- [ ] Real-time collaboration works

**ALL DONE? CONGRATULATIONS! 🎊**

Your CollabBoard is now live and ready for production use!

Share it with the world: **`https://your-frontend-name.vercel.app`**
