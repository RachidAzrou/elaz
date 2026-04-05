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

  return (
    <footer
      ref={footerRef}
      className="relative py-8 sm:py-10 md:py-12 z-[80]"
      style={{ backgroundColor: 'var(--elaz-bg-primary)' }}
    >
      <div className="max-w-7xl mx-auto w-full px-5 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6 md:gap-8">
          <Link to="/privacy" className="nav-link text-sm">
            {t('footer.privacy')}
          </Link>
          <Link to="/cookies" className="nav-link text-sm">
            {t('footer.cookies')}
          </Link>
        </div>
      </div>
    </footer>
  );
}