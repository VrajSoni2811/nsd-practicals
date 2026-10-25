# Practical 04: Single Page Application (SPA) using React Router

## 📌 Practical Details
- **Practical Number:** 04
- **Curriculum:** Web Application Development / MERN Stack Lab
- **Practical Title:** Develop a Single Page Application (SPA) using React Router for navigation between multiple pages.
- **Tech Stack:** React 19, React Router v7 / v6, Vite 8, Lucide React, Vanilla CSS Design System Tokens

---

## 🎯 Aim & Objectives
1. Understand the architecture of **Single Page Applications (SPAs)** versus traditional **Multi-Page Applications (MPAs)**.
2. Master client-side routing using **React Router**:
   - `BrowserRouter`, `Routes`, and `Route` configuration.
   - Declarative navigation with `Link` and active-aware `NavLink`.
   - Nested layout routing with `<Outlet />` for persistent headers, breadcrumbs, and footers.
3. Handle dynamic route parameters using the `useParams()` hook (e.g. `/courses/:courseId`).
4. Read URL search query strings using `useSearchParams()`.
5. Execute programmatic navigation using the `useNavigate()` hook.
6. Handle unmatched routes with a catch-all 404 (`path="*"`) fallback page.

---

## 📂 Project Directory Structure

```plaintext
Practical-04-SPA-React-Router/
├── index.html                               # Root HTML with Google Fonts & metadata
├── package.json                             # Dependencies (React 19, React Router v7, Lucide, Vite)
├── README.md                                # Comprehensive laboratory writeup
├── vite.config.js                           # Vite configuration
└── src/
    ├── main.jsx                             # Application mount entrypoint
    ├── App.jsx                              # Route definitions & BrowserRouter configuration
    ├── index.css                            # Design tokens (colors, dark/light mode)
    ├── data/
    │   └── coursesData.js                   # Curriculum modules, faculty data & viva Q&As
    ├── components/
    │   └── layout/                          # Layout Hierarchy
    │       ├── Navbar.jsx & .css            # Header with active NavLinks & theme toggle
    │       ├── RootLayout.jsx & .css        # Nested wrapper with Outlet & dynamic breadcrumbs
    ├── pages/                               # Route Pages
    │   ├── HomePage.jsx & .css              # Campus dashboard & quick feature cards
    │   ├── CoursesPage.jsx & .css           # Filterable curriculum catalog
    │   ├── CourseDetailPage.jsx & .css      # Dynamic route using useParams() & syllabus modules
    │   ├── FacultyPage.jsx & .css           # Faculty directory
    │   ├── AdmissionPage.jsx & .css         # Application form reading useSearchParams()
    │   ├── LabManualPage.jsx & .css         # SPA vs MPA theory table & 8 viva Q&As
    │   └── NotFoundPage.jsx & .css          # 404 Catch-all route page
```

---

## 🧠 Theoretical Foundations

### 1. SPA vs MPA Summary

| Feature | Single Page Application (SPA) | Multi-Page Application (MPA) |
| :--- | :--- | :--- |
| **Page Reloads** | **Zero reloads**; client-side DOM updates | Full HTML reload per page request |
| **Routing** | Client-side via HTML5 History API | Web Server (Apache/Nginx/Node) |
| **Latency** | Instantaneous screen switches | Latency waiting for complete HTML downloads |
| **User Experience** | Fluid, native application feel | Screen flashes on each navigation |

### 2. Route Hierarchy Pattern
```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="courses" element={<CoursesPage />} />
      <Route path="courses/:courseId" element={<CourseDetailPage />} />
      <Route path="faculty" element={<FacultyPage />} />
      <Route path="admission" element={<AdmissionPage />} />
      <Route path="manual" element={<LabManualPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
</BrowserRouter>
```

---

## ⚡ How to Run

1. Open terminal and navigate to this folder:
   ```bash
   cd Practical-04-SPA-React-Router
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
| **Q1** | What is a Single Page Application (SPA)? | An app that rewrites the current DOM dynamically with data instead of loading entire new HTML pages from a server. |
| **Q2** | How does client-side routing work? | It uses the HTML5 History API (`pushState`, `popstate`) to update the URL and render matching React components without server reloads. |
| **Q3** | What is the difference between `Link` and `NavLink`? | `NavLink` has built-in awareness of the active route, supplying an `isActive` boolean to highlight active tabs. |
| **Q4** | What is the purpose of `<Outlet />`? | It serves as a placeholder in a parent layout route to render matching child route components. |
| **Q5** | How do you read dynamic URL parameters? | Using the `useParams()` hook (e.g. `const { courseId } = useParams()`). |
| **Q6** | How do you navigate programmatically? | Using the `useNavigate()` hook (e.g. `const navigate = useNavigate(); navigate('/admission')`). |
