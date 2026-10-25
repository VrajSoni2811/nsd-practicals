# Practical 02: Props, State Management and Event Handling

## 📌 Practical Details
- **Practical Number:** 02
- **Curriculum:** Web Application Development / MERN Stack Lab
- **Practical Title:** Develop a React application implementing Props, State Management and Event Handling.
- **Tech Stack:** React 19, Vite 8, Lucide React, Vanilla CSS Design System Tokens

---

## 🎯 Aim & Objectives
1. Understand **Props** and unidirectional data flow (Parent &rarr; Child).
2. Master **State Management** using the `useState` hook for:
   - Primitive state (active tabs, search query, theme).
   - Array state with pure immutability (`[...prev]`, `.map()`, `.filter()`).
   - Object state for multi-input controlled forms.
   - Functional state updaters (`setState(prev => prev + 1)`).
3. Implement **Event Handling** using React's SyntheticEvent system:
   - Form submission (`onSubmit`) with `e.preventDefault()`.
   - Controlled input changes (`onChange`).
   - Click interactions (`onClick`), event delegation, and stopping bubbling (`e.stopPropagation()`).
4. Apply the **Lifting State Up** architectural pattern.
5. Provide a real-time **SyntheticEvent & State Inspector** for interactive evaluation.

---

## 📂 Project Directory Structure

```plaintext
Practical-02-Props-State-Events/
├── index.html                               # Root HTML with Google Fonts & metadata
├── package.json                             # Dependencies (React 19, Lucide React, Vite 8)
├── README.md                                # Comprehensive laboratory writeup
├── vite.config.js                           # Vite configuration
└── src/
    ├── main.jsx                             # Application mount entrypoint
    ├── App.jsx                              # Root state holder (Lifting State Up)
    ├── App.css                              # App layout, metrics grid, and theme styles
    ├── index.css                            # Design tokens (colors, dark/light theme)
    ├── data/
    │   └── initialData.js                   # Seed data (tasks, transactions) & viva questions
    └── components/
        ├── common/                          # Reusable Primitive Components
        │   ├── Button.jsx & Button.css      # Configured via props with onClick handler
        │   ├── Badge.jsx & Badge.css        # Status pills configured via props
        │   ├── Card.jsx & Card.css          # Container using props.children composition
        │   └── StatCard.jsx & StatCard.css  # Metric overview cards
        └── features/                        # Feature Components with State & Events
            ├── TaskItem.jsx & .css          # Child receiving callbacks; uses e.stopPropagation()
            ├── TaskBoard.jsx & .css         # Array state management, batch actions, undo
            ├── BudgetTracker.jsx & .css     # Multi-field form state & functional updaters
            ├── LiveStateInspector.jsx & .css# Live event stream logger & JSON state tree
            └── LabManualSection.jsx & .css  # Theory, Props vs State table, viva accordion
```

---

## 🧠 Theoretical Foundations

### 1. Props vs State Summary

| Feature | Props | State |
| :--- | :--- | :--- |
| **Origin** | Passed down from a parent component | Declared and owned internally within the component |
| **Mutability** | **Immutable** (read-only for the receiver) | **Mutable** via setter function (`setState`) |
| **Purpose** | Configures child components & passes callbacks | Tracks interactive, dynamic, or time-varying data |
| **Re-rendering** | Re-renders child when parent provides new props | Re-renders component when state setter is called |

### 2. Immutability in State Updates
React compares previous and new state using shallow reference equality (`Object.is`). Direct mutation (like `tasks.push(newTask)`) retains the same memory address, preventing re-renders:
```javascript
// ❌ WRONG (Direct Mutation)
tasks.push(newTask);
setTasks(tasks);

// ✅ CORRECT (Immutable Array Spread)
setTasks(prev => [newTask, ...prev]);

// ✅ CORRECT (Immutable Update via map)
setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

// ✅ CORRECT (Immutable Deletion via filter)
setTasks(prev => prev.filter(t => t.id !== id));
```

### 3. Event Handling & Event Bubbling
```javascript
// Preventing page reload on form submit
const handleSubmit = (e) => {
  e.preventDefault(); // Cancels native browser POST action
  // process state...
};

// Stopping event propagation to parent elements
const handleDelete = (e, id) => {
  e.stopPropagation(); // Prevents parent row click from firing
  deleteTask(id);
};
```

---

## ⚡ How to Run

1. Open a terminal and navigate to this practical folder:
   ```bash
   cd Practical-02-Props-State-Events
   ```

2. Install dependencies (if needed):
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Verify production build:
   ```bash
   npm run build
   ```

---

## 🎓 University Viva Voce Preparation

| No. | Viva Question | Key Answer |
| :---: | :--- | :--- |
| **Q1** | What is the difference between Props and State? | Props are read-only inputs passed from parent to child; State is mutable internal data managed with `useState`. |
| **Q2** | What is "Lifting State Up"? | Moving shared state to the closest common ancestor when multiple child components need to share that state. |
| **Q3** | Why must state be updated immutably? | React relies on shallow reference equality (`Object.is`) to detect changes; mutating state directly bypasses re-rendering. |
| **Q4** | What is a SyntheticEvent? | React's cross-browser event wrapper providing unified event behavior (`e.preventDefault()`, `e.stopPropagation()`). |
| **Q5** | When should you use `setCount(prev => prev + 1)`? | When the next state depends on the previous state, preventing race conditions with batched asynchronous updates. |
| **Q6** | What does `e.stopPropagation()` do? | It prevents the event from bubbling up the DOM tree, so ancestor event listeners are not triggered. |
