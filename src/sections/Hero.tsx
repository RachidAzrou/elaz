import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const tagline = t('hero.tagline');
  const description = t('hero.description');
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      const headlineWords = headlineRef.current?.querySelectorAll('.headline-word');
      if (headlineWords) {
        loadTl.fromTo(
          headlineWords,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: 'power3.out' },
          0.1
        );
      }

      const taglineChars = taglineRef.current?.querySelectorAll('.tagline-char');
      const taglineStart = 0.4;
      const charStagger = 0.022;
      const charDuration = 0.04;
      let taglineEnd = taglineStart + 0.15;
      if (taglineChars && taglineChars.length > 0) {
        loadTl.fromTo(
          taglineChars,
          { opacity: 0, y: 8 },
          {
            opacity: 1,
            y: 0,
            duration: charDuration,
            stagger: charStagger,
            ease: 'power2.out',
          },
          taglineStart
        );
        taglineEnd = taglineStart + (taglineChars.length - 1) * charStagger + charDuration;
      }

      const afterTagline = taglineEnd + 0.12;
      const descDuration = 0.65;
      const afterDescriptionDone = afterTagline + descDuration + 0.1;

      loadTl.fromTo(
        descRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: descDuration, ease: 'power2.out' },
        afterTagline
      );

      loadTl.fromTo(
        ctaRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        afterDescriptionDone
      );

      loadTl.fromTo(
        ruleRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power2.out' },
        afterDescriptionDone + 0.06
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

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative z-10 min-h-screen flex flex-col justify-center px-5 sm:px-6 lg:px-8 py-20 md:py-0"
      style={{ backgroundColor: 'var(--elaz-bg-primary)' }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div
          ref={headlineRef}
          className="mb-6 md:mb-8"
        >
          <h1
            className="font-brand text-display-xl flex flex-row flex-nowrap items-baseline gap-x-3 sm:gap-x-4"
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            <span className="headline-word">ELAZ</span>
            <span className="headline-word">GROUP</span>
          </h1>
        </div>

        <p
          ref={taglineRef}
          className="text-base sm:text-lg md:text-2xl leading-relaxed font-medium mb-4 md:mb-6 max-w-full flex flex-wrap"
          style={{ color: 'var(--elaz-text-primary)' }}
          aria-label={tagline}
        >
          <span aria-hidden="true" className="flex flex-wrap">
            {tagline.split(' ').map((word, wi) => (
              <span key={`${tagline}-w${wi}`} className="inline-flex">
                {wi > 0 && <span className="tagline-char inline-block">&nbsp;</span>}
                {Array.from(word).map((char, ci) => (
                  <span key={`${tagline}-${wi}-${ci}`} className="tagline-char inline-block">
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </span>
        </p>

        <p
          ref={descRef}
          className="text-sm sm:text-base leading-relaxed mb-8 md:mb-10 max-w-2xl"
          style={{ color: 'var(--elaz-text-secondary)' }}
        >
          {description}
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-12 md:mb-16"
        >
          <button
            onClick={() => scrollToSection('initiatives')}
            className="btn-primary justify-center"
          >
            {t('hero.cta.primary')}
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="btn-secondary justify-center"
          >
            {t('hero.cta.secondary')}
          </button>
        </div>

        <div
          ref={ruleRef}
          className="origin-left"
          style={{
            height: '1px',
            background: 'var(--elaz-border)',
          }}
        />
      </div>
    </section>
  );
}