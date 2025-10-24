# ✅ Vercel Deployment Checklist

## Before You Deploy

### 1. MongoDB Setup
- [ ] Create MongoDB Atlas account
- [ ] Create a free cluster (M0)
- [ ] Create database user with password
- [ ] Add 0.0.0.0/0 to Network Access
- [ ] Copy connection string

### 2. GitHub Setup
- [ ] Code committed to GitHub
- [ ] Repository is public or Vercel has access

---

## Backend Deployment

### 3. Deploy Backend First
- [ ] Import project in Vercel
- [ ] Set Root Directory to `backend`
- [ ] Add environment variables:
  - [ ] `MONGODB_URI`
  - [ ] `JWT_SECRET` (32+ random characters)
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=5000`
  - [ ] `IN_MEMORY_DB=false`
- [ ] Deploy
- [ ] **Copy backend URL** → ___________________________________

### 4. Test Backend
- [ ] Visit: `https://your-backend.vercel.app/api/test`
- [ ] Should show: `{"message":"API is working"}`

---

## Frontend Deployment

### 5. Deploy Frontend
- [ ] Import SAME GitHub repo in Vercel
- [ ] Set Root Directory to `hackathon`
- [ ] Set Framework Preset to `Vite`
- [ ] Add environment variable:
  - [ ] `VITE_SERVER_URL` = (Your backend URL from step 3)
- [ ] Deploy
- [ ] **Copy frontend URL** → ___________________________________

---

## Final Configuration

### 6. Update Backend CORS
- [ ] Go to backend project in Vercel
- [ ] Settings → Environment Variables
- [ ] Add: `FRONTEND_URL` = (Your frontend URL from step 5)
- [ ] Redeploy backend

---

## Testing

### 7. Test Complete App
- [ ] Open frontend URL
- [ ] Register new account
- [ ] Login works
- [ ] Create a board
- [ ] Drawing works
- [ ] Chat works
- [ ] Multiple users can collaborate
- [ ] Socket connection is stable

---

## Your Deployment URLs

**Backend API:** ___________________________________

**Frontend App:** ___________________________________

**MongoDB Database:** ___________________________________

---

## Common Issues & Quick Fixes

### ❌ "Cannot connect to backend"
→ Check `VITE_SERVER_URL` matches your backend URL

### ❌ "CORS error"
→ Add `FRONTEND_URL` to backend environment variables

### ❌ "MongoDB connection failed"
→ Check MongoDB URI and network access (0.0.0.0/0)

### ❌ "Socket not connecting"
→ Verify CORS includes frontend URL in backend/server.js

### ❌ "404 on refresh"
→ Already fixed in hackathon/vercel.json

---

## 🎉 Success!

Once all checkboxes are ticked, your app is live and ready to share!

**Next Steps:**
1. Share your frontend URL with users
2. Monitor Vercel logs for any issues
3. Consider adding a custom domain
4. Set up deployment protection (optional)

---

## Quick Redeploy

If you make changes:

```powershell
git add .
git commit -m "Your changes"
git push
```

Vercel will automatically redeploy both frontend and backend!
