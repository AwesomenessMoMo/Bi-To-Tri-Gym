# Environment Variables Reference

## Backend Environment Variables

Create a `.env` file in `src/backend/` with the following:

```env
# Database Configuration
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=bitotri
MYSQL_PORT=3306

# Server Configuration
PORT=8080
NODE_ENV=development

# CORS Configuration
CLIENT_URL=http://localhost:3000
```

## Frontend Environment Variables

Create a `.env` file in `src/frontend/` with the following:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:8080
```

## Railway Production Variables

### Backend Service
- `MYSQL_HOST` - Your Railway MySQL host
- `MYSQL_USER` - Your MySQL username
- `MYSQL_PASSWORD` - Your MySQL password
- `MYSQL_DATABASE` - Database name (bitotri)
- `MYSQL_PORT` - Usually 3306
- `CLIENT_URL` - Your frontend Railway URL
- `PORT` - Auto-set by Railway
- `NODE_ENV` - Set to `production`

### Frontend Service
- `REACT_APP_API_URL` - Your backend Railway URL
- `PORT` - Auto-set by Railway

