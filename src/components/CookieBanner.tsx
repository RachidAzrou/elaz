import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const STORAGE_KEY = 'elaz-cookie-notice-dismissed';

export default function CookieBanner() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(localStorage.getItem(STORAGE_KEY) !== '1');
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[100]"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-live="polite"
    >
      {/* Gradient scrim: leest beter boven lange pagina's */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--elaz-bg-primary)] via-[var(--elaz-bg-primary)]/90 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-auto relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
        style={{
          paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom, 0px))',
          paddingTop: '0.75rem',
        }}
      >
        <div
          className="overflow-hidden rounded-xl border shadow-[0_8px_40px_-12px_rgba(28,25,23,0.15)] sm:rounded-2xl"
          style={{
            backgroundColor: 'var(--elaz-bg-secondary)',
            borderColor: 'var(--elaz-border)',
            borderLeftWidth: '3px',
            borderLeftColor: 'var(--elaz-accent)',
          }}
        >
          <div className="flex flex-col gap-5 p-5 sm:p-6 md:flex-row md:items-center md:justify-between md:gap-8 lg:p-7">
            <div className="min-w-0 flex-1">
              <p
                className="text-mono-label mb-2"
                style={{ color: 'var(--elaz-accent)' }}
              >
                {t('cookies.eyebrow')}
              </p>
              <h2
                id="cookie-banner-title"
                className="font-display text-lg font-semibold tracking-tight sm:text-xl"
                style={{ color: 'var(--elaz-text-primary)' }}
              >
                {t('cookies.title')}
              </h2>
              <div
                className="mt-3 max-w-2xl space-y-2 text-sm leading-relaxed sm:text-[0.9375rem] sm:leading-[1.55]"
                style={{ color: 'var(--elaz-text-secondary)' }}
              >
                <p>{t('cookies.banner.p1')}</p>
                <p>{t('cookies.banner.p2')}</p>
                <p className="mb-0">{t('cookies.banner.p3')}</p>
              </div>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-2.5 sm:w-auto sm:flex-row sm:justify-end sm:gap-3 md:flex-col md:items-stretch">
              <Link
                to="/cookies"
                className="btn-secondary w-full justify-center text-center sm:w-auto sm:min-w-[7.5rem]"
              >
                {t('cookies.banner.more')}
              </Link>
              <button
                type="button"
                onClick={dismiss}
                className="btn-primary w-full justify-center sm:w-auto sm:min-w-[7.5rem]"
              >
                {t('cookies.banner.ok')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
