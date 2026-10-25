export let students = [
  {
    id: 1,
    rollNo: 'STU-1001',
    fullName: 'Aarav Sharma',
    email: 'aarav.sharma@college.edu',
    phone: '9876543210',
    department: 'Computer Science',
    semester: 6,
    cgpa: 9.45,
    gender: 'Male',
    skills: ['React', 'Node.js', 'MongoDB', 'Docker'],
    enrollmentDate: '2023-08-15'
  },
  {
    id: 2,
    rollNo: 'STU-1002',
    fullName: 'Priya Patel',
    email: 'priya.patel@college.edu',
    phone: '9823456781',
    department: 'AI & Data Science',
    semester: 6,
    cgpa: 9.80,
    gender: 'Female',
    skills: ['Python', 'TensorFlow', 'React'],
    enrollmentDate: '2023-08-15'
  },
  {
    id: 3,
    rollNo: 'STU-1003',
    fullName: 'Rohan Verma',
    email: 'rohan.verma@college.edu',
    phone: '9811223344',
    department: 'Information Technology',
    semester: 8,
    cgpa: 8.75,
    gender: 'Male',
    skills: ['Node.js', 'Express', 'MySQL'],
    enrollmentDate: '2022-08-10'
  },
  {
    id: 4,
    rollNo: 'STU-1004',
    fullName: 'Ananya Iyer',
    email: 'ananya.iyer@college.edu',
    phone: '9744556677',
    department: 'Computer Science',
    semester: 4,
    cgpa: 9.20,
    gender: 'Female',
    skills: ['React', 'JavaScript', 'Git'],
    enrollmentDate: '2024-08-20'
  },
  {
    id: 5,
    rollNo: 'STU-1005',
    fullName: 'Vikram Malhotra',
    email: 'vikram.m@college.edu',
    phone: '9899887766',
    department: 'Electronics',
    semester: 6,
    cgpa: 8.90,
    gender: 'Male',
    skills: ['Embedded C', 'IoT', 'Python'],
    enrollmentDate: '2023-08-15'
  }
];

export const vivaQuestionsPractical6 = [
  {
    id: 1,
    question: "What constitutes a RESTful API and what are the 6 architectural constraints of REST?",
    answer: "A REST (Representational State Transfer) API is an architectural style for distributed hypermedia systems. The 6 core constraints are:\n1. Client-Server Architecture\n2. Statelessness (no client session stored on server)\n3. Cacheability (responses must explicitly declare if cacheable)\n4. Layered System (client cannot distinguish if connected directly to end server or proxy)\n5. Uniform Interface (identification of resources, manipulation through representations, self-descriptive messages, HATEOAS)\n6. Code on Demand (optional)."
  },
  {
    id: 2,
    question: "What is Postman and why is it used for API testing?",
    answer: "Postman is an industry-standard API platform that allows developers to design, mock, debug, and test HTTP APIs. It allows constructing any HTTP method (GET, POST, PUT, PATCH, DELETE) with custom headers, query params, and body payloads, and writing automated test scripts in JavaScript using the 'pm.test' syntax to validate response schemas, status codes, and latency."
  },
  {
    id: 3,
    question: "How do you write automated test scripts in Postman?",
    answer: "Under Postman's 'Tests' tab, you write JavaScript assertions using the pm object:\npm.test('Status is 200 OK', function () {\n  pm.response.to.have.status(200);\n});\npm.test('Response is JSON array', function () {\n  const jsonData = pm.response.json();\n  pm.expect(jsonData.data).to.be.an('array');\n});"
  },
  {
    id: 4,
    question: "What is the concept of 'Idempotency' in HTTP methods?",
    answer: "An HTTP method is idempotent if performing multiple identical requests produces the exact same side-effect on the server as making a single request. GET, PUT, and DELETE are idempotent (calling DELETE /api/students/1 five times results in the same outcome: student 1 is gone). POST is NOT idempotent (calling POST /api/students five times creates 5 separate student records)."
  },
  {
    id: 5,
    question: "How does PUT differ from PATCH in RESTful APIs?",
    answer: "PUT replaces the entire resource representation (all attributes must be sent, or omitted ones may be wiped out). PATCH applies a partial update (only the specific modified attributes need to be sent in the request body)."
  },
  {
    id: 6,
    question: "Why should REST endpoints use nouns instead of verbs?",
    answer: "In REST, URLs identify resources (nouns like /api/students, /api/courses). The actions performed on those resources are defined exclusively by HTTP verbs (GET to read, POST to create, PUT to replace, DELETE to delete). Having URLs like /api/getStudents or /api/deleteStudent violates REST conventions."
  },
  {
    id: 7,
    question: "What is the purpose of Pagination and Filtering in REST APIs?",
    answer: "When a database grows to thousands or millions of records, returning all records in a single GET request causes severe memory exhaustion, high network latency, and slow database queries. Pagination (?page=1&limit=10) and filtering (?department=CS) allow clients to fetch manageable chunks of data on demand."
  },
  {
    id: 8,
    question: "What are Postman Collections and Environment Variables?",
    answer: "A Postman Collection is an executable group of related API requests organized into folders with shared test suites that can be exported as JSON or run in CI/CD pipelines using Newman. Environment variables (like {{baseUrl}}) allow dynamically switching between local, staging, and production server URLs without modifying individual requests."
  }
];
