# FieldProject

A full-stack collaborative field management platform built with **React + Vite** (frontend) and **Node.js + Express + MongoDB** (backend).

---

## 🚀 Quick Start (Main developer)

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd FieldProject
```

### 2. Install all dependencies
```bash
npm run install:all
```

### 3. Configure environment
The server needs a `.env` file. Copy the example and fill in your values:
```bash
cp server/.env.example server/.env
```

Edit `server/.env`:
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/fieldproject?retryWrites=true&w=majority
JWT_SECRET=<your_random_secret>
CLIENT_URL=http://localhost:5173
```

### 4. Run both frontend + backend together
```bash
npm run dev
```

- **Frontend** → http://localhost:5173  
- **Backend API** → http://localhost:5000/api/v1

---

## 👥 Collaborators — Setup Guide

> **Important:** The backend (Express + MongoDB) runs only on the lead developer's machine.  
> Collaborators only need to run the **frontend**.

### Steps for collaborators:

1. **Clone the repo**
   ```bash
   git clone <your-repo-url>
   cd FieldProject
   ```

2. **Install client dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Set the API base URL**  
   Create a file `client/.env.local` (this file is gitignored):
   ```
   VITE_API_URL=http://<lead-dev-local-ip>:5000
   ```
   > Ask the main developer for their local IP (e.g. `192.168.1.x`). They must have the server running.

4. **Update vite config**  
   In `client/vite.config.js`, the proxy target should point to the server IP:
   ```js
   proxy: {
     '/api': {
       target: process.env.VITE_API_URL || 'http://localhost:5000',
       ...
     }
   }
   ```
   *(Already configured — just set the env var above)*

5. **Run only the frontend**
   ```bash
   npm run dev
   ```

---

## 📁 Project Structure

```
FieldProject/
├── package.json          ← Root — run both with `npm run dev`
├── client/               ← React + Vite frontend
│   ├── src/
│   │   ├── api/          ← Axios API services
│   │   ├── components/   ← Shared components (ProtectedRoute)
│   │   ├── context/      ← AuthContext (global auth state)
│   │   ├── pages/        ← Login, Register, Dashboard
│   │   └── styles/       ← Page-level CSS
│   └── vite.config.js    ← Dev proxy → :5000
└── server/               ← Node.js + Express backend
    ├── src/
    │   ├── config/       ← DB connection, env vars
    │   ├── features/
    │   │   └── auth/     ← model, service, controller, routes
    │   ├── middleware/   ← errorHandler, auth.middleware
    │   └── routes/       ← API route index
    └── .env              ← Secret config (never commit!)
```

---

## 🔌 API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/v1/health` | ❌ | Health check |
| POST | `/api/v1/auth/register` | ❌ | Register new user |
| POST | `/api/v1/auth/login` | ❌ | Login & receive JWT |
| GET | `/api/v1/auth/me` | ✅ Bearer | Get current user |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 8, React Router v7, Axios |
| Backend | Node.js, Express 5, Mongoose |
| Database | MongoDB (Atlas recommended for team use) |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| Dev tooling | nodemon, concurrently, ESLint |

---

## ☁️ MongoDB Atlas (Recommended for Team)

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) and create a free cluster
2. Add all team member IPs to the **Network Access** list (or use `0.0.0.0/0` for dev)
3. Create a DB user and copy the connection string into `server/.env` as `MONGODB_URI`
4. Now all API calls from collaborators will hit the same shared database ✅