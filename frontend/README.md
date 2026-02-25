# Scalable Web App – Frontend Architecture

## Tech Stack

- React (Vite)
- TailwindCSS
- React Router DOM
- Axios
- Context API

---

## Folder Structure
src/
├── api/
│ └── axios.js
├── component/
│ ├── layout/
│ │ └── DashboardLayout.jsx
│ └── ProtectedRoute.jsx
├── context/
│ └── AuthContext.jsx
├── pages/
│ ├── Login.jsx
│ ├── Register.jsx
│ ├── Dashboard.jsx
│ └── Tasks.jsx
├── App.jsx
└── main.jsx


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