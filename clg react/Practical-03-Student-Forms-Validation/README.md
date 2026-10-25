# Practical 03: Student Management System (Controlled Forms & Validation)

## 📌 Practical Details
- **Practical Number:** 03
- **Curriculum:** Web Application Development / MERN Stack Lab
- **Practical Title:** Create a Student Management System using React Forms, Controlled Components and Validation.
- **Tech Stack:** React 19, Vite 8, Lucide React, Vanilla CSS Design System Tokens

---

## 🎯 Aim & Objectives
1. Implement **Controlled Components** where React state is the single source of truth for form inputs.
2. Build a multi-input student enrollment form with unified object state.
3. Apply real-time client-side validation logic using regular expressions:
   - Roll number pattern verification (`STU-XXXX`).
   - Standard email address format.
   - 10-digit mobile phone number check.
   - Date of Birth age requirement (minimum 16 years).
   - Numerical CGPA bounds (0.00 to 10.00).
4. Track **touched** vs **dirty** input states to prevent premature error hints.
5. Perform full **CRUD** operations (Create, Read, Update, Delete) on student records with state immutability.
6. Provide CSV export for student datasets.

---

## 📂 Project Directory Structure

```plaintext
Practical-03-Student-Forms-Validation/
├── index.html                               # Root HTML with Google Fonts & metadata
├── package.json                             # Dependencies (React 19, Lucide React, Vite 8)
├── README.md                                # Comprehensive laboratory writeup
├── vite.config.js                           # Vite configuration
└── src/
    ├── main.jsx                             # Application mount entrypoint
    ├── App.jsx                              # Student CRUD state, metrics & tabs
    ├── App.css                              # App layout, metrics cards & toast styles
    ├── index.css                            # Design tokens (colors, dark/light mode)
    ├── data/
    │   └── studentsData.js                  # Seed student records & viva voce Q&As
    └── components/
        ├── common/                          # Reusable Primitive Components
        │   ├── Button.jsx & Button.css      # Standard button with variants
        │   ├── Badge.jsx & Badge.css        # Status tags with dot indicators
        │   └── Card.jsx & Card.css          # Composable container card
        └── features/                        # Feature Components with Forms & Tables
            ├── StudentForm.jsx & .css       # Multi-input form with validation engine
            ├── StudentList.jsx & .css       # Filterable table/card directory with CSV export
            └── LabManualSection.jsx & .css  # Theory, Controlled vs Uncontrolled table, viva
```

---

## 🧠 Theoretical Foundations

### 1. Controlled Components vs Uncontrolled Components

| Feature | Controlled Component (React Standard) | Uncontrolled Component |
| :--- | :--- | :--- |
| **State Storage** | React Component State (`useState`) | Internal Browser DOM (`useRef`) |
| **Single Source of Truth** | React State | DOM Element |
| **Validation** | Instant validation on every keystroke (`onChange`) | Validated only upon submission |
| **Form Reset** | Trivially done by clearing state | Requires manual DOM resetting |

### 2. Multi-Input State Pattern
```javascript
const [values, setValues] = useState({
  rollNo: '',
  fullName: '',
  email: '',
  department: 'Computer Science'
});

const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setValues(prev => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value
  }));
};
```

---

## ⚡ How to Run

1. Open terminal and navigate to this folder:
   ```bash
   cd Practical-03-Student-Forms-Validation
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build production bundle:
   ```bash
   npm run build
   ```

---

## 🎓 University Viva Voce Preparation

| No. | Viva Question | Key Answer |
| :---: | :--- | :--- |
| **Q1** | What is a Controlled Component? | An input whose value is bound to React state and updated via an `onChange` handler, making React the single source of truth. |
| **Q2** | Why do we use `e.preventDefault()` on form submit? | It suppresses the default browser page reload and allows client-side Single Page Application (SPA) handling. |
| **Q3** | What is the purpose of tracking field `touched` state? | It prevents showing red error hints before the user has even focused or finished typing into a field. |
| **Q4** | How do you handle multi-select checkboxes in React state? | By maintaining an array in state and appending or filtering out values when checkboxes are toggled. |
