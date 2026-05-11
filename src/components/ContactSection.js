import React, { useEffect, useRef, useState } from 'react';
import { Mail, Github, Linkedin, MessageCircle } from 'lucide-react';

const LINKS = [
  { href: "mailto:jeffnader30@gmail.com",                     icon: Mail,          label: "Email Me",  primary: true  },
  { href: "https://wa.me/96176369668",                        icon: MessageCircle, label: "WhatsApp",  external: true },
  { href: "https://github.com/Jeff-N30",                      icon: Github,        label: "GitHub",    external: true },
  { href: "https://www.linkedin.com/in/jeff-nader-8431ab385", icon: Linkedin,      label: "LinkedIn",  external: true },
];

export const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  /* Outro: observer stays alive so isVisible toggles on scroll out */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="ct-section" ref={sectionRef}>
      <div className={`ct-container ${isVisible ? 'ct-vis' : ''}`}>
        <div className="ct-glass">
          <div className="ct-orb" aria-hidden="true" />

          <span className="ct-label">( Contact )</span>
          <h2 className="ct-title">Get in Touch</h2>
          <p className="ct-desc">
            Have a project in mind? Let's build something together.
          </p>

          <div className="ct-links">
            {LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`ct-btn ${link.primary ? 'ct-btn--primary' : ''}`}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  aria-label={link.label}
                >
                  <span className="ct-btn-icon">
                    <Icon size={17} aria-hidden="true" />
                  </span>
                  <span className="ct-btn-label">{link.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <footer className={`ct-footer ${isVisible ? 'ct-vis' : ''}`}>
        <span>© {new Date().getFullYear()} Jeff Nader</span>
      </footer>

      <style jsx>{`
        .ct-section {
          padding: 120px 24px 100px;
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-top: 1px solid rgba(245, 230, 202, 0.06);
          position: relative;
        }

        /* ── Card container — shared entry/outro via transition ── */
        .ct-container {
          max-width: 520px;
          width: 100%;
          margin: 0 auto;
          opacity: 0;
          transform: translateY(32px);
          transition:
            opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1),
            transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .ct-container.ct-vis { opacity: 1; transform: translateY(0); }

        /* ── Flat glass card ── */
        .ct-glass {
          position: relative;
          text-align: center;
          padding: 52px 44px;
          background: rgba(255, 255, 255, 0.04);
          -webkit-backdrop-filter: blur(20px);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(245, 230, 202, 0.09);
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 8px 36px rgba(0, 0, 0, 0.4);
          transition:
            border-color 0.22s ease-out,
            box-shadow 0.22s ease-out;
        }

        @media (hover: hover) and (pointer: fine) {
          .ct-glass:hover {
            border-color: rgba(245, 230, 202, 0.16);
            box-shadow: 0 24px 70px rgba(0, 0, 0, 0.52);
          }
        }

        .ct-orb {
          position: absolute;
          top: -80px;
          left: 50%;
          transform: translateX(-50%);
          width: 260px;
          height: 260px;
          background: radial-gradient(circle, rgba(245, 230, 202, 0.04), transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          filter: blur(20px);
        }

        .ct-label {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 14px;
          font-weight: 400;
          color: rgba(245, 230, 202, 0.4);
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 10px;
          position: relative;
          z-index: 2;
        }

        .ct-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 40px;
          font-weight: 700;
          color: #F5E6CA;
          margin: 0 0 12px;
          letter-spacing: -1.5px;
          line-height: 1;
          position: relative;
          z-index: 2;
        }

        .ct-desc {
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 400;
          color: rgba(245, 230, 202, 0.48);
          margin: 0 0 36px;
          line-height: 1.7;
          position: relative;
          z-index: 2;
        }

        /* ── Icon pill buttons ── */
        .ct-links {
          display: flex;
          flex-direction: row;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
          z-index: 2;
        }

        /* Base: circular icon-only pill.
           On hover: max-width expands to reveal label. Apple-style. */
        .ct-btn {
          display: inline-flex;
          align-items: center;
          height: 46px;
          padding: 0 13px;
          border-radius: 50px;
          overflow: hidden;
          white-space: nowrap;
          text-decoration: none;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(245, 230, 202, 0.09);
          color: rgba(245, 230, 202, 0.65);
          transition:
            background 200ms ease-out,
            border-color 200ms ease-out,
            box-shadow 200ms ease-out,
            color 200ms ease-out,
            transform 180ms cubic-bezier(0.23, 1, 0.32, 1);
          -webkit-tap-highlight-color: transparent;
        }

        /* Emil: scale(0.97) on :active */
        .ct-btn:active {
          transform: scale(0.97);
          transition: transform 100ms ease-out;
        }

        .ct-btn-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        /* Label hidden by default — expands smoothly on hover */
        .ct-btn-label {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          max-width: 0;
          opacity: 0;
          overflow: hidden;
          margin-left: 0;
          letter-spacing: 0.1px;
          transition:
            max-width 380ms cubic-bezier(0.23, 1, 0.32, 1),
            opacity 280ms ease-out 60ms,
            margin-left 380ms cubic-bezier(0.23, 1, 0.32, 1);
        }

        @media (hover: hover) and (pointer: fine) {
          .ct-btn:hover {
            background: rgba(255, 255, 255, 0.07);
            border-color: rgba(245, 230, 202, 0.18);
            box-shadow: 0 4px 18px rgba(0, 0, 0, 0.3);
            color: #F5E6CA;
          }
          .ct-btn:hover .ct-btn-label {
            max-width: 110px;
            opacity: 1;
            margin-left: 8px;
          }
        }

        /* Primary (Email) — always expanded, cream fill */
        .ct-btn--primary {
          background: #F5E6CA;
          color: #0a0a0a;
          border-color: transparent;
        }
        .ct-btn--primary .ct-btn-label {
          max-width: 110px;
          opacity: 1;
          margin-left: 8px;
          color: #0a0a0a;
          font-weight: 700;
        }

        @media (hover: hover) and (pointer: fine) {
          .ct-btn--primary:hover {
            background: #edddc0;
            box-shadow: 0 6px 22px rgba(245, 230, 202, 0.18);
            color: #0a0a0a;
          }
          .ct-btn--primary:hover .ct-btn-label {
            color: #0a0a0a;
          }
        }

        /* Touch: always show label (no hover available) */
        @media (hover: none), (pointer: coarse) {
          .ct-btn-label {
            max-width: 110px;
            opacity: 1;
            margin-left: 8px;
          }
        }

        /* ── Footer ── */
        .ct-footer {
          margin-top: 56px;
          padding-top: 24px;
          border-top: 1px solid rgba(245, 230, 202, 0.05);
          text-align: center;
          width: 100%;
          max-width: 520px;
          opacity: 0;
          transition: opacity 0.7s ease 0.45s;
        }
        .ct-footer.ct-vis { opacity: 1; }
        .ct-footer span {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: rgba(245, 230, 202, 0.2);
          letter-spacing: 0.5px;
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .ct-glass {
            -webkit-backdrop-filter: blur(12px);
            backdrop-filter: blur(12px);
          }
        }

        @media (max-width: 600px) {
          .ct-section { padding: 80px 20px 80px; min-height: auto; }
          .ct-glass { padding: 36px 24px; border-radius: 22px; }
          .ct-title { font-size: 32px; }
          .ct-desc { font-size: 14px; margin-bottom: 28px; }
          .ct-links { gap: 8px; }
          .ct-footer { margin-top: 44px; }
        }
      `}</style>
    </section>
  );
};
