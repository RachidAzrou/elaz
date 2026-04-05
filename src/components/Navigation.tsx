import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const navLinks = [
  { labelKey: 'nav.about', href: '#about' },
  { labelKey: 'nav.initiatives', href: '#initiatives' },
  { labelKey: 'nav.approach', href: '#approach' },
  { labelKey: 'nav.contact', href: '#contact' },
];

const languages = [
  { code: 'nl', label: 'NL' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? 'py-2 sm:py-3'
            : 'py-3 sm:py-4 md:py-6'
        }`}
        style={{
          backgroundColor: isScrolled || isMobileMenuOpen 
            ? 'rgba(250, 250, 248, 0.98)' 
            : 'transparent',
          backdropFilter: isScrolled || isMobileMenuOpen ? 'blur(12px)' : 'none',
          boxShadow: isScrolled ? '0 1px 0 var(--elaz-border)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-5 md:px-8 flex justify-between items-center">
          <Link
            to="/"
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                scrollToSection('#hero');
              } else {
                setIsMobileMenuOpen(false);
              }
            }}
            className="font-brand text-sm sm:text-base md:text-lg transition-opacity hover:opacity-80"
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            ELAZ GROUP
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) =>
              isHome ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="nav-link"
                >
                  {t(link.labelKey)}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={`/${link.href}`}
                  className="nav-link"
                >
                  {t(link.labelKey)}
                </Link>
              )
            )}
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Language switcher - desktop */}
            <div className="hidden md:flex items-center gap-1 mr-2 lg:mr-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as 'nl' | 'en' | 'fr')}
                  className={`px-2 py-1 text-sm font-medium transition-colors ${
                    language === lang.code
                      ? ''
                      : 'opacity-50 hover:opacity-80'
                  }`}
                  style={{ color: 'var(--elaz-text-primary)' }}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 -mr-2 touch-manipulation"
              style={{ color: 'var(--elaz-text-primary)' }}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[99] md:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: 'rgba(250, 250, 248, 0.98)' }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 sm:gap-8 pt-16 px-6">
          {navLinks.map((link) =>
            isHome ? (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="font-display text-xl sm:text-2xl font-medium"
                style={{ color: 'var(--elaz-text-primary)' }}
              >
                {t(link.labelKey)}
              </a>
            ) : (
              <Link
                key={link.href}
                to={`/${link.href}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-display text-xl sm:text-2xl font-medium"
                style={{ color: 'var(--elaz-text-primary)' }}
              >
                {t(link.labelKey)}
              </Link>
            )
          )}

          {/* Language switcher - mobile */}
          <div 
            className="flex items-center gap-3 sm:gap-4 mt-6 sm:mt-8 pt-6 sm:pt-8 w-full justify-center" 
            style={{ borderTop: '1px solid var(--elaz-border)' }}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code as 'nl' | 'en' | 'fr')}
                className={`px-3 sm:px-4 py-2 text-base sm:text-lg font-medium transition-colors ${
                  language === lang.code
                    ? ''
                    : 'opacity-50'
                }`}
                style={{ color: 'var(--elaz-text-primary)' }}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}