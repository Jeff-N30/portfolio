import React, { useState, useEffect } from 'react';
import { Trophy, Dumbbell, Mountain, ArrowDown } from 'lucide-react';
import { ContactSection } from './ContactSection';

const activities = [
  {
    id: 'basketball',
    label: 'Basketball',
    icon: Trophy,
    color: '#f97316',
    tagline: 'On The Court',
    description:
      'Point guard mentality — always reading the game, creating plays, and elevating every teammate around me.',
    stats: [
      { label: 'Position', value: 'PG / SG' },
      { label: 'Style', value: 'Playmaker' },
      { label: 'Vision', value: 'Court IQ' },
    ],
    highlights: [
      'Full-court pressure & fast breaks',
      'Pick & roll execution',
      'Shot creation & distribution',
      'Built CourtVision — an AI basketball analytics platform',
    ],
  },
  {
    id: 'lifting',
    label: 'Lifting',
    icon: Dumbbell,
    color: '#ef4444',
    tagline: 'In The Gym',
    description:
      'Disciplined strength training built on compound movements, progressive overload, and relentless consistency.',
    stats: [
      { label: 'Focus', value: 'Strength' },
      { label: 'Style', value: 'Compound' },
      { label: 'Frequency', value: '5× / wk' },
    ],
    highlights: [
      'Heavy compound lifts — squat, bench, deadlift',
      'Progressive overload programming',
      'Athletic performance & mobility',
      'Nutrition & recovery driven',
    ],
  },
  {
    id: 'outdoors',
    label: 'Outdoors',
    icon: Mountain,
    color: '#22c55e',
    tagline: 'In The Wild',
    description:
      'From multi-day backcountry camping to summit hikes — the outdoors is where I find clarity and reset.',
    stats: [
      { label: 'Activity', value: 'Hike & Camp' },
      { label: 'Terrain', value: 'Mountain' },
      { label: 'Style', value: 'Backcountry' },
    ],
    highlights: [
      'Multi-day backcountry camping',
      'Mountain trail hiking',
      'Wilderness navigation & prep',
      'Leave No Trace philosophy',
    ],
  },
];

