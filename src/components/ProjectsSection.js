import React, { useState, useEffect, useRef } from 'react';
import { Wine, FlaskConical, Circle } from 'lucide-react';

export const ProjectsSection = () => {
  const [flippedCards, setFlippedCards] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleCard = (index) => {
    setFlippedCards(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const projects = [
    {
      title: "The Wine Room",
      subtitle: "E-Commerce Platform",
      description: "Full-featured e-commerce platform with product catalog, cart system, and secure checkout.",
      features: ["Product Catalog", "Cart System", "Secure Checkout"],
      tech: ["FastAPI", "React", "Vite", "Node.js"],
      icon: "wine"
    },
    {
      title: "Metis",
      subtitle: "Database System",
      description: "Secure chemical formulation database with triple-layer encryption and cross-platform support.",
      features: ["Encrypted Storage", "Cross-Platform", "Workflow Management"],
      tech: ["Tauri", "React", "Rust", "SQLCipher"],
      icon: "flask"
    },
    {
      title: "CourtVision",
      subtitle: "AI Analytics",
      description: "AI-powered basketball analytics platform with real-time insights and visual heatmaps.",
      features: ["Live Tracking", "Shot Analysis", "Heatmap Generation"],
      tech: ["YOLOv8", "Streamlit", "OpenCV", "PyTorch"],
      icon: "circle"
    }
  ];

  const delays = [0.12, 0.26, 0.42];
  const durations = [0.65, 0.72, 0.60];

  return (
    <section id="projects" className="proj-section" ref={sectionRef}>
      <div className="proj-container">
        <div className={`proj-header ${isVisible ? 'proj-visible' : ''}`}>
          <span className="proj-label">( Projects )</span>
          <h2 className="proj-title">Selected Work</h2>
          <div className="proj-line"></div>
        </div>
        <div className="proj-grid">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`proj-card-wrap ${isVisible ? 'proj-visible' : ''}`}
              style={{
                transitionDelay: `${delays[index]}s`,
                transitionDuration: `${durations[index]}s`
              }}
              onClick={() => toggleCard(index)}
            >
              <div className="proj-card-glow"></div>
              <div className={`proj-card ${flippedCards[index] ? 'proj-flipped' : ''}`}>

                {/* Front */}
                <div className="proj-face proj-front">
                  <div className="proj-glass-shine"></div>
                  <div className="proj-icon">
                    {project.icon === 'wine' ? <Wine size={22} /> :
                     project.icon === 'flask' ? <FlaskConical size={22} /> :
                     <Circle size={22} />}
                  </div>
                  <h3 className="proj-name">{project.title}</h3>
                  <p className="proj-subtitle">( {project.subtitle} )</p>
                  <div className="proj-hint">tap to explore</div>
                </div>

                {/* Back */}
                <div className="proj-face proj-back">
                  <div className="proj-glass-shine"></div>
                  <h3 className="proj-back-name">{project.title}</h3>
                  <p className="proj-desc">{project.description}</p>
                  <div className="proj-features">
                    {project.features.map((feature, fIndex) => (
                      <span key={fIndex} className="proj-feature">{feature}</span>
                    ))}
                  </div>
                  <div className="proj-tech">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="proj-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="proj-hint-back">tap to close</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .proj-section {
          padding: 120px 24px;
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          border-top: 1px solid rgba(245, 230, 202, 0.06);
        }

        .proj-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
        }

        /* ── Header ── */
        .proj-header {
          margin-bottom: 60px;
          opacity: 0;
          transform: translateY(20px);
          transition:
            opacity 0.7s cubic-bezier(0.28, 0.11, 0.32, 1),
            transform 0.7s cubic-bezier(0.28, 0.11, 0.32, 1);
        }
        .proj-header.proj-visible { opacity: 1; transform: translateY(0); }

        .proj-label {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 14px;
          font-weight: 400;
          color: rgba(245, 230, 202, 0.4);
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 10px;
        }

        .proj-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px;
          font-weight: 700;
          color: #F5E6CA;
          margin: 0 0 14px;
          letter-spacing: -1.5px;
          line-height: 1;
        }

        .proj-line {
          width: 40px;
          height: 2px;
          background: rgba(245, 230, 202, 0.25);
          border-radius: 1px;
          transition: width 0.8s cubic-bezier(0.28, 0.11, 0.32, 1) 0.3s;
        }
        .proj-header.proj-visible .proj-line { width: 60px; }

        /* ── Grid ── */
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .proj-card-wrap {
          perspective: 1200px;
          cursor: pointer;
          height: 400px;
          position: relative;
          opacity: 0;
          transform: translateY(50px) scale(0.94);
          transition:
            opacity var(--dur, 0.65s) cubic-bezier(0.28, 0.11, 0.32, 1),
            transform var(--dur, 0.65s) cubic-bezier(0.28, 0.11, 0.32, 1);
        }
        .proj-card-wrap.proj-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* Outer glow */
        .proj-card-glow {
          position: absolute;
          inset: -2px;
          border-radius: 22px;
          background: linear-gradient(135deg,
            rgba(245, 230, 202, 0.08),
            transparent 45%,
            transparent 55%,
            rgba(245, 230, 202, 0.05));
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 0;
          pointer-events: none;
        }
        .proj-card-wrap:hover .proj-card-glow { opacity: 1; }

        /* ── 3D card ── */
        .proj-card {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.75s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 1;
        }
        .proj-card.proj-flipped { transform: rotateY(180deg); }
        .proj-card-wrap:hover .proj-card:not(.proj-flipped) {
          transform: perspective(1200px) rotateX(2deg) rotateY(-3deg) translateZ(10px);
        }

        /* ── Both faces ── */
        .proj-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          background: rgba(255, 255, 255, 0.05);
          -webkit-backdrop-filter: blur(32px);
          backdrop-filter: blur(32px);
          border: 1px solid rgba(245, 230, 202, 0.1);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(245, 230, 202, 0.08);
          transition:
            border-color 0.3s ease,
            box-shadow 0.3s ease;
        }
        .proj-card-wrap:hover .proj-face {
          border-color: rgba(245, 230, 202, 0.2);
          box-shadow:
            0 24px 60px rgba(0, 0, 0, 0.55),
            inset 0 1px 0 rgba(245, 230, 202, 0.14);
        }

        /* Glass shine sweep */
        .proj-glass-shine {
          position: absolute;
          top: 0;
          left: -120%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(245,230,202,0.05), transparent);
          pointer-events: none;
          transition: left 0s;
          z-index: 1;
        }
        .proj-card-wrap:hover .proj-face .proj-glass-shine {
          left: 140%;
          transition: left 0.7s ease;
        }

        /* ── Front ── */
        .proj-front {
          padding: 36px 28px;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .proj-icon {
          width: 58px;
          height: 58px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(245, 230, 202, 0.05);
          border: 1px solid rgba(245, 230, 202, 0.1);
          color: rgba(245, 230, 202, 0.55);
          margin-bottom: 22px;
          animation: subtleFloat 6s ease-in-out infinite;
          transition:
            transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
            background 0.3s ease,
            box-shadow 0.3s ease;
        }
        .proj-card-wrap:hover .proj-icon {
          transform: scale(1.12) rotate(-4deg);
          background: rgba(245, 230, 202, 0.09);
          box-shadow: 0 0 24px rgba(245, 230, 202, 0.1);
        }

        .proj-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px;
          font-weight: 700;
          color: #F5E6CA;
          letter-spacing: -0.8px;
          margin-bottom: 6px;
          line-height: 1.1;
        }

        .proj-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 14px;
          font-weight: 400;
          color: rgba(245, 230, 202, 0.4);
          letter-spacing: 0.05em;
        }

        .proj-hint {
          margin-top: 28px;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 500;
          color: rgba(245, 230, 202, 0.2);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: color 0.3s ease;
        }
        .proj-card-wrap:hover .proj-hint { color: rgba(245, 230, 202, 0.42); }

        /* ── Back ── */
        .proj-back {
          transform: rotateY(180deg);
          padding: 28px;
          overflow-y: auto;
        }

        .proj-back-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 700;
          color: #F5E6CA;
          letter-spacing: -0.5px;
          margin-bottom: 10px;
        }

        .proj-desc {
          font-family: 'Inter', sans-serif;
          color: rgba(245, 230, 202, 0.6);
          line-height: 1.65;
          font-size: 13px;
          font-weight: 400;
          margin-bottom: 18px;
        }

        .proj-features {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 18px;
        }

        .proj-feature {
          font-family: 'Inter', sans-serif;
          color: rgba(245, 230, 202, 0.5);
          font-size: 12px;
          font-weight: 500;
          padding: 3px 0 3px 12px;
          position: relative;
          transition: color 0.3s ease, transform 0.3s ease;
        }
        .proj-feature::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(245, 230, 202, 0.28);
          transform: translateY(-50%);
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }
        .proj-feature:hover { color: rgba(245, 230, 202, 0.78); transform: translateX(4px); }
        .proj-feature:hover::before {
          background: rgba(245, 230, 202, 0.6);
          box-shadow: 0 0 6px rgba(245, 230, 202, 0.2);
        }

        .proj-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .proj-tag {
          font-family: 'Inter', sans-serif;
          padding: 5px 12px;
          background: rgba(245, 230, 202, 0.05);
          border: 1px solid rgba(245, 230, 202, 0.1);
          border-radius: 8px;
          font-size: 11px;
          font-weight: 600;
          color: rgba(245, 230, 202, 0.7);
          transition:
            transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
            background 0.2s ease,
            border-color 0.2s ease;
        }
        .proj-tag:hover {
          transform: translateY(-3px) scale(1.06);
          background: rgba(245, 230, 202, 0.1);
          border-color: rgba(245, 230, 202, 0.2);
        }

        .proj-hint-back {
          margin-top: auto;
          padding-top: 14px;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 500;
          color: rgba(245, 230, 202, 0.2);
          text-align: center;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        @media (max-width: 900px) {
          .proj-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 600px) {
          .proj-section { padding: 80px 20px; min-height: auto; }
          .proj-title { font-size: 34px; }
          .proj-header { margin-bottom: 40px; }
          .proj-grid { grid-template-columns: 1fr; gap: 16px; }
          .proj-card-wrap { height: 360px; }
          .proj-face { border-radius: 16px; }
          .proj-card-glow { border-radius: 18px; }
        }
      `}</style>
    </section>
  );
};
