import React, { useEffect, useRef, useState } from 'react';

export const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    if (isFlipped || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section id="about" className="ab-section" ref={sectionRef}>
      <div className="ab-container">
        <div className={`ab-header ${isVisible ? 'ab-visible' : ''}`}>
          <span className="ab-label">( About )</span>
          <h2 className="ab-title">The Person</h2>
          <div className="ab-line"></div>
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
              <div className="ab-glass-shine"></div>
              <div className="ab-orb ab-orb-front"></div>

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
              <div className="ab-glass-shine"></div>
              <div className="ab-orb ab-orb-back"></div>

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
          transform: translateY(24px);
          transition:
            opacity 0.8s cubic-bezier(0.28, 0.11, 0.32, 1),
            transform 0.8s cubic-bezier(0.28, 0.11, 0.32, 1);
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
          color: rgba(245, 230, 202, 0.45);
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
          height: 2px;
          background: rgba(245, 230, 202, 0.25);
          border-radius: 1px;
          margin: 0 auto;
          transition: width 0.9s cubic-bezier(0.28, 0.11, 0.32, 1) 0.35s;
        }
        .ab-header.ab-visible .ab-line {
          width: 60px;
        }

        /* ── Card wrap ── */
        .ab-card-wrap {
          width: 100%;
          max-width: 520px;
          height: 480px;
          perspective: 1400px;
          cursor: pointer;
          border-radius: 28px;
          opacity: 0;
          transform: translateY(50px) scale(0.95);
          transition:
            opacity 0.9s cubic-bezier(0.28, 0.11, 0.32, 1) 0.18s,
            transform 0.9s cubic-bezier(0.28, 0.11, 0.32, 1) 0.18s;
          animation: glowPulse 6s ease-in-out infinite 1.2s;
        }
        .ab-card-wrap.ab-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* ── 3D card ── */
        .ab-card {
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.75s cubic-bezier(0.34, 1.56, 0.64, 1);
          border-radius: 28px;
        }

        .ab-card-wrap:hover .ab-card:not(.ab-flipped) {
          /* tilt handled inline, but keep transition smooth */
          transition: transform 0.15s ease-out;
        }

        /* ── Both faces ── */
        .ab-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 28px;
          border: 1px solid rgba(245, 230, 202, 0.12);
          background: rgba(255, 255, 255, 0.05);
          -webkit-backdrop-filter: blur(40px);
          backdrop-filter: blur(40px);
          box-shadow:
            0 8px 40px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(245, 230, 202, 0.1);
          padding: 44px 48px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          will-change: transform;
          transition:
            border-color 0.35s ease,
            box-shadow 0.35s ease;
        }

        .ab-card-wrap:hover .ab-face {
          border-color: rgba(245, 230, 202, 0.2);
          box-shadow:
            0 24px 70px rgba(0, 0, 0, 0.6),
            inset 0 1px 0 rgba(245, 230, 202, 0.16);
        }

        .ab-back {
          transform: rotateY(180deg);
        }

        /* ── Glass shine sweep ── */
        .ab-glass-shine {
          position: absolute;
          top: 0;
          left: -120%;
          width: 70%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(245, 230, 202, 0.05),
            transparent
          );
          pointer-events: none;
          transition: left 0s;
        }
        .ab-card-wrap:hover .ab-face .ab-glass-shine {
          left: 140%;
          transition: left 0.75s ease;
        }

        /* ── Orb ── */
        .ab-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(60px);
        }
        .ab-orb-front {
          width: 260px;
          height: 260px;
          background: radial-gradient(circle, rgba(245, 230, 202, 0.08), transparent 70%);
          top: -40px;
          right: -60px;
          animation: orbFloat1 19s ease-in-out infinite;
        }
        .ab-orb-back {
          width: 220px;
          height: 220px;
          background: radial-gradient(circle, rgba(245, 230, 202, 0.07), transparent 70%);
          bottom: -30px;
          left: -50px;
          animation: orbFloat2 23s ease-in-out infinite;
        }

        /* ── Face layout pieces ── */
        .ab-face-top {
          margin-bottom: 18px;
        }

        .ab-role-label {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 14px;
          font-weight: 400;
          color: rgba(245, 230, 202, 0.4);
          letter-spacing: 0.1em;
        }

        .ab-name-block {
          margin-bottom: 32px;
        }

        .ab-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(52px, 8vw, 72px);
          font-weight: 700;
          color: #F5E6CA;
          letter-spacing: -2px;
          line-height: 0.9;
          text-shadow: 0 0 80px rgba(245, 230, 202, 0.08);
        }

        .ab-name-back {
          font-size: clamp(38px, 6vw, 54px);
          letter-spacing: -1.5px;
        }

        /* ── Text lines — editorial, no bullets ── */
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

        /* Developer side — cascade opacity + size */
        .ab-t1 {
          font-size: 22px;
          font-weight: 600;
          color: #F5E6CA;
          opacity: 0;
        }
        .ab-t2 {
          font-size: 20px;
          font-weight: 400;
          color: rgba(245, 230, 202, 0.8);
          opacity: 0;
        }
        .ab-t3 {
          font-size: 18px;
          font-weight: 300;
          color: rgba(245, 230, 202, 0.55);
          opacity: 0;
        }

        /* Animate text lines when face becomes visible */
        .ab-card-wrap.ab-visible .ab-front .ab-t1 {
          animation: textCascade 0.65s cubic-bezier(0.28, 0.11, 0.32, 1) 0.6s forwards;
        }
        .ab-card-wrap.ab-visible .ab-front .ab-t2 {
          animation: textCascade 0.7s cubic-bezier(0.28, 0.11, 0.32, 1) 0.78s forwards;
        }
        .ab-card-wrap.ab-visible .ab-front .ab-t3 {
          animation: textCascade 0.75s cubic-bezier(0.28, 0.11, 0.32, 1) 0.98s forwards;
        }

        /* Athlete side */
        .ab-athletic-lines {
          gap: 6px;
        }

        .ab-a1 {
          font-size: 26px;
          font-weight: 700;
          color: #F5E6CA;
          letter-spacing: -0.5px;
        }
        .ab-a2 {
          font-size: 23px;
          font-weight: 600;
          color: rgba(245, 230, 202, 0.82);
          letter-spacing: -0.3px;
        }
        .ab-a3 {
          font-size: 20px;
          font-weight: 400;
          color: rgba(245, 230, 202, 0.65);
        }
        .ab-a4 {
          font-size: 18px;
          font-weight: 300;
          color: rgba(245, 230, 202, 0.48);
          font-style: italic;
        }

        /* Athlete lines appear immediately after flip */
        .ab-card.ab-flipped .ab-back .ab-a1 {
          animation: textCascade 0.55s cubic-bezier(0.28, 0.11, 0.32, 1) 0.5s forwards;
        }
        .ab-card.ab-flipped .ab-back .ab-a2 {
          animation: textCascade 0.6s cubic-bezier(0.28, 0.11, 0.32, 1) 0.65s forwards;
        }
        .ab-card.ab-flipped .ab-back .ab-a3 {
          animation: textCascade 0.65s cubic-bezier(0.28, 0.11, 0.32, 1) 0.82s forwards;
        }
        .ab-card.ab-flipped .ab-back .ab-a4 {
          animation: textCascade 0.7s cubic-bezier(0.28, 0.11, 0.32, 1) 1.0s forwards;
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
          color: rgba(245, 230, 202, 0.3);
          letter-spacing: 0.02em;
          line-height: 1.6;
        }

        /* ── Flip hint ── */
        .ab-hint {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 500;
          color: rgba(245, 230, 202, 0.2);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: auto;
          padding-top: 8px;
          text-align: right;
          transition: color 0.3s ease;
        }
        .ab-card-wrap:hover .ab-hint {
          color: rgba(245, 230, 202, 0.38);
        }

        /* ── Mobile ── */
        @media (max-width: 600px) {
          .ab-section {
            padding: 80px 20px;
            min-height: auto;
          }

          .ab-card-wrap {
            height: 420px;
            border-radius: 22px;
          }

          .ab-card {
            border-radius: 22px;
          }

          .ab-face {
            padding: 32px 28px;
            border-radius: 22px;
          }

          .ab-title {
            font-size: 34px;
          }

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
