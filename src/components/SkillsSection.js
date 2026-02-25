import React from 'react';

export const SkillsSection = () => {
  const skills = {
    Frontend: ["React", "JavaScript", "TypeScript", "CSS", "Tailwind"],
    Backend: ["Node.js", ".NET", "FastAPI", "GraphQL"],
    Database: ["MongoDB", "MySQL", "SQLite", "PostgreSQL"]
  };

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <div className="skills-grid">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="skill-group">
              <h3 className="skill-category">{category}</h3>
              <div className="skill-items">
                {items.map((skill, i) => (
                  <span key={i} className="skill">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .skills {
          padding: 80px 24px;
          background: #050505;
          border-top: 1px solid #1a1a1a;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-title {
          font-size: 32px;
          font-weight: 600;
          color: #fff;
          margin: 0 0 48px;
          letter-spacing: -1px;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .skill-group {
          padding: 24px;
          background: #0a0a0a;
          border: 1px solid #1a1a1a;
          border-radius: 12px;
        }

        .skill-category {
          font-size: 13px;
          font-weight: 600;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0 0 16px;
        }

        .skill-items {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .skill {
          font-size: 14px;
          font-weight: 500;
          color: #fff;
          background: #111;
          border: 1px solid #222;
          padding: 8px 14px;
          border-radius: 6px;
          transition: border-color 0.15s ease, background 0.15s ease;
        }

        .skill:hover {
          border-color: #333;
          background: #161616;
        }

        @media (max-width: 900px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .skills {
            padding: 60px 20px;
          }

          .section-title {
            font-size: 28px;
            margin-bottom: 32px;
          }

          .skills-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .skill-group {
            padding: 20px;
          }

          .skill {
            font-size: 13px;
            padding: 6px 12px;
          }
        }
      `}</style>
    </section>
  );
};
