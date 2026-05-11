import React from 'react';

const NAV_ITEMS = ['Home', 'About', 'Projects', 'Skills', 'Contact'];
const SECTION_ORDER = ['home', 'about', 'projects', 'skills', 'contact'];

export const NavBar = ({ activeSection, scrollToSection, isLoaded }) => {
  const activeIndex = SECTION_ORDER.indexOf(activeSection);

  return (
    <>
      {/* JN monogram — top-left, fixed */}
      <button
        className={`jn-logo ${isLoaded ? 'jn-logo--visible' : ''}`}
        onClick={() => scrollToSection('home')}
        aria-label="Back to top"
      >
        JN
      </button>

      {/* Bottom dock */}
      <nav
        className={`dock ${isLoaded ? 'dock--visible' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="dock__inner">
          {/* Sliding active indicator */}
          <div
            className="dock__indicator"
            style={{ transform: `translateX(${activeIndex * 100}%)` }}
            aria-hidden="true"
          />

          {NAV_ITEMS.map((item) => {
            const id = item.toLowerCase();
            const isActive = activeSection === id;
            return (
              <button
                key={item}
                onClick={() => scrollToSection(id)}
                className={`dock__link ${isActive ? 'dock__link--active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item}
              </button>
            );
          })}
        </div>
      </nav>

      <style jsx>{`
        /* ── JN Logo ── */
        .jn-logo {
          position: fixed;
          top: 22px;
          left: 24px;
          z-index: 200;
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 700;
          color: #F5E6CA;
          letter-spacing: -0.5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px 4px;
          opacity: 0;
          transform: translateY(-8px);
          transition:
            opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0.15s,
            transform 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0.15s,
            color 0.2s ease;
          -webkit-tap-highlight-color: transparent;
        }

        .jn-logo--visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (hover: hover) and (pointer: fine) {
          .jn-logo:hover {
            color: rgba(245, 230, 202, 0.65);
          }
        }

        .jn-logo:active {
          transform: scale(0.93) translateY(0);
          transition: transform 120ms ease-out;
        }

        /* ── Bottom Dock ── */
        .dock {
          position: fixed;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%) translateY(20px);
          z-index: 200;
          opacity: 0;
          /* Animate in from below */
          transition:
            opacity 0.55s cubic-bezier(0.23, 1, 0.32, 1) 0.3s,
            transform 0.55s cubic-bezier(0.23, 1, 0.32, 1) 0.3s;
          /* Keep centered with translateX even when transform changes */
          will-change: transform, opacity;
        }

        .dock--visible {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        .dock__inner {
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(6, 6, 6, 0.88);
          -webkit-backdrop-filter: saturate(160%) blur(20px);
          backdrop-filter: saturate(160%) blur(20px);
          border: 1px solid rgba(245, 230, 202, 0.1);
          border-radius: 20px;
          padding: 5px;
          box-shadow:
            0 4px 24px rgba(0, 0, 0, 0.55),
            0 1px 4px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(245, 230, 202, 0.04) inset;
        }

        /* ── Sliding indicator ── */
        .dock__indicator {
          position: absolute;
          top: 5px;
          left: 5px;
          /* Width = 1/5 of the nav track */
          width: calc((100% - 10px) / 5);
          height: calc(100% - 10px);
          background: rgba(245, 230, 202, 0.1);
          border: 1px solid rgba(245, 230, 202, 0.12);
          border-radius: 15px;
          /* Emil: ease-out for entering, 220ms — feels instant but not abrupt */
          transition: transform 220ms cubic-bezier(0.23, 1, 0.32, 1);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Nav links ── */
        .dock__link {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          /* Equal width for each of 5 items so indicator math works */
          width: 80px;
          height: 36px;
          background: none;
          border: none;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.15px;
          color: rgba(245, 230, 202, 0.38);
          cursor: pointer;
          border-radius: 15px;
          -webkit-tap-highlight-color: transparent;
          /* Specify exact properties — no 'all' */
          transition:
            color 180ms ease-out,
            transform 120ms ease-out;
          user-select: none;
        }

        @media (hover: hover) and (pointer: fine) {
          .dock__link:hover {
            color: rgba(245, 230, 202, 0.72);
          }
        }

        .dock__link:active {
          transform: scale(0.96);
          transition: transform 100ms ease-out;
        }

        .dock__link--active {
          color: #F5E6CA;
        }

        /* ── Mobile adjustments ── */
        @media (max-width: 520px) {
          .dock {
            bottom: 20px;
            /* Let it stretch to fit on narrow screens */
            left: 16px;
            right: 16px;
            transform: translateY(20px);
          }

          .dock--visible {
            transform: translateY(0);
          }

          .dock__inner {
            width: 100%;
            justify-content: space-around;
            padding: 4px;
          }

          .dock__indicator {
            width: calc((100% - 8px) / 5);
            top: 4px;
            left: 4px;
            height: calc(100% - 8px);
          }

          .dock__link {
            flex: 1;
            width: auto;
            font-size: 11px;
            height: 34px;
          }
        }
      `}</style>
    </>
  );
};