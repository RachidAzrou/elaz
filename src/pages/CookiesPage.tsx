import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

function List({ items }: { items: string[] }) {
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
            {t('cookies.eyebrow')}
          </p>
          <h1
            className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            {t('cookies.title')}
          </h1>
          <p
            className="mt-4 text-sm sm:text-base"
            style={{ color: 'var(--elaz-text-muted)' }}
          >
            {t('cookies.updated')}
          </p>
        </div>
      </header>

      <div
        className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8"
        style={{ color: 'var(--elaz-text-secondary)' }}
      >
        <p className="text-sm leading-relaxed sm:text-base">
          {t('cookies.intro')}
        </p>

        <section className="mt-12" aria-labelledby="cookies-s1">
          <h2
            id="cookies-s1"
            className="font-display text-xl font-semibold tracking-tight sm:text-2xl"
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            {t('cookies.s1.title')}
          </h2>
          <p className="mt-4 text-sm leading-relaxed sm:text-base">
            {t('cookies.s1.p1')}
          </p>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">
            {t('cookies.s1.p2')}
          </p>
        </section>

        <section className="mt-12" aria-labelledby="cookies-s2">
          <h2
            id="cookies-s2"
            className="font-display text-xl font-semibold tracking-tight sm:text-2xl"
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            {t('cookies.s2.title')}
          </h2>
          <p className="mt-4 text-sm leading-relaxed sm:text-base">
            {t('cookies.s2.intro')}
          </p>
          <List items={[t('cookies.s2.li1'), t('cookies.s2.li2')]} />
          <p className="text-sm leading-relaxed sm:text-base">
            {t('cookies.s2.footer')}
          </p>
        </section>

        <section className="mt-12" aria-labelledby="cookies-s3">
          <h2
            id="cookies-s3"
            className="font-display text-xl font-semibold tracking-tight sm:text-2xl"
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            {t('cookies.s3.title')}
          </h2>
          <p className="mt-4 text-sm leading-relaxed sm:text-base">
            {t('cookies.s3.intro')}
          </p>
          <List
            items={[
              t('cookies.s3.li1'),
              t('cookies.s3.li2'),
              t('cookies.s3.li3'),
            ]}
          />
          <p className="text-sm leading-relaxed sm:text-base">
            {t('cookies.s3.footer')}
          </p>
        </section>

        <section className="mt-12" aria-labelledby="cookies-s4">
          <h2
            id="cookies-s4"
            className="font-display text-xl font-semibold tracking-tight sm:text-2xl"
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            {t('cookies.s4.title')}
          </h2>
          <p className="mt-4 text-sm leading-relaxed sm:text-base">
            {t('cookies.s4.p1')}
          </p>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">
            {t('cookies.s4.p2')}
          </p>
        </section>

        <section className="mt-12" aria-labelledby="cookies-s5">
          <h2
            id="cookies-s5"
            className="font-display text-xl font-semibold tracking-tight sm:text-2xl"
            style={{ color: 'var(--elaz-text-primary)' }}
          >
            {t('cookies.s5.title')}
          </h2>
          <p className="mt-4 text-sm leading-relaxed sm:text-base">
            {t('cookies.s5.p1')}
          </p>
          <p className="mt-3 text-sm leading-relaxed sm:text-base">
            <a
              href={`mailto:${t('cookies.s5.email')}`}
              className="underline decoration-1 underline-offset-2 transition-opacity hover:opacity-80"
              style={{ color: 'var(--elaz-accent)' }}
            >
              {t('cookies.s5.email')}
            </a>
          </p>
        </section>
      </div>
    </article>
  );
}
