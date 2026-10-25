# Practical 06: RESTful APIs for Student Records Management using Express.js and Postman Testing

## 📌 Practical Details
- **Practical Number:** 06
- **Curriculum:** Web Application Development / MERN Stack Lab
- **Practical Title:** Build RESTful APIs for Student Records Management using Express.js and Postman testing.
- **Tech Stack:** Node.js (ES Modules), Express.js 4, CORS, Postman Collection v2.1, Interactive Test Dashboard

---

## 🎯 Aim & Objectives
1. Design and build a production-grade **RESTful API** for student records management adhering to the 6 REST architectural constraints.
2. Implement standard HTTP methods:
   - `GET /api/students`: Retrieve students with pagination (`?page=1&limit=5`), sorting (`?sort=cgpa:desc`), and department filters.
   - `GET /api/students/:id`: Retrieve single student record.
   - `POST /api/students`: Create new student with validation and conflict checks (`201 Created` / `400 Bad Request`).
   - `PUT /api/students/:id`: Complete resource replacement.
   - `PATCH /api/students/:id`: Partial field update.
   - `DELETE /api/students/:id`: Remove student record.
   - `GET /api/students/stats/summary`: Aggregate analytics.
3. Construct an official **Postman Collection (v2.1)** with automated JavaScript assertions (`pm.test`).
4. Provide an in-browser interactive Postman test runner and downloadable collection file.

---

## 📂 Project Directory Structure

```plaintext
Practical-06-REST-API-Postman/
├── package.json                         # Node dependencies (express, cors)
├── server.js                            # Express server entrypoint on Port 5001
├── README.md                            # Comprehensive laboratory writeup
├── data/
│   └── studentsData.js                  # Initial student dataset & viva questions
├── routes/
│   └── studentRoutes.js                 # REST router (CRUD, pagination, sorting, stats)
├── postman/
│   └── Student_Management_API.postman_collection.json # Official Postman collection export
└── public/                              # Interactive Web Dashboard & Postman Runner
    ├── index.html                       # In-browser test runner & live records table
    ├── style.css                        # Glassmorphic UI styles
    └── script.js                        # Client test execution engine with pm.test assertions
```

---

## 📡 RESTful Endpoints Reference

| Method | Endpoint | Description | Status Code |
| :---: | :--- | :--- | :---: |
| **GET** | `/api/students` | Get all students (Supports `?page=`, `?limit=`, `?department=`, `?sort=`, `?search=`) | `200 OK` |
| **GET** | `/api/students/:id` | Get student by ID | `200 OK` / `404 Not Found` |
| **POST** | `/api/students` | Create student (Requires `rollNo`, `fullName`, `email`) | `201 Created` / `400 Bad Request` |
| **PUT** | `/api/students/:id` | Replace / Update full record | `200 OK` / `404 Not Found` |
| **PATCH** | `/api/students/:id` | Partial field update | `200 OK` / `404 Not Found` |
| **DELETE** | `/api/students/:id` | Remove student record | `200 OK` / `404 Not Found` |
| **GET** | `/api/students/stats/summary` | Aggregated metrics | `200 OK` |

---

## ⚡ How to Run

1. Navigate to this directory:
   ```bash
   cd Practical-06-REST-API-Postman
   ```

2. Start the Express server:
   ```bash
   npm start
   ```

3. Open your browser:
   - **Interactive Postman Suite & Dashboard:** [http://localhost:5001](http://localhost:5001)

4. **Importing into Postman Desktop App:**
   - Open Postman &rarr; Click **Import** &rarr; Select `postman/Student_Management_API.postman_collection.json`.
   - Click **Run Collection** to execute all automated test assertions!

---

## 🎓 University Viva Voce Preparation

| No. | Viva Question | Key Answer |
| :---: | :--- | :--- |
| **Q1** | What are the 6 architectural constraints of REST? | Client-Server, Statelessness, Cacheability, Layered System, Uniform Interface, Code on Demand. |
| **Q2** | What is Idempotency in HTTP methods? | An operation whose repeated execution produces identical server side-effects (GET, PUT, DELETE are idempotent; POST is not). |
| **Q3** | How does PUT differ from PATCH? | PUT replaces the entire resource representation; PATCH applies partial modifications to specific fields. |
| **Q4** | Why use nouns in REST URLs? | URLs identify resources (nouns like `/api/students`); actions are defined exclusively by HTTP verbs (GET, POST, etc.). |
| **Q5** | How do automated tests work in Postman? | Under the Tests tab, JavaScript assertions evaluate responses using `pm.test("title", function() { pm.response.to.have.status(200); })`. |
