# 🚀 E-Commerce Project Deployment Guide

Bu proje CV'niz için ücretsiz olarak deploy edilebilir.

## 📋 Gerekli Environment Variables

### Frontend (.env dosyası)
```env
VITE_API_BASE_URL=https://your-backend-app.onrender.com
```

### Backend (Render/Railway environment variables)
```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
CORS_ORIGIN=https://your-frontend-app.vercel.app
```

## 🎯 Deployment Steps

### 1. MongoDB Atlas Setup
1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) ücretsiz hesap
2. Cluster oluştur (FREE tier seç)
3. Database user oluştur
4. Network Access: 0.0.0.0/0 (Allow all)
5. Connection string al

### 2. Backend Deployment (Render)
1. [Render.com](https://render.com) hesap oluştur
2. "New Web Service" → GitHub repo bağla
3. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Node Version**: 18.x

#### Environment Variables (Render):
```
NODE_ENV=production
MONGODB_URI=<MongoDB Atlas connection string>
PORT=10000
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
```

### 3. Frontend Deployment (Vercel)
1. [Vercel.com](https://vercel.com) hesap oluştur
2. GitHub repo import et
3. Settings:
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

#### Environment Variables (Vercel):
```
VITE_API_BASE_URL=https://your-backend-app.onrender.com
```

### 4. CORS Güncellemesi
Backend deploy edildikten sonra `backend/src/app.js` dosyasında:
```javascript
// Line 14'deki domain'i güncelleyin
? ['https://your-frontend-domain.vercel.app']
```

## 🌐 Demo URLs
- **Frontend**: https://your-project.vercel.app
- **Backend**: https://your-backend.onrender.com
- **Admin Panel**: https://your-project.vercel.app/admin

## 📱 Test Accounts
```
Admin Account:
Email: admin@example.com
Password: admin123

User Account:
Email: user@example.com
Password: user123
```

## 🛠️ Alternative Free Hosting

### Backend Alternatives
- **Railway**: 500 saat/ay ücretsiz
- **Cyclic**: Tamamen ücretsiz
- **Railway**: PostgreSQL dahil

### Frontend Alternatives
- **Netlify**: Unlimited static hosting
- **GitHub Pages**: Basit static sites için
- **Surge.sh**: Command line deployment

## 🎨 CV'de Nasıl Gösterilir

```
🛒 Full-Stack E-Commerce Platform
• React.js, Node.js, MongoDB
• Admin panel with product management
• JWT authentication & authorization
• Responsive design with Tailwind CSS
• Live Demo: https://your-project.vercel.app
• Source Code: https://github.com/username/repo
```

## 📊 Features to Highlight
- ✅ User Authentication & Authorization
- ✅ Product CRUD Operations
- ✅ Shopping Cart & Checkout
- ✅ Admin Dashboard
- ✅ Responsive Design
- ✅ Real-time Updates
- ✅ RESTful API
- ✅ MongoDB Database
- ✅ Modern React Hooks
- ✅ State Management

---
**Total Cost: $0/month** 💰