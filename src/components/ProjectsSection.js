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
      description: "Full-featured e-commerce platform with product catalog, cart system, and secure checkout. Built with modern tech stack for optimal performance.",
      features: ["Product Catalog", "Cart System", "Secure Checkout", "Modern UI"],
      tech: ["FastAPI", "React", "Vite", "Node.js"],
      icon: "wine"
    },
    {
      title: "Metis",
      subtitle: "Chemical Formulation Database",
      description: "Metis is a secure chemical formulation database with triple-layer encryption, cross-platform support, and complete workflow management for inventory, projects, testing, production, and reporting.",
      features: ["Secure Data Management", "Cross-Platform Support", "Portable Architecture", "Professional Interface", "Complete Workflow"],
      tech: ["Node.js 18+", "Rust", "Tauri", "React", "Sqlite", "SQLCipher", "VeraCrypt"],
      icon: "flask"
    },
    {
      title: "CourtVision",
      subtitle: "AI Basketball Analytics Platform",
      description: "AI-powered basketball analytics platform delivering real-time insights, advanced statistics, and visual heatmaps. Transforms live basketball footage into 2D visualized heatmaps for coaches, athletes, and game analysis.",
      features: ["Live Score", "Analytics", "Shot Chart"],
      tech: ["YOLOv8", "Streamlit", "OpenCV", "PyTorch", "NumPy", "Img Coords"],
      icon: "basketball"
    }
  ];

  return (
    <section id="projects" className="projects-section scroll-fade-in">
      <div className="container">
        <h2 className="section-title">
          Featured Projects
        </h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card-container"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'forwards'
              }}
              onClick={() => toggleCard(index)}
            >
              <div className={`project-card ${flippedCards[index] ? 'flipped' : ''}`}>
                {/* Front of card */}
                <div className="card-face card-front">
                  <div className="project-header">
                    <div className="project-icon">
                      {project.icon === 'wine' ? <Wine size={24} /> :
                       project.icon === 'flask' ? <FlaskConical size={24} /> :
                       <Circle size={24} />}
                    </div>
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-subtitle">{project.subtitle}</p>
                  <div className="tap-hint">Tap to explore</div>
                </div>

                {/* Back of card */}
                <div className="card-face card-back">
                  <div className="back-header">
                    <h3 className="project-title-back">{project.title}</h3>
                  </div>
                  <p className="project-description">{project.description}</p>
                  
                  {project.features && (
                    <div className="features-list">
                      {project.features.map((feature, fIndex) => (
                        <span key={fIndex} className="feature-item">• {feature}</span>
                      ))}
                    </div>
                  )}

                  <div className="tech-stack">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
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
          padding: 5rem 0;
          position: relative;
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

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .project-card-container {
          perspective: 1000px;
          cursor: pointer;
          height: 400px;
        }

        .project-card {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
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
          background: #161616;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 18px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-front {
          padding: 2rem;
        }

        .card-back {
          padding: 1.5rem;
        }

        .project-card-container:hover .card-face {
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
        }

        .card-front {
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .card-back {
          transform: rotateY(180deg);
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
        }

        .card-back::-webkit-scrollbar {
          width: 6px;
        }

        .card-back::-webkit-scrollbar-track {
          background: transparent;
        }

        .card-back::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }

        .card-back::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .project-header {
          margin-bottom: 1.5rem;
        }

        .project-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #2c2c2e;
          color: #ffffff;
          margin: 0 auto;
        }

        .project-title {
          font-size: 1.75rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
          color: #ffffff;
        }

        .project-subtitle {
          font-size: 1rem;
          color: #a1a1a6;
          font-weight: 400;
          letter-spacing: -0.01em;
        }

        .tap-hint {
          margin-top: 2rem;
          font-size: 0.875rem;
          color: #6e6e73;
          font-weight: 400;
        }

        .back-header {
          margin-bottom: 0.75rem;
          flex-shrink: 0;
        }

        .project-title-back {
          font-size: 1.25rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin-bottom: 0;
        }

        .project-description {
          color: #a1a1a6;
          line-height: 1.4;
          font-size: 0.875rem;
          margin-bottom: 0.875rem;
          flex-shrink: 0;
        }

        .features-list {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
          margin-bottom: 0.875rem;
          flex-shrink: 0;
        }

        .feature-item {
          color: #86868b;
          font-size: 0.8125rem;
          line-height: 1.3;
        }

        .tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.375rem;
          flex-shrink: 0;
        }

        .tech-tag {
          padding: 0.375rem 0.625rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 500;
          color: #ffffff;
          letter-spacing: -0.01em;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .tech-tag:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .tap-hint-back {
          margin-top: 0.75rem;
          font-size: 0.75rem;
          color: #6e6e73;
          text-align: center;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }

          .project-card-container {
            height: 380px;
          }

          .card-front {
            padding: 1.75rem;
          }

          .card-back {
            padding: 1.25rem;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 1.25rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .project-card-container {
            height: 360px;
          }

          .card-front {
            padding: 1.5rem;
          }

          .card-back {
            padding: 1.125rem;
          }

          .project-title {
            font-size: 1.5rem;
          }

          .project-title-back {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </section>
  );
};
