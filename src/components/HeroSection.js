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
      <div className="hero-orbs">
        <div className="hero-orb orb-1" style={{ transform: `translate(${mousePos.x * -18}px, ${mousePos.y * -18}px)` }}></div>
        <div className="hero-orb orb-2" style={{ transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)` }}></div>
        <div className="hero-orb orb-3" style={{ transform: `translate(${mousePos.x * -9}px, ${mousePos.y * -9}px)` }}></div>
        <div className="hero-orb orb-4" style={{ transform: `translate(${mousePos.x * 7}px, ${mousePos.y * 7}px)` }}></div>
      </div>

      <div className="hero-grain"></div>

      <div className={`hero-content ${isLoaded ? 'visible' : ''}`}>
        <div className="hero-badge-wrapper">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span className="badge-paren">(</span>
            Full Stack Developer
            <span className="badge-paren">)</span>
          </div>
        </div>

        <h1 className="hero-name">
          <span className="name-line">Jeff</span>
          <span className="name-line name-line-2">Nader</span>
        </h1>

        <p className="hero-desc">
          Building clean, efficient web applications<br />with modern technologies.
        </p>

        <div className="hero-actions">
          <button className="btn-primary" onClick={() => scrollToSection('projects')}>
            <span className="btn-text">View Work</span>
            <ArrowDown size={16} />
            <span className="btn-shine"></span>
          </button>
          <a
            href={`${process.env.PUBLIC_URL}/JeffNader-CV.pdf`}
            className="btn-secondary"
            onClick={handleResumeDownload}
          >
            <Download size={16} />
            <span className="btn-text">Resume</span>
          </a>
        </div>
      </div>

      <style jsx>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 24px 60px;
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
          filter: blur(100px);
          transition: transform 0.4s ease-out;
          will-change: transform;
        }

        .orb-1 {
          width: 560px;
          height: 560px;
          background: radial-gradient(circle, rgba(245, 230, 202, 0.05), transparent 70%);
          top: 5%;
          left: 15%;
          animation: orbFloat1 22s ease-in-out infinite;
        }
        .orb-2 {
          width: 420px;
          height: 420px;
          background: radial-gradient(circle, rgba(245, 230, 202, 0.035), transparent 70%);
          bottom: 8%;
          right: 12%;
          animation: orbFloat2 28s ease-in-out infinite;
        }
        .orb-3 {
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(245, 230, 202, 0.028), transparent 70%);
          top: 48%;
          left: 48%;
          animation: orbFloat3 19s ease-in-out infinite;
        }
        .orb-4 {
          width: 240px;
          height: 240px;
          background: radial-gradient(circle, rgba(245, 230, 202, 0.022), transparent 70%);
          top: 20%;
          right: 25%;
          animation: orbFloat4 31s ease-in-out infinite;
        }

        /* ── Grain ── */
        .hero-grain {
          position: absolute;
          inset: -50%;
          width: 200%;
          height: 200%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity: 0.025;
          pointer-events: none;
          animation: grain 9s steps(10) infinite;
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
          animation: slideUpSpring 0.95s cubic-bezier(0.28, 0.11, 0.32, 1) forwards;
        }

        /* ── Badge ── */
        .hero-badge-wrapper {
          margin-bottom: 28px;
          opacity: 0;
        }
        .hero-content.visible .hero-badge-wrapper {
          animation: fadeInUp 0.6s cubic-bezier(0.28, 0.11, 0.32, 1) 0.2s forwards;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 18px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(245, 230, 202, 0.1);
          border-radius: 100px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: rgba(245, 230, 202, 0.62);
          letter-spacing: 0.3px;
          animation: floatSlow 5s ease-in-out infinite;
          -webkit-backdrop-filter: blur(16px);
          backdrop-filter: blur(16px);
          transition:
            border-color 0.3s ease,
            background 0.3s ease,
            box-shadow 0.3s ease;
        }
        .hero-badge:hover {
          border-color: rgba(245, 230, 202, 0.18);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 10px rgba(74, 222, 128, 0.5);
          animation: gentlePulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }

        .badge-paren {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 300;
          font-size: 17px;
          opacity: 0.55;
        }

        /* ── Name — Cormorant Garamond ── */
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
          text-shadow: 0 0 80px rgba(245, 230, 202, 0.06);
        }
        .hero-content.visible .name-line {
          animation: nameReveal 0.9s cubic-bezier(0.28, 0.11, 0.32, 1) 0.35s forwards;
        }
        .hero-content.visible .name-line-2 {
          animation-delay: 0.52s;
        }

        /* ── Description — Inter ── */
        .hero-desc {
          font-family: 'Inter', sans-serif;
          font-size: 17px;
          font-weight: 400;
          color: rgba(245, 230, 202, 0.55);
          margin: 0 auto 48px;
          line-height: 1.72;
          max-width: 460px;
          opacity: 0;
        }
        .hero-content.visible .hero-desc {
          animation: fadeInUp 0.7s cubic-bezier(0.28, 0.11, 0.32, 1) 0.68s forwards;
        }

        /* ── Buttons ── */
        .hero-actions {
          display: flex;
          gap: 14px;
          justify-content: center;
          opacity: 0;
        }
        .hero-content.visible .hero-actions {
          animation: springIn 0.75s cubic-bezier(0.28, 0.11, 0.32, 1) 0.85s forwards;
        }

        .btn-primary,
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 15px 30px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          border-radius: 16px;
          cursor: pointer;
          text-decoration: none;
          border: none;
          position: relative;
          overflow: hidden;
          letter-spacing: 0.2px;
        }

        .btn-primary {
          background: #F5E6CA;
          color: #0a0a0a;
          transition:
            transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.3s ease;
        }
        .btn-primary:hover {
          transform: translateY(-4px) scale(1.04);
          box-shadow:
            0 12px 40px rgba(245, 230, 202, 0.25),
            0 0 0 1px rgba(245, 230, 202, 0.12);
        }
        .btn-primary:active {
          transform: translateY(0) scale(0.97);
        }

        .btn-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s ease;
          z-index: 0;
        }
        .btn-primary:hover .btn-shine { left: 100%; }

        .btn-text { position: relative; z-index: 1; }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          color: #F5E6CA;
          border: 1px solid rgba(245, 230, 202, 0.14);
          -webkit-backdrop-filter: blur(20px);
          backdrop-filter: blur(20px);
          box-shadow: inset 0 1px 0 rgba(245, 230, 202, 0.08);
          transition:
            transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
            background 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease;
        }
        .btn-secondary:hover {
          transform: translateY(-4px) scale(1.04);
          border-color: rgba(245, 230, 202, 0.28);
          background: rgba(255, 255, 255, 0.09);
          box-shadow:
            inset 0 1px 0 rgba(245, 230, 202, 0.14),
            0 12px 40px rgba(0, 0, 0, 0.35);
        }
        .btn-secondary:active {
          transform: translateY(0) scale(0.97);
        }

        /* ── Mobile ── */
        @media (max-width: 600px) {
          .hero {
            padding: 100px 20px 60px;
          }
          .hero-name {
            font-size: 72px;
            letter-spacing: -3px;
          }
          .hero-desc {
            font-size: 15px;
          }
          .hero-actions {
            flex-direction: column;
            gap: 10px;
          }
          .btn-primary,
          .btn-secondary {
            width: 100%;
            justify-content: center;
            padding: 17px 28px;
          }
          .orb-1 { width: 320px; height: 320px; }
          .orb-2 { width: 260px; height: 260px; }
          .orb-3 { width: 200px; height: 200px; }
          .orb-4 { display: none; }
        }
      `}</style>
    </section>
  );
};
