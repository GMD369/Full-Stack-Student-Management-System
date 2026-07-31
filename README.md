# Student Management System

Full-stack MERN application built for the Devixo Solutions Week 3 internship task.

## Tech Stack
- **Frontend:** React (Vite), React Router, Axios, Context API
- **Backend:** Node.js, Express, JWT (httpOnly cookie auth), bcrypt
- **Database:** MongoDB (Mongoose)

## Features
- Authentication: register, login, logout (JWT stored in httpOnly cookie)
- Role-based access: `admin` (full CRUD) vs `user` (view/search only), enforced on both client and server
- Student module: add, edit, delete, search, view details
- Dashboard: total students, recent registrations (last 7 days), quick stats
- Pagination and search on the students list
- Responsive, professional UI with client + server-side form validation and loading indicators

## Project Structure
```
server/   Express API (auth, students, MongoDB models)
client/   React app (Vite)
```

## Setup

### 1. Backend
```bash
cd server
npm install
cp .env.example .env   # then fill in MONGODB_URI (Atlas) and JWT_SECRET
npm run dev
```
Runs on `http://localhost:5000`.

### 2. Frontend
```bash
cd client
npm install
npm run dev
```
Runs on `http://localhost:5173` and proxies `/api/*` requests to the backend (see `vite.config.js`).

### 3. Create the first Admin account
Registration defaults every account to role `user`. The **first** account registered with "Admin" selected (and only while no admin exists yet) becomes an admin — after that, admin accounts must be created by an existing admin (currently via direct DB update, since admin-only user management wasn't in scope). To promote later, register as Admin before any admin account exists, or manually set `role: "admin"` on a user document in MongoDB.

## Environment Variables (`server/.env`)
| Variable       | Description                              |
|----------------|-------------------------------------------|
| `MONGODB_URI`  | MongoDB Atlas connection string           |
| `JWT_SECRET`   | Secret used to sign JWTs                  |
| `PORT`         | API port (default 5000)                   |
| `CLIENT_URL`   | Frontend origin, for CORS                 |
| `NODE_ENV`     | `development` or `production`             |
