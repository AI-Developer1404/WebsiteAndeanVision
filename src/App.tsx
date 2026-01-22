import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoadingSpinner from './components/LoadingSpinner';

const LandingPage = React.lazy(() => import('./components/LandingPage'));
const CheckoutPage = React.lazy(() => import('./components/CheckoutPage'));
const DownloadHub = React.lazy(() => import('./components/DownloadHub'));
const EbookViewer = React.lazy(() => import('./components/EbookViewer'));
const MusicPage = React.lazy(() => import('./components/MusicPage'));
const EbookLandingPage = React.lazy(() => import('./components/EbookLandingPage'));
const ArtPage = React.lazy(() => import('./components/ArtPage'));
const AboutPage = React.lazy(() => import('./components/AboutPage'));
import { LanguageProvider } from './context/LanguageContext';

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
        <React.Suspense fallback={<LoadingSpinner />}>
          <AnimatedRoutes />
        </React.Suspense>
      </Router>
    </LanguageProvider>
  );
};

export default App;
