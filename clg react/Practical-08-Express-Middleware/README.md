# Practical 08: Express.js Routing, Middleware Pipeline and Request Handling

## 📋 Aim
Create a backend server using **Express.js** implementing routing, middleware architecture, and request handling across all 5 major Express middleware categories: Application-level, Router-level, Built-in, Third-party, and Centralized Error-handling middleware.

---

## 🎯 Objectives
1. Understand the core principles of Express.js middleware functions `(req, res, next)`.
2. Implement **Application-level middleware** for high-resolution request timing and lifecycle tracing.
3. Build **Router-level middleware** (`authGuard`) to enforce API key security checks before accessing protected resources.
4. Utilize **Built-in middleware** (`express.json()`, `express.urlencoded()`, `express.static()`) for payload parsing and client dashboard hosting.
5. Create custom utility middleware for sliding-window **Rate Limiting** to defend against traffic spikes and DoS attempts.
6. Implement **Route-specific validation middleware** for request body payload verification.
7. Construct a **Centralized 4-argument Error-Handling Middleware** `(err, req, res, next)` for structured, uniform error responses.

---

## 🏛️ Middleware Lifecycle Pipeline

```mermaid
graph LR
    Client["Client Request"] --> Logger["1. Application Logger<br/>(Tracks Timing & IP)"]
    Logger --> Limiter["2. Rate Limiter<br/>(Sliding Window Quota)"]
    Limiter --> Parser["3. Body Parser<br/>(express.json())"]
    Parser --> Router["4. Router Mounting<br/>(/api)"]
    
    subgraph Route Execution
        Router --> Auth{"Auth Guard<br/>(x-api-key?)"}
        Auth -->|Pass| Validator{"Payload Validator<br/>(Valid JSON?)"}
        Validator -->|Pass| Handler["Route Controller<br/>(Business Logic)"]
    end
    
    Auth -->|Fail (401/403)| ErrorHandler["5. Centralized Error Handler<br/>(err, req, res, next)"]
    Validator -->|Fail (400)| ErrorHandler
    Handler -->|Exception (500)| ErrorHandler
    
    Handler --> Response["HTTP 200/201 Response"]
    ErrorHandler --> ResponseErr["Structured JSON Error Response"]
```

---

## 🧩 Middleware Categories Implemented

### 1. Application-Level Middleware (`middleware/logger.js`)
Bound to `app.use()`, this middleware runs on every incoming request. It measures high-resolution execution time via `process.hrtime()` and initializes an in-memory lifecycle trace attached to `req.trace`.

### 2. Utility Rate-Limiting Middleware (`middleware/rateLimiter.js`)
Enforces sliding-window limits (max 12 requests per 10-second window per IP). It computes remaining quota, injects `X-RateLimit-*` response headers, and passes a `429 Too Many Requests` error to `next()` if the threshold is breached.

### 3. Router-Level Authentication Guard (`middleware/authGuard.js`)
Attached to `/api/protected/*` routes. It validates the presence and validity of the `x-api-key: secret-token-2026` header. If missing or invalid, it halts downstream execution and propagates an `HTTP 401/403` error.

### 4. Route-Specific Validation Middleware (`middleware/validator.js`)
Validates specific schema parameters (such as `recipient`, `amount > 0`, and `purpose` on `/api/protected/transfer`). If validation fails, it generates an error with an array of issues.

### 5. Centralized Error-Handling Middleware (`middleware/errorHandler.js`)
Express recognizes error handlers specifically by four arguments: `(err, req, res, next)`. It intercepts all errors forwarded via `next(err)` and returns a standardized JSON contract with timestamp, HTTP status, and lifecycle trace.

---

## 📡 API Reference & Test Scenarios

| Method | Endpoint | Middleware Executed | Expected Status |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/public/status` | Logger, RateLimiter | `200 OK` |
| `GET` | `/api/protected/profile` (No Header) | Logger, RateLimiter, AuthGuard | `401 Unauthorized` |
| `GET` | `/api/protected/profile` (`x-api-key: secret-token-2026`) | Logger, RateLimiter, AuthGuard, Handler | `200 OK` |
| `POST` | `/api/protected/transfer` (Invalid Body) | Logger, RateLimiter, Parser, AuthGuard, Validator | `400 Bad Request` |
| `GET` | `/api/test/error` | Logger, RateLimiter, ErrorHandler | `503 Service Unavailable` |
| `POST` | `/api/admin/reset-limits` | Resets in-memory sliding window rate limits | `200 OK` |

---

## 🚀 Setup & Execution

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Server
```bash
npm start
```

### 3. Access Interactive Middleware Console
Open **`http://localhost:5003`** in your browser to run live pipeline simulations and visualize request traces in real-time.

---

## 🎓 University Viva Voce Q&A

### Q1: What is Middleware in Express.js?
**Answer:** Middleware functions are functions that have direct access to the request object (`req`), response object (`res`), and the `next` middleware function in the application’s request-response cycle. They can execute any code, mutate `req` and `res`, terminate the cycle by sending a response, or invoke the next handler in line using `next()`.

### Q2: What is the purpose and critical importance of the `next()` function?
**Answer:** `next()` is a callback passed to middleware functions that passes control to the next middleware in the execution stack. If a middleware does not terminate the request (by calling `res.send()`, `res.json()`, etc.) and forgets to invoke `next()`, the client request hangs indefinitely until a timeout occurs.

### Q3: Name and describe the 5 types of middleware in Express.
**Answer:**
1. **Application-level:** Bound to an application instance using `app.use()` or `app.METHOD()`.
2. **Router-level:** Bound to an instance of `express.Router()` using `router.use()`.
3. **Built-in:** Shipped out-of-the-box with Express (e.g., `express.json()`, `express.static()`).
4. **Third-party:** Installed via npm packages (e.g., `cors`, `morgan`, `helmet`).
5. **Error-handling:** Specially identified by accepting four arguments: `(err, req, res, next)`.

### Q4: How does Express distinguish an Error-Handling Middleware from standard middleware?
**Answer:** Express inspects JavaScript function arity using `fn.length`. Regular middleware functions have 2 or 3 parameters `(req, res, next)`. Error-handling middleware **must declare exactly 4 parameters**: `(err, req, res, next)`. Even if `next` is not directly invoked, it must be declared so Express recognizes its error-handling signature.

### Q5: What happens when you invoke `next(err)` with an argument?
**Answer:** When any value is passed to `next()` (except the special string `'route'`), Express immediately bypasses all remaining regular middleware and router handlers and routes directly to the next registered Error-handling middleware in the pipeline.

### Q6: Why is middleware registration order critical in Express applications?
**Answer:** Middleware executes in strict linear order based on when `app.use()` was called. For example, `express.json()` must be mounted before any route handlers so that `req.body` is populated. Similarly, centralized error handlers must be placed at the very end of the stack to catch errors from preceding routes.

### Q7: What is Rate Limiting and how does it safeguard backend services?
**Answer:** Rate limiting bounds the frequency of requests an IP address or token can submit over a defined time window. It prevents resource starvation, brute-force credential stuffing, and Distributed Denial of Service (DDoS) attacks by sending an `HTTP 429 Too Many Requests` header when thresholds are reached.

### Q8: How can middleware attach custom metadata to downstream controllers?
**Answer:** In JavaScript, objects are passed by reference. Downstream middleware and route handlers share the same `req` instance. Middleware can dynamically attach properties, such as authenticated user credentials (`req.user = { id: 101, role: 'Admin' }`) or tracing logs (`req.trace.push(...)`), making them globally available throughout the request lifecycle.
