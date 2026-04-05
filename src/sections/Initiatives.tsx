import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import logoSonexa from '@/assets/logo-sonexa.png';

gsap.registerPlugin(ScrollTrigger);

function SonexaLogo() {
  return (
    <img
      src={logoSonexa}
      alt="Sonexa"
      className="block h-9 w-auto sm:h-10 md:h-11"
      decoding="async"
    />
  );
}

export default function Initiatives() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        cardRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.15,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="initiatives"
      className="relative z-40 flex flex-col justify-center py-16 md:py-24"
      style={{ backgroundColor: 'var(--elaz-bg-secondary)' }}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <h2
          ref={headlineRef}
          className="font-display mb-8 text-display-lg font-semibold md:mb-10"
          style={{ color: 'var(--elaz-text-primary)' }}
        >
          {t('initiatives.title')}
        </h2>

        <div
          ref={cardRef}
          className="initiative-card group relative mb-4 overflow-hidden rounded-2xl p-6 sm:p-8 md:p-9 md:mb-6"
        >
          <div
            className="absolute left-0 top-0 h-1 w-24 rounded-br-md sm:w-28"
            style={{ backgroundColor: 'var(--elaz-accent)' }}
            aria-hidden
          />

          <div className="relative flex flex-col gap-6 sm:gap-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <SonexaLogo />
              </div>
              <span
                className="text-mono-label inline-flex w-fit shrink-0 rounded-full border px-3 py-1.5 sm:py-2"
                style={{
                  borderColor: 'var(--elaz-border)',
                  color: 'var(--elaz-accent)',
                  backgroundColor: 'rgba(255,255,255,0.75)',
                }}
              >
                {t('initiatives.sonexa.label')}
              </span>
            </div>

            <p
              className="max-w-2xl text-sm leading-relaxed sm:max-w-3xl sm:text-base md:text-[1.0625rem] md:leading-[1.65]"
              style={{ color: 'var(--elaz-text-secondary)' }}
            >
              {t('initiatives.sonexa.body')}
            </p>

            <div
              className="flex justify-center border-t pt-5 sm:pt-6"
              style={{ borderColor: 'var(--elaz-border)' }}
            >
              <Link
                to="/sonexa"
                className="link-arrow touch-manipulation text-sm sm:text-base"
              >
                {t('initiatives.cta')}
                <ArrowRight
                  className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 sm:h-[1.125rem] sm:w-[1.125rem]"
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
