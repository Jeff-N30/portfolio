import React from 'react';

export const NavBar = ({ activeSection, scrollToSection, isLoaded }) => (
  <nav className={`navbar ${isLoaded ? 'loaded' : ''}`}>
    <div className="nav-container">
      <div className="nav-content">
        <div className="nav-links">
          {['Home', 'Projects', 'Skills', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
            >
              {item}
              {activeSection === item.toLowerCase() && (
                <div className="nav-indicator" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>

    <style jsx>{`
      /* Navigation - iOS Style Dark Mode */
      .navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(20px) saturate(180%);
        -webkit-backdrop-filter: blur(20px) saturate(180%);
        border-bottom: 0.5px solid rgba(255, 255, 255, 0.1);
        transform: translateY(-100%);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .navbar.loaded {
        transform: translateY(0);
      }

      .nav-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
      }

      .nav-content {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
      }

      .nav-links {
        display: flex;
        gap: 2rem;
      }

      .nav-link {
        position: relative;
        background: none;
        border: none;
        color: #e5e5e7;
        font-size: 0.875rem;
        font-weight: 400;
        letter-spacing: -0.01em;
        cursor: pointer;
        padding: 0.5rem 0.75rem;
        border-radius: 8px;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .nav-link:hover {
        background: rgba(255, 255, 255, 0.08);
      }

      .nav-link.active {
        color: #ffffff;
        font-weight: 500;
      }

      .nav-indicator {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: #ffffff;
        border-radius: 2px 2px 0 0;
      }

      @media (max-width: 768px) {
        .nav-links {
          gap: 1rem;
        }

        .nav-link {
          font-size: 0.8125rem;
          padding: 0.375rem 0.5rem;
        }
      }
    `}</style>
  </nav>
);
