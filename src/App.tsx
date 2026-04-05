import { useState, useEffect, useCallback, useRef } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navigation from './components/Navigation';
// import CookieBanner from './components/CookieBanner';
import Footer from './sections/Footer';
import HomePage from './pages/HomePage';
import SonexaPage from './pages/SonexaPage';
import PrivacyPage from './pages/PrivacyPage';
import CookiesPage from './pages/CookiesPage';

const SUBTITLE = 'Digital products, built with purpose';
const TYPE_SPEED = 95;
const PAUSE_AFTER_TYPE = 3000;
const FADE_OUT = 600;

function SplashScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'in' | 'out'>('in');
  const [typingStarted, setTypingStarted] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const doneRef = useRef(false);

  const TITLE_DELAY = 150;
  const WAIT_BEFORE_TYPE = 2000;

  useEffect(() => {
    const id = setTimeout(() => {
      setTypingStarted(true);
      setCharCount(1);
    }, TITLE_DELAY + 800 + WAIT_BEFORE_TYPE);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!typingStarted || charCount === 0) return;

    if (charCount < SUBTITLE.length) {
      const delay = TYPE_SPEED;
      const id = setTimeout(() => setCharCount((c) => c + 1), delay);
      return () => clearTimeout(id);
    }

    if (!doneRef.current) {
      doneRef.current = true;
      const fadeTimer = setTimeout(() => setPhase('out'), PAUSE_AFTER_TYPE);
      const doneTimer = setTimeout(onDone, PAUSE_AFTER_TYPE + FADE_OUT);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(doneTimer);
      };
    }
  }, [charCount, typingStarted, onDone]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity ease-in-out"
      style={{
        backgroundColor: 'var(--elaz-bg-primary)',
        opacity: phase === 'out' ? 0 : 1,
        transitionDuration: `${FADE_OUT}ms`,
      }}
    >
      <div className="flex w-full flex-col items-center px-5 text-center sm:px-8">
        <h1
          className="text-[clamp(2rem,10vw,8rem)] opacity-0"
          style={{
            fontFamily: "'Audiowide', sans-serif",
            fontWeight: 400,
            letterSpacing: '0.04em',
            lineHeight: 1.1,
            color: 'var(--elaz-text-primary)',
            animation: `splashFadeUp 0.8s ease-out ${TITLE_DELAY}ms forwards`,
          }}
        >
          ELAZ GROUP
        </h1>
        <div className="mt-3 h-[1.5rem] sm:mt-5 sm:h-[1.75rem] md:mt-6 md:h-[2rem]">
          {typingStarted && (
            <p
              className="font-display text-sm font-medium tracking-wide sm:text-base md:text-xl lg:text-[1.5rem]"
              style={{ color: 'var(--elaz-text-muted)' }}
            >
              <span>{SUBTITLE.slice(0, charCount)}</span>
              <span
                className="ml-px inline-block w-[2px] align-middle"
                style={{
                  height: '1.1em',
                  backgroundColor: charCount < SUBTITLE.length ? 'var(--elaz-accent)' : 'transparent',
                  animation: charCount < SUBTITLE.length ? 'splashBlink 0.6s step-end infinite' : 'none',
                }}
                aria-hidden
              />
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

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
      {/* <CookieBanner /> */}
    </>
  );
}

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [showSplash, setShowSplash] = useState(isHome);

  const handleSplashDone = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <LanguageProvider>
      <div className="relative">
        <div className="grain-overlay" />
        {showSplash && <SplashScreen onDone={handleSplashDone} />}
        <div style={showSplash ? { visibility: 'hidden' } : undefined}>
          <Routes>
            <Route element={<PageLayout />}>
              <Route index element={<HomePage />} />
              <Route path="sonexa" element={<SonexaPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="cookies" element={<CookiesPage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </LanguageProvider>
  );
}
