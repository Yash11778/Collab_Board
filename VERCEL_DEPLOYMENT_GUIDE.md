# 🚀 Vercel Deployment Guide - CollabBoard

## 📋 Prerequisites
1. GitHub account
2. Vercel account (sign up at vercel.com)
3. MongoDB Atlas account (free tier available at mongodb.com/cloud/atlas)

---

## 🎯 Deployment Steps (One-Shot Success!)

### **Step 1: Prepare MongoDB Database**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a **FREE** cluster (M0 Sandbox)
3. Create a database user (username & password)
4. Add `0.0.0.0/0` to Network Access (for Vercel access)
5. Get your connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/collabboard?retryWrites=true&w=majority`

---

### **Step 2: Push Code to GitHub**
```powershell
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit for Vercel deployment"

# Create GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

---

### **Step 3: Deploy Backend to Vercel**

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**

2. **Click "Add New" → "Project"**

3. **Import your GitHub repository**

4. **Configure Backend Project:**
   - **Framework Preset:** Other
   - **Root Directory:** `backend` ⬅️ **IMPORTANT!**
   - **Build Command:** Leave empty
   - **Output Directory:** Leave empty
   - **Install Command:** `npm install`

5. **Add Environment Variables** (Click "Environment Variables"):
   ```
   PORT = 5000
   NODE_ENV = production
   MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/collabboard?retryWrites=true&w=majority
   JWT_SECRET = your-super-secret-random-string-here-minimum-32-chars
   IN_MEMORY_DB = false
   ```
   
   💡 **Generate JWT Secret:**
   ```powershell
   # Run this in PowerShell to generate a secure JWT secret
   -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
   ```

6. **Deploy!** Click "Deploy"

7. **Copy your backend URL** (e.g., `https://your-backend-name.vercel.app`)

---

### **Step 4: Deploy Frontend to Vercel**

1. **Go back to Vercel Dashboard**

2. **Click "Add New" → "Project"**

3. **Import the SAME GitHub repository**

4. **Configure Frontend Project:**
   - **Framework Preset:** Vite
   - **Root Directory:** `hackathon` ⬅️ **IMPORTANT!**
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

5. **Add Environment Variables:**
   ```
   VITE_SERVER_URL = https://your-backend-name.vercel.app
   ```
   ⚠️ Replace with YOUR actual backend URL from Step 3!

6. **Deploy!** Click "Deploy"

7. **Your app is live!** 🎉

---

### **Step 5: Update Backend CORS** (Critical!)

1. After frontend deploys, copy your frontend URL (e.g., `https://your-frontend-name.vercel.app`)

2. Go to your **backend project** in Vercel → Settings → Environment Variables

3. Add new variable:
   ```
   FRONTEND_URL = https://your-frontend-name.vercel.app
   ```

4. Update `backend/server.js` CORS configuration:
   - Edit lines 26-32 to include your frontend URL
   - Or better yet, use an environment variable approach (see below)

5. **Redeploy backend** (Vercel → Deployments → Latest → "Redeploy")

---

## 🔧 Optional: Dynamic CORS Configuration

Update `backend/server.js` to use environment variable for CORS:

```javascript
// Replace the CORS config (around line 26)
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    process.env.FRONTEND_URL || 'https://collab-board-updated-c4cb.vercel.app'
  ].filter(Boolean),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));

// Also update Socket.io CORS (around line 39)
const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      process.env.FRONTEND_URL || 'https://collab-board-updated-c4cb.vercel.app'
    ].filter(Boolean),
    methods: ['GET', 'POST'],
    credentials: true
  },
});
```

---

## ✅ Verify Deployment

### Test Backend:
```
https://your-backend-name.vercel.app/api/test
```
Should return: `{"message":"API is working"}`

### Test Frontend:
1. Open: `https://your-frontend-name.vercel.app`
2. Register a new account
3. Create a board
4. Test drawing and chat features

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to backend"
- ✅ Check VITE_SERVER_URL in frontend environment variables
- ✅ Ensure backend is deployed and responding
- ✅ Check browser console for CORS errors

### Issue: "MongoDB connection failed"
- ✅ Verify MONGODB_URI in backend environment variables
- ✅ Check MongoDB Atlas network access (0.0.0.0/0)
- ✅ Verify database user credentials

### Issue: "Socket connection failed"
- ✅ Check CORS configuration includes your frontend URL
- ✅ Verify VITE_SERVER_URL is set correctly
- ✅ Test backend URL directly in browser

### Issue: "404 on page refresh"
- ✅ Already configured in `hackathon/vercel.json` rewrites
- ✅ Ensure `vercel.json` exists in hackathon folder

---

## 🔐 Security Checklist

- [ ] Change JWT_SECRET to a strong random string
- [ ] Use strong MongoDB password
- [ ] Don't commit `.env` files to Git
- [ ] Restrict MongoDB network access after testing
- [ ] Enable Vercel deployment protection (optional)

---

## 📱 Custom Domain (Optional)

1. Go to your project in Vercel
2. Settings → Domains
3. Add your custom domain
4. Update DNS records as instructed
5. Update VITE_SERVER_URL and CORS accordingly

---

## 🎉 You're Done!

Your CollabBoard is now live on Vercel with:
- ✅ Scalable frontend hosting
- ✅ Serverless backend
- ✅ Real-time WebSocket support
- ✅ MongoDB persistence
- ✅ Secure authentication

**Share your board:** `https://your-frontend-name.vercel.app`

---

## 📞 Need Help?

If you encounter any issues:
1. Check Vercel deployment logs
2. Check browser console
3. Verify all environment variables
4. Test backend API endpoints directly

**Pro Tip:** Keep your backend and frontend URLs handy - you'll need them for updates!
