import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import { HomePage } from './pages/HomePage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { FacultyPage } from './pages/FacultyPage';
import { AdmissionPage } from './pages/AdmissionPage';
import { LabManualPage } from './pages/LabManualPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Nested Layout Route providing persistent Navbar, Breadcrumbs & Footer */}
        <Route path="/" element={<RootLayout theme={theme} toggleTheme={toggleTheme} />}>
          <Route index element={<HomePage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/:courseId" element={<CourseDetailPage />} />
          <Route path="faculty" element={<FacultyPage />} />
          <Route path="admission" element={<AdmissionPage />} />
          <Route path="manual" element={<LabManualPage />} />
          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
