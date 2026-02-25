import React from 'react';
import { Rocket } from 'lucide-react';

export const HeroSection = ({ handleResumeDownload, isLoaded }) => (
  <section id="home" className="hero-section scroll-fade-in">
    <div className="hero-content">
      <div className={`hero-text ${isLoaded ? 'loaded' : ''}`}>
        <h1 className="hero-title">
          Jeff Nader
        </h1>
        <p className="hero-subtitle">
          Junior Full Stack Web Developer
        </p>
        <div className="hero-buttons">
          <button 
            className="btn-primary"
            onClick={() => {
              const projectsSection = document.getElementById('projects');
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          >
            <Rocket size={18} />
            View Projects
          </button>
          <a 
            href={`${process.env.PUBLIC_URL}/JeffNader-CV.pdf`}
            className="btn-secondary"
            style={{ textDecoration: 'none' }}
            onClick={handleResumeDownload}
          >
            Download Resume
          </a>
        </div>
      </div>
    </div>

    <style jsx>{`
      /* Hero Section - Apple Style */
      .hero-section {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        text-align: center;
        padding: 5rem 2rem 2rem;
      }

      .hero-content {
        max-width: 980px;
        margin: 0 auto;
      }

      .hero-text {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .hero-text.loaded {
        opacity: 1;
        transform: translateY(0);
      }

      .hero-title {
        font-size: clamp(3rem, 8vw, 5.5rem);
        font-weight: 700;
        line-height: 1.05;
        margin-bottom: 1.5rem;
        letter-spacing: -0.02em;
        color: #ffffff;
      }

      .hero-subtitle {
        font-size: 1.5rem;
        font-weight: 400;
        color: #a1a1a6;
        margin-bottom: 3rem;
        letter-spacing: -0.01em;
      }

      .hero-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
      }

      .btn-primary, .btn-secondary {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.875rem 1.75rem;
        border-radius: 980px;
        font-weight: 400;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        border: none;
        letter-spacing: -0.01em;
      }

      .btn-primary {
        background: #ffffff;
        color: #000000;
      }

      .btn-primary:hover {
        background: #e5e5e7;
        transform: scale(1.02);
      }

      .btn-secondary {
        background: transparent;
        color: #ffffff;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.4);
      }

      @media (max-width: 768px) {
        .hero-section {
          padding: 4rem 1.5rem 2rem;
        }

        .hero-title {
          font-size: 2.5rem;
        }

        .hero-subtitle {
          font-size: 1.125rem;
        }

        .hero-buttons {
          flex-direction: column;
          align-items: stretch;
          max-width: 300px;
          margin: 0 auto;
        }
      }
    `}</style>
  </section>
);
