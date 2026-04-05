import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Principles() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);

  const principles = [
    { titleKey: 'principles.1.title', descKey: 'principles.1.desc' },
    { titleKey: 'principles.2.title', descKey: 'principles.2.desc' },
    { titleKey: 'principles.3.title', descKey: 'principles.3.desc' },
    { titleKey: 'principles.4.title', descKey: 'principles.4.desc' },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      const principleItems = principlesRef.current?.querySelectorAll('.principle-item');

      if (isMobile) {
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

        if (principleItems) {
          principleItems.forEach((item, index) => {
            gsap.fromTo(
              item,
              { y: 20, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.5,
                delay: 0.2 + index * 0.1,
                scrollTrigger: {
                  trigger: section,
                  start: 'top 80%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          });
        }
      } else {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.6,
          },
        });

        scrollTl.fromTo(
          headlineRef.current,
          { x: '40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        );

        scrollTl.fromTo(
          introRef.current,
          { y: '10vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.05
        );

        if (principleItems) {
          principleItems.forEach((item, index) => {
            scrollTl.fromTo(
              item,
              { x: '18vw', opacity: 0 },
              { x: 0, opacity: 1, ease: 'none' },
              0.08 + index * 0.04
            );
          });
        }

        scrollTl.fromTo(
          headlineRef.current,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        );

        scrollTl.fromTo(
          introRef.current,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.72
        );

        if (principleItems) {
          principleItems.forEach((item, index) => {
            scrollTl.fromTo(
              item,
              { x: 0, opacity: 1 },
              { x: '18vw', opacity: 0, ease: 'power2.in' },
              0.74 + index * 0.02
            );
          });
        }
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-50 py-16 md:py-0 md:min-h-screen flex flex-col justify-center"
      style={{ backgroundColor: 'var(--elaz-bg-primary)' }}
    >
      <div className="max-w-7xl mx-auto w-full px-5 sm:px-6 lg:px-8">
        <h2
          ref={headlineRef}
          className="font-display font-semibold text-display-lg mb-4 md:mb-6"
          style={{ color: 'var(--elaz-text-primary)' }}
        >
          {t('principles.title')}
        </h2>

        <p
          ref={introRef}
          className="text-sm sm:text-base mb-6 md:mb-8"
          style={{ color: 'var(--elaz-text-secondary)' }}
        >
          {t('principles.intro')}
        </p>

        <div
          ref={principlesRef}
          className="flex flex-col gap-4 md:gap-6"
        >
          {principles.map((principle, index) => (
            <div key={index} className="principle-item">
              <h3 
                className="font-medium text-sm sm:text-base md:text-lg mb-0.5 md:mb-1" 
                style={{ color: 'var(--elaz-text-primary)' }}
              >
                {t(principle.titleKey)}
              </h3>
              <p 
                className="text-xs sm:text-sm md:text-base" 
                style={{ color: 'var(--elaz-text-secondary)' }}
              >
                {t(principle.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}