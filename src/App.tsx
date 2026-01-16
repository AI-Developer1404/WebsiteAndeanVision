import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import CheckoutPage from './components/CheckoutPage';
import DownloadHub from './components/DownloadHub';
import EbookViewer from './components/EbookViewer';
import { LanguageProvider } from './context/LanguageContext';

import MusicPage from './components/MusicPage';
import EbookLandingPage from './components/EbookLandingPage';
import ArtPage from './components/ArtPage';
import AboutPage from './components/AboutPage';

import PremiumNavbar from './components/PremiumNavbar';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/thank-you" element={<DownloadHub />} />
        <Route path="/ebook" element={<EbookViewer />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/cusco-book" element={<EbookLandingPage />} />
        <Route path="/art" element={<ArtPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <PremiumNavbar />
        <AnimatedRoutes />
      </Router>
    </LanguageProvider>
  );
};

export default App;
