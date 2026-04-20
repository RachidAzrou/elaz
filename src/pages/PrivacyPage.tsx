import { useEffect, type ReactNode } from 'react';
import { useLanguage } from '../context/LanguageContext';

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
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 lg:gap-10 pt-8 sm:pt-10 md:pt-14 pb-8 sm:pb-10 md:pb-14 border-t border-[color:var(--elaz-border)]"
      aria-labelledby={id}
    >
      <div className="lg:col-span-3">
        <span
          className="font-mono text-[11px] tracking-[0.18em] uppercase"
          style={{ color: 'var(--elaz-text-muted)' }}
        >
          § {index}
        </span>
        <h2
          id={id}
          className="mt-2 font-display font-semibold text-lg sm:text-xl md:text-2xl leading-tight tracking-tight [overflow-wrap:anywhere]"
          style={{ color: 'var(--elaz-text-primary)' }}
        >
          {title}
        </h2>
      </div>
      <div
        className="lg:col-span-9 max-w-[62ch] text-[15px] md:text-base leading-[1.75] [overflow-wrap:anywhere]"
        style={{ color: 'var(--elaz-text-secondary)' }}
      >
        {children}
      </div>
    </section>
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
    <article
      className="relative pb-20 md:pb-28"
      style={{ backgroundColor: 'var(--elaz-bg-primary)' }}
    >
      <header className="pt-24 sm:pt-28 md:pt-36 pb-12 sm:pb-14 md:pb-20">
        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="section-marker mb-8 sm:mb-10 md:mb-14 flex items-center gap-3">
            <span
              className="inline-block w-6 h-px"
              style={{ background: 'var(--elaz-text-muted)' }}
            />
            <span>{t('privacy.eyebrow')}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 lg:gap-16 lg:items-end">
            <h1
              className="lg:col-span-8 text-editorial-xl max-w-[18ch] [overflow-wrap:anywhere]"
              style={{ color: 'var(--elaz-text-primary)' }}
            >
              {t('privacy.title')}.
            </h1>
            <p
              className="lg:col-span-4 font-mono text-[11px] md:text-[12px] tracking-[0.16em] uppercase"
              style={{ color: 'var(--elaz-text-muted)' }}
            >
              {t('privacy.updated')}
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 pb-10 md:pb-14">
          <div className="lg:col-span-3" />
          <div
            className="lg:col-span-9 max-w-[62ch] text-[15px] md:text-base leading-[1.75]"
            style={{ color: 'var(--elaz-text-secondary)' }}
          >
            <p>{t('privacy.intro.p1')}</p>
            <p className="mt-4">{t('privacy.intro.p2')}</p>
          </div>
        </div>

        <Section id="privacy-s1" index="01" title={t('privacy.s1.title')}>
          <div className="space-y-1">
            <p>{t('privacy.s1.line1')}</p>
            <p>{t('privacy.s1.line2')}</p>
            <p>{t('privacy.s1.line3')}</p>
            <p>{t('privacy.s1.line4')}</p>
          </div>
          <p
            className="mt-5 font-mono text-[12px] tracking-[0.1em]"
            style={{ color: 'var(--elaz-text-muted)' }}
          >
            {t('privacy.s1.vat')}
          </p>
          <p className="mt-2">
            <span style={{ color: 'var(--elaz-text-muted)' }}>
              {t('privacy.s1.emailLabel')}{' '}
            </span>
            <a
              href={`mailto:${t('privacy.s1.email')}`}
              className="underline decoration-1 underline-offset-[3px] transition-colors hover:text-[color:var(--elaz-accent)]"
              style={{ color: 'var(--elaz-text-primary)' }}
            >
              {t('privacy.s1.email')}
            </a>
          </p>
        </Section>

        <Section id="privacy-s2" index="02" title={t('privacy.s2.title')}>
          <p>{t('privacy.s2.p1')}</p>
          <h3
            className="mt-8 font-display font-semibold text-base md:text-lg tracking-tight"
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            {t('privacy.s2.surveyTitle')}
          </h3>
          <p className="mt-3">{t('privacy.s2.survey.p1')}</p>
          <BulletList items={[t('privacy.s2.survey.bullet1')]} />
          <p className="mt-3">{t('privacy.s2.survey.p2')}</p>
          <p className="mt-3">{t('privacy.s2.survey.p3')}</p>
        </Section>

        <Section id="privacy-s3" index="03" title={t('privacy.s3.title')}>
          <p>{t('privacy.s3.intro')}</p>
          <BulletList
            items={[t('privacy.s3.li1'), t('privacy.s3.li2'), t('privacy.s3.li3')]}
          />
          <p>{t('privacy.s3.footer')}</p>
        </Section>

        <Section id="privacy-s4" index="04" title={t('privacy.s4.title')}>
          <p>{t('privacy.s4.p1')}</p>
          <BulletList items={[t('privacy.s4.li1')]} />
        </Section>

        <Section id="privacy-s5" index="05" title={t('privacy.s5.title')}>
          <p>{t('privacy.s5.p1')}</p>
          <p
            className="mt-4 font-medium"
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            {t('privacy.s5.concrete')}
          </p>
          <BulletList items={[t('privacy.s5.li1'), t('privacy.s5.li2')]} />
        </Section>

        <Section id="privacy-s6" index="06" title={t('privacy.s6.title')}>
          <p>{t('privacy.s6.p1')}</p>
          <p className="mt-4">{t('privacy.s6.tech')}</p>
          <BulletList items={[t('privacy.s6.li1')]} />
          <p className="mt-3">{t('privacy.s6.footer')}</p>
        </Section>

        <Section id="privacy-s7" index="07" title={t('privacy.s7.title')}>
          <p>{t('privacy.s7.intro')}</p>
          <BulletList
            items={[t('privacy.s7.li1'), t('privacy.s7.li2'), t('privacy.s7.li3')]}
          />
        </Section>

        <Section id="privacy-s8" index="08" title={t('privacy.s8.title')}>
          <p>{t('privacy.s8.intro')}</p>
          <BulletList
            items={[
              t('privacy.s8.li1'),
              t('privacy.s8.li2'),
              t('privacy.s8.li3'),
              t('privacy.s8.li4'),
            ]}
          />
          <p className="mt-4">{t('privacy.s8.contact')}</p>
          <p className="mt-2">
            <a
              href={`mailto:${t('privacy.s8.email')}`}
              className="underline decoration-1 underline-offset-[3px] transition-colors hover:text-[color:var(--elaz-accent)]"
              style={{ color: 'var(--elaz-text-primary)' }}
            >
              {t('privacy.s8.email')}
            </a>
          </p>
        </Section>

        <Section id="privacy-s9" index="09" title={t('privacy.s9.title')}>
          <p>{t('privacy.s9.p1')}</p>
          <p className="mt-3">{t('privacy.s9.p2')}</p>
        </Section>

        <div className="border-t border-[color:var(--elaz-border)]" />
      </div>
    </article>
  );
}
