import React, { useState, useEffect } from 'react';
import { Loading } from './components/Loading';
import { NavBar } from './components/NavBar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (showLoading) {
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = '';

    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      const scrollPos = window.scrollY + 150;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (window.scrollY + windowHeight >= documentHeight - 100) {
        setActiveSection('contact');
        return;
      }

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = '';
    };
  }, [showLoading]);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  };

  const handleResumeDownload = async (event) => {
    if (event) {
      event.preventDefault();
    }

    const resumeUrl = `${process.env.PUBLIC_URL}/JeffNader-CV.pdf`;

    try {
      const response = await fetch(resumeUrl, { cache: 'no-cache' });
      if (!response.ok) {
        throw new Error('Resume download failed');
      }

      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = 'JeffNader-CV.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(objectUrl);
    } catch (error) {
      window.open(resumeUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  if (showLoading) {
    return <Loading onCom={handleLoadingComplete} />;
  }

  return (
    <div className="portfolio">
      {/* Fixed background image — works on iOS Safari unlike background-attachment: fixed */}
      <div className="bg-fixed"></div>
      <div className="grain-overlay"></div>

      <NavBar activeSection={activeSection} scrollToSection={scrollToSection} isLoaded={isLoaded} />

      <main>
        <HeroSection handleResumeDownload={handleResumeDownload} scrollToSection={scrollToSection} isLoaded={isLoaded} />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>

      <style jsx>{`
        .portfolio {
          min-height: 100vh;
          color: #F5E6CA;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          position: relative;
        }

        /* Separate fixed div for the background image.
           position: fixed on a div works correctly on ALL browsers (including iOS Safari),
           unlike background-attachment: fixed which iOS Safari ignores. */
        .bg-fixed {
          position: fixed;
          inset: 0;
          z-index: -1;
          background-image: url('/img/mountain.JPG');
          background-size: cover;
          background-position: center 30%;
          pointer-events: none;
        }

        .portfolio::before {
          content: '';
          position: fixed;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.76) 0%,
            rgba(0, 0, 0, 0.68) 40%,
            rgba(0, 0, 0, 0.73) 100%
          );
          z-index: 0;
          pointer-events: none;
        }

        main {
          position: relative;
          z-index: 1;
        }

        .grain-overlay {
          position: fixed;
          inset: -50%;
          width: 200%;
          height: 200%;
          pointer-events: none;
          z-index: 9998;
          opacity: 0.018;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          animation: grain 6s steps(8) infinite;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
