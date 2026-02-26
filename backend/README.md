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

---

## Production Security Configuration

Cookie configuration adapts to environment:

- `secure: true` in production (HTTPS only)
- `sameSite: none` for cross-origin production
- `sameSite: lax` for local development

CORS origin is configurable using:

CLIENT_URL environment variable

This allows safe deployment without hardcoded origins.

---

## Backend Status

The backend now includes:

- JWT authentication (access + refresh)
- HTTP-only cookie refresh strategy
- Token rotation logic
- Protected route middleware
- User-scoped CRUD operations
- Input validation
- Rate limiting
- Environment-based security configuration

The architecture follows layered separation:

- Routes → Controllers → Services → Models