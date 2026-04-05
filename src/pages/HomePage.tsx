import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../sections/Hero';
import WhoWeAre from '../sections/WhoWeAre';
import HowWeWork from '../sections/HowWeWork';
import Initiatives from '../sections/Initiatives';
import Contact from '../sections/Contact';

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <Hero />
      <WhoWeAre />
      <HowWeWork />
      <Initiatives />
      <Contact />
    </>
  );
}
