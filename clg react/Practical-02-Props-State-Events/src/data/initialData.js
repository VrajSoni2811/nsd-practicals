export const initialTasks = [
  {
    id: 1,
    title: 'Complete Lab Practical 01 writeup and component docs',
    category: 'Academics',
    priority: 'High',
    completed: true,
    createdAt: '2026-10-24'
  },
  {
    id: 2,
    title: 'Implement useState hook with pure array immutability',
    category: 'Lab Work',
    priority: 'High',
    completed: false,
    createdAt: '2026-10-25'
  },
  {
    id: 3,
    title: 'Study SyntheticEvent delegation & e.preventDefault()',
    category: 'Exam Prep',
    priority: 'Medium',
    completed: false,
    createdAt: '2026-10-25'
  },
  {
    id: 4,
    title: 'Review React unidirectional data flow & props drilling',
    category: 'Academics',
    priority: 'Low',
    completed: true,
    createdAt: '2026-10-23'
  }
];

export const initialTransactions = [
  {
    id: 101,
    title: 'Web Dev Lab Manual & Textbook',
    amount: 450,
    type: 'expense',
    category: 'Education',
    date: '2026-10-22'
  },
  {
    id: 102,
    title: 'Freelance React UI Component Stipend',
    amount: 3200,
    type: 'income',
    category: 'Work',
    date: '2026-10-24'
  },
  {
    id: 103,
    title: 'MongoDB Cloud Database Subscription',
    amount: 250,
    type: 'expense',
    category: 'Software',
    date: '2026-10-25'
  },
  {
    id: 104,
    title: 'College TechFest Registration Fee',
    amount: 150,
    type: 'expense',
    category: 'College',
    date: '2026-10-25'
  }
];

export const vivaQuestionsPractical2 = [
  {
    id: 1,
    question: "What is the core difference between Props and State in React?",
    answer: "Props (short for properties) are read-only inputs passed from a parent component to a child component (unidirectional data flow). A component cannot mutate its own props. In contrast, State is internal, mutable data managed by the component itself using the useState hook; when state updates, React schedules a re-render of the component and its children."
  },
  {
    id: 2,
    question: "What is 'Lifting State Up' and when should you use it?",
    answer: "'Lifting State Up' is the technique where shared state is moved up to the closest common ancestor of two or more child components that need to share or synchronize that data. The ancestor component holds the state and passes it down as props, along with callback handler functions that allow children to request state updates."
  },
  {
    id: 3,
    question: "Why should React State never be mutated directly?",
    answer: "React relies on shallow reference equality checks (Object.is) to detect state changes. If you mutate an array or object directly (e.g., tasks.push(item) or state.count = 5), the memory reference remains identical, so React may fail to detect the change and will not trigger a re-render. Always use immutable updates with the spread operator [...prev, item] or {...prev, key: value}."
  },
  {
    id: 4,
    question: "What is a React SyntheticEvent and why does React use it?",
    answer: "A SyntheticEvent is React's cross-browser wrapper around the native browser DOM event. It provides identical properties and methods (like e.preventDefault() and e.stopPropagation()) consistently across all browsers (Chrome, Safari, Firefox, Edge). React uses top-level event delegation on the root container for high performance."
  },
  {
    id: 5,
    question: "Why do we use updater functions like setCount(prev => prev + 1)?",
    answer: "Because React batches state updates for performance, calling setCount(count + 1) multiple times synchronously will read the same stale value of 'count' from the current render closure. Using an updater function (prev => prev + 1) guarantees access to the most recent, queued pending state."
  },
  {
    id: 6,
    question: "What does e.preventDefault() and e.stopPropagation() do in React event handlers?",
    answer: "e.preventDefault() cancels the browser's default behavior (such as submitting an HTML form and reloading the page, or following an anchor href). e.stopPropagation() stops the event from bubbling up the component DOM tree, preventing ancestor click handlers from being triggered."
  },
  {
    id: 7,
    question: "How do you pass arguments to an event handler in JSX?",
    answer: "You pass an inline arrow function: onClick={() => handleDelete(item.id)} or onClick={(e) => handleAction(item.id, e)}. Calling onClick={handleDelete(item.id)} directly is an error because it invokes the function immediately on initial render rather than on click."
  },
  {
    id: 8,
    question: "How do controlled form components work in React?",
    answer: "In a controlled component, form element values (input, select, textarea) are tied directly to React state via the 'value' prop, and any user input updates the state via an 'onChange' handler. React serves as the single source of truth for the input's current value."
  }
];
