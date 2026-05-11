import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Download } from 'lucide-react';

export const HeroSection = ({ handleResumeDownload, scrollToSection, isLoaded }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePos({ x, y });
    };
    const el = heroRef.current;
    if (el) el.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => { if (el) el.removeEventListener('mousemove', handleMouseMove); };
  }, []);

  return (
    <section id="home" className="hero" ref={heroRef}>
      {/* Reduced to 3 orbs — lighter on GPU */}
      <div className="hero-orbs" aria-hidden="true">
        <div
          className="hero-orb orb-1"
          style={{ transform: `translate(${mousePos.x * -16}px, ${mousePos.y * -16}px)` }}
        />
        <div
          className="hero-orb orb-2"
          style={{ transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)` }}
        />
        <div
          className="hero-orb orb-3"
          style={{ transform: `translate(${mousePos.x * -7}px, ${mousePos.y * -7}px)` }}
        />
      </div>

      <div className={`hero-content ${isLoaded ? 'visible' : ''}`}>
        {/* Badge */}
        <div className="hero-badge-wrapper">
          <div className="hero-badge">
            <span className="badge-dot" aria-hidden="true" />
            <span className="badge-paren" aria-hidden="true">(</span>
            Full Stack Developer
            <span className="badge-paren" aria-hidden="true">)</span>
          </div>
        </div>

        {/* Name */}
        <h1 className="hero-name">
          <span className="name-line">Jeff</span>
          <span className="name-line name-line-2">Nader</span>
        </h1>

        <p className="hero-desc">
          Building clean, efficient web applications<br />with modern technologies.
        </p>

        {/* Buttons — flat, no shine sweep */}
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => scrollToSection('projects')}>
            View Work
            <ArrowDown size={15} aria-hidden="true" />
          </button>
          <a
            href={`${process.env.PUBLIC_URL}/JeffNader-CV.pdf`}
            className="btn-secondary"
            onClick={handleResumeDownload}
          >
            <Download size={15} aria-hidden="true" />
            Resume
          </a>
        </div>
      </div>

      <style jsx>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          /* Extra bottom padding keeps content above the bottom dock */
          padding: 80px 24px 100px;
          position: relative;
          overflow: hidden;
        }

        /* ── Orbs ── */
        .hero-orbs {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          /* Smooth mouse parallax, ease-out so cursor feels responsive */
          transition: transform 0.45s cubic-bezier(0.23, 1, 0.32, 1);
          will-change: transform;
        }

        .orb-1 {
          width: 520px;
          height: 520px;
          background: radial-gradient(circle, rgba(245, 230, 202, 0.045), transparent 70%);
          top: 5%;
          left: 15%;
          animation: orbFloat1 24s ease-in-out infinite;
        }
        .orb-2 {
          width: 380px;
          height: 380px;
          background: radial-gradient(circle, rgba(245, 230, 202, 0.03), transparent 70%);
          bottom: 10%;
          right: 12%;
          animation: orbFloat2 30s ease-in-out infinite;
        }
        .orb-3 {
          width: 280px;
          height: 280px;
          background: radial-gradient(circle, rgba(245, 230, 202, 0.022), transparent 70%);
          top: 50%;
          left: 50%;
          animation: orbFloat3 20s ease-in-out infinite;
        }

        /* ── Content ── */
        .hero-content {
          text-align: center;
          max-width: 900px;
          position: relative;
          z-index: 2;
          opacity: 0;
          transform: translateY(30px);
        }
        .hero-content.visible {
          animation: slideUpSpring 0.9s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }

        /* ── Badge ── */
        .hero-badge-wrapper {
          margin-bottom: 28px;
          opacity: 0;
        }
        .hero-content.visible .hero-badge-wrapper {
          animation: fadeInUp 0.55s cubic-bezier(0.23, 1, 0.32, 1) 0.2s forwards;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 18px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(245, 230, 202, 0.1);
          border-radius: 100px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: rgba(245, 230, 202, 0.58);
          letter-spacing: 0.3px;
          animation: floatSlow 5.5s ease-in-out infinite;
          -webkit-backdrop-filter: blur(16px);
          backdrop-filter: blur(16px);
          transition:
            border-color 0.25s ease-out,
            background 0.25s ease-out;
        }

        @media (hover: hover) and (pointer: fine) {
          .hero-badge:hover {
            border-color: rgba(245, 230, 202, 0.18);
            background: rgba(255, 255, 255, 0.07);
          }
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 8px rgba(74, 222, 128, 0.45);
          animation: gentlePulse 2.2s ease-in-out infinite;
          flex-shrink: 0;
        }

        .badge-paren {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 300;
          font-size: 17px;
          opacity: 0.5;
        }

        /* ── Name ── */
        .hero-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(80px, 14vw, 130px);
          font-weight: 700;
          color: #F5E6CA;
          margin: 0 0 24px;
          letter-spacing: -4px;
          line-height: 0.88;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .name-line {
          display: block;
          opacity: 0;
          transform: translateY(50px) skewY(4deg);
        }
        .hero-content.visible .name-line {
          animation: nameReveal 0.85s cubic-bezier(0.23, 1, 0.32, 1) 0.35s forwards;
        }
        .hero-content.visible .name-line-2 {
          animation-delay: 0.52s;
        }

        /* ── Description ── */
        .hero-desc {
          font-family: 'Inter', sans-serif;
          font-size: 17px;
          font-weight: 400;
          color: rgba(245, 230, 202, 0.52);
          margin: 0 auto 48px;
          line-height: 1.72;
          max-width: 460px;
          opacity: 0;
        }
        .hero-content.visible .hero-desc {
          animation: fadeInUp 0.65s cubic-bezier(0.23, 1, 0.32, 1) 0.68s forwards;
        }

        /* ── Buttons ── */
        .hero-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
          opacity: 0;
        }
        .hero-content.visible .hero-actions {
          animation: springIn 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.85s forwards;
        }

        /* Shared button base */
        .btn-primary,
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 14px 28px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          border-radius: 14px;
          cursor: pointer;
          text-decoration: none;
          border: none;
          letter-spacing: 0.2px;
          /* Emil: specify exact properties, ease-out, <300ms */
          transition:
            transform 180ms cubic-bezier(0.23, 1, 0.32, 1),
            box-shadow 180ms ease-out,
            background 180ms ease-out,
            border-color 180ms ease-out;
          -webkit-tap-highlight-color: transparent;
        }

        /* Primary — solid cream */
        .btn-primary {
          background: #F5E6CA;
          color: #0a0a0a;
        }

        @media (hover: hover) and (pointer: fine) {
          .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 32px rgba(245, 230, 202, 0.2);
          }
        }

        .btn-primary:active {
          transform: scale(0.97);
          transition: transform 100ms ease-out;
        }

        /* Secondary — ghost */
        .btn-secondary {
          background: rgba(255, 255, 255, 0.04);
          color: #F5E6CA;
          border: 1px solid rgba(245, 230, 202, 0.14);
          -webkit-backdrop-filter: blur(16px);
          backdrop-filter: blur(16px);
        }

        @media (hover: hover) and (pointer: fine) {
          .btn-secondary:hover {
            transform: translateY(-3px);
            border-color: rgba(245, 230, 202, 0.26);
            background: rgba(255, 255, 255, 0.08);
            box-shadow: 0 10px 32px rgba(0, 0, 0, 0.3);
          }
        }

        .btn-secondary:active {
          transform: scale(0.97);
          transition: transform 100ms ease-out;
        }

        /* ── Mobile ── */
        @media (max-width: 600px) {
          .hero {
            padding: 100px 20px 120px;
          }
          .hero-name {
            font-size: 72px;
            letter-spacing: -3px;
          }
          .hero-desc { font-size: 15px; }
          .hero-actions {
            flex-direction: column;
            gap: 10px;
          }
          .btn-primary,
          .btn-secondary {
            width: 100%;
            justify-content: center;
            padding: 16px 28px;
          }
          .orb-1 { width: 300px; height: 300px; }
          .orb-2 { width: 240px; height: 240px; }
          .orb-3 { display: none; }
        }
      `}</style>
    </section>
  );
};