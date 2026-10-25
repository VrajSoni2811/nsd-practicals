export const vivaQuestions = [
  {
    id: 1,
    question: "What is a Functional Component in React and how does it differ from a Class Component?",
    answer: "A Functional Component is simply a plain JavaScript function that receives props as an argument and returns JSX (Virtual DOM elements). Unlike legacy Class Components, functional components do not require 'this' keyword binding, have a smaller memory footprint, are easier to test and compose, and can utilize React Hooks for state and lifecycle operations."
  },
  {
    id: 2,
    question: "What is JSX and why do we use it in React?",
    answer: "JSX (JavaScript XML) is a syntax extension for JavaScript that allows developers to write HTML-like markup directly inside JavaScript files. It is not valid JavaScript on its own; compilers like Babel or SWC transform JSX into React.createElement() method calls. JSX improves readability, provides compile-time safety, and prevents XSS attacks by escaping values."
  },
  {
    id: 3,
    question: "What are the rules of JSX?",
    answer: "1. Return a single parent element (or use React Fragments <>...</>).\n2. Close all tags, including self-closing ones like <img /> and <br />.\n3. Use camelCase for attributes (e.g., className instead of class, htmlFor instead of for, tabIndex instead of tabindex).\n4. Embed dynamic JS expressions within curly braces { }.\n5. Inline styles must be passed as JavaScript objects: style={{ color: 'red', marginTop: '10px' }}."
  },
  {
    id: 4,
    question: "What is Component Reusability and why is it important?",
    answer: "Component Reusability is the software design principle where a single UI component is built in a modular, decoupled way so it can be reused across different views, pages, or even projects by simply changing its props (e.g., a Button or Card component). It reduces code duplication (DRY principle), ensures visual consistency across the UI, and simplifies maintenance and testing."
  },
  {
    id: 5,
    question: "How are props passed and consumed in a Functional Component?",
    answer: "Props are passed as attributes on the component element (e.g., <Button variant='primary' size='lg'>Click</Button>). In the functional component definition, props are received as an object parameter. Modern JavaScript allows parameter destructuring: const Button = ({ variant = 'primary', size = 'md', children }) => { ... }."
  },
  {
    id: 6,
    question: "What is the special 'children' prop in React?",
    answer: "The 'children' prop is an automatic prop populated with whatever elements or text are placed between the opening and closing tags of a component: <Card><p>Hello World</p></Card>. Inside the Card component, props.children renders that nested content. This enables flexible UI composition."
  },
  {
    id: 7,
    question: "Why do list items rendered in JSX need a 'key' prop?",
    answer: "React's Reconciliation (Diffing) algorithm uses the unique 'key' prop to track which items in an array have been added, removed, reordered, or modified between renders. Without unique keys, React re-renders the entire list unnecessarily, causing performance degradation and potential UI state bugs."
  },
  {
    id: 8,
    question: "How does conditional rendering work in JSX?",
    answer: "Because JSX expressions evaluate JavaScript, conditional rendering can be done using:\n1. Ternary Operator: {isLoggedIn ? <UserMenu /> : <LoginButton />}\n2. Logical AND: {hasUnreadMessages && <Badge count={messages.length} />}\n3. Early Return: if (!data) return <SkeletonLoader />;\n4. IIFE (Immediately Invoked Function Expression) or helper functions."
  }
];
