# Practical 05: Express.js Routing & CRUD Operation Server

## 📌 Practical Details
- **Practical Number:** 05
- **Curriculum:** Web Application Development / MERN Stack Lab
- **Practical Title:** Create a backend server using Express.js implementing routing and CRUD operation.
- **Tech Stack:** Node.js (ES Modules), Express.js 4, CORS, HTML5/CSS3 Interactive Client Dashboard

---

## 🎯 Aim & Objectives
1. Construct a modular backend web server using **Express.js**.
2. Organize endpoints using **`express.Router()`** into decoupled route modules.
3. Implement full **CRUD** operations:
   - **Create:** `POST /api/products` (with request body parsing & validation, returning `201 Created`).
   - **Read (All):** `GET /api/products` (with category and search query filters).
   - **Read (Single):** `GET /api/products/:id` (with route parameter extraction).
   - **Update:** `PUT /api/products/:id` (with partial or complete replacement).
   - **Delete:** `DELETE /api/products/:id` (with item removal).
4. Apply built-in Express middleware: `express.json()`, `express.urlencoded()`, `cors()`, and custom request logging.
5. Provide an interactive web dashboard for real-time testing and evaluation without needing external tools.

---

## 📂 Project Directory Structure

```plaintext
Practical-05-Express-CRUD-Server/
├── package.json                         # Node.js dependencies (express, cors)
├── server.js                            # Express server entrypoint & middleware setup
├── README.md                            # Comprehensive laboratory writeup
├── data/
│   └── productsData.js                  # Initial inventory dataset & viva questions
├── routes/
│   └── productRoutes.js                 # Modular Express router with all CRUD handlers
└── public/                              # Interactive Web Dashboard
    ├── index.html                       # In-browser HTTP request dispatcher & live table
    ├── style.css                        # Glassmorphic dashboard styles
    └── script.js                        # Client-side fetch engine & response renderer
```

---

## 📡 RESTful API Endpoints Reference

| HTTP Method | Route Endpoint | Description | Status Code |
| :---: | :--- | :--- | :---: |
| **GET** | `/api/products` | Retrieve all products (Supports `?category=` & `?search=`) | `200 OK` |
| **GET** | `/api/products/:id` | Retrieve single product by numeric ID | `200 OK` / `404 Not Found` |
| **POST** | `/api/products` | Create a new product (Requires `name` & `price`) | `201 Created` / `400 Bad Request` |
| **PUT** | `/api/products/:id` | Update an existing product by ID | `200 OK` / `404 Not Found` |
| **DELETE** | `/api/products/:id` | Delete a product by ID | `200 OK` / `404 Not Found` |
| **GET** | `/health` | Server uptime and health probe | `200 OK` |

---

## ⚡ How to Run

1. Navigate to this practical folder:
   ```bash
   cd Practical-05-Express-CRUD-Server
   ```

2. Start the Express server:
   ```bash
   npm start
   ```

3. Open your browser at:
   - **Interactive API Dashboard:** [http://localhost:5000](http://localhost:5000)

---

## 🧪 Sample cURL Test Commands

```bash
# 1. GET all products
curl -X GET http://localhost:5000/api/products

# 2. GET single product by ID
curl -X GET http://localhost:5000/api/products/1

# 3. POST new product
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Mechanical Keyboard", "category": "Peripherals", "price": 149.99, "stock": 25}'

# 4. PUT update product
curl -X PUT http://localhost:5000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 89.99, "stock": 50}'

# 5. DELETE product
curl -X DELETE http://localhost:5000/api/products/1
```

---

## 🎓 University Viva Voce Preparation

| No. | Viva Question | Key Answer |
| :---: | :--- | :--- |
| **Q1** | What is Express.js? | A minimal and flexible Node.js web framework that provides routing, middleware, and request/response helpers. |
| **Q2** | Why do we use `express.Router()`? | To create modular, decoupled route handlers across multiple files rather than keeping all endpoints in `server.js`. |
| **Q3** | What does `express.json()` do? | It parses incoming HTTP request bodies with `Content-Type: application/json` and places the parsed object into `req.body`. |
| **Q4** | What is the difference between `req.params` and `req.query`? | `req.params` extracts route tokens (e.g. `/api/products/:id`); `req.query` extracts URL search parameters (e.g. `?category=Peripherals`). |
| **Q5** | Why do we need CORS? | To instruct web browsers that requests originating from different origins (domains/ports) are permitted to access the server. |
