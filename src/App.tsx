import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Openings from './pages/Openings';
import Tactics from './pages/Tactics';
import Endgames from './pages/Endgames';
import Resources from './pages/Resources';
import Analysis from './pages/Analysis';
import HowToPlay from './pages/HowToPlay';
import CurriculumKit from './pages/CurriculumKit';
import './App.css';

// Page Transition Component
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  return (
    <div 
      key={location.pathname}
      className="page-transition animate-fade-in"
      style={{ 
        animationDelay: '0.1s',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {children}
    </div>
  );
};

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
};

const AppContent = () => {
  return (
    <div className="App">
      <ScrollToTop />
      <Navbar />
      <main id="main-content" className="main-content">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/openings" element={<Openings />} />
            <Route path="/tactics" element={<Tactics />} />
            <Route path="/endgames" element={<Endgames />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/how-to-play" element={<HowToPlay />} />
            <Route path="/curriculum-kit" element={<CurriculumKit />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App;
