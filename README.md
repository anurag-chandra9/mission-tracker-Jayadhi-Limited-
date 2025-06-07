# Mission Control Dashboard

A full-stack mission management dashboard built with React (Vite, TailwindCSS, GSAP), Express, MongoDB, and JWT authentication.

## Features

- Admin authentication (JWT)
- Create, view, and update missions
- Mark mission status as "active" or "complete"
- Responsive dashboard UI with TailwindCSS and GSAP animations
- Register new admin users
- Secure backend with MongoDB Atlas

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm
- MongoDB Atlas account (or local MongoDB)

### Backend Setup

1. `cd backend`
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file (see `.env.example`):
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend:
   ```
   npm run dev
   ```
5. (Optional) Create an initial admin:
   ```
   node scripts/createAdmin.js
   ```

### Frontend Setup

1. `cd frontend`
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file:
   ```
   VITE_API_URL=http://localhost:5000
   ```
4. Start the frontend:
   ```
   npm run dev
   ```
5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

- Login with your admin credentials.
- Create new missions and manage their status.
- Register new admin users via the UI.

## Tech Stack

- **Frontend:** React, Vite, TailwindCSS, GSAP, react-hot-toast
- **Backend:** Express, MongoDB, Mongoose, JWT, bcrypt
- **Other:** dotenv, nodemon

## License

MIT or as specified in individual files.
