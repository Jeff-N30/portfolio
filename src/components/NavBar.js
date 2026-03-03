import React from 'react';

export const NavBar = ({ activeSection, scrollToSection, isLoaded }) => (
  <nav className={`navbar ${isLoaded ? 'loaded' : ''}`}>
    <div className="nav-inner">
      <button className="logo" onClick={() => scrollToSection('home')}>
        JN
      </button>
      <div className="nav-links">
        <div className="nav-pill" style={{
          transform: `translateX(${
            activeSection === 'home'     ? 0   :
            activeSection === 'about'   ? 100 :
            activeSection === 'projects'? 200 :
            activeSection === 'skills'  ? 300 :
            400
          }%)`,
        }}></div>
        {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
          <button
            key={item}
            onClick={() => scrollToSection(item.toLowerCase())}
            className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
          >
            <span className="nav-paren nav-paren-l">(</span>
            <span className="nav-text">{item}</span>
            <span className="nav-paren nav-paren-r">)</span>
          </button>
        ))}
      </div>
    </div>

    <style jsx>{`
      .navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        background: rgba(0, 0, 0, 0.72);
        -webkit-backdrop-filter: saturate(180%) blur(24px);
        backdrop-filter: saturate(180%) blur(24px);
        border-bottom: 1px solid rgba(245, 230, 202, 0.06);
        opacity: 0;
        transform: translateY(-20px);
        transition:
          opacity 0.7s cubic-bezier(0.28, 0.11, 0.32, 1),
          transform 0.7s cubic-bezier(0.28, 0.11, 0.32, 1);
      }

      .navbar.loaded {
        opacity: 1;
        transform: translateY(0);
      }

      .nav-inner {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 24px;
        height: 58px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      /* ── Logo ── */
      .logo {
        font-family: 'Cormorant Garamond', serif;
        font-size: 26px;
        font-weight: 700;
        color: #F5E6CA;
        letter-spacing: -1px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px 2px;
        transition:
          transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
          text-shadow 0.3s ease;
      }
      .logo:hover {
        transform: scale(1.18) rotate(-4deg);
        text-shadow: 0 0 30px rgba(245, 230, 202, 0.45);
      }
      .logo:active {
        transform: scale(0.94);
      }

      /* ── Pill container ── */
      .nav-links {
        display: flex;
        gap: 0;
        position: relative;
        background: rgba(255, 255, 255, 0.04);
        -webkit-backdrop-filter: blur(16px);
        backdrop-filter: blur(16px);
        border-radius: 14px;
        padding: 4px;
        border: 1px solid rgba(245, 230, 202, 0.09);
        box-shadow:
          inset 0 1px 0 rgba(245, 230, 202, 0.05),
          0 4px 20px rgba(0, 0, 0, 0.4);
      }

      .nav-pill {
        position: absolute;
        top: 4px;
        left: 4px;
        width: calc(20% - 1.6px);
        height: calc(100% - 8px);
        background: rgba(245, 230, 202, 0.1);
        -webkit-backdrop-filter: blur(8px);
        backdrop-filter: blur(8px);
        border-radius: 11px;
        border: 1px solid rgba(245, 230, 202, 0.1);
        transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
        pointer-events: none;
        z-index: 0;
      }

      /* ── Nav items ── */
      .nav-link {
        background: transparent;
        border: none;
        color: rgba(245, 230, 202, 0.38);
        font-family: 'Inter', sans-serif;
        font-size: 12px;
        font-weight: 600;
        padding: 8px 14px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 3px;
        border-radius: 11px;
        position: relative;
        z-index: 1;
        transition:
          color 0.25s ease,
          transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        letter-spacing: 0.2px;
      }
      .nav-link:hover {
        color: rgba(245, 230, 202, 0.82);
        transform: scale(1.07);
      }
      .nav-link:active {
        transform: scale(0.96);
      }
      .nav-link.active {
        color: #F5E6CA;
        text-shadow: 0 0 14px rgba(245, 230, 202, 0.22);
      }

      /* ── Parentheses decoration ── */
      .nav-paren {
        font-family: 'Cormorant Garamond', serif;
        font-style: italic;
        font-size: 14px;
        font-weight: 300;
        opacity: 0;
        transition: opacity 0.25s ease, transform 0.25s ease;
      }
      .nav-paren-l { transform: translateX(4px); }
      .nav-paren-r { transform: translateX(-4px); }

      .nav-link:hover .nav-paren,
      .nav-link.active .nav-paren {
        opacity: 0.5;
      }
      .nav-link.active .nav-paren {
        opacity: 0.7;
      }
      .nav-link:hover .nav-paren-l,
      .nav-link.active .nav-paren-l { transform: translateX(0); }
      .nav-link:hover .nav-paren-r,
      .nav-link.active .nav-paren-r { transform: translateX(0); }

      /* ── Mobile ── */
      @media (max-width: 600px) {
        .nav-inner {
          padding: 0 16px;
          height: 52px;
        }

        .logo {
          font-size: 22px;
        }

        .nav-links {
          padding: 3px;
          border-radius: 11px;
        }

        .nav-pill {
          top: 3px;
          left: 3px;
          width: calc(20% - 1.2px);
          height: calc(100% - 6px);
          border-radius: 9px;
        }

        .nav-link {
          font-size: 10px;
          padding: 7px 8px;
          gap: 2px;
        }

        .nav-paren {
          font-size: 12px;
        }
      }
    `}</style>
  </nav>
);
