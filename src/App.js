import React, { useState, useEffect } from 'react';
import { Loading } from './components/Loading';
import { NavBar } from './components/NavBar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { AthleteSide } from './components/AthleteSide';

/* ─────────────────────────────────────────────
   Flip overlay – the 3-D book-page turn effect
───────────────────────────────────────────── */
const FlipOverlay = ({ fromSide }) => {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    // Two rAF delay so the initial (un-rotated) state is painted first
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnimating(true))
    );
    return () => cancelAnimationFrame(id);
  }, []);

  const fromBg = '#000';
  const toBg   = fromSide === 'dev' ? '#060300' : '#000';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        perspective: '1600px',
        pointerEvents: 'none',
      }}
    >
      {/* Rotating card */}
      <div
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transformOrigin: 'left center',
          transform: animating ? 'rotateY(-180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.95s cubic-bezier(0.645, 0.045, 0.355, 1.000)',
        }}
      >
        {/* Front face – "leaving" side colour */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: fromBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: 64, fontWeight: 700, color: 'rgba(255,255,255,0.04)', userSelect: 'none', letterSpacing: -2 }}>
            {fromSide === 'dev' ? '</>' : '🏀'}
          </span>
        </div>

        {/* Back face – "arriving" side colour */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: toBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: 64, fontWeight: 700, color: 'rgba(255,255,255,0.04)', userSelect: 'none', letterSpacing: -2 }}>
            {fromSide === 'dev' ? '🏀' : '</>'}
          </span>
        </div>
      </div>

      {/* Subtle fold shadow along the left edge */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: 40,
          background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 100%)',
          pointerEvents: 'none',
          opacity: animating ? 0 : 1,
          transition: 'opacity 0.95s ease',
        }}
      />
    </div>
  );
};

/* ─────────────────────────────────────────────
   Floating side-toggle button
───────────────────────────────────────────── */
const FlipButton = ({ activeSide, onFlip, isFlipping }) => (
  <button
    className={`flip-btn ${activeSide}`}
    onClick={onFlip}
    disabled={isFlipping}
    title={activeSide === 'dev' ? 'Switch to Athlete Side' : 'Switch to Developer Side'}
    aria-label={activeSide === 'dev' ? 'Switch to Athlete Side' : 'Switch to Developer Side'}
  >
    <span className="flip-btn-icon">{activeSide === 'dev' ? '🏀' : '</>'}</span>
    <span className="flip-btn-label">{activeSide === 'dev' ? 'Athlete' : 'Developer'}</span>

    <style jsx>{`
      .flip-btn {
        position: fixed;
        bottom: 32px;
        right: 32px;
        z-index: 500;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 20px;
        border-radius: 100px;
        border: none;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0.2px;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
        transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
        animation: flip-btn-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
      }

      .flip-btn.dev {
        background: #f97316;
        color: #000;
      }

      .flip-btn.athlete {
        background: #fff;
        color: #000;
      }

      .flip-btn:hover:not(:disabled) {
        transform: translateY(-3px) scale(1.04);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
      }

      .flip-btn:active:not(:disabled) {
        transform: translateY(0) scale(0.97);
      }

      .flip-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .flip-btn-icon {
        font-size: 16px;
        line-height: 1;
      }

      @keyframes flip-btn-in {
        from { opacity: 0; transform: translateY(12px) scale(0.9); }
        to   { opacity: 1; transform: translateY(0)   scale(1);   }
      }

      @media (max-width: 600px) {
        .flip-btn {
          bottom: 20px;
          right: 20px;
          padding: 10px 16px;
          font-size: 13px;
        }
      }
    `}</style>
  </button>
);

/* ─────────────────────────────────────────────
   Main Portfolio component
───────────────────────────────────────────── */
const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  // Dual-side state
  const [activeSide, setActiveSide] = useState('dev'); // 'dev' | 'athlete'
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipFromSide, setFlipFromSide] = useState(null);

  useEffect(() => {
    if (showLoading) {
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = '';

    // Simple scroll spy - no blocking, just tracking
    const handleScroll = () => {
      if (activeSide !== 'dev') return;
      const sections = ['home', 'projects', 'skills', 'contact'];
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
  }, [showLoading, activeSide]);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setTimeout(() => setIsLoaded(true), 100);
  };

  const handleResumeDownload = async (event) => {
    if (event) event.preventDefault();

    const resumeUrl = `${process.env.PUBLIC_URL}/JeffNader-CV.pdf`;

    try {
      const response = await fetch(resumeUrl, { cache: 'no-cache' });
      if (!response.ok) throw new Error('Resume download failed');

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
      window.scrollTo({ top: element.offsetTop - offset, behavior: 'smooth' });
    }
  };

  /* ── Flip logic ── */
  const handleFlip = () => {
    if (isFlipping) return;

    const from = activeSide;
    const to   = activeSide === 'dev' ? 'athlete' : 'dev';

    setIsFlipping(true);
    setFlipFromSide(from);

    // At the visual midpoint (≈ 475 ms), swap the actual content
    setTimeout(() => {
      setActiveSide(to);
      window.scrollTo(0, 0);
    }, 475);

    // Remove the overlay after the full animation
    setTimeout(() => {
      setIsFlipping(false);
      setFlipFromSide(null);
    }, 1050);
  };

  if (showLoading) {
    return <Loading onCom={handleLoadingComplete} />;
  }

  return (
    <div className="portfolio-root">
      {/* ── Dev side ── */}
      {activeSide === 'dev' && (
        <div className="portfolio">
          <NavBar activeSection={activeSection} scrollToSection={scrollToSection} isLoaded={isLoaded} />
          <main>
            <HeroSection
              handleResumeDownload={handleResumeDownload}
              scrollToSection={scrollToSection}
              isLoaded={isLoaded}
            />
            <ProjectsSection />
            <SkillsSection />
            <ContactSection />
          </main>
        </div>
      )}

      {/* ── Athlete side ── */}
      {activeSide === 'athlete' && (
        <AthleteSide isLoaded={isLoaded} />
      )}

      {/* ── Always-visible flip button ── */}
      <FlipButton activeSide={activeSide} onFlip={handleFlip} isFlipping={isFlipping} />

      {/* ── 3-D page-flip overlay (rendered during animation only) ── */}
      {isFlipping && <FlipOverlay fromSide={flipFromSide} />}

      <style jsx>{`
        .portfolio-root {
          position: relative;
        }

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