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

## 🖼️ Demo Screenshots

Visual walkthrough of the Productivity Tracker Extension:

---

### 🏠 1. Home Page
UI and Template of the Extension

![Home Page](assets/screenshots/home-page.png)

---

### 🔧 2. Manage Extensions (chrome://extensions)
Load and manage your extension from here.

![Manage Extensions](assets/screenshots/manage-extensions.png)

---

### 🧩 3. Chrome Extension Popup
The floating window that shows real-time website tracking and quick actions.

![Extension Popup](assets/screenshots/extension-popup.png)

---

### ⏱️ 4. Track Time Spent on Websites
View which websites are currently open and how long you've spent on them.

![Tracking Open Sites](assets/screenshots/tracking-open-sites.png)

---

### 🔒 5. Website Blocking Flow

#### a. Before Blocking (Normal Website View) For Example : https://open.spotify.com/search 
![Before Blocking](assets/screenshots/site-before-blocking.png)

#### b. Blocking the Website (Using the Extension UI)
![Block Site UI](assets/screenshots/block-site-ui.png)

#### c. After Blocking (Blocked Warning Page)
![After Blocking](assets/screenshots/site-after-blocking.png)

#### d. Blocked Sites (List of Sites which are blocked)
![After Blocking](assets/screenshots/blocked-sites.png)


