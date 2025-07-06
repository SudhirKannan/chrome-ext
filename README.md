# Productivity Tracker Chrome Extension

A **Chrome extension** that helps you improve focus by tracking your website usage and blocking distractions.

---

## 🚀 Features

- ⏱️ Track time spent on websites  
- 🚫 Block distracting websites in realtime 
- 📊 View daily & weekly productivity reports  
- 🔄 Sync across devices using a unique device ID  

---

## 🗂️ Project Structure

- **Frontend:** Chrome Extension (React + Manifest v3)  
- **Backend:** Node.js + Express + MongoDB (REST API)  

---

## 🔧 Getting Started

### 1. Backend Setup

```bash
cd backend
npm install
# Add your MongoDB connection string to .env
npm run server
```

### 2. Frontend (Chrome Extension)

```bash
cd frontend
npm install
npm run build
```

Then:
1. Open Chrome → `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked** → select `frontend/dist` folder

---

## 📡 API Overview (Simplified)

- **/api/website-usage** – Save and fetch website usage  
- **/api/website-usage/report** – Get daily/weekly reports  
- **/api/blocked-sites** – Add, update, and remove blocked websites  

---

## 📌 Dev Tips

- Backend dev server: `npm run server`  
- Frontend dev mode: `npm run dev`  
- Build extension: `npm run build`

---
