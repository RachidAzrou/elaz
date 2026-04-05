import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function HowWeWork() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  const steps = [
    { number: '01', titleKey: 'how.step1.title', descKey: 'how.step1.desc' },
    { number: '02', titleKey: 'how.step2.title', descKey: 'how.step2.desc' },
    { number: '03', titleKey: 'how.step3.title', descKey: 'how.step3.desc' },
    { number: '04', titleKey: 'how.step4.title', descKey: 'how.step4.desc' },
    { number: '05', titleKey: 'how.step5.title', descKey: 'how.step5.desc' },
    { number: '06', titleKey: 'how.step6.title', descKey: 'how.step6.desc' },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const stepItems = stepsRef.current?.querySelectorAll('.step-item');

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
        introRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      if (stepItems?.length) {
        gsap.fromTo(
          stepItems,
          { x: -28, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.5,
            ease: 'power2.out',
            stagger: {
              each: 0.14,
              from: 'start',
            },
            scrollTrigger: {
              trigger: stepsRef.current,
              start: 'top 82%',
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
      className="relative z-30 py-16 md:py-24 flex flex-col justify-center"
      style={{ backgroundColor: 'var(--elaz-bg-primary)' }}
    >
      <div className="max-w-7xl mx-auto w-full px-5 sm:px-6 lg:px-8">
        <h2
          ref={headlineRef}
          className="font-display font-semibold text-display-lg mb-4 md:mb-6"
          style={{ color: 'var(--elaz-text-primary)' }}
        >
          {t('how.title')}
        </h2>

        <p
          ref={introRef}
          className="text-sm sm:text-base mb-6 md:mb-8"
          style={{ color: 'var(--elaz-text-secondary)' }}
        >
          {t('how.intro')}
        </p>

        <div
          ref={stepsRef}
          className="flex flex-col gap-4 md:gap-5"
        >
          {steps.map((step) => (
            <div
              key={step.number}
              className="step-item w-full max-w-3xl"
            >
              <div className="flex gap-4 md:gap-6 items-start">
                <div
                  className="flex size-[2.75rem] shrink-0 items-center justify-center rounded-xl font-mono text-base font-semibold tabular-nums leading-none tracking-wide shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_2px_6px_-2px_rgba(28,25,23,0.12)] ring-1 ring-inset ring-white/10 sm:size-12 sm:text-lg md:size-[3.25rem] md:text-xl"
                  style={{
                    backgroundColor: 'var(--elaz-accent)',
                    color: 'var(--elaz-bg-primary)',
                  }}
                >
                  {step.number}
                </div>
                <div className="flex-1 min-w-0 pt-0.5 md:pt-1">
                  <h3 
                    className="font-medium text-sm sm:text-base md:text-lg mb-0.5 md:mb-1" 
                    style={{ color: 'var(--elaz-text-primary)' }}
                  >
                    {t(step.titleKey)}
                  </h3>
                  <p 
                    className="text-xs sm:text-sm md:text-base" 
                    style={{ color: 'var(--elaz-text-secondary)' }}
                  >
                    {t(step.descKey)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}