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

export default function CookiesPage() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t('cookies.docTitle');
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
            <span>{t('cookies.eyebrow')}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 lg:gap-16 lg:items-end">
            <h1
              className="lg:col-span-8 text-editorial-xl max-w-[18ch] [overflow-wrap:anywhere]"
              style={{ color: 'var(--elaz-text-primary)' }}
            >
              {t('cookies.title')}.
            </h1>
            <p
              className="lg:col-span-4 font-mono text-[11px] md:text-[12px] tracking-[0.16em] uppercase"
              style={{ color: 'var(--elaz-text-muted)' }}
            >
              {t('cookies.updated')}
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
            <p>{t('cookies.intro')}</p>
          </div>
        </div>

        <Section id="cookies-s1" index="01" title={t('cookies.s1.title')}>
          <p>{t('cookies.s1.p1')}</p>
          <p className="mt-3">{t('cookies.s1.p2')}</p>
        </Section>

        <Section id="cookies-s2" index="02" title={t('cookies.s2.title')}>
          <p>{t('cookies.s2.intro')}</p>
          <BulletList items={[t('cookies.s2.li1'), t('cookies.s2.li2')]} />
          <p>{t('cookies.s2.footer')}</p>
        </Section>

        <Section id="cookies-s3" index="03" title={t('cookies.s3.title')}>
          <p>{t('cookies.s3.intro')}</p>
          <BulletList
            items={[t('cookies.s3.li1'), t('cookies.s3.li2'), t('cookies.s3.li3')]}
          />
          <p>{t('cookies.s3.footer')}</p>
        </Section>

        <Section id="cookies-s4" index="04" title={t('cookies.s4.title')}>
          <p>{t('cookies.s4.p1')}</p>
          <p className="mt-3">{t('cookies.s4.p2')}</p>
        </Section>

        <Section id="cookies-s5" index="05" title={t('cookies.s5.title')}>
          <p>{t('cookies.s5.p1')}</p>
          <p className="mt-4">
            <a
              href={`mailto:${t('cookies.s5.email')}`}
              className="underline decoration-1 underline-offset-[3px] transition-colors hover:text-[color:var(--elaz-accent)]"
              style={{ color: 'var(--elaz-text-primary)' }}
            >
              {t('cookies.s5.email')}
            </a>
          </p>
        </Section>

        <div className="border-t border-[color:var(--elaz-border)]" />
      </div>
    </article>
  );
}
