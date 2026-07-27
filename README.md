# 💼 Job Application Tracker

A full-stack **MERN Job Application Tracker** that helps job seekers manage their applications while providing administrators with a powerful dashboard for managing jobs, users, applications, and analytics.

---

## 🚀 Features

## 👤 Applicant

- User Registration & Login
- JWT Authentication
- Forgot Password (Email Reset)
- Update Profile
- Upload Resume
- Browse Available Jobs
- View Job Details
- Apply for Jobs
- Prevent Duplicate Applications
- View My Applications
- Dashboard Statistics
- Email Notifications for Application Status Updates

---

## 👨‍💼 Admin

### 📊 Dashboard

- Total Users
- Total Jobs
- Total Applications
- Quick Statistics

### 💼 Job Management

- Create Jobs
- Edit Jobs
- Delete Jobs
- Activate/Deactivate Jobs
- View Applications per Job

### 📄 Application Management

- View All Applications
- Search Applications
- Filter by Status
- Update Application Status
- Resume Download
- Automatic Email Notifications

### 👥 User Management

- View All Users
- Search Users
- Filter by Role
- Filter by Status
- Promote/Demote Users
- Suspend / Activate Users
- Delete Users
- Export Users to CSV
- Pagination

### 📈 Analytics

- User Statistics
- Job Statistics
- Application Statistics
- Interactive Charts
- Application Status Summary

---

# 📷 Screenshots

## 🏠 Home Page

## ![Home](client/public/screenshots/home-page.jpeg)

## 👤 Applicant Dashboard

![Applicant Dashboard](client/public/screenshots/user-dashboard.jpeg)

---

## 💼 Browse Jobs

![Browse Jobs](client/public/screenshots/browse-jobs.jpeg)

---

## 👨‍💼 Admin Dashboard

![Admin Dashboard](client/public/screenshots/admin-dashboard.jpeg)

---

## 👥 User Management

![User Management](client/public/screenshots/users.jpeg)

---

## 📊 Analytics

![Analytics](client/public/screenshots/system-analytics.jpeg)

---

# 🛠 Tech Stack

## Frontend

- React
- React Router
- Axios
- React Icons
- React Toastify

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- Nodemailer
- bcryptjs

---

# 📁 Project Structure

```
job-application-tracker/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── uploads/
│   └── package.json
│
└── README.md
```

---

# ⚙ Installation

## 1. Clone the repository

```bash
git clone https://github.com/Victoretta/job-application-tracker.git
```

## 2. Navigate into the project

```bash
cd job-application-tracker
```

---

## Backend Setup

```bash
cd server
npm install
npm run dev
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

# 🔐 Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

EMAIL_USER=your_email@gmail.com

EMAIL_PASS=your_email_password

CLIENT_URL=http://localhost:5173
```

---

# 📌 API Overview

## Authentication

```
POST /api/users/register
POST /api/users/login
POST /api/users/forgot-password
POST /api/users/reset-password/:token
```

## Jobs

```
GET    /api/jobs
GET    /api/jobs/:id
POST   /api/jobs
PUT    /api/jobs/:id
DELETE /api/jobs/:id
```

## Applications

```
POST /api/applications/:jobId
GET  /api/applications/my
GET  /api/applications
PUT  /api/applications/:id/status
```

## Admin

```
GET    /api/admin/analytics
GET    /api/admin/users
GET    /api/admin/users/:id
PUT    /api/admin/users/:id/role
PUT    /api/admin/users/:id/status
DELETE /api/admin/users/:id
```

---

# ✅ Current Features

- JWT Authentication
- Role-Based Authorization
- Resume Upload
- Forgot Password
- Email Notifications
- Applicant Dashboard
- Admin Dashboard
- User Management
- Job Management
- Application Tracking
- Analytics Dashboard
- Interactive Charts
- CSV Export
- Pagination

---

# 🚀 Future Improvements

- Excel (.xlsx) Export
- PDF Resume Preview
- Dark Mode
- Advanced Analytics
- Email Templates
- Real-Time Notifications
- Saved Jobs
- Company Profiles
- Interview Scheduling
- Admin Activity Logs
- Two-Factor Authentication (2FA)
- Docker Support
- Deployment (Render + Vercel)

---

# 👨‍💻 Author

**Obasi Victor Etta**

📧 Email  
obasivictoretta@gmail.com

🔗 GitHub  
https://github.com/Victoretta

---

# 📄 License

This project is licensed under the **MIT License**.

---

## ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.
