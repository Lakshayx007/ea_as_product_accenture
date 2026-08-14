# Enterprise Architecture as a Product

> A modern, data-driven Enterprise Architecture (EA) platform designed to provide actionable insights for CIOs, CFOs, Programme Managers, and Security Officers.

**Built by Lakshay Malik.**

## 🚀 Overview

Enterprise Architecture as a Product is a full-stack intelligence dashboard that centralizes application, project, and financial data into a single pane of glass. By treating Enterprise Architecture as a dynamic data product rather than static documentation, this platform enables leaders to make real-time decisions on IT investments, compliance, and technology lifecycle management.

## ✨ Key Features

- **Role-Based Workspaces:** Dedicated views tailored for CIOs, CFOs, EA Managers, Programme Managers, and Security Officers, surfacing the exact metrics they care about most.
- **Interactive Visualizations:** Deep-dive into IT spend, application lifecycle status, project pipelines, and technology risk using ECharts (Heatmaps, Funnel charts, Bubble plots).
- **Dynamic AI Assistant:** Built-in Groq-powered AI chatbot that leverages the live canonical EA data to answer complex architectural and financial queries instantly.
- **Live Industry News:** Integrated RSS feed to keep track of the latest trends in Enterprise Architecture, TOGAF, and IT Strategy.
- **Premium UI/UX:** Built with React, Vite, and Tailwind CSS, featuring an elegant, responsive design with smooth animations and dynamic dark/light modes.

## 🛠️ Technology Stack

**Frontend:**
- React 18 (Vite)
- Tailwind CSS
- Apache ECharts (Data Visualization)
- Framer Motion (Animations)
- React Router

**Backend:**
- Node.js & Express
- Groq SDK (LLM Integration)
- rss-parser (Live News Feed)

## ⚙️ Getting Started (Local Development)

### Prerequisites
- Node.js (v18+)
- A Groq API Key

### 1. Start the Backend
Navigate to the `backend/` directory, install dependencies, and launch the Express server:
```bash
cd backend
npm install
node server.js
```
*Note: Make sure to create a `.env` file in the backend directory containing your `GROQ_API_KEY`.*

### 2. Start the Frontend
Navigate to the `frontend/` directory, install dependencies, and run the Vite development server:
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser to view the application.

---
*Developed with precision and built for scale.*
