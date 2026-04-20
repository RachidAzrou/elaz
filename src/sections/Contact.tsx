import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

/** Used for Google Maps embed (stable across UI languages). */
const OFFICE_MAP_QUERY = 'Uitbreidingstraat 84, 2600 Antwerpen, Belgium';
const OFFICE_MAP_LINK = `https://maps.google.com/?q=${encodeURIComponent(OFFICE_MAP_QUERY)}`;

export default function Contact() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const mapHl = language === 'fr' ? 'fr' : language === 'en' ? 'en' : 'nl';
  const mapQueryEncoded = encodeURIComponent(OFFICE_MAP_QUERY);
  const mapEmbedSrc = `https://maps.google.com/maps?q=${mapQueryEncoded}&hl=${mapHl}&z=16&output=embed`;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const trigger = {
        trigger: section,
        start: 'top 80%',
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
        emailRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.18, scrollTrigger: trigger }
      );
      gsap.fromTo(
        bodyRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 0.26, scrollTrigger: trigger }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const email = t('contact.email');
  const address = t('contact.address');

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-[70] py-20 md:py-28 lg:py-32"
      style={{ backgroundColor: 'var(--elaz-bg-primary)' }}
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div
          ref={markerRef}
          className="section-marker mb-10 md:mb-14 flex items-center gap-3"
        >
          <span className="inline-block w-6 h-px" style={{ background: 'var(--elaz-text-muted)' }} />
          <span>§ 04</span>
          <span style={{ color: 'var(--elaz-text-muted)' }}>·</span>
          <span>{t('contact.title')}</span>
        </div>

        <h2
          ref={headlineRef}
          className="text-editorial-xl max-w-[16ch] mb-14 md:mb-20"
          style={{ color: 'var(--elaz-text-primary)' }}
        >
          {t('contact.title')}.
        </h2>

        <div className="mb-16 md:mb-24 max-w-[52ch]">
          <p
            className="mb-4 md:mb-5 font-mono text-[11px] tracking-[0.18em] uppercase"
            style={{ color: 'var(--elaz-text-muted)' }}
          >
            {t('contact.body')}
          </p>
          <a
            ref={emailRef}
            href={`mailto:${email}`}
            className="group inline-flex items-baseline gap-3 md:gap-4"
          >
            <span
              className="font-editorial text-editorial-lg underline decoration-1 underline-offset-[0.2em] decoration-[color:var(--elaz-border)] transition-colors duration-200 group-hover:decoration-[color:var(--elaz-accent)] group-hover:text-[color:var(--elaz-accent)]"
              style={{ color: 'var(--elaz-text-primary)' }}
            >
              {email}
            </span>
            <ArrowUpRight
              className="h-5 w-5 md:h-6 md:w-6 self-center transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              style={{ color: 'var(--elaz-text-muted)' }}
              aria-hidden
            />
          </a>
        </div>

        <div className="hairline mb-12 md:mb-16" />

        <div ref={bodyRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] lg:aspect-[16/10] border border-[color:var(--elaz-border)] overflow-hidden">
              <iframe
                title={OFFICE_MAP_QUERY}
                src={mapEmbedSrc}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                style={{
                  filter: 'grayscale(1) contrast(1.02) brightness(0.98)',
                }}
              />
            </div>
            <a
              href={OFFICE_MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase border-b border-[color:var(--elaz-text-primary)] pb-0.5 transition-colors duration-200 hover:border-[color:var(--elaz-accent)] hover:text-[color:var(--elaz-accent)]"
              style={{ color: 'var(--elaz-text-primary)' }}
            >
              {t('contact.mapOpen')}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>

          <aside className="lg:col-span-5">
            <div className="border-t border-[color:var(--elaz-border)]">
              <div className="py-5 md:py-6 border-b border-[color:var(--elaz-border)]">
                <div
                  className="font-mono text-[11px] tracking-[0.18em] uppercase mb-2"
                  style={{ color: 'var(--elaz-text-muted)' }}
                >
                  Entity
                </div>
                <p
                  className="font-display font-semibold text-xl md:text-2xl tracking-tight"
                  style={{ color: 'var(--elaz-text-primary)' }}
                >
                  {t('contact.company')} {t('contact.legalForm')}
                </p>
                <p
                  className="mt-1 font-mono text-[12px] tracking-[0.12em]"
                  style={{ color: 'var(--elaz-text-muted)' }}
                >
                  {t('contact.vatNumber')}
                </p>
              </div>

              <div className="py-5 md:py-6 border-b border-[color:var(--elaz-border)]">
                <div
                  className="font-mono text-[11px] tracking-[0.18em] uppercase mb-2"
                  style={{ color: 'var(--elaz-text-muted)' }}
                >
                  {t('contact.lblAddress')}
                </div>
                <p
                  className="text-[15px] md:text-base leading-[1.65] whitespace-pre-line"
                  style={{ color: 'var(--elaz-text-primary)' }}
                >
                  {address}
                </p>
              </div>

              <div className="py-5 md:py-6">
                <div
                  className="font-mono text-[11px] tracking-[0.18em] uppercase mb-2"
                  style={{ color: 'var(--elaz-text-muted)' }}
                >
                  {t('contact.lblEmail')}
                </div>
                <a
                  href={`mailto:${email}`}
                  className="text-[15px] md:text-base transition-colors duration-200 hover:text-[color:var(--elaz-accent)] break-all"
                  style={{ color: 'var(--elaz-text-primary)' }}
                >
                  {email}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
