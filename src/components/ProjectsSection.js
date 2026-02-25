import React, { useState } from 'react';
import { Wine, FlaskConical, Circle } from 'lucide-react';

export const ProjectsSection = () => {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleCard = (index) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const projects = [
    {
      title: "The Wine Room",
      subtitle: "E-Commerce Platform",
      description: "Full-featured e-commerce platform with product catalog, cart system, and secure checkout.",
      features: ["Product Catalog", "Cart System", "Secure Checkout"],
      tech: ["FastAPI", "React", "Vite", "Node.js"],
      icon: "wine"
    },
    {
      title: "Metis",
      subtitle: "Database System",
      description: "Secure chemical formulation database with triple-layer encryption and cross-platform support.",
      features: ["Encrypted Storage", "Cross-Platform", "Workflow Management"],
      tech: ["Tauri", "React", "Rust", "SQLCipher"],
      icon: "flask"
    },
    {
      title: "CourtVision",
      subtitle: "AI Analytics",
      description: "AI-powered basketball analytics platform with real-time insights and visual heatmaps.",
      features: ["Live Tracking", "Shot Analysis", "Heatmap Generation"],
      tech: ["YOLOv8", "Streamlit", "OpenCV", "PyTorch"],
      icon: "basketball"
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card-container"
              onClick={() => toggleCard(index)}
            >
              <div className={`project-card ${flippedCards[index] ? 'flipped' : ''}`}>
                <div className="card-face card-front">
                  <div className="project-icon">
                    {project.icon === 'wine' ? <Wine size={24} /> :
                     project.icon === 'flask' ? <FlaskConical size={24} /> :
                     <Circle size={24} />}
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-subtitle">{project.subtitle}</p>
                  <div className="tap-hint">Tap to explore</div>
                </div>

                <div className="card-face card-back">
                  <h3 className="project-title-back">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="features-list">
                    {project.features.map((feature, fIndex) => (
                      <span key={fIndex} className="feature-item">• {feature}</span>
                    ))}
                  </div>

                  <div className="tech-stack">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="tap-hint-back">Tap to close</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .projects-section {
          padding: 80px 24px;
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

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .project-card-container {
          perspective: 1000px;
          cursor: pointer;
          height: 380px;
        }

        .project-card {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.6s ease;
        }

        .project-card.flipped {
          transform: rotateY(180deg);
        }

        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          background: #0a0a0a;
          border: 1px solid #1a1a1a;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          transition: border-color 0.2s ease;
        }

        .project-card-container:hover .card-face {
          border-color: #333;
        }

        .card-front {
          padding: 32px;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .card-back {
          transform: rotateY(180deg);
          padding: 24px;
          overflow-y: auto;
        }

        .project-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #111;
          border: 1px solid #222;
          color: #888;
          margin-bottom: 20px;
        }

        .project-title {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #fff;
        }

        .project-subtitle {
          font-size: 14px;
          color: #666;
        }

        .tap-hint {
          margin-top: 24px;
          font-size: 13px;
          color: #444;
        }

        .project-title-back {
          font-size: 18px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 12px;
        }

        .project-description {
          color: #888;
          line-height: 1.5;
          font-size: 14px;
          margin-bottom: 16px;
        }

        .features-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 16px;
        }

        .feature-item {
          color: #666;
          font-size: 13px;
        }

        .tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tech-tag {
          padding: 6px 12px;
          background: #111;
          border: 1px solid #222;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          color: #fff;
        }

        .tap-hint-back {
          margin-top: auto;
          padding-top: 16px;
          font-size: 12px;
          color: #444;
          text-align: center;
        }

        @media (max-width: 900px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .projects-section {
            padding: 60px 20px;
          }

          .section-title {
            font-size: 28px;
            margin-bottom: 32px;
          }

          .projects-grid {
            grid-template-columns: 1fr;
          }

          .project-card-container {
            height: 340px;
          }
        }
      `}</style>
    </section>
  );
};
