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
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const solid = isScrolled || isMobileMenuOpen;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          solid ? 'py-3 md:py-4' : 'py-4 md:py-6'
        }`}
        style={{
          backgroundColor: solid ? 'rgba(250, 250, 248, 0.96)' : 'transparent',
          backdropFilter: solid ? 'blur(14px) saturate(1.1)' : 'none',
          WebkitBackdropFilter: solid ? 'blur(14px) saturate(1.1)' : 'none',
          borderBottom: solid
            ? '1px solid var(--elaz-border)'
            : '1px solid transparent',
        }}
      >
        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12 flex justify-between items-center gap-6">
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
            className="font-brand text-sm sm:text-base md:text-[17px] leading-none transition-opacity hover:opacity-80"
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            ELAZ GROUP
          </Link>

          <div className="hidden md:flex items-center gap-7 lg:gap-9">
            {navLinks.map((link) => {
              const className =
                'font-mono text-[11px] lg:text-[12px] tracking-[0.16em] uppercase transition-colors duration-200 hover:text-[color:var(--elaz-accent)]';
              return isHome ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={className}
                  style={{ color: 'var(--elaz-text-secondary)' }}
                >
                  {t(link.labelKey)}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={`/${link.href}`}
                  className={className}
                  style={{ color: 'var(--elaz-text-secondary)' }}
                >
                  {t(link.labelKey)}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden md:flex items-baseline gap-1.5 font-mono text-[11px] lg:text-[12px] tracking-[0.14em] uppercase">
              {languages.map((lang, i) => {
                const active = language === lang.code;
                return (
                  <span key={lang.code} className="inline-flex items-baseline gap-1.5">
                    {i > 0 ? (
                      <span style={{ color: 'var(--elaz-text-muted)' }}>/</span>
                    ) : null}
                    <button
                      onClick={() => setLanguage(lang.code as 'nl' | 'en' | 'fr')}
                      className={`transition-colors duration-200 ${
                        active
                          ? 'underline decoration-from-font underline-offset-[3px]'
                          : 'hover:text-[color:var(--elaz-text-primary)]'
                      }`}
                      style={{
                        color: active
                          ? 'var(--elaz-text-primary)'
                          : 'var(--elaz-text-muted)',
                      }}
                      aria-current={active ? 'true' : undefined}
                    >
                      {lang.label}
                    </button>
                  </span>
                );
              })}
            </div>

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

      <div
        className={`fixed inset-0 z-[99] md:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: 'rgba(250, 250, 248, 0.98)' }}
      >
        <div className="flex flex-col h-full pt-24 px-6 sm:px-8">
          <nav className="flex flex-col">
            {navLinks.map((link, i) =>
              isHome ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`group flex items-baseline justify-between py-5 border-b border-[color:var(--elaz-border)] ${
                    i === 0 ? 'border-t' : ''
                  }`}
                >
                  <span
                    className="font-editorial text-[28px] sm:text-[32px] leading-none"
                    style={{ color: 'var(--elaz-text-primary)' }}
                  >
                    {t(link.labelKey)}
                  </span>
                  <span
                    className="font-mono text-[11px] tracking-[0.18em] uppercase"
                    style={{ color: 'var(--elaz-text-muted)' }}
                  >
                    0{i + 1}
                  </span>
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={`/${link.href}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`group flex items-baseline justify-between py-5 border-b border-[color:var(--elaz-border)] ${
                    i === 0 ? 'border-t' : ''
                  }`}
                >
                  <span
                    className="font-editorial text-[28px] sm:text-[32px] leading-none"
                    style={{ color: 'var(--elaz-text-primary)' }}
                  >
                    {t(link.labelKey)}
                  </span>
                  <span
                    className="font-mono text-[11px] tracking-[0.18em] uppercase"
                    style={{ color: 'var(--elaz-text-muted)' }}
                  >
                    0{i + 1}
                  </span>
                </Link>
              )
            )}
          </nav>

          <div className="mt-10 flex items-baseline gap-2 font-mono text-[12px] tracking-[0.14em] uppercase">
            {languages.map((lang, i) => {
              const active = language === lang.code;
              return (
                <span key={lang.code} className="inline-flex items-baseline gap-2">
                  {i > 0 ? (
                    <span style={{ color: 'var(--elaz-text-muted)' }}>/</span>
                  ) : null}
                  <button
                    onClick={() => setLanguage(lang.code as 'nl' | 'en' | 'fr')}
                    className={`py-1 transition-colors duration-200 ${
                      active
                        ? 'underline decoration-from-font underline-offset-[3px]'
                        : ''
                    }`}
                    style={{
                      color: active
                        ? 'var(--elaz-text-primary)'
                        : 'var(--elaz-text-muted)',
                    }}
                    aria-current={active ? 'true' : undefined}
                  >
                    {lang.label}
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