const AthleteNavBar = ({ activeSection, scrollToSection, isLoaded }) => (
  <nav className={`a-navbar ${isLoaded ? 'loaded' : ''}`}>
    <div className="a-nav-inner">
      <span className="a-logo">JN</span>
      <div className="a-nav-links">
        {['Court', 'Gym', 'Wild', 'Contact'].map((item) => {
          const sectionMap = { Court: 'basketball', Gym: 'lifting', Wild: 'outdoors', Contact: 'contact' };
          const id = sectionMap[item];
          return (
            <button
              key={item}
              onClick={() => scrollToSection(id)}
              className={`a-nav-link ${activeSection === id ? 'active' : ''}`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>

    <style jsx>{`
      .a-navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        background: rgba(6, 3, 0, 0.92);
        border-bottom: 1px solid #2a1500;
        opacity: 0;
        transform: translateY(-100%);
        transition: opacity 0.3s ease, transform 0.3s ease;
        backdrop-filter: blur(12px);
      }

      .a-navbar.loaded {
        opacity: 1;
        transform: translateY(0);
      }

      .a-nav-inner {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 24px;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .a-logo {
        font-size: 18px;
        font-weight: 600;
        color: #f97316;
        letter-spacing: -0.5px;
      }

      .a-nav-links {
        display: flex;
        gap: 4px;
      }

      .a-nav-link {
        background: transparent;
        border: none;
        color: #a16207;
        font-size: 14px;
        font-weight: 500;
        padding: 8px 16px;
        cursor: pointer;
        transition: color 0.15s ease, background 0.15s ease;
        border-radius: 6px;
      }

      .a-nav-link:hover {
        color: #f97316;
        background: rgba(249, 115, 22, 0.08);
      }

      .a-nav-link.active {
        color: #f97316;
        background: rgba(249, 115, 22, 0.12);
      }

      @media (max-width: 600px) {
        .a-nav-inner {
          padding: 0 16px;
          height: 52px;
        }

        .a-logo {
          font-size: 16px;
        }

        .a-nav-links {
          gap: 2px;
        }

        .a-nav-link {
          font-size: 13px;
          padding: 6px 10px;
        }
      }
    `}</style>
  </nav>
);

const AthleteHero = ({ scrollToSection, isLoaded }) => (
  <section id="athlete-hero" className="a-hero">
    <div className={`a-hero-content ${isLoaded ? 'visible' : ''}`}>
      <div className="a-hero-badge">Athlete & Explorer</div>
      <h1 className="a-hero-name">Jeff Nader</h1>
      <p className="a-hero-desc">
        On the hardwood, under the barbell, or deep in the backcountry — driven by discipline and love of the game.
      </p>
      <div className="a-hero-tags">
        {['🏀 Basketball', '🏋️ Lifting', '⛺ Camping', '🥾 Hiking'].map((tag) => (
          <span key={tag} className="a-hero-tag">{tag}</span>
        ))}
      </div>
      <button className="a-btn-primary" onClick={() => scrollToSection('basketball')}>
        Explore My World
        <ArrowDown size={16} />
      </button>
    </div>

    {/* Decorative animated orbs */}
    <div className="orb orb-1" />
    <div className="orb orb-2" />
    <div className="orb orb-3" />

    <style jsx>{`
      .a-hero {
        min-height: calc(100vh - 56px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 56px 24px 40px;
        position: relative;
        overflow: hidden;
      }

      .a-hero-content {
        text-align: center;
        max-width: 800px;
        position: relative;
        z-index: 2;
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }

      .a-hero-content.visible {
        opacity: 1;
        transform: translateY(0);
      }

      .a-hero-badge {
        display: inline-block;
        padding: 6px 16px;
        background: rgba(249, 115, 22, 0.1);
        border: 1px solid rgba(249, 115, 22, 0.3);
        border-radius: 100px;
        font-size: 13px;
        font-weight: 500;
        color: #f97316;
        margin-bottom: 24px;
        letter-spacing: 0.3px;
      }

      .a-hero-name {
        font-size: clamp(48px, 10vw, 80px);
        font-weight: 700;
        color: #fff;
        margin: 0 0 16px;
        letter-spacing: -2px;
        line-height: 1;
      }

      .a-hero-desc {
        font-size: 18px;
        color: #888;
        margin: 0 0 32px;
        line-height: 1.6;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
      }

      .a-hero-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
        margin-bottom: 40px;
      }

      .a-hero-tag {
        padding: 8px 16px;
        background: #111;
        border: 1px solid #222;
        border-radius: 100px;
        font-size: 14px;
        color: #ccc;
        font-weight: 500;
        transition: border-color 0.15s, background 0.15s;
      }

      .a-hero-tag:hover {
        border-color: #444;
        background: #161616;
      }

      .a-btn-primary {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 14px 28px;
        background: #f97316;
        color: #000;
        font-size: 14px;
        font-weight: 600;
        border-radius: 8px;
        cursor: pointer;
        border: none;
        transition: background 0.15s ease, transform 0.15s ease;
      }

      .a-btn-primary:hover {
        background: #fb923c;
        transform: translateY(-1px);
      }

      /* Decorative orbs */
      .orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        pointer-events: none;
        z-index: 1;
      }

      .orb-1 {
        width: 400px;
        height: 400px;
        background: rgba(249, 115, 22, 0.08);
        top: -100px;
        right: -100px;
        animation: orb-float 8s ease-in-out infinite;
      }

      .orb-2 {
        width: 300px;
        height: 300px;
        background: rgba(239, 68, 68, 0.06);
        bottom: -50px;
        left: -80px;
        animation: orb-float 10s ease-in-out infinite reverse;
      }

      .orb-3 {
        width: 200px;
        height: 200px;
        background: rgba(34, 197, 94, 0.05);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: orb-pulse 6s ease-in-out infinite;
      }

      @keyframes orb-float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-30px); }
      }

      @keyframes orb-pulse {
        0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
      }

      @media (max-width: 600px) {
        .a-hero {
          padding: 100px 20px 60px;
        }

        .a-hero-name {
          font-size: 40px;
          letter-spacing: -1px;
        }

        .a-hero-desc {
          font-size: 15px;
          margin-bottom: 28px;
        }

        .a-hero-tags {
          gap: 8px;
        }

        .a-hero-tag {
          font-size: 13px;
          padding: 6px 12px;
        }
      }
    `}</style>
  </section>
);

const ActivitySection = ({ activity, index }) => {
  const Icon = activity.icon;
  const [visible, setVisible] = useState(false);
  const sectionRef = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id={activity.id} ref={sectionRef} className={`activity-section ${visible ? 'visible' : ''}`}>
      <div className="act-container">
        <div className="act-header">
          <div className="act-icon-wrap" style={{ '--accent': activity.color }}>
            <Icon size={28} />
          </div>
          <div>
            <div className="act-tagline" style={{ color: activity.color }}>{activity.tagline}</div>
            <h2 className="act-title">{activity.label}</h2>
          </div>
        </div>

        <p className="act-desc">{activity.description}</p>

        <div className="act-body">
          {/* Stats */}
          <div className="act-stats">
            {activity.stats.map((stat) => (
              <div key={stat.label} className="act-stat-card" style={{ '--accent': activity.color }}>
                <span className="act-stat-value">{stat.value}</span>
                <span className="act-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Highlights */}
          <div className="act-highlights">
            {activity.highlights.map((hl) => (
              <div key={hl} className="act-highlight-item" style={{ '--accent': activity.color }}>
                <span className="act-hl-dot" />
                <span>{hl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .activity-section {
          padding: 80px 24px;
          border-top: 1px solid #1a1a1a;
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .activity-section:nth-child(even) {
          background: #050505;
        }

        .activity-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .act-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .act-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 20px;
        }

        .act-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: color-mix(in srgb, var(--accent) 12%, transparent);
          border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
          color: var(--accent);
          flex-shrink: 0;
        }

        .act-tagline {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 4px;
        }

        .act-title {
          font-size: 32px;
          font-weight: 700;
          color: #fff;
          margin: 0;
          letter-spacing: -1px;
        }

        .act-desc {
          font-size: 16px;
          color: #666;
          line-height: 1.7;
          max-width: 680px;
          margin: 0 0 40px;
        }

        .act-body {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 40px;
          align-items: start;
        }

        .act-stats {
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-width: 180px;
        }

        .act-stat-card {
          padding: 16px 20px;
          background: #0a0a0a;
          border: 1px solid #1a1a1a;
          border-radius: 12px;
          transition: border-color 0.2s ease;
        }

        .act-stat-card:hover {
          border-color: color-mix(in srgb, var(--accent) 40%, transparent);
        }

        .act-stat-value {
          display: block;
          font-size: 18px;
          font-weight: 700;
          color: var(--accent);
          margin-bottom: 2px;
        }

        .act-stat-label {
          font-size: 12px;
          color: #555;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 500;
        }

        .act-highlights {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding-top: 4px;
        }

        .act-highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 15px;
          color: #999;
          line-height: 1.5;
        }

        .act-hl-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
          margin-top: 7px;
        }

        @media (max-width: 700px) {
          .activity-section {
            padding: 60px 20px;
          }

          .act-title {
            font-size: 26px;
          }

          .act-body {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .act-stats {
            flex-direction: row;
            flex-wrap: wrap;
            min-width: unset;
          }

          .act-stat-card {
            flex: 1;
            min-width: 120px;
          }
        }
      `}</style>
    </section>
  );
};

export const AthleteSide = ({ isLoaded }) => {
  const [activeSection, setActiveSection] = useState('athlete-hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['athlete-hero', 'basketball', 'lifting', 'outdoors', 'contact'];
      const scrollPos = window.scrollY + 150;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (window.scrollY + windowHeight >= documentHeight - 100) {
        setActiveSection('contact');
        return;
      }

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 60;
      window.scrollTo({ top: element.offsetTop - offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="athlete-portfolio">
      <AthleteNavBar
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        isLoaded={isLoaded}
      />
      <AthleteHero scrollToSection={scrollToSection} isLoaded={isLoaded} />
      {activities.map((activity, i) => (
        <ActivitySection key={activity.id} activity={activity} index={i} />
      ))}
      <ContactSection />

      <style jsx>{`
        .athlete-portfolio {
          min-height: 100vh;
          background: #000;
          color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif;
        }
      `}</style>
    </div>
  );
};
