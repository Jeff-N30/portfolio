import React, { useEffect, useRef, useState, useCallback } from 'react';

const SKILLS = {
  Frontend: {
    items: ['React', 'JavaScript', 'TypeScript', 'CSS', 'Tailwind'],
    detail: 'Modern interfaces built for performance and delight.'
  },
  Backend: {
    items: ['Node.js', '.NET', 'FastAPI', 'GraphQL'],
    detail: 'Scalable server-side systems and clean API architecture.'
  },
  Database: {
    items: ['MongoDB', 'MySQL', 'SQLite', 'PostgreSQL'],
    detail: 'Relational and document stores, schema craft and query optimization.'
  }
};

const CATEGORIES = Object.keys(SKILLS);

/* Detail card — uses rAF trick so entry is a CSS transition, not a keyframe.
   Emil: prefer transitions over keyframes for interruptible UI. */
const DetailCard = ({ category }) => {
  const [entered, setEntered] = useState(false);
  const data = SKILLS[category];

  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className={`sk-card ${entered ? 'sk-card--in' : ''}`}>
      <div className="sk-card-orb" aria-hidden="true" />
      <h3 className="sk-card-title">( {category} )</h3>
      <p className="sk-card-desc">{data.detail}</p>
      <div className="sk-pills">
        {data.items.map((skill, i) => (
          <span key={skill} className="sk-pill" style={{ '--i': i }}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState(null);
  const [displayed, setDisplayed] = useState(null);
  const sectionRef = useRef(null);
  const exitTimer = useRef(null);

  /* Outro: keep observer alive so isVisible toggles on scroll out */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* Keep card mounted during panel exit transition (320ms) */
  useEffect(() => {
    clearTimeout(exitTimer.current);
    if (active) {
      setDisplayed(active);
    } else {
      exitTimer.current = setTimeout(() => setDisplayed(null), 320);
    }
    return () => clearTimeout(exitTimer.current);
  }, [active]);

  const toggle = useCallback(
    (cat) => setActive(prev => (prev === cat ? null : cat)),
    []
  );

  return (
    <section id="skills" className="sk-section" ref={sectionRef}>
      <div className="sk-container">

        <div className={`sk-header ${isVisible ? 'sk-vis' : ''}`}>
          <span className="sk-label">( Skills )</span>
          <h2 className="sk-title">Expertise</h2>
          <div className="sk-line" />
        </div>

        <div className="sk-body">
          {/* Left: compact vertical list */}
          <div className="sk-list">
            {CATEGORIES.map((cat, i) => (
              <div
                key={cat}
                className={`sk-row ${isVisible ? 'sk-vis' : ''}`}
                style={{ '--i': i }}
              >
                <button
                  className={`sk-btn ${active === cat ? 'sk-btn--active' : ''}`}
                  onClick={() => toggle(cat)}
                  aria-expanded={active === cat}
                >
                  <div className="sk-btn-text">
                    <span className="sk-btn-name">( {cat} )</span>
                    <span className="sk-btn-sub">{SKILLS[cat].items.length} skills</span>
                  </div>
                  <span className="sk-btn-arrow" aria-hidden="true">→</span>
                </button>
              </div>
            ))}
          </div>

          {/* Right: detail panel — slides in, content swaps on key change */}
          <div className={`sk-panel ${active ? 'sk-panel--open' : ''}`} aria-live="polite">
            {displayed && <DetailCard key={displayed} category={displayed} />}
          </div>
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
          max-width: 900px;
          width: 100%;
          margin: 0 auto;
        }

        /* ── Header (shared entry/outro via transition) ── */
        .sk-header {
          margin-bottom: 60px;
          opacity: 0;
          transform: translateY(18px);
          transition:
            opacity 0.65s cubic-bezier(0.23, 1, 0.32, 1),
            transform 0.65s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .sk-header.sk-vis { opacity: 1; transform: translateY(0); }

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
          height: 1px;
          background: rgba(245, 230, 202, 0.2);
          border-radius: 1px;
          transition: width 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.25s;
        }
        .sk-header.sk-vis .sk-line { width: 56px; }

        /* ── Layout ── */
        .sk-body {
          display: flex;
          gap: 28px;
          align-items: flex-start;
        }

        /* ── Left list ── */
        .sk-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex-shrink: 0;
          width: 210px;
        }

        /* Entry/outro wrapper — owns the scroll-triggered transform.
           Separated from sk-btn so the dock translateX doesn't fight it. */
        .sk-row {
          opacity: 0;
          transform: translateX(-14px);
          transition:
            opacity 0.48s ease-out calc(0.1s + var(--i, 0) * 0.07s),
            transform 0.48s cubic-bezier(0.23, 1, 0.32, 1) calc(0.1s + var(--i, 0) * 0.07s);
        }
        .sk-row.sk-vis {
          opacity: 1;
          transform: translateX(0);
        }

        /* Interactive button — owns its own transform (dock shift) */
        .sk-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 14px 16px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(245, 230, 202, 0.08);
          border-radius: 16px;
          cursor: pointer;
          text-align: left;
          transform: translateX(0);
          transition:
            transform 350ms cubic-bezier(0.23, 1, 0.32, 1),
            background 180ms ease-out,
            border-color 180ms ease-out,
            box-shadow 180ms ease-out;
          -webkit-tap-highlight-color: transparent;
        }

        /* Dock: active card shifts right, creating space feel */
        .sk-btn--active {
          transform: translateX(10px);
          background: rgba(245, 230, 202, 0.05);
          border-color: rgba(245, 230, 202, 0.18);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        /* Emil: scale(0.97) on :active — interface must feel responsive */
        .sk-btn:active {
          transform: scale(0.97);
          transition: transform 100ms ease-out;
        }
        .sk-btn--active:active {
          transform: translateX(10px) scale(0.97);
          transition: transform 100ms ease-out;
        }

        @media (hover: hover) and (pointer: fine) {
          .sk-btn:not(.sk-btn--active):hover {
            background: rgba(255, 255, 255, 0.05);
            border-color: rgba(245, 230, 202, 0.12);
            box-shadow: 0 3px 14px rgba(0, 0, 0, 0.22);
          }
        }

        .sk-btn-text {
          display: flex;
          flex-direction: column;
          gap: 3px;
          min-width: 0;
        }

        .sk-btn-name {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 14px;
          font-weight: 400;
          color: rgba(245, 230, 202, 0.45);
          letter-spacing: 0.06em;
          transition: color 180ms ease-out;
        }
        .sk-btn--active .sk-btn-name { color: #F5E6CA; }

        .sk-btn-sub {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 500;
          color: rgba(245, 230, 202, 0.2);
          letter-spacing: 0.04em;
          transition: color 180ms ease-out;
        }
        .sk-btn--active .sk-btn-sub { color: rgba(245, 230, 202, 0.45); }

        .sk-btn-arrow {
          font-size: 13px;
          color: rgba(245, 230, 202, 0.18);
          flex-shrink: 0;
          transition:
            color 180ms ease-out,
            transform 350ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .sk-btn--active .sk-btn-arrow {
          color: rgba(245, 230, 202, 0.55);
          transform: translateX(3px);
        }

        /* ── Detail panel (right) — slides in/out via transition ── */
        .sk-panel {
          flex: 1;
          min-height: 160px;
          opacity: 0;
          transform: translateX(16px);
          pointer-events: none;
          transition:
            opacity 280ms ease-out,
            transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .sk-panel--open {
          opacity: 1;
          transform: translateX(0);
          pointer-events: auto;
        }

        /* ── Card — starts from scale(0.98), never scale(0) ── */
        .sk-card {
          position: relative;
          padding: 30px 32px;
          background: rgba(255, 255, 255, 0.04);
          -webkit-backdrop-filter: blur(20px);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(245, 230, 202, 0.09);
          border-radius: 22px;
          box-shadow: 0 8px 36px rgba(0, 0, 0, 0.38);
          overflow: hidden;
          opacity: 0;
          transform: translateX(12px) scale(0.98);
          transition:
            opacity 260ms ease-out,
            transform 280ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .sk-card--in {
          opacity: 1;
          transform: translateX(0) scale(1);
        }

        .sk-card-orb {
          position: absolute;
          top: -50px;
          right: -50px;
          width: 180px;
          height: 180px;
          background: radial-gradient(circle, rgba(245, 230, 202, 0.055), transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          filter: blur(28px);
        }

        .sk-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 13px;
          font-weight: 400;
          color: rgba(245, 230, 202, 0.35);
          letter-spacing: 0.1em;
          margin: 0 0 7px;
          position: relative;
          z-index: 1;
        }

        .sk-card-desc {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: rgba(245, 230, 202, 0.42);
          line-height: 1.65;
          margin: 0 0 22px;
          max-width: 380px;
          position: relative;
          z-index: 1;
        }

        /* ── Pills — staggered entry via keyframe (one-shot, post-card-mount) ── */
        .sk-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          position: relative;
          z-index: 1;
        }

        .sk-pill {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: rgba(245, 230, 202, 0.72);
          background: rgba(245, 230, 202, 0.04);
          border: 1px solid rgba(245, 230, 202, 0.09);
          padding: 7px 15px;
          border-radius: 11px;
          cursor: default;
          opacity: 0;
          animation: pillIn 0.3s cubic-bezier(0.23, 1, 0.32, 1) calc(0.14s + var(--i, 0) * 0.05s) forwards;
          transition:
            transform 180ms cubic-bezier(0.23, 1, 0.32, 1),
            background 160ms ease-out,
            border-color 160ms ease-out,
            color 160ms ease-out;
        }

        @keyframes pillIn {
          from { opacity: 0; transform: translateY(8px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (hover: hover) and (pointer: fine) {
          .sk-pill:hover {
            transform: translateY(-2px);
            background: rgba(245, 230, 202, 0.09);
            border-color: rgba(245, 230, 202, 0.2);
            color: #F5E6CA;
          }
        }

        /* ── Mobile: stack vertically, no horizontal dock shift ── */
        @media (max-width: 680px) {
          .sk-body { flex-direction: column; gap: 16px; }
          .sk-list { width: 100%; }

          /* Override entry animation direction for stacked layout */
          .sk-row { transform: translateY(10px); }
          .sk-row.sk-vis { transform: translateX(0); }

          /* No sideways dock on mobile */
          .sk-btn--active {
            transform: translateX(0);
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.28);
          }
          .sk-btn--active:active { transform: scale(0.97); }

          /* Panel slides in from below on mobile */
          .sk-panel { transform: translateY(14px); }
          .sk-panel--open { transform: translateX(0); }
        }

        @media (max-width: 600px) {
          .sk-section { padding: 80px 20px; min-height: auto; }
          .sk-title { font-size: 34px; }
          .sk-header { margin-bottom: 40px; }
          .sk-card { padding: 22px 20px; border-radius: 18px; }
        }
      `}</style>
    </section>
  );
};
