import React, { useEffect, useRef, useState } from 'react';
import { Mail, Github, Linkedin, MessageCircle } from 'lucide-react';

export const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const links = [
    { href: "mailto:jeffnader30@gmail.com",                          icon: Mail,          label: "Email Me",  primary: true  },
    { href: "https://wa.me/96176369668",                              icon: MessageCircle, label: "WhatsApp",  external: true },
    { href: "https://github.com/Jeff-N30",                            icon: Github,        label: "GitHub",    external: true },
    { href: "https://www.linkedin.com/in/jeff-nader-8431ab385",       icon: Linkedin,      label: "LinkedIn",  external: true },
  ];

  const delays = [0.10, 0.20, 0.32, 0.46];

  return (
    <section id="contact" className="ct-section" ref={sectionRef}>
      <div className={`ct-container ${isVisible ? 'ct-visible' : ''}`}>
        <div className="ct-glass">
          <div className="ct-glass-shine"></div>
          <div className="ct-orb"></div>

          <span className="ct-label">( Contact )</span>
          <h2 className="ct-title">Get in Touch</h2>
          <p className="ct-desc">
            Have a project in mind? Let's build something together.
          </p>
          <div className="ct-links">
            {links.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                className={`ct-link ${link.primary ? 'ct-primary' : ''}`}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                style={{
                  transitionDelay: `${delays[index]}s`,
                  animationDelay:  `${0.1 + index * 0.09}s`
                }}
              >
                <link.icon size={17} />
                <span>{link.label}</span>
                <span className="ct-shine"></span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <footer className={`ct-footer ${isVisible ? 'ct-visible' : ''}`}>
        <span>&copy; {new Date().getFullYear()} Jeff Nader</span>
      </footer>

      <style jsx>{`
        .ct-section {
          padding: 120px 24px 80px;
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-top: 1px solid rgba(245, 230, 202, 0.06);
          position: relative;
        }

        .ct-container {
          max-width: 560px;
          width: 100%;
          margin: 0 auto;
          opacity: 0;
          transform: translateY(36px);
          transition:
            opacity 0.85s cubic-bezier(0.28, 0.11, 0.32, 1),
            transform 0.85s cubic-bezier(0.28, 0.11, 0.32, 1);
        }
        .ct-container.ct-visible { opacity: 1; transform: translateY(0); }

        /* ── Glass card ── */
        .ct-glass {
          position: relative;
          text-align: center;
          padding: 52px 44px;
          background: rgba(255, 255, 255, 0.05);
          -webkit-backdrop-filter: blur(40px);
          backdrop-filter: blur(40px);
          border: 1px solid rgba(245, 230, 202, 0.1);
          border-radius: 28px;
          overflow: hidden;
          box-shadow:
            0 8px 40px rgba(0, 0, 0, 0.45),
            inset 0 1px 0 rgba(245, 230, 202, 0.09);
          transition: border-color 0.35s ease, box-shadow 0.35s ease;
        }
        .ct-glass:hover {
          border-color: rgba(245, 230, 202, 0.18);
          box-shadow:
            0 30px 80px rgba(0, 0, 0, 0.55),
            inset 0 1px 0 rgba(245, 230, 202, 0.15);
        }

        /* Glass shine sweep */
        .ct-glass-shine {
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
        .ct-glass:hover .ct-glass-shine {
          left: 140%;
          transition: left 0.8s ease;
        }

        /* Ambient orb */
        .ct-orb {
          position: absolute;
          top: -80px;
          left: 50%;
          transform: translateX(-50%);
          width: 280px;
          height: 280px;
          background: radial-gradient(circle, rgba(245, 230, 202, 0.05), transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          animation: gentlePulse 7s ease-in-out infinite;
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
          color: rgba(245, 230, 202, 0.5);
          margin: 0 0 36px;
          line-height: 1.7;
          position: relative;
          z-index: 2;
        }

        .ct-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
          position: relative;
          z-index: 2;
        }

        .ct-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 24px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: rgba(245, 230, 202, 0.75);
          text-decoration: none;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(245, 230, 202, 0.1);
          border-radius: 14px;
          position: relative;
          overflow: hidden;
          transition:
            transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
            background 0.3s ease,
            border-color 0.3s ease,
            color 0.3s ease,
            box-shadow 0.3s ease;
        }
        .ct-link:hover {
          transform: translateY(-4px) scale(1.025);
          border-color: rgba(245, 230, 202, 0.2);
          background: rgba(255, 255, 255, 0.08);
          color: #F5E6CA;
          box-shadow:
            0 10px 35px rgba(0, 0, 0, 0.35),
            0 0 0 1px rgba(245, 230, 202, 0.05);
        }
        .ct-link:active { transform: translateY(0) scale(0.97); }

        .ct-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(245, 230, 202, 0.06), transparent);
          transition: left 0.6s ease;
          pointer-events: none;
        }
        .ct-link:hover .ct-shine { left: 100%; }

        .ct-link.ct-primary {
          background: #F5E6CA;
          color: #0a0a0a;
          border-color: #F5E6CA;
          font-weight: 700;
        }
        .ct-link.ct-primary:hover {
          background: #e8dcc4;
          border-color: #e8dcc4;
          box-shadow: 0 10px 35px rgba(245, 230, 202, 0.22);
          color: #0a0a0a;
        }

        /* ── Footer ── */
        .ct-footer {
          margin-top: 64px;
          padding-top: 24px;
          border-top: 1px solid rgba(245, 230, 202, 0.06);
          text-align: center;
          width: 100%;
          max-width: 560px;
          opacity: 0;
          transition: opacity 0.8s ease 0.5s;
        }
        .ct-footer.ct-visible { opacity: 1; }
        .ct-footer span {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: rgba(245, 230, 202, 0.22);
          letter-spacing: 0.5px;
        }

        @media (max-width: 600px) {
          .ct-section { padding: 80px 20px 60px; min-height: auto; }
          .ct-glass { padding: 36px 24px; border-radius: 22px; }
          .ct-title { font-size: 32px; }
          .ct-desc { font-size: 14px; margin-bottom: 28px; }
          .ct-link { padding: 16px 24px; border-radius: 12px; }
          .ct-footer { margin-top: 48px; }
        }
      `}</style>
    </section>
  );
};
