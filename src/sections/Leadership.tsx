import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Leadership() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        nameRef.current,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        roleRef.current,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.14
      );

      scrollTl.fromTo(
        bioRef.current,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.18
      );

      scrollTl.fromTo(
        linkRef.current,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.22
      );

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [nameRef.current, roleRef.current, bioRef.current, linkRef.current],
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in', stagger: 0.02 },
        0.72
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-elaz-dark z-[60]"
    >
      {/* H2 */}
      <h2
        ref={headlineRef}
        className="absolute font-display font-semibold text-display-lg text-elaz-text"
        style={{
          left: '8vw',
          top: '18vh',
        }}
      >
        {t('leadership.title')}
      </h2>

      <h3
        ref={nameRef}
        className="absolute font-display font-semibold text-2xl md:text-3xl text-elaz-text"
        style={{
          left: '8vw',
          top: '34vh',
        }}
      >
        {t('leadership.name')}
      </h3>

      <p
        ref={roleRef}
        className="absolute text-mono-label text-elaz-gray"
        style={{
          left: '8vw',
          top: '40vh',
        }}
      >
        {t('leadership.role')}
      </p>

      <p
        ref={bioRef}
        className="absolute text-base leading-relaxed"
        style={{
          left: '8vw',
          top: '48vh',
          width: '50vw',
          maxWidth: '640px',
          color: 'rgba(246, 246, 246, 0.72)',
        }}
      >
        {t('leadership.bio')}
      </p>

      <a
        ref={linkRef}
        href="#contact"
        className="absolute link-arrow"
        style={{
          left: '8vw',
          top: '66vh',
        }}
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        {t('leadership.cta')}
        <ArrowRight className="w-4 h-4" />
      </a>
    </section>
  );
}