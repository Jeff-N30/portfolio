import React from 'react';

export const SkillsSection = () => {
  const skills = {
    frontend: ["React", "JavaScript", "CSS/Tailwind"],
    backend: ["Node.js", ".NET", "MongoDB", "MySQL", "GraphQL"],
  };

  return (
    <section id="skills" className="skills-section scroll-fade-in">
      <div className="container">
        <h2 className="section-title">
          Technical Skills
        </h2>
        <div className="skills-grid">
          {Object.entries(skills).map(([category, skillList], index) => (
            <div key={category} className="skill-category">
              <h3 className={`skill-category-title ${category}`}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
              <div className="skills-list">
                {skillList.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <span className="skill-name">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .skills-section {
          padding: 5rem 0;
          position: relative;
          background: #0a0a0a;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .section-title {
          text-align: center;
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 700;
          margin-bottom: 4rem;
          letter-spacing: -0.02em;
          color: #ffffff;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .skill-category {
          background: #161616;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }

        .skill-category-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1.75rem;
          text-transform: capitalize;
          letter-spacing: -0.01em;
          color: #ffffff;
        }

        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .skill-item {
          padding: 0.625rem 1rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 8px;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .skill-item:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .skill-name {
          color: #ffffff;
          font-weight: 500;
          font-size: 0.9375rem;
          letter-spacing: -0.01em;
        }

        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 1.25rem;
          }

          .skill-category {
            padding: 1.5rem;
          }

          .section-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
};
