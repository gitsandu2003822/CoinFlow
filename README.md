# 💰 CoinFlow — Personal Finance Tracker App

---

## 🚀 Badges

![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Oracle](https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 📌 Project Overview

**CoinFlow** is a full-stack personal finance tracking application designed to help users manage their income and expenses efficiently.

It consists of:
- 📱 Mobile frontend built using **Expo / React Native**
- 🖥️ Backend API built with **Node.js + Express**
- 🗄️ Database powered by **Oracle Database**

The app supports both **offline storage (SQLite)** and **cloud synchronization**, ensuring seamless financial tracking anytime, anywhere.

---

## ✨ Features

### 📊 Finance Dashboard
- Income, expense, and balance summary
- Clean visual financial overview

### 💸 Transaction Management
- Add income & expense transactions
- View full transaction history
- Delete unwanted records

### 🔄 Sync System
- Local SQLite storage for offline mode
- Cloud sync with backend API

### ☁️ Backend API (Oracle DB)
- RESTful CRUD operations
- Secure transaction handling
- Health-check endpoint

### 📱 Mobile Experience
- Pull-to-refresh updates
- Smooth UI with React Native
- Works on Android, iOS, and Web (Expo)

---

## 🧰 Tech Stack

### 📱 Frontend
- Expo (React Native)
- SQLite (Local storage)
- React Hooks

### 🖥️ Backend
- Node.js
- Express.js
- Oracle Database (XE)
- REST API architecture

---

## 🏗️ Project Architecture

📱 Mobile App (Expo / React Native)
↓
🔄 REST API (Node.js + Express)
↓
🗄️ Oracle Database (Backend Storage)
↓
💾 SQLite (Offline Local Storage)


---

## ⚙️ Installation & Setup

---

### 🖥️ Backend Setup

```bash
cd backend
npm install
📌 Configure Database

Make sure Oracle Database XE is running and use:

DB_USER=system
DB_PASSWORD=san2003oracle
DB_HOST=localhost
DB_PORT=1521
DB_SID=xe
PORT=4000
▶️ Start Backend
npm run dev
# or
npm start
📱 Frontend Setup
cd frontend
npm install
▶️ Run App
npx expo start
🚀 How to Run the Project
Start Backend first (port 4000)
Start Frontend using Expo
Open app using:
Expo Go (Android/iOS)
Emulator
Web browser
🎯 Future Improvements
Budget planning system
AI-based expense insights
Cloud user authentication
Financial reports & charts
👨‍💻 Developer

Final Year Project — CoinFlow Finance Tracker

📜 License

This project is for educational purposes only.
