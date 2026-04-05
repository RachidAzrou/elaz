import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

/** Used for Google Maps embed (stable across UI languages). */
const OFFICE_MAP_QUERY = 'Uitbreidingstraat 84, 2600 Antwerpen, Belgium';

export default function Contact() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const mapHl = language === 'fr' ? 'fr' : language === 'en' ? 'en' : 'nl';
  const mapQueryEncoded = encodeURIComponent(OFFICE_MAP_QUERY);
  const mapEmbedSrc = `https://maps.google.com/maps?q=${mapQueryEncoded}&hl=${mapHl}&z=16&output=embed`;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: '4vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const contactIconShell =
    'flex h-[3.25rem] w-[3.25rem] sm:h-[3.5rem] sm:w-[3.5rem] shrink-0 items-center justify-center rounded-xl ring-1 ring-inset ring-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_4px_16px_-6px_rgba(74,108,111,0.4)]';

  const contactIconSvg = 'w-7 h-7 sm:w-8 sm:h-8';

  const valueClass =
    'font-display font-semibold text-lg sm:text-xl leading-snug tracking-tight break-words';

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 z-[70]"
      style={{ backgroundColor: 'var(--elaz-bg-primary)' }}
    >
      <div className="max-w-7xl mx-auto w-full px-5 sm:px-6 lg:px-8">
        <div ref={contentRef} className="w-full max-w-6xl xl:max-w-7xl">
          <h2
            className="font-display font-semibold text-3xl sm:text-4xl md:text-display-lg mb-4 md:mb-6"
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            {t('contact.title')}
          </h2>

          <p
            className="text-sm sm:text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-2xl"
            style={{ color: 'var(--elaz-text-secondary)' }}
          >
            {t('contact.body')}
          </p>

          <div className="mb-10 md:mb-12 lg:mb-14">
            <p
              className="font-brand text-2xl sm:text-3xl md:text-4xl uppercase"
              style={{ color: 'var(--elaz-text-primary)' }}
            >
              {t('contact.company')} {t('contact.legalForm')}
            </p>
            <p
              className="mt-2 font-mono text-xs sm:text-sm tracking-wide"
              style={{ color: 'var(--elaz-text-muted)' }}
            >
              {t('contact.vatNumber')}
            </p>
          </div>

          <div
            className="grid grid-cols-1 items-stretch lg:grid-cols-12 gap-10 lg:gap-10 xl:gap-12 border-t pt-10 md:pt-12 lg:pt-14"
            style={{ borderColor: 'var(--elaz-border)' }}
          >
            <div className="lg:col-span-7 xl:col-span-8 min-w-0">
              <div
                className="relative w-full overflow-hidden rounded-2xl bg-[var(--elaz-bg-primary)] shadow-[0_1px_0_rgba(28,25,23,0.05),0_20px_50px_-24px_rgba(28,25,23,0.2)] ring-1 ring-black/[0.06]"
                style={{ aspectRatio: '16 / 10' }}
              >
                <iframe
                  title={OFFICE_MAP_QUERY}
                  src={mapEmbedSrc}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="lg:col-span-5 xl:col-span-4 flex min-h-0 min-w-0 flex-col gap-6 sm:gap-7 lg:justify-start lg:gap-7 xl:gap-8">
              <div className="flex gap-4 sm:gap-5 min-w-0 items-start">
                <div
                  className={contactIconShell}
                  style={{ backgroundColor: 'var(--elaz-accent)' }}
                >
                  <MapPin
                    className={contactIconSvg}
                    strokeWidth={1.5}
                    style={{ color: 'var(--elaz-bg-primary)' }}
                    aria-hidden
                  />
                </div>
                <p
                  className={`${valueClass} min-w-0 flex-1 whitespace-pre-line pt-0.5 sm:pt-1`}
                  style={{ color: 'var(--elaz-text-primary)' }}
                >
                  {t('contact.address')}
                </p>
              </div>

              <div className="flex gap-4 sm:gap-5 min-w-0 items-start">
                <div
                  className={contactIconShell}
                  style={{ backgroundColor: 'var(--elaz-accent)' }}
                >
                  <Mail
                    className={contactIconSvg}
                    strokeWidth={1.5}
                    style={{ color: 'var(--elaz-bg-primary)' }}
                    aria-hidden
                  />
                </div>
                <a
                  href={`mailto:${t('contact.email')}`}
                  className={`${valueClass} min-w-0 flex-1 pt-0.5 sm:pt-1 text-base sm:text-lg md:text-xl break-all transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--elaz-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--elaz-bg-primary)] rounded-sm inline-block`}
                  style={{ color: 'var(--elaz-text-primary)' }}
                >
                  {t('contact.email')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
