import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="my-4 list-none space-y-2.5 pl-0 sm:my-5">
      {items.map((text) => (
        <li
          key={text}
          className="flex gap-3 text-sm sm:text-base leading-relaxed"
          style={{ color: 'var(--elaz-text-secondary)' }}
        >
          <span
            className="mt-2 h-1 w-1 shrink-0 rounded-full"
            style={{ backgroundColor: 'var(--elaz-accent)' }}
            aria-hidden
          />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPage() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t('privacy.docTitle');
    window.scrollTo(0, 0);
    return () => {
      document.title = 'ELAZ Group';
    };
  }, [t]);

  return (
    <article className="relative pb-24">
      <header
        className="pt-28 pb-12 sm:pt-32 sm:pb-16 md:pt-36"
        style={{ backgroundColor: 'var(--elaz-bg-primary)' }}
      >
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-6 lg:px-8">
          <p
            className="text-mono-label mb-4"
            style={{ color: 'var(--elaz-accent)' }}
          >
            {t('privacy.eyebrow')}
          </p>
          <h1
            className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            {t('privacy.title')}
          </h1>
          <p
            className="mt-4 text-sm sm:text-base"
            style={{ color: 'var(--elaz-text-muted)' }}
          >
            {t('privacy.updated')}
          </p>
        </div>
      </header>

      <div
        className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8"
        style={{ color: 'var(--elaz-text-secondary)' }}
      >
        <p className="text-sm leading-relaxed sm:text-base">{t('privacy.intro.p1')}</p>
        <p className="mt-4 text-sm leading-relaxed sm:text-base">
          {t('privacy.intro.p2')}
        </p>

        <section className="mt-12" aria-labelledby="privacy-s1">
          <h2
            id="privacy-s1"
            className="font-display text-xl font-semibold tracking-tight sm:text-2xl"
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            {t('privacy.s1.title')}
          </h2>
          <div className="mt-4 space-y-1 text-sm leading-relaxed sm:text-base">
            <p>{t('privacy.s1.line1')}</p>
            <p>{t('privacy.s1.line2')}</p>
            <p>{t('privacy.s1.line3')}</p>
            <p>{t('privacy.s1.line4')}</p>
            <p className="pt-2">{t('privacy.s1.vat')}</p>
            <p>
              {t('privacy.s1.emailLabel')}{' '}
              <a
                href={`mailto:${t('privacy.s1.email')}`}
                className="underline decoration-1 underline-offset-2"
                style={{ color: 'var(--elaz-accent)' }}
              >
                {t('privacy.s1.email')}
              </a>
            </p>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="privacy-s2">
          <h2
            id="privacy-s2"
            className="font-display text-xl font-semibold tracking-tight sm:text-2xl"
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            {t('privacy.s2.title')}
          </h2>
          <p className="mt-4 text-sm leading-relaxed sm:text-base">{t('privacy.s2.p1')}</p>
          <h3
            className="mt-8 font-display text-base font-semibold sm:text-lg"
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            {t('privacy.s2.surveyTitle')}
          </h3>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">
            {t('privacy.s2.survey.p1')}
          </p>
          <BulletList items={[t('privacy.s2.survey.bullet1')]} />
          <p className="mt-3 text-sm leading-relaxed sm:text-base">
            {t('privacy.s2.survey.p2')}
          </p>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">
            {t('privacy.s2.survey.p3')}
          </p>
        </section>

        <section className="mt-12" aria-labelledby="privacy-s3">
          <h2
            id="privacy-s3"
            className="font-display text-xl font-semibold tracking-tight sm:text-2xl"
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            {t('privacy.s3.title')}
          </h2>
          <p className="mt-4 text-sm leading-relaxed sm:text-base">
            {t('privacy.s3.intro')}
          </p>
          <BulletList
            items={[t('privacy.s3.li1'), t('privacy.s3.li2'), t('privacy.s3.li3')]}
          />
          <p className="text-sm leading-relaxed sm:text-base">{t('privacy.s3.footer')}</p>
        </section>

        <section className="mt-12" aria-labelledby="privacy-s4">
          <h2
            id="privacy-s4"
            className="font-display text-xl font-semibold tracking-tight sm:text-2xl"
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            {t('privacy.s4.title')}
          </h2>
          <p className="mt-4 text-sm leading-relaxed sm:text-base">{t('privacy.s4.p1')}</p>
          <BulletList items={[t('privacy.s4.li1')]} />
        </section>

        <section className="mt-12" aria-labelledby="privacy-s5">
          <h2
            id="privacy-s5"
            className="font-display text-xl font-semibold tracking-tight sm:text-2xl"
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            {t('privacy.s5.title')}
          </h2>
          <p className="mt-4 text-sm leading-relaxed sm:text-base">{t('privacy.s5.p1')}</p>
          <p className="mt-4 text-sm font-medium" style={{ color: 'var(--elaz-text-primary)' }}>
            {t('privacy.s5.concrete')}
          </p>
          <BulletList items={[t('privacy.s5.li1'), t('privacy.s5.li2')]} />
        </section>

        <section className="mt-12" aria-labelledby="privacy-s6">
          <h2
            id="privacy-s6"
            className="font-display text-xl font-semibold tracking-tight sm:text-2xl"
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            {t('privacy.s6.title')}
          </h2>
          <p className="mt-4 text-sm leading-relaxed sm:text-base">{t('privacy.s6.p1')}</p>
          <p className="mt-4 text-sm leading-relaxed sm:text-base">{t('privacy.s6.tech')}</p>
          <BulletList items={[t('privacy.s6.li1')]} />
          <p className="mt-3 text-sm leading-relaxed sm:text-base">{t('privacy.s6.footer')}</p>
        </section>

        <section className="mt-12" aria-labelledby="privacy-s7">
          <h2
            id="privacy-s7"
            className="font-display text-xl font-semibold tracking-tight sm:text-2xl"
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            {t('privacy.s7.title')}
          </h2>
          <p className="mt-4 text-sm leading-relaxed sm:text-base">{t('privacy.s7.intro')}</p>
          <BulletList
            items={[t('privacy.s7.li1'), t('privacy.s7.li2'), t('privacy.s7.li3')]}
          />
        </section>

        <section className="mt-12" aria-labelledby="privacy-s8">
          <h2
            id="privacy-s8"
            className="font-display text-xl font-semibold tracking-tight sm:text-2xl"
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            {t('privacy.s8.title')}
          </h2>
          <p className="mt-4 text-sm leading-relaxed sm:text-base">{t('privacy.s8.intro')}</p>
          <BulletList
            items={[
              t('privacy.s8.li1'),
              t('privacy.s8.li2'),
              t('privacy.s8.li3'),
              t('privacy.s8.li4'),
            ]}
          />
          <p className="mt-4 text-sm leading-relaxed sm:text-base">
            {t('privacy.s8.contact')}
          </p>
          <p className="mt-2 text-sm leading-relaxed sm:text-base">
            <a
              href={`mailto:${t('privacy.s8.email')}`}
              className="underline decoration-1 underline-offset-2"
              style={{ color: 'var(--elaz-accent)' }}
            >
              {t('privacy.s8.email')}
            </a>
          </p>
        </section>

        <section className="mt-12" aria-labelledby="privacy-s9">
          <h2
            id="privacy-s9"
            className="font-display text-xl font-semibold tracking-tight sm:text-2xl"
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            {t('privacy.s9.title')}
          </h2>
          <p className="mt-4 text-sm leading-relaxed sm:text-base">{t('privacy.s9.p1')}</p>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">{t('privacy.s9.p2')}</p>
        </section>
      </div>
    </article>
  );
}
