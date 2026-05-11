import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Wine, FlaskConical, Circle, Building2, Plane } from 'lucide-react';

const PROJECTS = [
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
  },
  {
    title: "Machwerni",
    subtitle: "Venue & Booking Platform",
    description: "Multi-role platform for venue management, customer bookings, loyalty programs, and vendor management.",
    features: ["Multi-role Auth", "Real-time Bookings", "Loyalty Cards", "Admin Dashboard"],
    tech: ["FastAPI", "React 19", "PostgreSQL", "Docker", "Framer Motion"],
    icon: "building"
  },
  {
    title: "Beyroute",
    subtitle: "Luxury Concierge Platform",
    description: "Premium concierge platform for seamless booking, itinerary planning, and VIP client management.",
    features: ["VIP CRM", "Itinerary Builder", "Real-time Notifications", "Workflow Engine"],
    tech: ["FastAPI", "React 19", "PostgreSQL", "Redis", "WebSocket"],
    icon: "plane"
  }
];

const ICON_MAP = { wine: Wine, flask: FlaskConical, building: Building2, plane: Plane, circle: Circle };

/* Detail card — rAF trick for CSS-transition entry (interruptible).
   transform-origin: left center makes scale grow FROM the list toward the right.
   cubic-bezier(0.34, 1.56, 0.64, 1) overshoots briefly — that's the iOS spring rebound. */
