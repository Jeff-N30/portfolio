import React, { useEffect, useRef, useState } from 'react';

export const SkillsSection = () => {
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

  const skills = {
    Frontend: ["React", "JavaScript", "TypeScript", "CSS", "Tailwind"],
    Backend:  ["Node.js", ".NET", "FastAPI", "GraphQL"],
    Database: ["MongoDB", "MySQL", "SQLite", "PostgreSQL"]
  };

  const delays    = [0.14, 0.28, 0.44];
  const durations = [0.7,  0.62, 0.76];

  return (
    <section id="skills" className="sk-section" ref={sectionRef}>
      <div className="sk-container">
        <div className={`sk-header ${isVisible ? 'sk-visible' : ''}`}>
          <span className="sk-label">( Skills )</span>
          <h2 className="sk-title">Expertise</h2>
          <div className="sk-line"></div>
        </div>
        <div className="sk-grid">
          {Object.entries(skills).map(([category, items], catIndex) => (
            <div
              key={category}
              className={`sk-group ${isVisible ? 'sk-visible' : ''}`}
              style={{
                transitionDelay: `${delays[catIndex]}s`,
                transitionDuration: `${durations[catIndex]}s`
              }}
            >
              <div className="sk-group-inner">
                <div className="sk-glass-shine"></div>
                <h3 className="sk-category">( {category} )</h3>
                <div className="sk-items">
                  {items.map((skill, i) => (
                    <span
                      key={i}
                      className="sk-pill"
                      style={{
                        animationDelay: `${i * 0.07}s`,
                        transitionDelay: `${i * 0.04}s`
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .sk-section {
          padding: 120px 24px;
          min-height: 100vh;
          display: flex;
          align-items: center;
          border-top: 1px solid rgba(245, 230, 202, 0.06);
          position: relative;
        }

        .sk-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
        }

        /* ── Header ── */
        .sk-header {
          margin-bottom: 60px;
          opacity: 0;
          transform: translateY(20px);
          transition:
            opacity 0.7s cubic-bezier(0.28, 0.11, 0.32, 1),
            transform 0.7s cubic-bezier(0.28, 0.11, 0.32, 1);
        }
        .sk-header.sk-visible { opacity: 1; transform: translateY(0); }

        .sk-label {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 14px;
          font-weight: 400;
          color: rgba(245, 230, 202, 0.4);
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 10px;
        }

        .sk-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px;
          font-weight: 700;
          color: #F5E6CA;
          margin: 0 0 14px;
          letter-spacing: -1.5px;
          line-height: 1;
        }

        .sk-line {
          width: 40px;
          height: 2px;
          background: rgba(245, 230, 202, 0.25);
          border-radius: 1px;
          transition: width 0.8s cubic-bezier(0.28, 0.11, 0.32, 1) 0.3s;
        }
        .sk-header.sk-visible .sk-line { width: 60px; }

        /* ── Grid ── */
        .sk-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .sk-group {
          position: relative;
          opacity: 0;
          transform: translateY(40px) scale(0.96);
          transition:
            opacity 0.7s cubic-bezier(0.28, 0.11, 0.32, 1),
            transform 0.7s cubic-bezier(0.28, 0.11, 0.32, 1);
        }
        .sk-group.sk-visible { opacity: 1; transform: translateY(0) scale(1); }

        /* ── Card ── */
        .sk-group-inner {
          padding: 30px;
          background: rgba(255, 255, 255, 0.05);
          -webkit-backdrop-filter: blur(32px);
          backdrop-filter: blur(32px);
          border: 1px solid rgba(245, 230, 202, 0.1);
          border-radius: 20px;
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(245, 230, 202, 0.08);
          height: 100%;
          position: relative;
          overflow: hidden;
          transition:
            border-color 0.35s ease,
            box-shadow 0.35s ease,
            transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .sk-group-inner:hover {
          border-color: rgba(245, 230, 202, 0.2);
          box-shadow:
            0 24px 60px rgba(0, 0, 0, 0.55),
            inset 0 1px 0 rgba(245, 230, 202, 0.14);
          transform: translateY(-8px);
        }

        /* Glass shine sweep */
        .sk-glass-shine {
          position: absolute;
          top: 0;
          left: -120%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(245,230,202,0.05), transparent);
          pointer-events: none;
          transition: left 0s;
        }
        .sk-group-inner:hover .sk-glass-shine {
          left: 140%;
          transition: left 0.7s ease;
        }

        /* ── Category label ── */
        .sk-category {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 13px;
          font-weight: 400;
          color: rgba(245, 230, 202, 0.38);
          letter-spacing: 0.1em;
          margin: 0 0 18px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(245, 230, 202, 0.07);
        }

        /* ── Pills ── */
        .sk-items {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .sk-pill {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: rgba(245, 230, 202, 0.75);
          background: rgba(245, 230, 202, 0.05);
          border: 1px solid rgba(245, 230, 202, 0.1);
          padding: 7px 14px;
          border-radius: 10px;
          transition:
            transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
            background 0.25s ease,
            border-color 0.25s ease,
            color 0.25s ease,
            box-shadow 0.25s ease;
          cursor: default;
        }
        .sk-pill:hover {
          transform: translateY(-4px) scale(1.08);
          background: rgba(245, 230, 202, 0.1);
          border-color: rgba(245, 230, 202, 0.22);
          color: #F5E6CA;
          box-shadow:
            0 8px 28px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(245, 230, 202, 0.05);
        }

        @media (max-width: 900px) {
          .sk-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 600px) {
          .sk-section { padding: 80px 20px; min-height: auto; }
          .sk-title { font-size: 34px; }
          .sk-header { margin-bottom: 40px; }
          .sk-grid { grid-template-columns: 1fr; gap: 16px; }
          .sk-group-inner { padding: 24px; border-radius: 16px; }
          .sk-pill { font-size: 12px; padding: 6px 12px; border-radius: 8px; }
        }
      `}</style>
    </section>
  );
};
