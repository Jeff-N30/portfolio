import React from 'react';
import { Code, Database, Rocket, ExternalLink } from 'lucide-react';

export const ProjectsSection = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack MERN application with payment integration",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      type: "fullstack"
    },
    {
      title: "Real-time Chat App",
      description: "WebSocket-powered chat with rooms and file sharing",
      tech: ["Socket.io", "Express", "React", "PostgreSQL"],
      type: "fullstack"
    },
    {
      title: "3D Portfolio Showcase",
      description: "Interactive 3D website using Three.js",
      tech: ["Three.js", "React", "WebGL", "GSAP"],
      type: "frontend"
    },
    {
      title: "API Gateway Service",
      description: "Microservices architecture with rate limiting",
      tech: ["Node.js", "Redis", "Docker", "AWS"],
      type: "backend"
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
              className={`project-card ${project.type}`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'forwards'
              }}
            >
              <div className="project-header">
                <div className={`project-icon ${project.type}`}>
                  {project.type === 'fullstack' ? <Rocket size={24} /> :
                   project.type === 'frontend' ? <Code size={24} /> :
                   <Database size={24} />}
                </div>
                <ExternalLink size={20} className="external-link" />
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="tech-stack">
                {project.tech.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">
                    {tech}
                  </span>
                ))}
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

        .project-card {
          background: #161616;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.75rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }

        .project-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.6);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }

        .project-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #2c2c2e;
          color: #ffffff;
        }

        .external-link {
          color: #a1a1a6;
          transition: color 0.2s;
        }

        .project-card:hover .external-link {
          color: #ffffff;
        }

        .project-title {
          font-size: 1.375rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          letter-spacing: -0.01em;
          color: #ffffff;
        }

        .project-description {
          color: #a1a1a6;
          margin-bottom: 1.5rem;
          line-height: 1.5;
          font-size: 0.9375rem;
        }

        .tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech-tag {
          padding: 0.375rem 0.75rem;
          background: #2c2c2e;
          border-radius: 6px;
          font-size: 0.8125rem;
          font-weight: 500;
          color: #ffffff;
          font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
          letter-spacing: -0.01em;
        }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 1.25rem;
          }

          .project-card {
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
