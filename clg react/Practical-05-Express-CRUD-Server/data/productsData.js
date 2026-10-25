export let products = [
  {
    id: 1,
    name: 'Logitech MX Master 3S Wireless Mouse',
    category: 'Peripherals',
    price: 99.99,
    stock: 45,
    description: 'Ergonomic performance wireless mouse with 8K DPI tracking and quiet clicks.'
  },
  {
    id: 2,
    name: 'Dell UltraSharp 27" 4K USB-C Monitor',
    category: 'Displays',
    price: 529.99,
    stock: 18,
    description: 'IPS Black technology with 2000:1 contrast ratio and 98% DCI-P3 color gamut.'
  },
  {
    id: 3,
    name: 'Keychron Q1 Pro Custom Mechanical Keyboard',
    category: 'Peripherals',
    price: 199.00,
    stock: 24,
    description: '75% layout QMK/VIA wireless custom mechanical keyboard with aluminum body.'
  },
  {
    id: 4,
    name: 'Samsung 990 PRO 2TB NVMe SSD',
    category: 'Storage',
    price: 179.99,
    stock: 60,
    description: 'PCIe 4.0 NVMe SSD with sequential read speeds up to 7,450 MB/s.'
  }
];

export const vivaQuestionsPractical5 = [
  {
    id: 1,
    question: "What is Express.js and why is it preferred for Node.js backends?",
    answer: "Express.js is a minimal, unopinionated, and flexible Node.js web application framework. It provides a robust set of features for web and mobile applications, including simplified routing, powerful middleware pipelines, request/response helpers, template engine integration, and high performance while staying close to core Node.js primitives."
  },
  {
    id: 2,
    question: "What is an Express Router and why do we use express.Router()?",
    answer: "express.Router() creates a modular, mountable route handler. A Router instance is a complete middleware and routing system (often referred to as a 'mini-app'). It allows organizing route endpoints into separate files (e.g., productRoutes.js, userRoutes.js) and mounting them on base paths in server.js, improving maintainability."
  },
  {
    id: 3,
    question: "Explain the four basic CRUD operations and their corresponding HTTP methods.",
    answer: "1. Create -> POST (creates a new resource, returns 201 Created)\n2. Read -> GET (retrieves resources, returns 200 OK)\n3. Update -> PUT / PATCH (replaces or partially updates a resource, returns 200 OK)\n4. Delete -> DELETE (removes a resource, returns 200 OK or 204 No Content)."
  },
  {
    id: 4,
    question: "What is the purpose of the express.json() middleware?",
    answer: "express.json() is a built-in middleware based on body-parser. It parses incoming HTTP requests with JSON payloads (Content-Type: application/json) and populates the parsed data into the req.body object. Without it, req.body remains undefined for incoming JSON data."
  },
  {
    id: 5,
    question: "What is the difference between req.params and req.query in Express?",
    answer: "req.params contains route parameter tokens defined in the path path string (e.g., /api/products/:id -> req.params.id). req.query contains URL query string parameters appended after the question mark (e.g., /api/products?category=Peripherals -> req.query.category)."
  },
  {
    id: 6,
    question: "How do status codes 200, 201, 400, 404, and 500 differ?",
    answer: "- 200 OK: Request succeeded.\n- 201 Created: New resource successfully created.\n- 400 Bad Request: Client sent invalid data or missing required fields.\n- 404 Not Found: Requested endpoint or resource ID does not exist.\n- 500 Internal Server Error: Unhandled runtime error occurred on the server."
  },
  {
    id: 7,
    question: "What is CORS and why is it needed in Express APIs?",
    answer: "CORS (Cross-Origin Resource Sharing) is a security mechanism enforced by web browsers that blocks web pages from making HTTP requests to a domain, port, or protocol different from the one that served the page. The 'cors' package in Express sets the appropriate HTTP headers (like Access-Control-Allow-Origin: *) to permit frontend clients to communicate with the backend."
  },
  {
    id: 8,
    question: "What is the difference between PUT and PATCH HTTP methods?",
    answer: "PUT replaces the entire resource with the payload sent in the request body (all fields must be provided). PATCH applies partial modifications to a resource, updating only the specific fields supplied in the request body."
  }
];
