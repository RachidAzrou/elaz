import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const tagline = t('hero.tagline');
  const description = t('hero.description');

  const sectionRef = useRef<HTMLElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(
        markerRef.current,
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.05
      );

      const wordmarkParts = wordmarkRef.current?.querySelectorAll('.headline-word');
      if (wordmarkParts) {
        tl.fromTo(
          wordmarkParts,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, stagger: 0.05, ease: 'power3.out' },
          0.15
        );
      }

      const taglineWords = taglineRef.current?.querySelectorAll('.tagline-word');
      if (taglineWords && taglineWords.length > 0) {
        tl.fromTo(
          taglineWords,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.045, ease: 'power2.out' },
          0.55
        );
      }

      tl.fromTo(
        descRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55 },
        '-=0.3'
      );

      tl.fromTo(
        ctaRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.2'
      );

      tl.fromTo(
        ruleRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.9, ease: 'power2.out' },
        '-=0.3'
      );
    }, section);

    return () => ctx.revert();
  }, [tagline, description]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const taglineWords = tagline.split(/\s+/);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative z-10 min-h-screen flex flex-col justify-center px-5 sm:px-8 lg:px-12 pt-28 pb-16 md:pt-32 md:pb-24"
      style={{ backgroundColor: 'var(--elaz-bg-primary)' }}
    >
      <div className="max-w-[1400px] mx-auto w-full">
        <div
          ref={markerRef}
          className="section-marker mb-8 md:mb-12 flex items-center gap-3"
        >
          <span className="inline-block w-6 h-px" style={{ background: 'var(--elaz-text-muted)' }} />
          <span>EST. 2026</span>
          <span style={{ color: 'var(--elaz-text-muted)' }}>·</span>
          <span>ANTWERP, BE</span>
        </div>

        <div ref={wordmarkRef} className="mb-10 md:mb-14">
          <h1
            className="font-brand text-display-xl flex flex-row flex-wrap items-baseline gap-x-3 sm:gap-x-4 gap-y-1 max-w-full"
            style={{ color: 'var(--elaz-text-primary)' }}
            aria-label="ELAZ GROUP"
          >
            <span className="headline-word">ELAZ</span>
            <span className="headline-word">GROUP</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-16 items-start">
          <h2
            ref={taglineRef}
            className="text-editorial-xl lg:col-span-8 max-w-[22ch] [overflow-wrap:anywhere]"
            style={{ color: 'var(--elaz-text-primary)' }}
            aria-label={tagline}
          >
            <span aria-hidden="true" className="inline">
              {taglineWords.map((word, wi) => (
                <span key={`tw-${wi}`} className="tagline-word inline-block">
                  {word}
                  {wi < taglineWords.length - 1 ? '\u00A0' : ''}
                </span>
              ))}
            </span>
          </h2>

          <div className="lg:col-span-4 lg:pt-3 lg:pl-8 lg:border-l lg:border-[color:var(--elaz-border)]">
            <p
              ref={descRef}
              className="text-[15px] md:text-base leading-[1.75] mb-8 md:mb-10 max-w-[52ch]"
              style={{ color: 'var(--elaz-text-secondary)' }}
            >
              {description}
            </p>

            <div ref={ctaRef} className="flex flex-col">
              <button
                onClick={() => scrollToSection('initiatives')}
                className="group flex items-center justify-between gap-4 py-4 md:py-5 border-t border-[color:var(--elaz-border)] text-left transition-colors"
              >
                <span
                  className="font-display font-medium text-base md:text-lg tracking-tight transition-colors group-hover:text-[color:var(--elaz-accent)]"
                  style={{ color: 'var(--elaz-text-primary)' }}
                >
                  {t('hero.cta.primary')}
                </span>
                <ArrowDown
                  className="h-[18px] w-[18px] shrink-0 transition-transform duration-200 group-hover:translate-y-0.5"
                  style={{ color: 'var(--elaz-text-muted)' }}
                  aria-hidden
                />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="group flex items-center justify-between gap-4 py-4 md:py-5 border-t border-b border-[color:var(--elaz-border)] text-left transition-colors"
              >
                <span
                  className="font-mono text-[11px] md:text-[12px] tracking-[0.18em] uppercase transition-colors group-hover:text-[color:var(--elaz-accent)]"
                  style={{ color: 'var(--elaz-text-primary)' }}
                >
                  {t('hero.cta.secondary')}
                </span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                  style={{ color: 'var(--elaz-text-muted)' }}
                  aria-hidden
                />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={ruleRef}
          className="origin-left mt-20 md:mt-28"
          style={{ height: '1px', background: 'var(--elaz-border)' }}
        />
      </div>
    </section>
  );
}
