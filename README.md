# 🚀 Enterprise CI/CD Platform

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge\&logo=node.js\&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge\&logo=mongodb\&logoColor=white)

A full-stack Enterprise CI/CD Platform built using **React, Node.js, Express, and MongoDB**.

The platform helps DevOps engineers and software developers manage CI/CD workflows, monitor infrastructure, validate YAML configurations, and access infrastructure documentation through a modern web dashboard.

---

## ✨ Features

### 🔐 Authentication System

* JWT-based Authentication
* Secure Login & Logout
* Protected Routes
* Context API State Management

### 📊 Dashboard

* Centralized platform overview
* Workflow insights
* Infrastructure monitoring access
* Quick navigation to platform modules

### ⚙️ Workflow Management

* Trigger workflows
* Clone existing workflows
* Cancel running workflows
* Track workflow status
* Search workflows efficiently

### 📚 Infrastructure Guides

* Store and manage DevOps documentation
* Kubernetes Guides
* Docker Guides
* Terraform Guides
* Infrastructure best practices

### 📈 Monitoring & Alerts

* CPU monitoring
* Memory monitoring
* Uptime tracking
* Alert generation system

### 📄 YAML Tools

* YAML validation
* YAML formatting
* YAML conversion utilities
* Configuration analysis

### 🎨 Modern Frontend

* React + Vite Architecture
* Responsive Sidebar Navigation
* Interactive Dashboard
* Clean UI Components
* Modular Component Structure

### 🔒 Security

* JWT Authentication
* Helmet Security Headers
* CORS Protection
* Rate Limiting
* Password Hashing using bcrypt

---

## 🛠️ Technology Stack

### Frontend

* React.js
* Vite
* Context API
* CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Security & Utilities

* JWT
* bcryptjs
* helmet
* cors
* express-rate-limit
* express-validator
* js-yaml

---

## 📂 Project Structure

```text
project-root
│
├── Backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   └── server.js
│
├── Frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
│
└── README.md
```

---

## 🚀 Frontend Modules

### Landing Page

* Platform introduction
* Hero section
* Feature highlights

### Dashboard

* CI/CD Platform overview
* Module navigation

### Infrastructure Guides

* DevOps documentation hub

### Monitoring

* Infrastructure monitoring interface

### Workflow Management

* Workflow tracking and execution

### YAML Tools

* Configuration management tools

### Sidebar Navigation

* Easy access to all modules

---

## 🚀 Backend API Modules

### Authentication

```http
/api/v1/auth
```

### Workflows

```http
/api/v1/workflows
```

### Infrastructure Guides

```http
/api/v1/infra
```

### Monitoring

```http
/api/v1/monitoring
```

### YAML Utilities

```http
/api/v1/yaml
```

---

## ⚙️ Local Setup

### Clone Repository

```bash
git clone <repository-url>
cd project-name
```

### Backend Setup

```bash
cd Backend
npm install
```

Create `.env`

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
RATE_LIMIT_MAX=1000
```

Run Backend

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

Backend runs on:

```text
http://localhost:5000
```

---

## 📬 API Documentation

### Postman Collection

🔗 https://documenter.getpostman.com/view/50839329/2sBXwntsU4

Includes:

* Authentication APIs
* Workflow APIs
* Infrastructure APIs
* Monitoring APIs
* YAML Tool APIs
* Sample Requests & Responses

---

## 🎯 Key Highlights

* Full Stack Enterprise Project
* React Frontend + Express Backend
* MongoDB Database Integration
* JWT Authentication
* CI/CD Workflow Management
* Infrastructure Monitoring
* YAML Configuration Tools
* Production Ready Architecture
* Clean Modular Codebase

---

## 👨‍💻 Author

**Parth Karetiya**

Computer Science Engineering Student | Full Stack Developer | DevOps Enthusiast

Actively building projects, solving DSA problems, and sharing coding knowledge through GitHub, LinkedIn, and YouTube.

---

⭐ If you found this project useful, consider giving it a star.
