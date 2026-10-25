export const coursesData = [
  {
    id: 'cs101',
    slug: 'react-frontend-architecture',
    title: 'Advanced React 19 & Next.js Architecture',
    category: 'Frontend Engineering',
    categoryVariant: 'primary',
    code: 'CS-401',
    credits: 4,
    instructor: 'Dr. Sarah Jenkins',
    instructorRole: 'Principal Web Architect & React Specialist',
    duration: '14 Weeks',
    level: 'Advanced',
    rating: 4.9,
    studentsCount: '1,420',
    description: 'Deep dive into React 19 functional components, compiler optimizations, custom hooks, Single Page Application routing, and modern performance patterns.',
    prerequisites: ['JavaScript ES6+', 'HTML5/CSS3', 'Basic DOM Knowledge'],
    syllabus: [
      { week: 1, topic: 'Functional Components & Modern JSX Semantics' },
      { week: 2, topic: 'Hooks Deep-Dive: useState, useEffect, useRef, useMemo' },
      { week: 3, topic: 'Component Reusability & Compound Component Architecture' },
      { week: 4, topic: 'Client-Side SPA Routing with React Router v6/v7' },
      { week: 5, topic: 'Dynamic Segment Parameters (useParams) & Query Strings' },
      { week: 6, topic: 'State Management with Context API & Redux Toolkit' },
      { week: 7, topic: 'Performance Tuning, Code-Splitting & Lazy Loading' }
    ]
  },
  {
    id: 'cs102',
    slug: 'nodejs-express-microservices',
    title: 'Node.js & Express RESTful API Engineering',
    category: 'Backend Development',
    categoryVariant: 'cyan',
    code: 'CS-402',
    credits: 4,
    instructor: 'Prof. Alex Rivera',
    instructorRole: 'Cloud Infrastructure & API Architect',
    duration: '12 Weeks',
    level: 'Intermediate to Advanced',
    rating: 4.85,
    studentsCount: '1,180',
    description: 'Design and deploy production-ready backend servers using Express.js, middleware pipelines, JWT authentication, and Postman API contract testing.',
    prerequisites: ['Node.js Fundamentals', 'Asynchronous JavaScript & Promises'],
    syllabus: [
      { week: 1, topic: 'Node.js Event Loop, Streams & Buffer Architecture' },
      { week: 2, topic: 'Express Application Lifecycle & Routing Paradigms' },
      { week: 3, topic: 'Middleware Chain: Logging, CORS, Body-Parser, Auth' },
      { week: 4, topic: 'RESTful Resource Modeling & HTTP Status Standards' },
      { week: 5, topic: 'Error Handling Middleware & Custom Exception Classes' },
      { week: 6, topic: 'API Documentation & Automated Postman Test Scripts' }
    ]
  },
  {
    id: 'cs103',
    slug: 'mern-cloud-database-systems',
    title: 'Full-Stack MERN Architecture with MongoDB Atlas',
    category: 'Full-Stack Engineering',
    categoryVariant: 'emerald',
    code: 'CS-403',
    credits: 5,
    instructor: 'David Chen, M.Tech',
    instructorRole: 'Senior Full-Stack Consultant',
    duration: '16 Weeks',
    level: 'Comprehensive',
    rating: 4.95,
    studentsCount: '2,040',
    description: 'Master full-stack integration connecting React frontends with Express microservices and MongoDB cloud database clusters with ODM Mongoose modeling.',
    prerequisites: ['React Basics', 'Express.js Fundamentals', 'JSON & HTTP'],
    syllabus: [
      { week: 1, topic: 'NoSQL Schemas vs Relational Modeling in MongoDB' },
      { week: 2, topic: 'Mongoose ODM: Schema Validation, Hooks, Virtuals' },
      { week: 3, topic: 'Full-Stack CRUD Pipeline (Client &rarr; API &rarr; Database)' },
      { week: 4, topic: 'File Upload Pipeline using Multer & GridFS' },
      { week: 5, topic: 'User Authentication, Passwords Hashing & JWT Security' },
      { week: 6, topic: 'Role-Based Access Control (RBAC) & Route Protection' },
      { week: 7, topic: 'Full-Stack Production Deployment & CI/CD Pipelines' }
    ]
  },
  {
    id: 'cs104',
    slug: 'realtime-systems-socketio',
    title: 'Real-Time Web Applications with Socket.IO',
    category: 'Distributed Systems',
    categoryVariant: 'purple',
    code: 'CS-404',
    credits: 3,
    instructor: 'Dr. Sarah Jenkins',
    instructorRole: 'Principal Web Architect',
    duration: '10 Weeks',
    level: 'Advanced',
    rating: 4.88,
    studentsCount: '890',
    description: 'Implement bidirectional, event-driven real-time communication between React clients and Node.js servers using WebSockets and Socket.IO rooms.',
    prerequisites: ['Node.js', 'React Hooks', 'Network Protocols'],
    syllabus: [
      { week: 1, topic: 'HTTP Polling vs WebSockets vs Server-Sent Events' },
      { week: 2, topic: 'Socket.IO Architecture, Handshakes & Connection Events' },
      { week: 3, topic: 'Broadcasting, Namespaces & Room Partitioning' },
      { week: 4, topic: 'Building a Full-Duplex Real-Time Chat & Activity Stream' }
    ]
  }
];

