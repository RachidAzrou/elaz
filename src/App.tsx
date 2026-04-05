import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navigation from './components/Navigation';
import CookieBanner from './components/CookieBanner';
import Footer from './sections/Footer';
import HomePage from './pages/HomePage';
import SonexaPage from './pages/SonexaPage';
import PrivacyPage from './pages/PrivacyPage';
import CookiesPage from './pages/CookiesPage';

function PageLayout() {
  const location = useLocation();
  const hideFooter =
    location.pathname === '/privacy' || location.pathname === '/cookies';

  return (
    <>
      <Navigation />
      <main className="relative">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
      <CookieBanner />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <div className="relative">
        <div className="grain-overlay" />
        <Routes>
          <Route element={<PageLayout />}>
            <Route index element={<HomePage />} />
            <Route path="sonexa" element={<SonexaPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="cookies" element={<CookiesPage />} />
          </Route>
        </Routes>
      </div>
    </LanguageProvider>
  );
}
