import { useEffect, useState } from "react";

export const Loading = ({ onCom }) => {
  const [text, setText] = useState("");
  const [exiting, setExiting] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);
  const welcome = "<Jeff Nader/>";

  // Wait for web fonts before starting the typing animation
  // so the user never sees a flash from fallback → Cormorant Garamond.
  useEffect(() => {
    document.fonts.ready.then(() => setFontsReady(true));
  }, []);

  useEffect(() => {
    if (!fontsReady) return;
    let i = 0;
    const interval = setInterval(() => {
      setText(welcome.substring(0, i));
      i++;
      if (i > welcome.length) {
        clearInterval(interval);
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => onCom(), 650);
        }, 750);
      }
    }, 95);
    return () => clearInterval(interval);
  }, [fontsReady, onCom]);

  return (
    <div className={`ls ${exiting ? 'ls--exit' : ''}`}>
      <div className="ls-orb ls-orb-1" />
      <div className="ls-orb ls-orb-2" />

      <p className="ls-text">
        {text}<span className="ls-cursor" aria-hidden="true">|</span>
      </p>

      <div className="ls-bar-wrap" aria-hidden="true">
        <div className="ls-bar" />
      </div>

      <style jsx>{`
        .ls {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #000000;
          color: #F5E6CA;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          width: 100vw;
          height: 100vh;
          transition:
            opacity 0.55s cubic-bezier(0.23, 1, 0.32, 1),
            transform 0.55s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .ls--exit {
          opacity: 0;
          transform: scale(1.04);
        }

        /* Ambient orbs */
        .ls-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.12;
          pointer-events: none;
        }

        .ls-orb-1 {
          width: 280px;
          height: 280px;
          background: radial-gradient(circle, rgba(245, 230, 202, 0.28), transparent 70%);
          top: 30%;
          left: 35%;
          animation: orbFloat1 9s ease-in-out infinite;
        }

        .ls-orb-2 {
          width: 180px;
          height: 180px;
          background: radial-gradient(circle, rgba(245, 230, 202, 0.18), transparent 70%);
          bottom: 30%;
          right: 35%;
          animation: orbFloat2 11s ease-in-out infinite;
        }

        /* Typing text */
        .ls-text {
          margin-bottom: 1.5rem;
          font-size: 2.8rem;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 700;
          letter-spacing: -0.03em;
          position: relative;
          z-index: 2;
          color: #F5E6CA;
          min-height: 1.2em;
        }

        .ls-cursor {
          margin-left: 0.1rem;
          animation: lsBlink 0.9s step-end infinite;
          opacity: 1;
          font-weight: 300;
        }

        @keyframes lsBlink {
          0%, 49%  { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        /* Progress bar */
        .ls-bar-wrap {
          width: 180px;
          height: 1px;
          background: rgba(245, 230, 202, 0.06);
          border-radius: 1px;
          position: relative;
          overflow: hidden;
          z-index: 2;
        }

        .ls-bar {
          width: 40%;
          height: 100%;
          background: rgba(245, 230, 202, 0.55);
          animation: lsBar 1.8s ease-in-out infinite;
        }

        @keyframes lsBar {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }

        @media (max-width: 768px) {
          .ls-text { font-size: 1.9rem; }
        }
      `}</style>
    </div>
  );
};