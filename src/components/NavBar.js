import React from 'react';

export const NavBar = ({ activeSection, scrollToSection, isLoaded }) => (
  <nav className={`navbar ${isLoaded ? 'loaded' : ''}`}>
    <div className="nav-inner">
      <span className="logo">JN</span>
      <div className="nav-links">
        {['Home', 'Projects', 'Skills', 'Contact'].map((item) => (
          <button
            key={item}
            onClick={() => scrollToSection(item.toLowerCase())}
            className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
          >
            {item}
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
        background: rgba(0, 0, 0, 0.92);
        border-bottom: 1px solid #1a1a1a;
        opacity: 0;
        transform: translateY(-100%);
        transition: opacity 0.3s ease, transform 0.3s ease;
      }

      .navbar.loaded {
        opacity: 1;
        transform: translateY(0);
      }

      .nav-inner {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 24px;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .logo {
        font-size: 18px;
        font-weight: 600;
        color: #fff;
        letter-spacing: -0.5px;
      }

      .nav-links {
        display: flex;
        gap: 4px;
      }

      .nav-link {
        background: transparent;
        border: none;
        color: #888;
        font-size: 14px;
        font-weight: 500;
        padding: 8px 16px;
        cursor: pointer;
        transition: color 0.15s ease, background 0.15s ease;
        border-radius: 6px;
      }

      .nav-link:hover {
        color: #fff;
        background: rgba(255, 255, 255, 0.06);
      }

      .nav-link.active {
        color: #fff;
        background: rgba(255, 255, 255, 0.1);
      }

      @media (max-width: 600px) {
        .nav-inner {
          padding: 0 16px;
          height: 52px;
        }

        .logo {
          font-size: 16px;
        }

        .nav-links {
          gap: 2px;
        }

        .nav-link {
          font-size: 13px;
          padding: 6px 10px;
        }
      }
    `}</style>
  </nav>
);
