import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const FOUNDERS = [
  {
    index: '01',
    src: '/images/founder1.jpg',
    nameKey: 'who.founder1.name',
    roleKey: 'who.founder1.role',
    imageZoom: 1.62,
    objectPosition: '44% 40%',
    transformOrigin: '44% 46%',
    imageNudge: { x: '5%', y: '20%' },
  },
  {
    index: '02',
    src: '/images/founder2.jpg',
    nameKey: 'who.founder2.name',
    roleKey: 'who.founder2.role',
  },
  {
    index: '03',
    src: '/images/founder3.png',
    nameKey: 'who.founder3.name',
    roleKey: 'who.founder3.role',
    imageZoom: 1.06,
    objectPosition: '50% 30%',
    transformOrigin: '50% 35%',
  },
] as const;

/** Splits "Co-founder — Role detail" into two lines (em dash, en dash, or hyphen). */
function splitFounderRole(role: string): { title: string; subtitle: string | null } {
  const separators = [' — ', ' – ', ' - '];
  for (const sep of separators) {
    const i = role.indexOf(sep);
    if (i !== -1) {
      const title = role.slice(0, i).trim();
      const subtitle = role.slice(i + sep.length).trim();
      return { title, subtitle: subtitle || null };
    }
  }
  return { title: role, subtitle: null };
}

export default function WhoWeAre() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const photosRef = useRef<HTMLDivElement>(null);

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
        quoteRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.18, scrollTrigger: trigger }
      );

      const bodyParas = bodyRef.current?.querySelectorAll('p');
      if (bodyParas && bodyParas.length > 0) {
        gsap.fromTo(
          bodyParas,
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            delay: 0.26,
            scrollTrigger: trigger,
          }
        );
      }

      const photoItems = photosRef.current?.querySelectorAll('.founder-photo');
      if (photoItems && photoItems.length > 0) {
        gsap.fromTo(
          photoItems,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.3,
            scrollTrigger: trigger,
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-20 py-20 md:py-28 lg:py-32"
      style={{ backgroundColor: 'var(--elaz-bg-secondary)' }}
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div
          ref={markerRef}
          className="section-marker mb-10 md:mb-14 flex items-center gap-3"
        >
          <span className="inline-block w-6 h-px" style={{ background: 'var(--elaz-text-muted)' }} />
          <span>§ 01</span>
          <span style={{ color: 'var(--elaz-text-muted)' }}>·</span>
          <span>{t('who.title')}</span>
        </div>

        <h2
          ref={headlineRef}
          className="text-editorial-xl max-w-[18ch] mb-14 md:mb-20"
          style={{ color: 'var(--elaz-text-primary)' }}
        >
          {t('who.title')}.
        </h2>

        <div className="hairline mb-14 md:mb-20" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-16 mb-16 md:mb-24 items-start">
          <p
            ref={quoteRef}
            className="lg:col-span-5 font-editorial italic text-[20px] sm:text-[22px] md:text-[28px] leading-[1.35] max-w-[28ch] [overflow-wrap:anywhere]"
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            &ldquo;{t('who.foundersTagline')}&rdquo;
          </p>
          <div ref={bodyRef} className="lg:col-span-7 lg:pl-10 lg:border-l lg:border-[color:var(--elaz-border)]">
            <div className="space-y-5 md:space-y-6 max-w-[62ch]">
              {(['who.p1', 'who.p2', 'who.p3', 'who.p4'] as const).map((key) => (
                <p
                  key={key}
                  className="text-[15px] md:text-base leading-[1.75]"
                  style={{ color: 'var(--elaz-text-secondary)' }}
                >
                  {t(key)}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="hairline mb-10 md:mb-14" />

        <div className="section-marker mb-8 md:mb-10 flex items-center gap-3">
          <span className="inline-block w-6 h-px" style={{ background: 'var(--elaz-text-muted)' }} />
          <span>Founders</span>
        </div>

        <div
          ref={photosRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-10"
        >
          {FOUNDERS.map((founder) => {
            const { title, subtitle } = splitFounderRole(t(founder.roleKey));
            return (
              <figure
                key={founder.src}
                className="founder-photo flex flex-col"
              >
                <div
                  className="w-full max-w-[240px] sm:max-w-[200px] md:max-w-[220px] aspect-[5/6] overflow-hidden border border-[color:var(--elaz-border)]"
                  style={{ backgroundColor: 'var(--elaz-bg-primary)' }}
                >
                  <img
                    src={founder.src}
                    alt={t(founder.nameKey)}
                    className="h-full w-full object-cover"
                    style={{
                      transformOrigin:
                        'transformOrigin' in founder && founder.transformOrigin
                          ? founder.transformOrigin
                          : 'center',
                      ...(('objectPosition' in founder && founder.objectPosition) && {
                        objectPosition: founder.objectPosition,
                      }),
                      ...(() => {
                        const zoom =
                          'imageZoom' in founder && founder.imageZoom != null
                            ? founder.imageZoom
                            : undefined;
                        const nudge =
                          'imageNudge' in founder && founder.imageNudge
                            ? founder.imageNudge
                            : null;
                        if (zoom == null && !nudge) return {};
                        const parts: string[] = [];
                        if (nudge) parts.push(`translate(${nudge.x}, ${nudge.y})`);
                        if (zoom != null) parts.push(`scale(${zoom})`);
                        return { transform: parts.join(' ') };
                      })(),
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>

                <figcaption className="pt-5 max-w-[240px] md:max-w-[260px]">
                  <div className="pb-3 border-b border-[color:var(--elaz-border)]">
                    <span
                      className="font-mono text-[11px] tracking-[0.18em] uppercase"
                      style={{ color: 'var(--elaz-text-muted)' }}
                    >
                      {title}
                    </span>
                  </div>
                  <h3
                    className="mt-4 font-display font-semibold text-lg md:text-xl leading-tight tracking-tight"
                    style={{ color: 'var(--elaz-text-primary)' }}
                  >
                    {t(founder.nameKey)}
                  </h3>
                  {subtitle ? (
                    <p
                      className="mt-2 text-[13px] md:text-sm leading-relaxed"
                      style={{ color: 'var(--elaz-text-secondary)' }}
                    >
                      {subtitle}
                    </p>
                  ) : null}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
