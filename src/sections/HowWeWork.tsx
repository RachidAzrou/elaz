import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { number: '01', titleKey: 'how.step1.title', descKey: 'how.step1.desc' },
  { number: '02', titleKey: 'how.step2.title', descKey: 'how.step2.desc' },
  { number: '03', titleKey: 'how.step3.title', descKey: 'how.step3.desc' },
  { number: '04', titleKey: 'how.step4.title', descKey: 'how.step4.desc' },
  { number: '05', titleKey: 'how.step5.title', descKey: 'how.step5.desc' },
  { number: '06', titleKey: 'how.step6.title', descKey: 'how.step6.desc' },
] as const;

export default function HowWeWork() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

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
        introRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, delay: 0.18, scrollTrigger: trigger }
      );

      const rows = tableRef.current?.querySelectorAll('.step-row');
      if (rows && rows.length > 0) {
        gsap.fromTo(
          rows,
          { y: 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            delay: 0.28,
            scrollTrigger: {
              trigger: tableRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="relative z-30 py-20 md:py-28 lg:py-32"
      style={{ backgroundColor: 'var(--elaz-bg-primary)' }}
    >
      <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-12">
        <div
          ref={markerRef}
          className="section-marker mb-10 md:mb-14 flex items-center gap-3"
        >
          <span className="inline-block w-6 h-px" style={{ background: 'var(--elaz-text-muted)' }} />
          <span>§ 02</span>
          <span style={{ color: 'var(--elaz-text-muted)' }}>·</span>
          <span>{t('how.title')}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-14 md:mb-20">
          <h2
            ref={headlineRef}
            className="text-editorial-xl lg:col-span-7 max-w-[18ch]"
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            {t('how.title')}.
          </h2>
          <p
            ref={introRef}
            className="lg:col-span-5 lg:pt-2 lg:pl-8 lg:border-l lg:border-[color:var(--elaz-border)] text-[15px] md:text-base leading-[1.75] max-w-[52ch]"
            style={{ color: 'var(--elaz-text-secondary)' }}
          >
            {t('how.intro')}
          </p>
        </div>

        <div className="hairline mb-0" />

        <div
          ref={tableRef}
          className="flex flex-col"
          role="list"
        >
          {STEPS.map((step) => (
            <div
              key={step.number}
              role="listitem"
              className="step-row group grid grid-cols-12 gap-x-4 gap-y-3 md:gap-x-8 md:gap-y-0 md:items-baseline py-6 md:py-8 border-b border-[color:var(--elaz-border)] transition-colors duration-200"
            >
              <div className="col-span-2 md:col-span-1">
                <span
                  className="font-mono text-[13px] md:text-sm tracking-[0.1em] tabular-nums"
                  style={{ color: 'var(--elaz-text-muted)' }}
                >
                  {step.number}
                </span>
              </div>
              <h3
                className="col-span-10 md:col-span-4 font-display font-medium text-base sm:text-lg md:text-xl leading-tight tracking-tight transition-colors duration-200 group-hover:text-[color:var(--elaz-accent)]"
                style={{ color: 'var(--elaz-text-primary)' }}
              >
                {t(step.titleKey)}
              </h3>
              <p
                className="col-start-3 col-span-10 md:col-start-auto md:col-span-7 text-[14px] sm:text-[15px] md:text-base leading-[1.65] md:leading-[1.7] max-w-[56ch]"
                style={{ color: 'var(--elaz-text-secondary)' }}
              >
                {t(step.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
