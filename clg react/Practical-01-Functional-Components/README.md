# Practical 01: Functional Components, JSX & Component Reusability

## 📌 Practical Details
- **Practical Number:** 01
- **Curriculum:** Web Application Development / MERN Stack Lab
- **Practical Title:** Build a React application using Functional Components, JSX, and Component Reusability concepts.
- **Tech Stack:** React 19, Vite 8, Lucide React, Vanilla CSS Design System Tokens

---

## 🎯 Aim & Objectives
1. Understand the paradigm of **Functional Components** in React.
2. Master **JSX (JavaScript XML)** syntax rules, expression evaluation, and conditional rendering.
3. Architect modular, decoupled **Reusable UI Components** (Button, Badge, Card, StatCard).
4. Utilize `props` destructuring, default parameters, and the `props.children` composition pattern.
5. Create an interactive Component Playground and Viva examination guide.

---

## 📂 Project Directory Structure

```plaintext
Practical-01-Functional-Components/
├── index.html                           # Root HTML with Google Fonts & metadata
├── package.json                         # Project dependencies (React 19, Lucide, Vite)
├── README.md                            # Comprehensive practical lab writeup
├── vite.config.js                       # Vite configuration
└── src/
    ├── main.jsx                         # Application entrypoint
    ├── App.jsx                          # Main controller with tab navigation & theme toggle
    ├── App.css                          # Layout grids, hero banners, and responsive styles
    ├── index.css                        # Design system tokens (colors, dark/light mode)
    ├── data/
    │   ├── coursesData.js               # Mock curriculum and faculty datasets
    │   ├── statsData.js                 # Academic analytics data
    │   └── vivaQuestions.js             # University viva voce Q&A dataset
    └── components/
        ├── common/                      # Atomic Reusable Components
        │   ├── Button.jsx & Button.css  # Reusable button with variants, sizes & icons
        │   ├── Badge.jsx & Badge.css    # Status badges with pill & dot indicators
        │   ├── Card.jsx & Card.css      # Composable card with slots (header/footer/body)
        │   ├── StatCard.jsx & .css      # Metric card with dynamic trend calculations
        │   ├── AlertBanner.jsx & .css   # Dismissible notification banners
        │   └── CodeBlock.jsx & .css     # Preformatted code box with clipboard copy
        └── features/                    # Feature Components Composed from Reusables
            ├── CourseCard.jsx & .css    # Course card composing Card, Badge, and Button
            ├── InstructorCard.jsx & .css# Faculty profile card composing common components
            ├── PropPlayground.jsx & .css# Live interactive props & JSX generation lab
            └── LabManualSection.jsx & .css# Academic theory, comparison table & viva accordion
```

---

## 🧠 Theoretical Concepts

### 1. Functional Components
In React, a Functional Component is a pure JavaScript function that accepts `props` as an argument and returns JSX:
```jsx
export const Welcome = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};
```
**Key Advantages over Class Components:**
- No complex `this` keyword binding.
- Less boilerplate and smaller memory footprint.
- Native support for React Hooks (`useState`, `useEffect`).
- Easier to unit test, refactor, and compose.

### 2. JSX (JavaScript XML) Rules
- **Single Root Element:** Components must return a single top-level element or React Fragment (`<>...</>`).
- **Closing Tags:** All tags must be explicitly closed (`<img />`, `<input />`).
- **Attribute Naming:** Attributes use `camelCase` (e.g., `className` instead of `class`, `htmlFor` instead of `for`).
- **Dynamic Expressions:** JavaScript expressions are enclosed inside curly braces `{}`.
- **Inline Styling:** Passed as JavaScript objects (`style={{ color: 'red', marginTop: '10px' }}`).

### 3. Component Reusability & Composition
Instead of hardcoding buttons, cards, or badges on every view, reusable atomic components are designed with:
- **Variant Props:** Alter styles (`variant="primary"`, `variant="gradient"`).
- **Size Props:** Alter dimensions (`size="sm"`, `size="lg"`).
- **Children Prop:** Enables arbitrary nested JSX structure (`<Card><CustomContent /></Card>`).
- **Callback Props:** Event handlers passed down (`onClick={handleAction}`).

---

## ⚡ How to Run

1. Open terminal and navigate to this folder:
   ```bash
   cd Practical-01-Functional-Components
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## 🎓 University Viva Voce Preparation

| No. | Question | Short Answer |
| :---: | :--- | :--- |
| **Q1** | What is a Functional Component? | A plain JavaScript function returning JSX, avoiding `this` binding and using React Hooks. |
| **Q2** | Why do we use JSX? | It provides an expressive HTML-like syntax inside JavaScript, escaping variables to prevent XSS attacks. |
| **Q3** | What is `props.children`? | A built-in prop that passes whatever elements or text are wrapped between a component's tags. |
| **Q4** | Why must list items have a `key` prop? | React's Reconciliation Diffing algorithm needs keys to track element additions, deletions, and moves. |
| **Q5** | How do you achieve Component Reusability? | By parameterizing styles and behavior using props (variants, sizes, callbacks) and composing smaller components. |
