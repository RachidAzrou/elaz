import { useEffect, type ReactNode } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const surveyHref =
  (import.meta.env.VITE_SONEXA_SURVEY_URL as string | undefined)?.trim() ||
  'https://praktijkreflectie.be/';

const mailPlanHref =
  'mailto:contact@elazgroup.com?subject=Sonexa%20aanvraag%20intro-gesprek';

const isExternal = surveyHref.startsWith('http');

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="my-5 md:my-6 flex flex-col gap-3 md:gap-3.5 pl-0">
      {items.map((text) => (
        <li
          key={text}
          className="flex gap-4 text-[15px] md:text-base leading-[1.7]"
          style={{ color: 'var(--elaz-text-secondary)' }}
        >
          <span
            aria-hidden
            className="mt-[0.65em] inline-block h-px w-3 shrink-0"
            style={{ background: 'var(--elaz-text-muted)' }}
          />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}

function Section({
  id,
  index,
  title,
  background,
  children,
}: {
  id: string;
  index: string;
  title: string;
  background?: 'primary' | 'secondary';
  children: ReactNode;
}) {
  const bg =
    background === 'secondary'
      ? 'var(--elaz-bg-secondary)'
      : 'var(--elaz-bg-primary)';
  return (
    <section
      className="py-14 sm:py-16 md:py-24 lg:py-28"
      style={{ backgroundColor: bg }}
      aria-labelledby={id}
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-16">
          <div className="lg:col-span-4">
            <div
              className="section-marker mb-3 sm:mb-4 flex items-center gap-3"
              style={{ color: 'var(--elaz-text-muted)' }}
            >
              <span
                className="inline-block w-6 h-px"
                style={{ background: 'var(--elaz-text-muted)' }}
              />
              <span>§ {index}</span>
            </div>
            <h2
              id={id}
              className="font-display font-semibold text-xl sm:text-2xl md:text-3xl leading-tight tracking-tight max-w-[20ch] [overflow-wrap:anywhere]"
              style={{ color: 'var(--elaz-text-primary)' }}
            >
              {title}
            </h2>
          </div>
          <div
            className="lg:col-span-8 max-w-[62ch] text-[15px] md:text-base leading-[1.75]"
            style={{ color: 'var(--elaz-text-secondary)' }}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SonexaPage() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = 'Sonexa — ELAZ Group';
    window.scrollTo(0, 0);
    return () => {
      document.title = 'ELAZ Group';
    };
  }, []);

  const heroHeadline = t('sonexa.hero.headline');
  const heroLines = heroHeadline.split('\n');

  return (
    <article
      className="min-h-[60vh] w-full max-w-full overflow-x-hidden"
      style={{ backgroundColor: 'var(--elaz-bg-primary)' }}
    >
      <header
        className="relative"
        style={{ backgroundColor: 'var(--elaz-bg-primary)' }}
      >
        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12 pt-24 sm:pt-28 md:pt-36 pb-14 md:pb-24">
          <div className="section-marker mb-6 md:mb-10 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span
              className="inline-block w-6 h-px"
              style={{ background: 'var(--elaz-text-muted)' }}
            />
            <span>{t('sonexa.badge')}</span>
          </div>

          <div className="mb-10 md:mb-16">
            <h1
              className="font-brand leading-[0.95] tracking-tight text-display-xl max-w-full [overflow-wrap:anywhere]"
              style={{ color: 'var(--elaz-text-primary)' }}
              aria-label="Sonexa"
            >
              SONEXA
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-16 items-start">
            <h2
              className="lg:col-span-8 text-editorial-xl [overflow-wrap:anywhere]"
              style={{ color: 'var(--elaz-text-primary)' }}
            >
              {heroLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>

            <div className="lg:col-span-4 lg:pt-3 lg:pl-8 lg:border-l lg:border-[color:var(--elaz-border)]">
              <p
                className="text-[15px] md:text-base leading-[1.75] mb-8 md:mb-10 max-w-[52ch]"
                style={{ color: 'var(--elaz-text-secondary)' }}
              >
                {t('sonexa.hero.sub')}
              </p>

              <div className="flex flex-col">
                <a
                  href={surveyHref}
                  {...(isExternal
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="group flex items-center justify-between gap-4 py-4 md:py-5 border-t border-[color:var(--elaz-border)] text-left transition-colors"
                >
                  <span
                    className="font-display font-medium text-base md:text-lg tracking-tight transition-colors group-hover:text-[color:var(--elaz-accent)]"
                    style={{ color: 'var(--elaz-text-primary)' }}
                  >
                    {t('sonexa.hero.ctaSurvey')}
                  </span>
                  {isExternal ? (
                    <ArrowUpRight
                      className="h-[18px] w-[18px] shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      style={{ color: 'var(--elaz-text-muted)' }}
                      aria-hidden
                    />
                  ) : (
                    <ArrowRight
                      className="h-[18px] w-[18px] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                      style={{ color: 'var(--elaz-text-muted)' }}
                      aria-hidden
                    />
                  )}
                </a>
                <a
                  href={mailPlanHref}
                  className="group flex items-center justify-between gap-4 py-4 md:py-5 border-t border-b border-[color:var(--elaz-border)] text-left transition-colors"
                >
                  <span
                    className="font-mono text-[11px] md:text-[12px] tracking-[0.18em] uppercase transition-colors group-hover:text-[color:var(--elaz-accent)]"
                    style={{ color: 'var(--elaz-text-primary)' }}
                  >
                    {t('sonexa.hero.ctaContact')}
                  </span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                    style={{ color: 'var(--elaz-text-muted)' }}
                    aria-hidden
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Section
        id="sonexa-s1"
        index="01"
        title={t('sonexa.context.title')}
        background="secondary"
      >
        <p>{t('sonexa.context.p1')}</p>
        <p className="mt-4">{t('sonexa.context.p2')}</p>
      </Section>

      <Section id="sonexa-s2" index="02" title={t('sonexa.focus.title')}>
        <p>{t('sonexa.focus.lead')}</p>
        <BulletList
          items={[
            t('sonexa.focus.li1'),
            t('sonexa.focus.li2'),
            t('sonexa.focus.li3'),
            t('sonexa.focus.li4'),
          ]}
        />
        <p
          className="mt-4 font-editorial italic text-[18px] md:text-[20px] leading-[1.45] max-w-[40ch]"
          style={{ color: 'var(--elaz-text-primary)' }}
        >
          &ldquo;{t('sonexa.focus.footer')}&rdquo;
        </p>
      </Section>

      <section
        className="py-14 sm:py-16 md:py-24 lg:py-28"
        style={{ backgroundColor: 'var(--elaz-bg-secondary)' }}
        aria-labelledby="sonexa-s3"
      >
        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-16 mb-8 sm:mb-10 md:mb-14">
            <div className="lg:col-span-4">
              <div
                className="section-marker mb-3 sm:mb-4 flex items-center gap-3"
                style={{ color: 'var(--elaz-text-muted)' }}
              >
                <span
                  className="inline-block w-6 h-px"
                  style={{ background: 'var(--elaz-text-muted)' }}
                />
                <span>§ 03</span>
              </div>
              <h2
                id="sonexa-s3"
                className="font-display font-semibold text-xl sm:text-2xl md:text-3xl leading-tight tracking-tight max-w-[20ch]"
                style={{ color: 'var(--elaz-text-primary)' }}
              >
                {t('sonexa.how.title')}
              </h2>
            </div>
          </div>

          <div className="border-t border-[color:var(--elaz-border)]" role="list">
            {([1, 2, 3, 4] as const).map((n) => (
              <div
                key={n}
                role="listitem"
                className="group grid grid-cols-12 gap-x-4 gap-y-3 md:gap-x-8 md:gap-y-0 md:items-baseline py-6 md:py-8 border-b border-[color:var(--elaz-border)] transition-colors duration-200"
              >
                <div className="col-span-2 md:col-span-1">
                  <span
                    className="font-mono text-[13px] md:text-sm tracking-[0.1em] tabular-nums"
                    style={{ color: 'var(--elaz-text-muted)' }}
                  >
                    0{n}
                  </span>
                </div>
                <h3
                  className="col-span-10 md:col-span-4 font-display font-medium text-base sm:text-lg md:text-xl leading-tight tracking-tight transition-colors duration-200 group-hover:text-[color:var(--elaz-accent)]"
                  style={{ color: 'var(--elaz-text-primary)' }}
                >
                  {t(`sonexa.how.step${n}.title` as 'sonexa.how.step1.title')}
                </h3>
                <p
                  className="col-start-3 col-span-10 md:col-start-auto md:col-span-7 text-[14px] sm:text-[15px] md:text-base leading-[1.65] md:leading-[1.7] max-w-[56ch]"
                  style={{ color: 'var(--elaz-text-secondary)' }}
                >
                  {t(`sonexa.how.step${n}.desc` as 'sonexa.how.step1.desc')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section id="sonexa-s4" index="04" title={t('sonexa.future.title')}>
        <p>{t('sonexa.future.lead')}</p>
        <BulletList
          items={[
            t('sonexa.future.li1'),
            t('sonexa.future.li2'),
            t('sonexa.future.li3'),
            t('sonexa.future.li4'),
          ]}
        />
        <p
          className="mt-4 font-editorial italic text-[18px] md:text-[20px] leading-[1.45] max-w-[40ch]"
          style={{ color: 'var(--elaz-text-primary)' }}
        >
          &ldquo;{t('sonexa.future.footer')}&rdquo;
        </p>
      </Section>

      <section
        className="py-14 sm:py-16 md:py-24 lg:py-28"
        style={{ backgroundColor: 'var(--elaz-bg-secondary)' }}
        aria-labelledby="sonexa-s5"
      >
        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-16 mb-8 sm:mb-10 md:mb-14">
            <div className="lg:col-span-4">
              <div
                className="section-marker mb-3 sm:mb-4 flex items-center gap-3"
                style={{ color: 'var(--elaz-text-muted)' }}
              >
                <span
                  className="inline-block w-6 h-px"
                  style={{ background: 'var(--elaz-text-muted)' }}
                />
                <span>§ 05</span>
              </div>
              <h2
                id="sonexa-s5"
                className="font-display font-semibold text-xl sm:text-2xl md:text-3xl leading-tight tracking-tight max-w-[20ch]"
                style={{ color: 'var(--elaz-text-primary)' }}
              >
                {t('sonexa.who.title')}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-[color:var(--elaz-border)]">
            {([1, 2, 3, 4] as const).map((n, i) => (
              <div
                key={n}
                className={`py-6 md:py-8 border-b border-[color:var(--elaz-border)] ${
                  i % 2 === 0 ? 'md:pr-8 md:border-r' : 'md:pl-8'
                }`}
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <span
                    className="font-mono text-[11px] md:text-[12px] tracking-[0.14em] tabular-nums shrink-0"
                    style={{ color: 'var(--elaz-text-muted)' }}
                  >
                    0{i + 1}
                  </span>
                  <h3
                    className="font-display font-semibold text-base sm:text-lg md:text-xl leading-tight tracking-tight [overflow-wrap:anywhere]"
                    style={{ color: 'var(--elaz-text-primary)' }}
                  >
                    {t(`sonexa.who.li${n}` as 'sonexa.who.li1')}
                  </h3>
                </div>
                <p
                  className="ml-[calc(1.1em+0.75rem)] text-[14px] md:text-[15px] leading-[1.65] md:leading-[1.7] max-w-[48ch]"
                  style={{ color: 'var(--elaz-text-secondary)' }}
                >
                  {t(`sonexa.who.li${n}.desc` as 'sonexa.who.li1.desc')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-14 sm:py-16 md:py-24 lg:py-28"
        style={{ backgroundColor: 'var(--elaz-bg-primary)' }}
      >
        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="border-t border-b border-[color:var(--elaz-border)] relative">
            <span
              aria-hidden
              className="absolute -top-px left-0 h-[2px] w-24 sm:w-32"
              style={{ background: 'var(--elaz-accent)' }}
            />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-16 py-10 sm:py-12 md:py-16 items-start">
              <div className="lg:col-span-5">
                <div
                  className="section-marker mb-4"
                  style={{ color: 'var(--elaz-accent)' }}
                >
                  {t('sonexa.survey.label')}
                </div>
                <h2
                  className="font-editorial text-[22px] sm:text-[26px] md:text-[32px] leading-[1.2] max-w-[22ch] [overflow-wrap:anywhere]"
                  style={{ color: 'var(--elaz-text-primary)' }}
                >
                  {t('sonexa.survey.title')}
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p
                  className="text-[15px] md:text-base leading-[1.75] mb-6 sm:mb-8 max-w-[52ch]"
                  style={{ color: 'var(--elaz-text-secondary)' }}
                >
                  {t('sonexa.survey.p2')}
                </p>
                <a
                  href={surveyHref}
                  {...(isExternal
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="group inline-flex flex-wrap items-baseline gap-x-3 gap-y-1 max-w-full"
                >
                  <span
                    className="font-editorial text-[20px] sm:text-[22px] md:text-[26px] leading-[1.15] underline decoration-1 underline-offset-[4px] decoration-[color:var(--elaz-border)] transition-colors duration-200 group-hover:decoration-[color:var(--elaz-accent)] group-hover:text-[color:var(--elaz-accent)] [overflow-wrap:anywhere]"
                    style={{ color: 'var(--elaz-text-primary)' }}
                  >
                    {t('sonexa.survey.cta')}
                  </span>
                  {isExternal ? (
                    <ArrowUpRight
                      className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      style={{ color: 'var(--elaz-text-muted)' }}
                      aria-hidden
                    />
                  ) : (
                    <ArrowDown
                      className="h-5 w-5 shrink-0"
                      style={{ color: 'var(--elaz-text-muted)' }}
                      aria-hidden
                    />
                  )}
                </a>
                <ul
                  className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] tracking-[0.14em] uppercase"
                  style={{ color: 'var(--elaz-text-muted)' }}
                >
                  <li>· {t('sonexa.survey.note1')}</li>
                  <li>· {t('sonexa.survey.note2')}</li>
                  <li>· {t('sonexa.survey.note3')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-14 sm:py-16 md:py-24 lg:py-28"
        style={{ backgroundColor: 'var(--elaz-bg-secondary)' }}
      >
        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <h2
                className="text-editorial-lg max-w-[18ch] [overflow-wrap:anywhere]"
                style={{ color: 'var(--elaz-text-primary)' }}
              >
                {t('sonexa.closing.title')}
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-[color:var(--elaz-border)]">
              <p
                className="text-[15px] md:text-base leading-[1.75] mb-8 md:mb-10 max-w-[52ch]"
                style={{ color: 'var(--elaz-text-secondary)' }}
              >
                {t('sonexa.closing.body')}
              </p>
              <a
                href="mailto:contact@elazgroup.com?subject=Sonexa%20-%20aanvraag%20introgesprek"
                className="group flex items-center justify-between gap-4 py-4 md:py-5 border-t border-b border-[color:var(--elaz-border)] text-left transition-colors"
              >
                <span
                  className="font-display font-medium text-base md:text-lg tracking-tight transition-colors group-hover:text-[color:var(--elaz-accent)]"
                  style={{ color: 'var(--elaz-text-primary)' }}
                >
                  {t('sonexa.closing.ctaPlan')}
                </span>
                <ArrowRight
                  className="h-[18px] w-[18px] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                  style={{ color: 'var(--elaz-text-muted)' }}
                  aria-hidden
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
