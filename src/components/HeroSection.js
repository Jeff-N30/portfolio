import React from 'react';
import { ArrowDown, Download } from 'lucide-react';

export const HeroSection = ({ handleResumeDownload, scrollToSection, isLoaded }) => (
  <section id="home" className="hero">
    <div className={`hero-content ${isLoaded ? 'visible' : ''}`}>
      <div className="hero-badge">Full Stack Developer</div>
      <h1 className="hero-name">Jeff Nader</h1>
      <p className="hero-desc">
        Building clean, efficient web applications with modern technologies.
      </p>
      <div className="hero-actions">
        <button className="btn-primary" onClick={() => scrollToSection('projects')}>
          View Work
          <ArrowDown size={16} />
        </button>
        <a
          href={`${process.env.PUBLIC_URL}/JeffNader-CV.pdf`}
          className="btn-secondary"
          onClick={handleResumeDownload}
        >
          <Download size={16} />
          Resume
        </a>
      </div>
    </div>

    <style jsx>{`
      .hero {
        min-height: calc(100vh - 56px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 56px 24px 40px;
      }

      .hero-content {
        text-align: center;
        max-width: 800px;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
      }

      .hero-content.visible {
        opacity: 1;
        transform: translateY(0);
      }

      .hero-badge {
        display: inline-block;
        padding: 6px 14px;
        background: #111;
        border: 1px solid #222;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 500;
        color: #888;
        margin-bottom: 20px;
        letter-spacing: 0.3px;
      }

      .hero-name {
        font-size: clamp(48px, 10vw, 80px);
        font-weight: 700;
        color: #fff;
        margin: 0 0 16px;
        letter-spacing: -2px;
        line-height: 1;
      }

      .hero-desc {
        font-size: 18px;
        color: #666;
        margin: 0 0 36px;
        line-height: 1.6;
      }

      .hero-actions {
        display: flex;
        gap: 12px;
        justify-content: center;
      }

      .btn-primary,
      .btn-secondary {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 24px;
        font-size: 14px;
        font-weight: 500;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.15s ease;
        text-decoration: none;
        border: none;
      }

      .btn-primary {
        background: #fff;
        color: #000;
      }

      .btn-primary:hover {
        background: #e5e5e5;
      }

      .btn-secondary {
        background: transparent;
        color: #fff;
        border: 1px solid #333;
      }

      .btn-secondary:hover {
        border-color: #555;
        background: rgba(255, 255, 255, 0.04);
      }

      @media (max-width: 600px) {
        .hero {
          padding: 100px 20px 60px;
        }

        .hero-badge {
          font-size: 12px;
          padding: 5px 12px;
        }

        .hero-name {
          font-size: 40px;
          letter-spacing: -1px;
        }

        .hero-desc {
          font-size: 15px;
          margin-bottom: 32px;
        }

        .hero-actions {
          flex-direction: column;
          gap: 10px;
        }

        .btn-primary,
        .btn-secondary {
          width: 100%;
          justify-content: center;
          padding: 14px 24px;
        }
      }
    `}</style>
  </section>
);
