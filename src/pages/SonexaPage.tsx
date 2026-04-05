import { useEffect } from 'react';

import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const surveyHref =
  (import.meta.env.VITE_SONEXA_SURVEY_URL as string | undefined)?.trim() ||
  'https://praktijkreflectie.be/';

const mailPlanHref =
  'mailto:contact@elazgroup.com?subject=Sonexa%20aanvraag%20intro-gesprek';

const isExternal = surveyHref.startsWith('http');

function SurveyCta({ label }: { label: string }) {
  return (
    <a
      href={surveyHref}
      className="btn-primary group inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-xl px-7 text-[0.9375rem] font-semibold tracking-[-0.01em] touch-manipulation sm:w-auto sm:min-w-[15rem]"
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {label}
      <ArrowRight
        className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5"
        aria-hidden
      />
    </a>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p
      className="text-mono-label mb-3 sm:mb-4"
      style={{ color: 'var(--elaz-accent)' }}
    >
      {children}
    </p>
  );
}

export default function SonexaPage() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = 'Sonexa \u2014 ELAZ Group';
    window.scrollTo(0, 0);
    return () => {
      document.title = 'ELAZ Group';
    };
  }, []);

  const body = 'text-[0.9375rem] leading-[1.7] sm:text-base sm:leading-[1.75]';
  const heading2 =
    'font-display text-[1.2rem] font-semibold tracking-tight text-balance sm:text-[1.4rem] md:text-2xl';
  /** Zelfde ritme als landingssecties (HowWeWork, Initiatives): py op de band, geen border-t. */
  const sectionBand =
    'relative flex flex-col justify-center py-16 md:py-24';
  const sectionInner =
    'mx-auto w-full max-w-3xl px-5 sm:px-6 lg:px-0';

  return (
    <article
      className="min-h-[60vh] w-full max-w-full overflow-x-hidden"
      style={{ backgroundColor: 'var(--elaz-bg-primary)' }}
    >
      {/* ─── HERO ─── */}
      <header className="relative w-full overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 50% at 50% -10%, rgba(74,108,111,0.07), transparent 60%)',
          }}
          aria-hidden
        />
        <div className="relative mx-auto w-full max-w-3xl px-5 pb-10 pt-[max(5.5rem,calc(env(safe-area-inset-top,0px)+4.5rem))] sm:px-6 sm:pb-14 sm:pt-28 md:pb-16 md:pt-32 lg:px-0">
          <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 sm:mb-8">
            <span
              className="font-brand text-base sm:text-lg md:text-xl"
              style={{ color: 'var(--elaz-text-primary)' }}
            >
              SONEXA
            </span>
            <span
              className="text-mono-label"
              style={{ color: 'var(--elaz-accent)' }}
            >
              {t('sonexa.badge')}
            </span>
          </div>

          <h1
            className="font-display mb-5 whitespace-pre-line text-[1.45rem] font-bold leading-[1.2] tracking-tight sm:mb-8 sm:text-[2rem] md:text-[2.35rem]"
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            {t('sonexa.hero.headline')}
          </h1>

          <p
            className={`${body} mb-8 max-w-[38rem] sm:mb-12`}
            style={{ color: 'var(--elaz-text-secondary)' }}
          >
            {t('sonexa.hero.sub')}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <SurveyCta label={t('sonexa.hero.ctaSurvey')} />
            <a
              href={mailPlanHref}
              className="btn-secondary inline-flex min-h-[48px] w-full items-center justify-center rounded-xl px-6 text-[0.875rem] touch-manipulation sm:w-auto"
            >
              {t('sonexa.hero.ctaContact')}
            </a>
          </div>

          <div
            className="rule-line mt-12 w-full origin-left sm:mt-16 md:mt-20"
            aria-hidden
          />
        </div>
      </header>

      {/* ─── CONTEXT / WHY ─── */}
      <section
        className={sectionBand}
        style={{ backgroundColor: 'var(--elaz-bg-secondary)' }}
      >
        <div className={sectionInner}>
          <SectionLabel>01</SectionLabel>
          <h2
            className={`${heading2} mb-4 sm:mb-5`}
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            {t('sonexa.context.title')}
          </h2>
          <div className="space-y-3 sm:space-y-4">
            <p className={body} style={{ color: 'var(--elaz-text-secondary)' }}>
              {t('sonexa.context.p1')}
            </p>
            <p className={body} style={{ color: 'var(--elaz-text-secondary)' }}>
              {t('sonexa.context.p2')}
            </p>
          </div>
        </div>
      </section>

      {/* ─── FOCUS ─── */}
      <section
        className={sectionBand}
        style={{ backgroundColor: 'var(--elaz-bg-primary)' }}
      >
        <div className={sectionInner}>
          <SectionLabel>02</SectionLabel>
          <h2
            className={`${heading2} mb-4 sm:mb-5`}
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            {t('sonexa.focus.title')}
          </h2>
          <p className={`${body} mb-5 sm:mb-6`} style={{ color: 'var(--elaz-text-secondary)' }}>
            {t('sonexa.focus.lead')}
          </p>
          <ul className="mb-5 space-y-2.5 sm:mb-6 sm:space-y-3">
            {(['sonexa.focus.li1', 'sonexa.focus.li2', 'sonexa.focus.li3', 'sonexa.focus.li4'] as const).map(
              (key) => (
                <li key={key} className={`${body} flex gap-3`} style={{ color: 'var(--elaz-text-secondary)' }}>
                  <span
                    className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: 'var(--elaz-accent)' }}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1">{t(key)}</span>
                </li>
              ),
            )}
          </ul>
          <p
            className="text-[0.875rem] font-medium sm:text-[0.9375rem]"
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            {t('sonexa.focus.footer')}
          </p>
        </div>
      </section>

      {/* ─── HOW WE WORK ─── */}
      <section
        className={sectionBand}
        style={{ backgroundColor: 'var(--elaz-bg-secondary)' }}
      >
        <div className={sectionInner}>
          <SectionLabel>03</SectionLabel>
          <h2
            className={`${heading2} mb-8 sm:mb-10`}
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            {t('sonexa.how.title')}
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 md:gap-x-10">
            {([1, 2, 3, 4] as const).map((n) => (
              <div key={n}>
                <p
                  className="font-display mb-2 text-[1.75rem] font-bold leading-none tracking-tight sm:mb-3 sm:text-[2.25rem]"
                  style={{ color: 'var(--elaz-text-primary)', opacity: 0.1 }}
                  aria-hidden
                >
                  {String(n)}
                </p>
                <h3
                  className="font-display mb-1 text-[0.9375rem] font-semibold tracking-tight sm:mb-1.5 sm:text-base"
                  style={{ color: 'var(--elaz-text-primary)' }}
                >
                  {t(`sonexa.how.step${n}.title` as 'sonexa.how.step1.title')}
                </h3>
                <p
                  className="text-[0.8125rem] leading-[1.55] sm:text-sm sm:leading-relaxed"
                  style={{ color: 'var(--elaz-text-secondary)' }}
                >
                  {t(`sonexa.how.step${n}.desc` as 'sonexa.how.step1.desc')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHERE THIS LEADS ─── */}
      <section
        className={sectionBand}
        style={{ backgroundColor: 'var(--elaz-bg-primary)' }}
      >
        <div className={sectionInner}>
          <SectionLabel>04</SectionLabel>
          <h2
            className={`${heading2} mb-4 sm:mb-5`}
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            {t('sonexa.future.title')}
          </h2>
          <p className={`${body} mb-5 sm:mb-6`} style={{ color: 'var(--elaz-text-secondary)' }}>
            {t('sonexa.future.lead')}
          </p>
          <ul className="mb-5 space-y-2.5 sm:mb-6 sm:space-y-3">
            {(['sonexa.future.li1', 'sonexa.future.li2', 'sonexa.future.li3', 'sonexa.future.li4'] as const).map(
              (key) => (
                <li key={key} className={`${body} flex gap-3`} style={{ color: 'var(--elaz-text-secondary)' }}>
                  <span
                    className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: 'var(--elaz-accent)' }}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1">{t(key)}</span>
                </li>
              ),
            )}
          </ul>
          <p
            className={`${body} font-medium`}
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            {t('sonexa.future.footer')}
          </p>
        </div>
      </section>

      {/* ─── WHO IS THIS FOR ─── */}
      <section
        className={sectionBand}
        style={{ backgroundColor: 'var(--elaz-bg-secondary)' }}
      >
        <div className={sectionInner}>
          <SectionLabel>05</SectionLabel>
          <h2
            className={`${heading2} mb-6 sm:mb-8 md:mb-10`}
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            {t('sonexa.who.title')}
          </h2>
          <div className="grid grid-cols-1 gap-0 sm:grid-cols-2">
            {([1, 2, 3, 4] as const).map((n, i) => (
              <div
                key={n}
                className="border-b px-0 py-5 sm:py-6 sm:odd:pr-6 sm:even:pl-6 sm:even:border-l md:odd:pr-8 md:even:pl-8"
                style={{ borderColor: 'var(--elaz-border)' }}
              >
                <h3
                  className="font-display mb-1 text-[0.9375rem] font-semibold tracking-tight sm:text-base"
                  style={{ color: 'var(--elaz-text-primary)' }}
                >
                  <span
                    className="mr-2 font-mono text-xs tabular-nums"
                    style={{ color: 'var(--elaz-accent)' }}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {t(`sonexa.who.li${n}` as 'sonexa.who.li1')}
                </h3>
                <p
                  className="ml-7 text-[0.8125rem] leading-[1.55] sm:text-sm sm:leading-relaxed"
                  style={{ color: 'var(--elaz-text-secondary)' }}
                >
                  {t(`sonexa.who.li${n}.desc` as 'sonexa.who.li1.desc')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REPEAT SURVEY CTA ─── */}
      <section
        className={sectionBand}
        style={{ backgroundColor: 'var(--elaz-bg-primary)' }}
      >
        <div className={`${sectionInner} text-center`}>
          <h2
            className="font-display mb-3 text-[1.1rem] font-semibold tracking-tight sm:mb-4 sm:text-lg md:text-xl"
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            {t('sonexa.survey.title')}
          </h2>
          <p
            className={`${body} mx-auto mb-7 max-w-md sm:mb-8`}
            style={{ color: 'var(--elaz-text-secondary)' }}
          >
            {t('sonexa.survey.p2')}
          </p>
          <SurveyCta label={t('sonexa.survey.cta')} />
        </div>
      </section>

      {/* ─── CLOSING / CONTACT ─── */}
      <section
        className={sectionBand}
        style={{ backgroundColor: 'var(--elaz-bg-secondary)' }}
      >
        <div className={sectionInner}>
          <h2
            className={`${heading2} mb-3 sm:mb-4`}
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            {t('sonexa.closing.title')}
          </h2>
          <p
            className={`${body} mb-6 max-w-[34rem] sm:mb-8`}
            style={{ color: 'var(--elaz-text-secondary)' }}
          >
            {t('sonexa.closing.body')}
          </p>
          <a
            href="mailto:contact@elazgroup.com?subject=Sonexa%20-%20aanvraag%20introgesprek"
            className="btn-secondary inline-flex min-h-[48px] w-full items-center justify-center rounded-xl px-6 text-[0.875rem] touch-manipulation sm:w-auto sm:min-w-[11rem]"
            style={{ backgroundColor: 'var(--elaz-bg-primary)' }}
          >
            {t('sonexa.closing.ctaPlan')}
          </a>
        </div>
      </section>
    </article>
  );
}
