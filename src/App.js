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
      // Prevent scrolling during loading
      document.body.style.overflow = 'hidden';
      return;
    }
    
    // Re-enable scrolling after loading
    document.body.style.overflow = 'auto';

    // Add scroll animation observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all sections with scroll-fade-in class
    const sections = document.querySelectorAll('.scroll-fade-in');
    sections.forEach(section => scrollObserver.observe(section));

    // Track active section based on scroll position
    const sectionObserverOptions = {
      threshold: 0.3,
      rootMargin: '-60px 0px -60% 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
        }
      });
    }, sectionObserverOptions);

    // Observe main sections
    const mainSections = document.querySelectorAll('section[id]');
    mainSections.forEach(section => sectionObserver.observe(section));

    return () => {
      scrollObserver.disconnect();
      sectionObserver.disconnect();
      document.body.style.overflow = 'auto';
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
      const offset = 60; // navbar height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (showLoading) {
    return <Loading onCom={handleLoadingComplete} />;
  }

  return (
    <div className="portfolio">
      <NavBar activeSection={activeSection} scrollToSection={scrollToSection} isLoaded={isLoaded} />
      
      <div className="main-content">
        <HeroSection handleResumeDownload={handleResumeDownload} isLoaded={isLoaded} />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </div>
      

      <style jsx>{`
        /* Base Styles - Dark Mode Aesthetic */
        .portfolio {
          min-height: 100vh;
          background: #000000;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif;
          overflow-x: hidden;
          position: relative;
        }

        /* Scroll Animation Styles */
        .scroll-fade-in {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), 
                      transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .scroll-fade-in.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* Main Content */
        .main-content {
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;