const ProjectCard = ({ project }) => {
  const [entered, setEntered] = useState(false);
  const Icon = ICON_MAP[project.icon] || Circle;

  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className={`pj-card ${entered ? 'pj-card--in' : ''}`}>
      <div className="pj-card-orb" aria-hidden="true" />

      <div className="pj-card-head">
        <div className="pj-card-icon" aria-hidden="true">
          <Icon size={18} />
        </div>
        <div className="pj-card-meta">
          <h3 className="pj-card-title">{project.title}</h3>
          <span className="pj-card-subtitle">( {project.subtitle} )</span>
        </div>
      </div>

      <p className="pj-card-desc">{project.description}</p>

      <div className="pj-features">
        {project.features.map((f, i) => (
          <span key={f} className="pj-feature" style={{ '--i': i }}>
            {f}
          </span>
        ))}
      </div>

      <div className="pj-tags">
        {project.tech.map((t, i) => (
          <span key={t} className="pj-tag" style={{ '--i': i }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

export const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState(null);
  const [displayed, setDisplayed] = useState(null);
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const exitTimer = useRef(null);

  /* Outro: observer stays alive so isVisible toggles on scroll out */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.06, rootMargin: '0px 0px -30px 0px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* Keep card mounted during panel exit (280ms) */
  useEffect(() => {
    clearTimeout(exitTimer.current);
    if (active !== null) {
      setDisplayed(active);
    } else {
      exitTimer.current = setTimeout(() => setDisplayed(null), 280);
    }
    return () => clearTimeout(exitTimer.current);
  }, [active]);

  /* On mobile: scroll so panel bottom sits near the viewport bottom (never jumps to page top) */
  useEffect(() => {
    if (active !== null && panelRef.current && window.innerWidth <= 700) {
      const timer = setTimeout(() => {
        const rect = panelRef.current.getBoundingClientRect();
        const target = window.scrollY + rect.bottom - window.innerHeight + 70;
        window.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [active]);

  const toggle = useCallback(
    (idx) => setActive(prev => (prev === idx ? null : idx)),
    []
  );

  return (
    <section id="projects" className="pj-section" ref={sectionRef}>
      <div className="pj-container">

        <div className={`pj-header ${isVisible ? 'pj-vis' : ''}`}>
          <span className="pj-label">( Projects )</span>
          <h2 className="pj-title">Selected Work</h2>
          <div className="pj-line" />
        </div>

        <div className="pj-body">
          {/* Left: compact vertical project list */}
          <div className="pj-list">
            {PROJECTS.map((project, i) => {
              const Icon = ICON_MAP[project.icon] || Circle;
              return (
                <div
                  key={i}
                  className={`pj-row ${isVisible ? 'pj-vis' : ''}`}
                  style={{ '--i': i }}
                >
                  <button
                    className={`pj-btn ${active === i ? 'pj-btn--active' : ''}`}
                    onClick={() => toggle(i)}
                    aria-expanded={active === i}
                  >
                    <span className="pj-btn-icon" aria-hidden="true">
                      <Icon size={14} />
                    </span>
                    <div className="pj-btn-text">
                      <span className="pj-btn-name">{project.title}</span>
                      <span className="pj-btn-sub">( {project.subtitle} )</span>
                    </div>
                    <span className="pj-btn-arrow" aria-hidden="true">→</span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right: detail panel — pops from left via spring easing */}
          <div className={`pj-panel ${active !== null ? 'pj-panel--open' : ''}`} aria-live="polite" ref={panelRef}>
            {displayed !== null && (
              <ProjectCard key={displayed} project={PROJECTS[displayed]} />
            )}
          </div>
        </div>

      </div>

      <style jsx>{`
        .pj-section {
          padding: 120px 24px;
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          border-top: 1px solid rgba(245, 230, 202, 0.06);
        }

        .pj-container {
          max-width: 960px;
          width: 100%;
          margin: 0 auto;
        }

        /* ── Header ── */
        .pj-header {
          margin-bottom: 60px;
          opacity: 0;
          transform: translateY(18px);
          transition:
            opacity 0.65s cubic-bezier(0.23, 1, 0.32, 1),
            transform 0.65s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .pj-header.pj-vis { opacity: 1; transform: translateY(0); }

        .pj-label {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 14px;
          font-weight: 400;
          color: rgba(245, 230, 202, 0.4);
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 10px;
        }

        .pj-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px;
          font-weight: 700;
          color: #F5E6CA;
          margin: 0 0 14px;
          letter-spacing: -1.5px;
          line-height: 1;
        }

        .pj-line {
          width: 40px;
          height: 1px;
          background: rgba(245, 230, 202, 0.2);
          border-radius: 1px;
          transition: width 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.25s;
        }
        .pj-header.pj-vis .pj-line { width: 56px; }

        /* ── Layout ── */
        .pj-body {
          display: flex;
          gap: 28px;
          align-items: flex-start;
        }

        /* ── Left list ── */
        .pj-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex-shrink: 0;
          width: 224px;
        }

        /* Entry/outro wrapper — scroll-triggered only, never fights the dock transform */
        .pj-row {
          opacity: 0;
          transform: translateX(-14px);
          /* 40ms stagger — faster than skills (5 items) */
          transition:
            opacity 0.44s ease-out calc(0.08s + var(--i, 0) * 0.04s),
            transform 0.44s cubic-bezier(0.23, 1, 0.32, 1) calc(0.08s + var(--i, 0) * 0.04s);
        }
        .pj-row.pj-vis {
          opacity: 1;
          transform: translateX(0);
        }

        /* Interactive button */
        .pj-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(245, 230, 202, 0.11);
          border-radius: 14px;
          cursor: pointer;
          text-align: left;
          transform: translateX(0);
          transition:
            transform 320ms cubic-bezier(0.23, 1, 0.32, 1),
            background 160ms ease-out,
            border-color 160ms ease-out,
            box-shadow 160ms ease-out;
          -webkit-tap-highlight-color: transparent;
        }

        /* Dock: selected item shifts right — card pops from this position */
        .pj-btn--active {
          transform: translateX(8px);
          background: rgba(245, 230, 202, 0.05);
          border-color: rgba(245, 230, 202, 0.18);
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.28);
        }

        /* Emil: scale(0.97) on :active */
        .pj-btn:active {
          transform: scale(0.97);
          transition: transform 100ms ease-out;
        }
        .pj-btn--active:active {
          transform: translateX(8px) scale(0.97);
          transition: transform 100ms ease-out;
        }

        @media (hover: hover) and (pointer: fine) {
          .pj-btn:not(.pj-btn--active):hover {
            background: rgba(255, 255, 255, 0.05);
            border-color: rgba(245, 230, 202, 0.12);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          }
        }

        .pj-btn-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 8px;
          background: rgba(245, 230, 202, 0.04);
          border: 1px solid rgba(245, 230, 202, 0.08);
          color: rgba(245, 230, 202, 0.35);
          flex-shrink: 0;
          transition:
            color 160ms ease-out,
            background 160ms ease-out,
            border-color 160ms ease-out;
        }
        .pj-btn--active .pj-btn-icon {
          color: rgba(245, 230, 202, 0.7);
          background: rgba(245, 230, 202, 0.07);
          border-color: rgba(245, 230, 202, 0.15);
        }

        .pj-btn-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
          flex: 1;
        }

        .pj-btn-name {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: rgba(245, 230, 202, 0.5);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 160ms ease-out;
        }
        .pj-btn--active .pj-btn-name { color: #F5E6CA; }

        .pj-btn-sub {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 11px;
          font-weight: 400;
          color: rgba(245, 230, 202, 0.22);
          letter-spacing: 0.04em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 160ms ease-out;
        }
        .pj-btn--active .pj-btn-sub { color: rgba(245, 230, 202, 0.42); }

        .pj-btn-arrow {
          font-size: 12px;
          color: rgba(245, 230, 202, 0.15);
          flex-shrink: 0;
          transition:
            color 160ms ease-out,
            transform 320ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .pj-btn--active .pj-btn-arrow {
          color: rgba(245, 230, 202, 0.5);
          transform: translateX(3px);
        }

        /* ── Detail panel — slides from left side (same origin as list) ── */
        .pj-panel {
          flex: 1;
          min-height: 200px;
          opacity: 0;
          /* Starts from the left (where the list dock is) */
          transform: translateX(-18px) scale(0.97);
          transform-origin: left center;
          pointer-events: none;
          transition:
            opacity 240ms ease-out,
            transform 280ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .pj-panel--open {
          opacity: 1;
          transform: translateX(0) scale(1);
          pointer-events: auto;
        }

        /* ── Project card — iOS spring pop from left ──
           cubic-bezier(0.34, 1.56, 0.64, 1): y1=1.56 causes brief overshoot above 1.0
           giving the "rebound enlargement" the user asked for.
           transform-origin: left center — scale grows from the list edge, not from center. */
        .pj-card {
          position: relative;
          padding: 28px 30px;
          background: rgba(255, 255, 255, 0.06);
          -webkit-backdrop-filter: blur(20px);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(245, 230, 202, 0.13);
          border-radius: 22px;
          box-shadow: 0 8px 36px rgba(0, 0, 0, 0.28);
          overflow: hidden;
          /* Initial: tucked left, slightly small — never scale(0) */
          opacity: 0;
          transform: translateX(-14px) scale(0.9);
          transform-origin: left center;
          transition:
            opacity 200ms ease-out,
            transform 420ms cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .pj-card--in {
          opacity: 1;
          transform: translateX(0) scale(1);
        }

        .pj-card-orb {
          position: absolute;
          top: -60px;
          right: -60px;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(245, 230, 202, 0.05), transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          filter: blur(28px);
        }

        /* Card header: icon + title + subtitle */
        .pj-card-head {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 16px;
          position: relative;
          z-index: 1;
        }

        .pj-card-icon {
          width: 38px;
          height: 38px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(245, 230, 202, 0.05);
          border: 1px solid rgba(245, 230, 202, 0.1);
          color: rgba(245, 230, 202, 0.55);
          flex-shrink: 0;
        }

        .pj-card-meta {
          display: flex;
          flex-direction: column;
          gap: 3px;
          min-width: 0;
        }

        .pj-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 700;
          color: #F5E6CA;
          letter-spacing: -0.5px;
          margin: 0;
          line-height: 1.1;
        }

        .pj-card-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 12px;
          font-weight: 400;
          color: rgba(245, 230, 202, 0.35);
          letter-spacing: 0.06em;
        }

        .pj-card-desc {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: rgba(245, 230, 202, 0.5);
          line-height: 1.65;
          margin: 0 0 18px;
          position: relative;
          z-index: 1;
        }

        /* ── Features — staggered pill-in ── */
        .pj-features {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-bottom: 18px;
          position: relative;
          z-index: 1;
        }

        .pj-feature {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: rgba(245, 230, 202, 0.45);
          padding: 3px 0 3px 13px;
          position: relative;
          opacity: 0;
          animation: itemIn 0.28s ease-out calc(0.16s + var(--i, 0) * 0.04s) forwards;
          transition: color 160ms ease-out, transform 160ms ease-out;
        }
        .pj-feature::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(245, 230, 202, 0.22);
          transform: translateY(-50%);
        }

        @keyframes itemIn {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        @media (hover: hover) and (pointer: fine) {
          .pj-feature:hover {
            color: rgba(245, 230, 202, 0.72);
            transform: translateX(4px);
          }
        }

        /* ── Tech tags — staggered ── */
        .pj-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          position: relative;
          z-index: 1;
        }

        .pj-tag {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: rgba(245, 230, 202, 0.65);
          padding: 5px 11px;
          background: rgba(245, 230, 202, 0.04);
          border: 1px solid rgba(245, 230, 202, 0.09);
          border-radius: 8px;
          opacity: 0;
          animation: pillIn 0.26s cubic-bezier(0.23, 1, 0.32, 1) calc(0.22s + var(--i, 0) * 0.035s) forwards;
          transition:
            transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
            background 140ms ease-out,
            border-color 140ms ease-out;
        }

        @keyframes pillIn {
          from { opacity: 0; transform: translateY(6px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (hover: hover) and (pointer: fine) {
          .pj-tag:hover {
            transform: translateY(-2px);
            background: rgba(245, 230, 202, 0.09);
            border-color: rgba(245, 230, 202, 0.18);
          }
        }

        /* ── Mobile: stack vertically, spring pops from top ── */
        @media (max-width: 700px) {
          .pj-body { flex-direction: column; gap: 16px; }
          .pj-list { width: 100%; }

          /* Entry animation direction for stacked layout */
          .pj-row { transform: translateY(10px); }
          .pj-row.pj-vis { transform: translateX(0); }

          /* No horizontal dock on mobile */
          .pj-btn--active { transform: translateX(0); }
          .pj-btn--active:active { transform: scale(0.97); }

          /* Panel pops from top on mobile */
          .pj-panel {
            transform: translateY(-14px) scale(0.96);
            transform-origin: top center;
          }
          .pj-panel--open {
            transform: translateY(0) scale(1);
          }

          /* Card pops from top center on mobile */
          .pj-card {
            transform: translateY(-12px) scale(0.91);
            transform-origin: top center;
          }
          .pj-card--in {
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 600px) {
          .pj-section { padding: 80px 20px; min-height: auto; }
          .pj-title { font-size: 34px; }
          .pj-header { margin-bottom: 40px; }
          .pj-card { padding: 22px 20px; border-radius: 18px; }
        }
      `}</style>
    </section>
  );
};
