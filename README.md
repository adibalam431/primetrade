# Frontend Architecture

## Tech Stack

- React (Vite)
- TailwindCSS
- React Router DOM
- Axios
- Context API

---

## Folder Structure
| Directory / File |
| :--- |
| **`src/main.jsx`** |
| **`src/App.jsx`** |
| **`src/api/axios.js`** |
| **`src/context/AuthContext.jsx`** |
| **`src/pages/Login.jsx`** |
| **`src/pages/Register.jsx`** |
| **`src/pages/Dashboard.jsx`** |
| **`src/pages/Tasks.jsx`** |
| **`src/component/layout/DashboardLayout.jsx`** |
| **`src/component/ProtectedRoute.jsx`** |


---

## Routing Strategy

Public Routes:
- /login
- /register

Protected Routes:
- /dashboard
- /dashboard/tasks

The dashboard uses nested routing with a shared layout component (`DashboardLayout`).

Protected routes are wrapped using a `ProtectedRoute` component that checks authentication state before rendering.

---

## Authentication Flow (Frontend)

1. User logs in.
2. Backend returns:
   - Access token (short-lived)
   - Refresh token (stored in HTTP-only cookie).
3. Access token is stored in React state (memory only).
4. Axios interceptor automatically attaches the access token to all API requests.
5. If an API request returns 401:
   - The interceptor calls `/auth/refresh`.
   - A new access token is issued.
   - The failed request is retried.
6. If refresh fails:
   - Global logout is triggered.
   - User is redirected to login.

---

## Token Storage Strategy

Access Token:
- Stored in memory (React state).
- Not stored in localStorage or sessionStorage.

Refresh Token:
- Stored in HTTP-only cookie (managed by backend).
- Sent automatically with requests using `withCredentials: true`.

---

## Axios Architecture

- Centralized Axios instance (`api/axios.js`).
- Request interceptor attaches Authorization header.
- Response interceptor handles:
  - 401 retry logic.
  - Single refresh queue control.
  - Automatic logout on refresh failure.

Infinite loop prevention is handled using:
- `_retry` flag.
- `isRefreshing` control flag.
- Shared `refreshPromise`.

---

## Security Decisions

- No JWT storage in localStorage (prevents XSS token theft).
- HTTP-only cookies for refresh tokens.
- Centralized API layer.
- Single refresh call during concurrent failures.
- Automatic logout on refresh failure.
- Clean separation between UI and API logic.

---

## Current Status

Frontend architecture is complete with:

- Nested dashboard layout
- Protected routing
- Global authentication context
- Centralized API layer
- Token lifecycle management
- Automatic refresh handling
- Logout fallback on refresh failure


# Backend Architecture

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (Access + Refresh)
- bcrypt
- cookie-parser
- helmet
- cors
- express-rate-limit

---

## Folder Structure

| Directory / File |
| :--- |
| **`backend/src/config/`** |
| **`backend/src/controllers/auth.controller.js`** |
| **`backend/src/models/User.js`** |
| **`backend/src/routes/auth.routes.js`** |
| **`backend/src/middlewares/auth.middleware.js`** |
| **`backend/src/services/auth.service.js`** |
| **`backend/src/utils/jwt.js`** |
| **`backend/src/app.js`** |
| **`backend/server.js`** |
| **`.env`** |


---

## Authentication Strategy

### Access Token

- Expiry: 15 minutes
- Stored in frontend memory
- Sent in `Authorization: Bearer <token>`
- Stateless (not stored in DB)

### Refresh Token

- Expiry: 7 days
- Stored in MongoDB (single active session per user)
- Sent via HTTP-only cookie
- Used to generate new access tokens

---

## Authentication Flow

### Register

- Validate input
- Hash password using bcrypt (12 rounds)
- Store user
- Return safe user object (no password)

### Login

- Validate credentials
- Generate access + refresh tokens
- Store refresh token in DB
- Send refresh token as HTTP-only cookie
- Return access token + user info

### Refresh

- Read refresh token from cookie
- Verify token signature
- Match with DB value
- Generate new access token
- Return new access token

### Logout

- Read refresh token from cookie
- Remove it from DB
- Clear cookie

---

## Security Decisions

- Passwords hashed with bcrypt (12 salt rounds)
- JWT secrets stored in environment variables
- Separate secrets for access and refresh tokens
- HTTP-only cookies for refresh tokens
- No password field returned in any response
- Global error handler implemented
- Auth middleware verifies tokens using jwt.verify()

---

## Protected Routes

Routes are protected using `auth.middleware.js`.

Middleware behavior:

- Extracts Bearer token from header
- Verifies access token
- Attaches `userId` to request
- Rejects invalid or expired tokens with 401

---

## Task Model

Each task contains:

- title (String, required)
- completed (Boolean, default: false)
- userId (ObjectId reference to User)
- timestamps (createdAt, updatedAt)

All task queries are filtered strictly by `userId` extracted from verified JWT.

This prevents cross-user data access.


---

## Task Service Security

All CRUD operations enforce strict user isolation.

Every database query includes:

- `_id`
- `userId`

This ensures:

- No cross-user access
- No task enumeration vulnerability
- No reliance on client-sent userId

User identity is derived exclusively from verified JWT middleware.

---

## Task API Endpoints

Base: `/api/tasks`

All routes require valid access token.

### Endpoints

- GET `/` → Get all tasks (user-scoped)
- POST `/` → Create task
- PUT `/:id` → Update task (user-scoped)
- DELETE `/:id` → Delete task (user-scoped)

All queries enforce strict user isolation using `userId` from verified JWT.

---

## Validation & Rate Limiting

Input validation is implemented using `express-validator`.

Validated routes:
- Register
- Login

Validation ensures:
- Proper email format
- Required fields
- Minimum password length

Rate limiting is applied to `/api/auth` routes:
- 50 requests per 15 minutes per IP
- Protects against brute-force login attempts