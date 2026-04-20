import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const { t } = useLanguage();
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footer,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className="relative z-[80]"
      style={{ backgroundColor: 'var(--elaz-bg-primary)' }}
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-8 py-8 md:py-10 border-t border-[color:var(--elaz-border)]"
        >
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 md:gap-x-6">
            <Link
              to="/"
              className="font-brand text-[13px] md:text-sm leading-none transition-opacity hover:opacity-80"
              style={{ color: 'var(--elaz-text-primary)' }}
            >
              ELAZ GROUP
            </Link>
            <span
              className="font-mono text-[10px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.16em] uppercase"
              style={{ color: 'var(--elaz-text-muted)' }}
            >
              Antwerp &nbsp;·&nbsp; BE
            </span>
          </div>

          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 md:gap-x-6">
            <Link
              to="/privacy"
              className="font-mono text-[11px] md:text-[12px] tracking-[0.16em] uppercase transition-colors duration-200 hover:text-[color:var(--elaz-accent)]"
              style={{ color: 'var(--elaz-text-secondary)' }}
            >
              {t('footer.privacy')}
            </Link>
            <span
              aria-hidden
              className="inline-block w-px h-3"
              style={{ background: 'var(--elaz-border)' }}
            />
            <Link
              to="/cookies"
              className="font-mono text-[11px] md:text-[12px] tracking-[0.16em] uppercase transition-colors duration-200 hover:text-[color:var(--elaz-accent)]"
              style={{ color: 'var(--elaz-text-secondary)' }}
            >
              {t('footer.cookies')}
            </Link>
          </nav>

          <p
            className="font-mono text-[11px] tracking-[0.14em] uppercase"
            style={{ color: 'var(--elaz-text-muted)' }}
          >
            © {year} &nbsp;ELAZ Group
          </p>
        </div>
      </div>
    </footer>
  );
}
