# 🚂 Step-by-Step Railway Deployment Guide

## Prerequisites Checklist

- [ ] Code is working locally (backend on 8080, frontend on 3000)
- [ ] GitHub account
- [ ] Code pushed to GitHub repository
- [ ] Railway account (sign up at [railway.app](https://railway.app))

---

## Step 1: Prepare Your Code

### 1.1 Commit All Changes

```bash
cd "C:\Users\Mohamad el Masri\Desktop\Web 2\Bi To Tri Gym"
git add .
git commit -m "Ready for Railway deployment"
git push origin main
```

**Verify:** Check your GitHub repository - all files should be there.

---

## Step 2: Create Railway Account & Project

### 2.1 Sign Up / Login
1. Go to [railway.app](https://railway.app)
2. Click **"Login"** or **"Start a New Project"**
3. Sign in with **GitHub** (recommended)

### 2.2 Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Authorize Railway to access your GitHub (if first time)
4. Select your repository: **"Bi To Tri Gym"** (or your repo name)
5. Click **"Deploy Now"**

Railway will start deploying, but we need to configure it properly first.

---

## Step 3: Deploy Backend Service

### 3.1 Configure Backend Service
1. In Railway dashboard, you'll see a service being deployed
2. Click on the service (or rename it to "Backend")
3. Go to **Settings** tab
4. Scroll to **"Root Directory"**
5. Set Root Directory to: `src/backend`
6. Click **"Save"**

### 3.2 Add MySQL Database Service
1. In your Railway project, click **"+ New"**
2. Select **"Database"** → **"MySQL"**
3. Railway will create a MySQL database
4. Wait for it to provision (takes 1-2 minutes)

### 3.3 Get MySQL Connection Details
1. Click on the **MySQL** service
2. Go to **"Variables"** tab
3. You'll see these variables (Railway auto-generates them):
   - `MYSQLHOST` = `mysql.railway.internal`
   - `MYSQLUSER` = `root`
   - `MYSQLPASSWORD` = `(auto-generated password)`
   - `MYSQLDATABASE` = `railway`
   - `MYSQLPORT` = `3306`
4. **Copy these values** - you'll need them

### 3.4 Create bitotri Database
**Option A: Using Railway Database Interface**
1. Click on MySQL service
2. Go to **"Data"** or **"Connect"** tab
3. Use Railway's database console
4. Run:
   ```sql
   CREATE DATABASE bitotri;
   ```

**Option B: Using MySQL Client**
1. Get connection string from MySQL service → **Variables** → `MYSQL_PUBLIC_URL`
2. Connect using MySQL client:
   ```bash
   mysql -h interchange.proxy.rlwy.net -P [PORT] -u root -p
   ```
3. Enter password from `MYSQLPASSWORD`
4. Run:
   ```sql
   CREATE DATABASE bitotri;
   EXIT;
   ```

### 3.5 Import Database Schema
**Using MySQL Client:**
```bash
mysql -h interchange.proxy.rlwy.net -P [PORT] -u root -p bitotri < bitotri.sql
```

**Or using Railway Database Interface:**
1. Select `bitotri` database
2. Go to Import/SQL tab
3. Copy contents of `bitotri.sql`
4. Paste and execute

### 3.6 Configure Backend Environment Variables
1. Go back to **Backend** service
2. Click **"Variables"** tab
3. Add these variables:

   ```
   MYSQL_HOST=mysql.railway.internal
   MYSQL_USER=root
   MYSQL_PASSWORD=[paste from MYSQLPASSWORD]
   MYSQL_DATABASE=bitotri
   MYSQL_PORT=3306
   NODE_ENV=production
   CLIENT_URL=https://your-frontend.railway.app
   PORT=8080
   ```

   **Note:** 
   - Replace `[paste from MYSQLPASSWORD]` with actual password from MySQL service
   - For `CLIENT_URL`, you'll update this after deploying frontend
   - Use `mysql.railway.internal` for internal connection (faster, free)

4. Click **"Add"** for each variable

### 3.7 Get Backend URL
1. Go to Backend service → **Settings** → **Domains**
2. Click **"Generate Domain"** (if not auto-generated)
3. Copy the domain (e.g., `your-backend.railway.app`)
4. **Save this URL** - you'll need it for frontend

### 3.8 Verify Backend Deployment
1. Wait for deployment to complete (check **"Deployments"** tab)
2. Test health endpoint:
   ```
   https://your-backend.railway.app/api/health
   ```
3. Should return: `{"status":"ok","message":"Backend and database are connected"}`

---

## Step 4: Deploy Frontend Service

### 4.1 Create Frontend Service
1. In Railway project, click **"+ New"**
2. Select **"Deploy from GitHub repo"**
3. Select the **same repository** (Bi To Tri Gym)
4. Click **"Deploy Now"**

### 4.2 Configure Frontend Service
1. Click on the new service (rename to "Frontend")
2. Go to **Settings** tab
3. Set **Root Directory** to: `src/frontend`
4. Click **"Save"**

### 4.3 Configure Frontend Environment Variables
1. Go to **Variables** tab
2. Add:
   ```
   REACT_APP_API_URL=https://your-backend.railway.app
   PORT=3000
   ```
   **Replace** `your-backend.railway.app` with your actual backend URL from Step 3.7

3. Click **"Add"**

### 4.4 Get Frontend URL
1. Go to Frontend service → **Settings** → **Domains**
2. Click **"Generate Domain"** (if not auto-generated)
3. Copy the domain (e.g., `your-frontend.railway.app`)
4. **Save this URL**

### 4.5 Update Backend CORS
1. Go back to **Backend** service → **Variables**
2. Update `CLIENT_URL`:
   ```
   CLIENT_URL=https://your-frontend.railway.app
   ```
   **Replace** with your actual frontend URL
3. Railway will automatically redeploy backend

---

## Step 5: Verify Deployment

### 5.1 Test Backend
- Health: `https://your-backend.railway.app/api/health`
- Coaches: `https://your-backend.railway.app/api/coaches`
- Supplements: `https://your-backend.railway.app/api/supplements`
- Clothes: `https://your-backend.railway.app/api/clothes`

### 5.2 Test Frontend
- Open: `https://your-frontend.railway.app`
- Should load your React app
- Check browser console for errors
- Test navigation and API calls

### 5.3 Test Full Flow
1. Visit frontend URL
2. Try to load data (coaches, supplements, etc.)
3. Check if API calls work
4. Verify no CORS errors

---

## Step 6: Troubleshooting

### Backend Not Connecting to Database
- ✅ Verify MySQL variables are correct
- ✅ Check database `bitotri` exists
- ✅ Verify `bitotri.sql` was imported
- ✅ Check backend logs in Railway dashboard

### Frontend Can't Connect to Backend
- ✅ Verify `REACT_APP_API_URL` is correct
- ✅ Check backend is running (health endpoint)
- ✅ Verify CORS `CLIENT_URL` matches frontend URL exactly
- ✅ Check browser console for errors

### CORS Errors
- ✅ Ensure `CLIENT_URL` in backend matches frontend URL exactly
- ✅ Use `https://` (not `http://`)
- ✅ No trailing slashes

### Build Fails
- ✅ Check Root Directory is set correctly
- ✅ Verify `nixpacks.toml` files exist
- ✅ Check build logs in Railway dashboard

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Railway project created
- [ ] Backend service deployed (Root: `src/backend`)
- [ ] MySQL database service added
- [ ] `bitotri` database created
- [ ] `bitotri.sql` imported
- [ ] Backend environment variables configured
- [ ] Backend URL obtained
- [ ] Frontend service deployed (Root: `src/frontend`)
- [ ] Frontend environment variables configured
- [ ] Frontend URL obtained
- [ ] Backend `CLIENT_URL` updated
- [ ] Backend health check passes
- [ ] Frontend loads correctly
- [ ] API endpoints return data
- [ ] No CORS errors

---

## 🎉 You're Live!

Your application is now deployed on Railway!

**Backend:** `https://your-backend.railway.app`  
**Frontend:** `https://your-frontend.railway.app`

---

## 📝 Quick Reference

### Backend Environment Variables
```
MYSQL_HOST=mysql.railway.internal
MYSQL_USER=root
MYSQL_PASSWORD=[from MySQL service]
MYSQL_DATABASE=bitotri
MYSQL_PORT=3306
NODE_ENV=production
CLIENT_URL=https://your-frontend.railway.app
PORT=8080
```

### Frontend Environment Variables
```
REACT_APP_API_URL=https://your-backend.railway.app
PORT=3000
```

### Important URLs
- Railway Dashboard: https://railway.app/dashboard
- Your Backend: `https://your-backend.railway.app`
- Your Frontend: `https://your-frontend.railway.app`

---

## 🔄 Updating Your App

After making changes:
1. Commit and push to GitHub
2. Railway automatically redeploys
3. Changes go live in 1-2 minutes

---

Need help? Check Railway logs in the dashboard or see `DEPLOY_TO_RAILWAY.md` for more details.

