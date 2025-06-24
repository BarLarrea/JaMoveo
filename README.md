# JaMoveo

# 🎵 JaMoveo – Real-Time Band Rehearsal Web App

**JaMoveo** is a full-stack web application that allows musicians to rehearse together in real time. Each participant connects via phone or desktop, selects an instrument, and views a synchronized live session controlled by an admin.

---

## 🌍 Live Deployments

- **Frontend:** [https://ja-moveo-two.vercel.app](https://ja-moveo-two.vercel.app)  
- **Backend:** [https://jamoveo-3gek.onrender.com](https://jamoveo-3gek.onrender.com)

---

## 👥 User Types

### 🎶 Regular Users (Players)
- Register via: /register
- Choose your role:
- If you're a singer, you do not need to choose an instrument.
- If you're a player, you must select an instrument.
- During a live session:
  - Singers see only the lyrics.
  - Players see both lyrics and chords.

### 🎛️ Admins
- Register via a dedicated URL: `/admin/register`
- Must enter a **secret admin code** for verification
- When signing up, an admin can choose to have no role, or act as an admin who is also a singer or a player
- Can:
  - Search for songs (supports Hebrew & English; contain search by song title or artist)
  - Choose a song and broadcast it to all connected users
  - Toggle auto-scrolling of lyrics
  - Quit the session for everyone
  
---

## 🔐 Admin Access

To create an admin account, navigate to:

https://ja-moveo-two.vercel.app/admin/register
You must enter the following admin code when prompted:

MOVEO-2025-ADMIN

---

## 📦 Project Structure

JaMoveo/
├── client/ # React frontend (Vercel)
├── server/ # Node.js backend (Render)

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
  Players see “Waiting for next song”.

- **After admin selects a song:**  
  - All users are routed to the **Live Room**.
  - Players see lyrics + chords (except singers).
  - Admin controls scroll and can end the session.

- **Song Display:**  
  - Large fonts & high contrast (designed for smoke-filled rooms).
  - Responsive across devices.

---

## ⚙️ Environment Variables

### Frontend (`.env`)
```env
VITE_API_BASE_URL=https://jamoveo-3gek.onrender.com
Backend (.env)
PORT=3000
MONGO_URI=your_mongo_uri
ACCESS_JWT_SECRET=your_jwt_secret
ACCESS_JWT_EXPIRATION= $@h
ADMIN_SECRET=MOVEO-2025-ADMIN
(In Render, this is set using Secret Files or env variables panel)

📋 Deployment Notes
Vercel (Frontend)
Auto-deploys on push to main

Uses .env for backend URL

Render (Backend)
Runs with root set to server/

start command: node server.js

.env configured as secret file

👣 Steps to Run Locally
Clone the repo

Create .env files in client/ and server/ as described above

In terminal:

# Run backend
cd server
npm install
npm run dev

# Run frontend
cd ../client
npm install
npm run dev