export const facultyData = [
  {
    id: 1,
    name: 'Dr. Sarah Jenkins',
    role: 'Professor & Department Chair',
    department: 'Computer Science',
    email: 's.jenkins@college.edu',
    coursesTaught: ['Advanced React 19', 'Real-Time Web Systems'],
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    bio: 'PhD from Stanford in Software Systems. 12+ years experience in reactive UI frameworks and distributed frontend systems.'
  },
  {
    id: 2,
    name: 'Prof. Alex Rivera',
    role: 'Associate Professor',
    department: 'Software Engineering',
    email: 'a.rivera@college.edu',
    coursesTaught: ['Node.js & Express RESTful API Engineering'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'Author of enterprise backend architectural patterns with 15+ years engineering scalable cloud microservices.'
  },
  {
    id: 3,
    name: 'David Chen, M.Tech',
    role: 'Senior Adjunct Faculty & Industry Fellow',
    department: 'Information Technology',
    email: 'd.chen@college.edu',
    coursesTaught: ['Full-Stack MERN Architecture with MongoDB Atlas'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    bio: 'Former Lead Architect at Fortune 500 SaaS firm, specializing in full-stack cloud data pipelines.'
  }
];

export const vivaQuestionsPractical4 = [
  {
    id: 1,
    question: "What is a Single Page Application (SPA) and how does it differ from a Multi-Page Application (MPA)?",
    answer: "A Single Page Application (SPA) interacts with the user by dynamically rewriting the current web page with data from the server rather than loading entire new HTML pages from scratch. In contrast, a traditional Multi-Page Application (MPA) requests a complete new HTML document from the server on every link click, leading to white screen flashes, higher server latency, and full browser reloads."
  },
  {
    id: 2,
    question: "How does client-side routing work in React Router?",
    answer: "Client-side routing utilizes the HTML5 History API (pushState, replaceState, popstate event) to manipulate the browser URL without issuing an HTTP request to the server. React Router intercepts URL changes and renders the corresponding component tree mapped to that route path in the client."
  },
  {
    id: 3,
    question: "What is the difference between Link and NavLink in React Router?",
    answer: "Both components provide declarative navigation without full page reloads. However, NavLink provides built-in awareness of whether the link matches the active current URL, accepting a className or style function (({ isActive }) => isActive ? 'active' : '') to highlight active menu tabs."
  },
  {
    id: 4,
    question: "What is the purpose of the useParams() hook?",
    answer: "useParams() returns an object of key/value pairs of dynamic URL segments defined in the route path with a colon. For example, for the route <Route path='/courses/:courseId' element={<CourseDetail />} />, visiting /courses/cs101 allows useParams() to extract { courseId: 'cs101' }."
  },
  {
    id: 5,
    question: "How do you perform programmatic navigation in React Router?",
    answer: "By using the useNavigate() hook: const navigate = useNavigate();. You can call navigate('/admission') upon a successful form submit, or navigate(-1) to go back to the previous page in history."
  },
  {
    id: 6,
    question: "What is the role of <Outlet /> in nested routing?",
    answer: "An <Outlet /> component is a placeholder in a parent route layout that renders child route elements. This enables persistent layout wrappers (like shared navigation bars, breadcrumbs, and footers) to remain mounted while changing inner child pages."
  },
  {
    id: 7,
    question: "How do you handle 404 (Not Found) routes in React Router?",
    answer: "By defining a catch-all route at the very end of your <Routes> tree with a wildcard path: <Route path='*' element={<NotFoundPage />} />. Any requested URL that does not match preceding routes will render this component."
  },
  {
    id: 8,
    question: "What is the difference between BrowserRouter and HashRouter?",
    answer: "BrowserRouter uses standard URL paths (/courses) powered by the HTML5 History API and requires backend server configuration to redirect all paths to index.html. HashRouter uses the hash portion of the URL (/#/courses) which is never sent to the server, useful for static hosting with no server configuration control."
  }
];
