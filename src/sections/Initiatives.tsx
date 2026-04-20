import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Initiatives() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const plateRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const trigger = {
        trigger: section,
        start: 'top 78%',
        toggleActions: 'play none none reverse',
      } as const;

      gsap.fromTo(
        markerRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, scrollTrigger: trigger }
      );

      gsap.fromTo(
        headlineRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, delay: 0.08, scrollTrigger: trigger }
      );

      gsap.fromTo(
        plateRef.current,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.22,
          scrollTrigger: {
            trigger: plateRef.current,
            start: 'top 82%',
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
      className="relative z-40 py-20 md:py-28 lg:py-32"
      style={{ backgroundColor: 'var(--elaz-bg-secondary)' }}
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div
          ref={markerRef}
          className="section-marker mb-10 md:mb-14 flex items-center gap-3"
        >
          <span className="inline-block w-6 h-px" style={{ background: 'var(--elaz-text-muted)' }} />
          <span>§ 03</span>
          <span style={{ color: 'var(--elaz-text-muted)' }}>·</span>
          <span>{t('initiatives.title')}</span>
        </div>

        <h2
          ref={headlineRef}
          className="text-editorial-xl max-w-[16ch] mb-14 md:mb-20"
          style={{ color: 'var(--elaz-text-primary)' }}
        >
          {t('initiatives.title')}.
        </h2>

        <article
          ref={plateRef}
          className="relative border-t border-b border-[color:var(--elaz-border)]"
          aria-labelledby="sonexa-title"
        >
          <span
            aria-hidden
            className="absolute -top-px left-0 h-[2px] w-24 sm:w-32"
            style={{ background: 'var(--elaz-accent)' }}
          />

          <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 py-4 md:py-5 border-b border-[color:var(--elaz-border)]">
            <span
              className="font-mono text-[10px] sm:text-[11px] md:text-xs tracking-[0.16em] sm:tracking-[0.18em] uppercase tabular-nums"
              style={{ color: 'var(--elaz-text-muted)' }}
            >
              No. 01 / 01
            </span>
            <span
              className="font-mono text-[10px] sm:text-[11px] md:text-xs tracking-[0.16em] sm:tracking-[0.18em] uppercase"
              style={{ color: 'var(--elaz-accent)' }}
            >
              {t('initiatives.sonexa.label')}
            </span>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-16 py-8 sm:py-10 md:py-14">
            <div className="lg:col-span-5">
              <h3
                id="sonexa-title"
                className="font-brand leading-none tracking-tight text-[clamp(2.25rem,12vw,4.75rem)] lg:text-[76px] max-w-full"
                style={{ color: 'var(--elaz-text-primary)' }}
                aria-label="Sonexa"
              >
                SONEXA
              </h3>
              <p
                className="mt-5 font-mono text-[11px] tracking-[0.18em] uppercase"
                style={{ color: 'var(--elaz-text-muted)' }}
              >
                ELAZ Group Ventures
              </p>
            </div>

            <div className="lg:col-span-7">
              <p
                className="font-editorial text-[20px] sm:text-[22px] md:text-[28px] leading-[1.4] max-w-[40ch] [overflow-wrap:anywhere]"
                style={{ color: 'var(--elaz-text-primary)' }}
              >
                {t('initiatives.sonexa.body')}
              </p>
            </div>
          </div>

          <footer className="flex items-center justify-end py-4 md:py-6 border-t border-[color:var(--elaz-border)]">
            <Link
              to="/sonexa"
              className="group inline-flex items-center gap-3 font-mono text-[12px] md:text-[13px] tracking-[0.14em] uppercase transition-colors duration-200"
              style={{ color: 'var(--elaz-text-primary)' }}
            >
              <span className="border-b border-[color:var(--elaz-text-primary)] group-hover:border-[color:var(--elaz-accent)] group-hover:text-[color:var(--elaz-accent)] pb-0.5 transition-colors">
                {t('initiatives.cta')}
              </span>
              <ArrowRight
                className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </footer>
        </article>
      </div>
    </section>
  );
}
