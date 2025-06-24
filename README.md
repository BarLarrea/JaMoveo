# 🎵 JaMoveo – Real-Time Band Rehearsal Web App

**JaMoveo** is a full-stack web application that allows musicians to rehearse together in real time. Each participant connects via phone or desktop, selects a role, and views a synchronized live session controlled by an admin.

---

## 🌍 Live Deployments

- **Frontend:** [https://ja-moveo-two.vercel.app](https://ja-moveo-two.vercel.app)  
- **Backend:** [https://jamoveo-3gek.onrender.com](https://jamoveo-3gek.onrender.com)

---

## 👥 User Types

### 🎶 Regular Users (Players)
- Register via: `/register`
- Choose your role:
  - If you're a **singer**, you do **not** need to choose an instrument.
  - If you're a **player**, you **must** select an instrument.
- During a live session:
  - **Singers** see only the lyrics.
  - **Players** see both **lyrics and chords**.

### 🎛️ Admins
- Register via a dedicated URL: `/admin/register`
- Must enter a **secret admin code** for verification.
- When signing up, an admin can:
  - Have no role at all,
  - Be a singer,
  - Or be a player (with an instrument).
- Can:
  - Search for songs (supports Hebrew & English; **contain search** by song title or artist)
  - Choose a song and broadcast it to all connected users
  - Toggle auto-scrolling of lyrics
  - Quit the session for everyone

---

## 🔐 Admin Access

To create an admin account, go to:  
👉 [`/register/admin`](https://ja-moveo-two.vercel.app/register/admin)  
Use the following admin code:  
```
MOVEO-2025-ADMIN
```

---

## 📦 Project Structure

```
JaMoveo/
├── client/   # React frontend (Vercel)
└── server/   # Node.js backend (Render)
```

---

## 🛠️ Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React, TailwindCSS, Vite            |
| Realtime  | Socket.IO (Client & Server)         |
| Backend   | Express.js, MongoDB (Mongoose)      |
| Auth      | JWT (access tokens)                 |
| Deploy    | Vercel (frontend), Render (backend) |

---

## 🔄 Behavior Overview

- **Before song selection:**  
  Users see “Waiting for next song”.

- **After admin selects a song:**  
  - All users are routed to the **Live Room**.
  - Singers see lyrics only.
  - Players see lyrics + chords.
  - Admin controls scrolling and can quit the session.

- **Song Display:**  
  - Large fonts & high contrast (designed for smoke-filled rooms).
  - Responsive across devices.

---

## ⚙️ Environment Variables

### 🔹 Frontend (`client/.env`)
```env
VITE_API_BASE_URL=https://jamoveo-3gek.onrender.com
```

### 🔹 Backend (`server/.env`)
```env
PORT=3000
MONGO_URI=your_mongo_uri
ACCESS_JWT_SECRET=your_jwt_secret
ACCESS_JWT_EXPIRATION=12h
ADMIN_SECRET=MOVEO-2025-ADMIN
```

ℹ️ On Render, define the backend variables via the **Environment tab** or **Secret Files**.

---

## 🚀 Deployment Notes

### Vercel (Frontend)
- Auto-deploys on push to `main`
- Uses `.env` with backend base URL

### Render (Backend)
- Root directory is `server/`
- Commands:
  ```bash
  npm install
  node server.js
  ```
- `.env` stored as a secret file

---

## 👣 Running Locally

```bash
# 1. Clone the repo
git clone https://github.com/your-username/JaMoveo.git

# 2. Setup backend
cd JaMoveo/server
cp .env.example .env
npm install
npm run dev

# 3. Setup frontend
cd ../client
cp .env.example .env
npm install
npm run dev
```
