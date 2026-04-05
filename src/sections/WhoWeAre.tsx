import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const FOUNDERS = [
  {
    src: '/images/founder1.jpg',
    nameKey: 'who.founder1.name',
    roleKey: 'who.founder1.role',
    /** Ingezoomd maar ruimer dan voorheen zodat het hoofd niet afgesneden wordt. */
    imageZoom: 1.62,
    objectPosition: '44% 40%',
    transformOrigin: '44% 46%',
    /** Horizontaal naar rechts; verticaal: hele afbeelding naar beneden (translate). */
    imageNudge: { x: '5%', y: '20%' },
  },
  { src: '/images/founder2.jpg', nameKey: 'who.founder2.name', roleKey: 'who.founder2.role' },
  {
    src: '/images/founder3.png',
    nameKey: 'who.founder3.name',
    roleKey: 'who.founder3.role',
    /** Portret gecentreerd; lichte zoom om het kader 5/6 te vullen zonder het gezicht te kadreren. */
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
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const photosRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const photoItems = photosRef.current?.querySelectorAll('.founder-photo');

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

      if (photoItems) {
        photoItems.forEach((item, index) => {
          gsap.fromTo(
            item,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              delay: 0.1 + index * 0.1,
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }

      gsap.fromTo(
        bodyRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.3,
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
      id="about"
      className="relative z-20 py-14 sm:py-16 md:py-20 flex flex-col justify-center"
      style={{ backgroundColor: 'var(--elaz-bg-secondary)' }}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <h2
          ref={headlineRef}
          className="font-display font-semibold text-display-lg mb-4 md:mb-6"
          style={{ color: 'var(--elaz-text-primary)' }}
        >
          {t('who.title')}
        </h2>

        <div
          ref={photosRef}
          className="grid grid-cols-3 gap-3 sm:gap-3 md:gap-5 mb-6 sm:mb-8 md:mb-10"
        >
          {FOUNDERS.map((founder) => {
            const { title, subtitle } = splitFounderRole(t(founder.roleKey));
            return (
              <div key={founder.src} className="founder-photo flex flex-col items-center gap-2.5 sm:gap-3 text-center">
                <div
                  className="mx-auto w-full max-w-[120px] sm:max-w-[148px] md:max-w-[168px] aspect-[5/6] rounded-xl overflow-hidden shadow-sm ring-1 ring-black/[0.06]"
                  style={{
                    backgroundColor: 'var(--elaz-bg-primary)',
                  }}
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
                <div className="w-full min-w-0 flex flex-col items-center">
                  <p
                    className="font-display font-semibold text-sm sm:text-base md:text-lg leading-snug tracking-tight"
                    style={{ color: 'var(--elaz-text-primary)' }}
                  >
                    {t(founder.nameKey)}
                  </p>
                  <div className="mt-2 sm:mt-2.5 flex w-full min-w-0 max-w-full flex-col items-center gap-1 text-center">
                    <p
                      className="text-mono-label leading-relaxed"
                      style={{ color: 'var(--elaz-text-muted)' }}
                    >
                      {title}
                    </p>
                    {subtitle ? (
                      <p
                        className="text-mono-label leading-relaxed max-w-[min(100%,18rem)] text-balance"
                        style={{ color: 'var(--elaz-text-muted)' }}
                      >
                        {subtitle}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div ref={bodyRef}>
          <p
            className="text-sm sm:text-base font-medium leading-relaxed max-w-3xl pl-4 sm:pl-5 border-l-2 mb-8 sm:mb-10 md:mb-12"
            style={{
              borderColor: 'var(--elaz-accent)',
              color: 'var(--elaz-text-primary)',
            }}
          >
            {t('who.foundersTagline')}
          </p>
          <div className="space-y-4 sm:space-y-5">
            {(['who.p1', 'who.p2', 'who.p3', 'who.p4'] as const).map((key) => (
              <p
                key={key}
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: 'var(--elaz-text-secondary)' }}
              >
                {t(key)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}