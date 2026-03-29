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
const PremiumEbookMockupPreview = React.lazy(() => import('./components/PremiumEbookMockupPreview'));
import { LanguageProvider } from './context/LanguageContext';

import PremiumNavbar from './components/PremiumNavbar';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
        <Route path="/preview-ebook-3d" element={<PremiumEbookMockupPreview />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

import GlobalBackground from './components/GlobalBackground';

const App: React.FC = () => {
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    import('@studio-freight/lenis').then((LenisModule) => {
      const Lenis = LenisModule.default;
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    });
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <GlobalBackground />
        <PremiumNavbar />
        <React.Suspense fallback={<LoadingSpinner />}>
          <AnimatedRoutes />
        </React.Suspense>
      </Router>
    </LanguageProvider>
  );
};

export default App;
