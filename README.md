# Note: ## Main focus on Frontend Architecture not UI


# Scalable Web App with Authentication & Dashboard

A full-stack scalable web application featuring JWT-based authentication, protected routes, and a glassmorphism dashboard UI.

---

## Tech Stack

### Frontend
- React (Vite)
- TailwindCSS v4 (CSS-first config)
- Framer Motion
- React Hook Form
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (Access + Refresh Token Strategy)
- bcrypt
- express-validator
- rate-limiter

---

## Features

### Authentication
- Register / Login
- JWT Access Token (short-lived)
- Refresh Token (HTTP-only cookie)
- Auto-refresh on app bootstrap
- Secure logout (token invalidation)
- Protected routes

### Dashboard
- Glassmorphism UI design
- Collapsible sidebar (desktop)
- Slide-in mobile navigation
- Animated transitions
- Gradient shimmer skeleton loaders

### Tasks Module
- Create task (slide-in panel)
- Toggle complete
- Delete task
- User-scoped data isolation
- Optimistic UI updates
- Responsive grid layout

### Security
- Password hashing (bcrypt)
- JWT verification middleware
- Refresh token stored securely
- User isolation enforced in every query
- Input validation
- Rate limiting on auth routes
- Environment-based cookie security
- CORS configuration

---

## Project Structure

### Frontend

```
src/
 ├── api/
 ├── component/
 │    ├── background/
 │    ├── layout/
 │    ├── ui/
 ├── context/
 ├── pages/
```

### Backend

```
backend/
 ├── src/
 │    ├── controllers/
 │    ├── services/
 │    ├── models/
 │    ├── routes/
 │    ├── middlewares/
 │    ├── utils/
 │    └── app.js
 ├── server.js
```

Architecture follows:

Routes → Controllers → Services → Models

---

## Environment Variables

### Backend `.env`

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLIENT_URL=http://localhost:5173
```

### Frontend `.env`

```
VITE_API_URL=http://localhost:5000/api
```

---

## How to Run Locally

### 1. Clone repository

```
git clone <your_repo_url>
```

---

### 2. Backend Setup

```
cd backend
npm install
npm run dev
```

---

### 3. Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## Authentication Flow

1. User logs in
2. Backend issues:
   - Access token (15m)
   - Refresh token (7d, HTTP-only cookie)
3. Access token stored in memory
4. Axios attaches token automatically
5. On page reload:
   - Frontend calls `/auth/refresh`
   - New access token issued
6. Logout clears refresh token from DB

---

## Security Design

- Refresh tokens stored in DB (single-session strategy)
- Access tokens are stateless
- Every task query includes userId filter
- No trust in client-provided identifiers
- Input validation on auth endpoints
- Rate limiting prevents brute-force attempts

---

## Scalability Considerations

- Layered backend architecture
- Environment-based configuration
- Token rotation strategy
- Stateless access token model
- Modular UI component structure
- Reusable design system (GlassCard, SkeletonCard, Input, Button)

---

## UI Design

- Full-page frosted gradient background
- Subtle noise texture overlay
- Indigo/Purple primary palette
- Cyan accent highlights
- Medium motion animations (Framer Motion)
- Slide-in panels for interaction
- Skeleton shimmer loading states

---

## Future Improvements

- Role-based access control
- Pagination & filtering
- Task search
- Dark/Light theme toggle
- Unit tests (Jest)
- Dockerized deployment

---

## Author

Built as part of a scalable full-stack assignment project.