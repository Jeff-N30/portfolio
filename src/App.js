import React, { useState, useEffect } from 'react';
import { Loading } from './components/Loading';
import { NavBar } from './components/NavBar';
import { HeroSection } from './components/HeroSection';
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

    // Simple scroll spy - no blocking, just tracking
    const handleScroll = () => {
      const sections = ['home', 'projects', 'skills', 'contact'];
      const scrollPos = window.scrollY + 150;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // If near bottom, activate contact
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
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 60;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  if (showLoading) {
    return <Loading onCom={handleLoadingComplete} />;
  }

  return (
    <div className="portfolio">
      <NavBar activeSection={activeSection} scrollToSection={scrollToSection} isLoaded={isLoaded} />
      
      <main>
        <HeroSection handleResumeDownload={handleResumeDownload} scrollToSection={scrollToSection} isLoaded={isLoaded} />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>

      <style jsx>{`
        .portfolio {
          min-height: 100vh;
          background: #000;
          color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif;
        }

        main {
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;