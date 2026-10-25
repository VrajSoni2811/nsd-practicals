export const initialStudents = [
  {
    id: 1,
    rollNo: 'STU-1001',
    fullName: 'Aarav Sharma',
    email: 'aarav.sharma@college.edu',
    phone: '9876543210',
    dob: '2004-03-15',
    department: 'Computer Science',
    semester: '6',
    cgpa: '9.45',
    gender: 'Male',
    skills: ['React', 'Node.js', 'MongoDB', 'Git'],
    status: 'Active'
  },
  {
    id: 2,
    rollNo: 'STU-1002',
    fullName: 'Priya Patel',
    email: 'priya.patel@college.edu',
    phone: '9823456781',
    dob: '2004-07-22',
    department: 'AI & Data Science',
    semester: '6',
    cgpa: '9.80',
    gender: 'Female',
    skills: ['Python', 'React', 'Docker'],
    status: 'Active'
  },
  {
    id: 3,
    rollNo: 'STU-1003',
    fullName: 'Rohan Verma',
    email: 'rohan.verma@college.edu',
    phone: '9811223344',
    dob: '2003-11-10',
    department: 'Information Technology',
    semester: '8',
    cgpa: '8.75',
    gender: 'Male',
    skills: ['Node.js', 'MongoDB', 'Git'],
    status: 'Active'
  },
  {
    id: 4,
    rollNo: 'STU-1004',
    fullName: 'Ananya Iyer',
    email: 'ananya.iyer@college.edu',
    phone: '9744556677',
    dob: '2005-01-30',
    department: 'Computer Science',
    semester: '4',
    cgpa: '9.20',
    gender: 'Female',
    skills: ['React', 'Git', 'Python'],
    status: 'Active'
  }
];

export const vivaQuestionsPractical3 = [
  {
    id: 1,
    question: "What is a Controlled Component in React?",
    answer: "A Controlled Component is an input form element (such as <input>, <select>, or <textarea>) whose value is controlled by React state rather than the DOM. The element's value attribute is tied to a state variable (value={formData.email}), and any user keystrokes update the state via an onChange handler. React acts as the single source of truth."
  },
  {
    id: 2,
    question: "What is an Uncontrolled Component and when is it used?",
    answer: "An Uncontrolled Component stores its own state internally in the DOM. Instead of writing an event handler for every state update, developers read form field values directly from the DOM using a React ref (useRef()). It is often used when integrating non-React legacy libraries or for file input elements (<input type='file'>) which are inherently read-only."
  },
  {
    id: 3,
    question: "How do you handle multiple form inputs with a single onChange handler?",
    answer: "By giving each input element a 'name' attribute matching the corresponding key in the state object (e.g., name='email', name='phone'). In the generic change handler, ES6 computed property names are used: const handleChange = (e) => { const { name, value, type, checked } = e.target; setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value })); };."
  },
  {
    id: 4,
    question: "What is the role of e.preventDefault() in React form submission?",
    answer: "By default, submitting an HTML form sends an HTTP POST/GET request to the server and reloads the entire page. Calling e.preventDefault() inside the form's onSubmit event handler suppresses this browser default behavior, allowing React to handle client-side validation and state updates without page reloading (Single Page Application behavior)."
  },
  {
    id: 5,
    question: "What is the difference between 'touched' and 'dirty' states in form validation?",
    answer: "'Touched' indicates that a user has focused and subsequently blurred (clicked away from) an input field (tracked via onBlur). 'Dirty' indicates that the user has modified the initial value of that field. Tracking 'touched' prevents showing jarring validation error messages before the user has even finished interacting with the field."
  },
  {
    id: 6,
    question: "How do you perform client-side validation in React?",
    answer: "You write a pure validation function that receives the current form values, tests each against business rules or regular expressions (e.g., email format, required length, roll number pattern), and returns an 'errors' object containing error strings. If Object.keys(errors).length === 0, the form is valid."
  },
  {
    id: 7,
    question: "Why is client-side validation not sufficient on its own?",
    answer: "Client-side validation enhances user experience (instant feedback, fewer round trips), but malicious actors can bypass client-side JavaScript by directly invoking backend APIs with tools like Postman or curl. Therefore, backend server-side validation is always mandatory for security and data integrity."
  },
  {
    id: 8,
    question: "How do you handle multi-select checkboxes (e.g., student skills) in React state?",
    answer: "Store skills as an array in state: const [skills, setSkills] = useState([]). When a checkbox is toggled, if checked is true, append the skill: [...prev, value]; if false, filter it out: prev.filter(item => item !== value)."
  }
];
