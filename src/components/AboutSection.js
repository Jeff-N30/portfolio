import React, { useEffect, useRef, useState } from 'react';

export const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    if (isFlipped || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section id="about" className="ab-section" ref={sectionRef}>
      <div className="ab-container">
        <div className={`ab-header ${isVisible ? 'ab-visible' : ''}`}>
          <span className="ab-label">( About )</span>
          <h2 className="ab-title">The Person</h2>
          <div className="ab-line" />
        </div>

        <div
          className={`ab-card-wrap ${isVisible ? 'ab-visible' : ''}`}
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => setIsFlipped(f => !f)}
        >
          <div
            className={`ab-card ${isFlipped ? 'ab-flipped' : ''}`}
            style={{
              transform: isFlipped
                ? 'rotateY(180deg)'
                : `perspective(1400px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`
            }}
          >
            {/* ─ Front: Developer ─ */}
            <div className="ab-face ab-front">
              <div className="ab-orb ab-orb-front" aria-hidden="true" />

              <div className="ab-face-top">
                <span className="ab-role-label">( Developer )</span>
              </div>

              <div className="ab-name-block">
                <h3 className="ab-name">Jeff<br />Nader</h3>
              </div>

              <div className="ab-text-lines">
                <p className="ab-line-text ab-t1">Computer Science Graduate</p>
                <p className="ab-line-text ab-t2">Full Stack Developer</p>
                <p className="ab-line-text ab-t3">Passion for Clean Code</p>
              </div>

              <div className="ab-quote">
                <em>"Building the future, one line at a time."</em>
              </div>

              <div className="ab-hint">tap to flip</div>
            </div>

            {/* ─ Back: Athlete ─ */}
            <div className="ab-face ab-back">
              <div className="ab-orb ab-orb-back" aria-hidden="true" />

              <div className="ab-face-top">
                <span className="ab-role-label">( Athlete )</span>
              </div>

              <div className="ab-name-block">
                <h3 className="ab-name ab-name-back">Beyond<br />the Code</h3>
              </div>

              <div className="ab-text-lines ab-athletic-lines">
                <p className="ab-line-text ab-a1">Basketball Player</p>
                <p className="ab-line-text ab-a2">Hiker &amp; Camper</p>
                <p className="ab-line-text ab-a3">Lifter</p>
                <p className="ab-line-text ab-a4">Wannabe Mountaineer</p>
              </div>

              <div className="ab-hint">tap to flip back</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ab-section {
          padding: 120px 24px;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border-top: 1px solid rgba(245, 230, 202, 0.06);
        }

        .ab-container {
          max-width: 700px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 56px;
        }

        /* ── Header ── */
        .ab-header {
          text-align: center;
          opacity: 0;
          transform: translateY(20px);
          transition:
            opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1),
            transform 0.7s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .ab-header.ab-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .ab-label {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 15px;
          font-weight: 400;
          color: rgba(245, 230, 202, 0.42);
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 10px;
        }

        .ab-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px;
          font-weight: 700;
          color: #F5E6CA;
          letter-spacing: -1.5px;
          margin: 0 0 14px;
          line-height: 1;
        }

        .ab-line {
          width: 40px;
          height: 1px;
          background: rgba(245, 230, 202, 0.2);
          border-radius: 1px;
          margin: 0 auto;
          transition: width 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.3s;
        }
        .ab-header.ab-visible .ab-line { width: 56px; }

        /* ── Card wrap ── */
        .ab-card-wrap {
          width: 100%;
          max-width: 520px;
          height: 480px;
          perspective: 1400px;
          cursor: pointer;
          border-radius: 28px;
          opacity: 0;
          transform: translateY(44px) scale(0.96);
          transition:
            opacity 0.85s cubic-bezier(0.23, 1, 0.32, 1) 0.16s,
            transform 0.85s cubic-bezier(0.23, 1, 0.32, 1) 0.16s;
        }
        .ab-card-wrap.ab-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* ── 3D card ── */
        .ab-card {
          width: 100%;
          height: 100%;
          -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
          transition: transform 0.65s cubic-bezier(0.23, 1, 0.32, 1);
          border-radius: 28px;
        }

        /* ── Both faces — flat glass, no metallic highlights ── */
        .ab-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 28px;
          border: 1px solid rgba(245, 230, 202, 0.14);
          background: rgba(255, 255, 255, 0.07);
          -webkit-backdrop-filter: blur(20px);
          backdrop-filter: blur(20px);
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.32);
          padding: 44px 48px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          will-change: transform;
          transition:
            border-color 0.25s ease-out,
            box-shadow 0.25s ease-out;
        }

        @media (hover: hover) and (pointer: fine) {
          .ab-card-wrap:hover .ab-face {
            border-color: rgba(245, 230, 202, 0.18);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.55);
          }
        }

        /* Safari: explicit transform on front for backface-visibility compositing */
        .ab-front { transform: rotateY(0deg); }
        .ab-back  { transform: rotateY(180deg); }

        /* ── Orb — static, no animation (page-level orbs handle ambient light) ── */
        .ab-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(55px);
        }
        .ab-orb-front {
          width: 240px;
          height: 240px;
          background: radial-gradient(circle, rgba(245, 230, 202, 0.06), transparent 70%);
          top: -40px;
          right: -60px;
        }
        .ab-orb-back {
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(245, 230, 202, 0.055), transparent 70%);
          bottom: -30px;
          left: -50px;
        }

        /* ── Face layout ── */
        .ab-face-top { margin-bottom: 18px; }

        .ab-role-label {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 14px;
          font-weight: 400;
          color: rgba(245, 230, 202, 0.38);
          letter-spacing: 0.1em;
        }

        .ab-name-block { margin-bottom: 32px; }

        .ab-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(52px, 8vw, 72px);
          font-weight: 700;
          color: #F5E6CA;
          letter-spacing: -2px;
          line-height: 0.9;
        }

        .ab-name-back {
          font-size: clamp(38px, 6vw, 54px);
          letter-spacing: -1.5px;
        }

        /* ── Text lines ── */
        .ab-text-lines {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }

        .ab-line-text {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          line-height: 1.3;
          opacity: 0;
        }

        .ab-t1 { font-size: 22px; font-weight: 600; color: #F5E6CA; }
        .ab-t2 { font-size: 20px; font-weight: 400; color: rgba(245, 230, 202, 0.78); }
        .ab-t3 { font-size: 18px; font-weight: 300; color: rgba(245, 230, 202, 0.52); }

        .ab-card-wrap.ab-visible .ab-front .ab-t1 {
          animation: textCascade 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0.58s forwards;
        }
        .ab-card-wrap.ab-visible .ab-front .ab-t2 {
          animation: textCascade 0.65s cubic-bezier(0.23, 1, 0.32, 1) 0.74s forwards;
        }
        .ab-card-wrap.ab-visible .ab-front .ab-t3 {
          animation: textCascade 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.92s forwards;
        }

        .ab-athletic-lines { gap: 6px; }

        .ab-a1 { font-size: 26px; font-weight: 700; color: #F5E6CA; letter-spacing: -0.5px; }
        .ab-a2 { font-size: 23px; font-weight: 600; color: rgba(245, 230, 202, 0.80); letter-spacing: -0.3px; }
        .ab-a3 { font-size: 20px; font-weight: 400; color: rgba(245, 230, 202, 0.62); }
        .ab-a4 { font-size: 18px; font-weight: 300; color: rgba(245, 230, 202, 0.46); font-style: italic; }

        .ab-card.ab-flipped .ab-back .ab-a1 {
          animation: textCascade 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0.48s forwards;
        }
        .ab-card.ab-flipped .ab-back .ab-a2 {
          animation: textCascade 0.55s cubic-bezier(0.23, 1, 0.32, 1) 0.62s forwards;
        }
        .ab-card.ab-flipped .ab-back .ab-a3 {
          animation: textCascade 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0.78s forwards;
        }
        .ab-card.ab-flipped .ab-back .ab-a4 {
          animation: textCascade 0.65s cubic-bezier(0.23, 1, 0.32, 1) 0.96s forwards;
        }

        /* ── Quote ── */
        .ab-quote {
          margin-top: auto;
          padding-top: 20px;
        }
        .ab-quote em {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 14px;
          font-weight: 400;
          color: rgba(245, 230, 202, 0.28);
          letter-spacing: 0.02em;
          line-height: 1.6;
        }

        /* ── Hint ── */
        .ab-hint {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 500;
          color: rgba(245, 230, 202, 0.18);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: auto;
          padding-top: 8px;
          text-align: right;
          transition: color 0.2s ease-out;
        }

        @media (hover: hover) and (pointer: fine) {
          .ab-card-wrap:hover .ab-hint {
            color: rgba(245, 230, 202, 0.36);
          }
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .ab-face {
            -webkit-backdrop-filter: blur(12px);
            backdrop-filter: blur(12px);
          }
        }

        @media (max-width: 600px) {
          .ab-section { padding: 80px 20px; min-height: auto; }
          .ab-card-wrap { height: 420px; border-radius: 22px; }
          .ab-card { border-radius: 22px; }
          .ab-face { padding: 32px 28px; border-radius: 22px; }
          .ab-title { font-size: 34px; }
          .ab-t1 { font-size: 19px; }
          .ab-t2 { font-size: 17px; }
          .ab-t3 { font-size: 15px; }
          .ab-a1 { font-size: 22px; }
          .ab-a2 { font-size: 19px; }
          .ab-a3 { font-size: 17px; }
          .ab-a4 { font-size: 15px; }
        }
      `}</style>
    </section>
  );
};