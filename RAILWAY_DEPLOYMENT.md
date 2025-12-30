# Railway Deployment Guide

This guide will help you deploy your Bi To Tri Gym application on Railway.

## Prerequisites

1. A Railway account (sign up at https://railway.app)
2. Your MySQL database (you can use Railway's MySQL service or an external database)

## Deployment Steps

### 1. Deploy Backend Service

1. Go to your Railway dashboard
2. Click "New Project" → "Deploy from GitHub repo" (or use Railway CLI)
3. Select your repository
4. **Set the Root Directory to:** `src/backend`
5. Add the following environment variables:
   - `MYSQL_HOST` - Your MySQL host (e.g., `containers-us-west-xxx.railway.app`)
   - `MYSQL_USER` - Your MySQL username
   - `MYSQL_PASSWORD` - Your MySQL password
   - `MYSQL_DATABASE` - Your database name (e.g., `bitotri`)
   - `MYSQL_PORT` - Your MySQL port (usually `3306`)
   - `CLIENT_URL` - Your frontend URL (will be set after deploying frontend)
   - `PORT` - Railway will set this automatically
   - `NODE_ENV` - Set to `production`

6. Railway will automatically:
   - Install dependencies (`npm install`)
   - Run `npm start` to start the server

### 2. Deploy Frontend Service

1. Create a new service in the same Railway project
2. Select your repository again
3. **Set the Root Directory to:** `src/frontend`
4. Add the following environment variables:
   - `REACT_APP_API_URL` - Your backend URL (from step 1, e.g., `https://your-backend.railway.app`)
   - `PORT` - Railway will set this automatically

5. Railway will automatically:
   - Install dependencies (`npm install`)
   - Build the React app (`npm run build`)
   - Serve the built files

### 3. Update Environment Variables

After both services are deployed:

1. **Backend:** Update `CLIENT_URL` to your frontend's Railway URL
2. **Frontend:** Update `REACT_APP_API_URL` to your backend's Railway URL

### 4. Database Setup

1. If using Railway's MySQL service:
   - Add MySQL service to your project
   - Railway will provide connection details automatically
   - Import your `bitotri.sql` file using Railway's database interface or MySQL client

2. If using external MySQL:
   - Use your existing database credentials
   - Make sure your database allows connections from Railway's IP addresses

## Environment Variables Summary

### Backend (`src/backend`)
```
MYSQL_HOST=your-mysql-host
MYSQL_USER=your-mysql-user
MYSQL_PASSWORD=your-mysql-password
MYSQL_DATABASE=bitotri
MYSQL_PORT=3306
CLIENT_URL=https://your-frontend.railway.app
PORT=8080 (auto-set by Railway)
NODE_ENV=production
```

### Frontend (`src/frontend`)
```
REACT_APP_API_URL=https://your-backend.railway.app
PORT=3000 (auto-set by Railway)
```

## Important Notes

1. **CORS:** The backend is configured to accept requests from your frontend URL
2. **Static Files:** The backend serves uploaded images from `/uploads` directory
3. **Build:** The frontend will be built automatically on deployment
4. **Ports:** Railway automatically assigns ports via the `PORT` environment variable

## Troubleshooting

- If the backend fails to start, check the logs in Railway dashboard
- Ensure all environment variables are set correctly
- Verify database connection details
- Check that CORS `CLIENT_URL` matches your frontend URL exactly
- Make sure the MySQL database is accessible from Railway's network

## Custom Domains

Railway provides default domains, but you can add custom domains:
1. Go to your service settings
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update environment variables with the new domain

