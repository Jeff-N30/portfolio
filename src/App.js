import React, { useState, useEffect } from 'react';
import { Code, Database, Rocket, Mail, Github, Linkedin, ExternalLink, MessageCircle } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleResumeDownload = async (event) => {
    if (event) {
      event.preventDefault();
    }

    const resumeUrl = `${process.env.PUBLIC_URL}/JeffNader-CV.pdf`;

    try {
      const response = await fetch(resumeUrl, { cache: 'no-cache' });
      if (!response.ok) {
        throw new Error('Resume download failed');
      }

      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = 'JeffNader-CV.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(objectUrl);
    } catch (error) {
      window.open(resumeUrl, '_blank', 'noopener,noreferrer');
    }
  };

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

  const skills = {
    frontend: ["Html", "Css", "Javascript", "React", "Tailwind"],
    backend: ["Node.js", "MongoDB", "MySQL", "GraphQL"],
  };

  const NavBar = () => (
    <nav className={`navbar ${isLoaded ? 'loaded' : ''}`}>
      <div className="nav-container">
        <div className="nav-content">
          <div className="nav-links">
            {['Home', 'Projects', 'Skills', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => setActiveSection(item.toLowerCase())}
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
    </nav>
  );

  const HeroSection = () => (
    <section className="hero-section">
      <div className="hero-content">
        <div className={`hero-text ${isLoaded ? 'loaded' : ''}`}>
          <h1 className="hero-title">
            Jeff Nader
          </h1>
          <p className="hero-subtitle">
           Junior Full Stack Web Developer
          </p>
          <div className="hero-buttons">
            <button 
              className="btn-primary"
              onClick={() => setActiveSection('projects')}
            >
              <Rocket size={18} />
              View Projects
            </button>
            <a 
              href={`${process.env.PUBLIC_URL}/JeffNader-CV.pdf`}
              className="btn-secondary"
              style={{ textDecoration: 'none' }}
              onClick={handleResumeDownload}
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );

  const ProjectsSection = () => (
    <section className="projects-section">
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
    </section>
  );

  const SkillsSection = () => (
    <section className="skills-section">
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
                    <div className="skill-info">
                      <span className="skill-name">{skill}</span>
                      <span className="skill-percent">90%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className={`skill-progress ${category}`}
                        style={{ 
                          width: '90%',
                          animationDelay: `${skillIndex * 0.1}s`,
                          animationFillMode: 'forwards'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const ContactSection = () => (
    <section className="contact-section">
      <div className="container">
        <div className="contact-content">
          <h2 className="section-title">
            Let's Work Together
          </h2>
          <p className="contact-subtitle">
            Ready to bring your ideas to life? Let's create something amazing together.
          </p>
          <div className="contact-buttons">
            <a 
              href="mailto:jeffnader30@gmail.com" 
              className="btn-contact primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail size={20} />
              Gmail
            </a>
            <a 
              href="https://wa.me/96176369668" 
              className="btn-contact secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={20} />
              WhatsApp
            </a>
            <a 
              href="https://github.com/Jeff-N30" 
              className="btn-contact secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={20} />
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/jeff-nader-8431ab385" 
              className="btn-contact secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return <HeroSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'skills':
        return <SkillsSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className="portfolio">
      <NavBar />
      
      <div className="main-content">
        {activeSection === 'home' ? (
          <>
            <HeroSection />
            <ProjectsSection />
            <SkillsSection />
            <ContactSection />
          </>
        ) : (
          renderActiveSection()
        )}
      </div>
      

      <style jsx>{`
        /* Base Styles - Dark Mode Aesthetic */
        .portfolio {
          min-height: 100vh;
          background: #000000;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif;
          overflow-x: hidden;
          position: relative;
        }

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

        /* Hero Section - Apple Style */
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          text-align: center;
          padding: 5rem 2rem 2rem;
        }

        .hero-content {
          max-width: 980px;
          margin: 0 auto;
        }

        .hero-text {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hero-text.loaded {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-title {
          font-size: clamp(3rem, 8vw, 5.5rem);
          font-weight: 700;
          line-height: 1.05;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
          color: #ffffff;
        }

        .hero-subtitle {
          font-size: 1.5rem;
          font-weight: 400;
          color: #a1a1a6;
          margin-bottom: 3rem;
          letter-spacing: -0.01em;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary, .btn-secondary {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.75rem;
          border-radius: 980px;
          font-weight: 400;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          letter-spacing: -0.01em;
        }

        .btn-primary {
          background: #ffffff;
          color: #000000;
        }

        .btn-primary:hover {
          background: #e5e5e7;
          transform: scale(1.02);
        }

        .btn-secondary {
          background: transparent;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.4);
        }

        /* Sections Container */
        .projects-section, .skills-section, .contact-section {
          padding: 5rem 0;
          position: relative;
        }

        .skills-section {
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

        /* Projects Grid - Node.js Error Message Style */
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

        /* Skills Grid - Medusa.js Admin Style */
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
          flex-direction: column;
          gap: 1.25rem;
        }

        .skill-item {
          position: relative;
        }

        .skill-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.625rem;
        }

        .skill-name {
          color: #ffffff;
          font-weight: 500;
          font-size: 0.9375rem;
        }

        .skill-percent {
          color: #a1a1a6;
          font-size: 0.875rem;
          font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
        }

        .skill-bar {
          width: 100%;
          background: #2c2c2e;
          border-radius: 4px;
          height: 6px;
          overflow: hidden;
        }

        .skill-progress {
          height: 100%;
          background: #ffffff;
          border-radius: 4px;
          transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Contact Section */
        .contact-content {
          text-align: center;
          max-width: 700px;
          margin: 0 auto;
        }

        .contact-subtitle {
          font-size: 1.25rem;
          color: #a1a1a6;
          margin-bottom: 3rem;
          line-height: 1.5;
          letter-spacing: -0.01em;
        }

        .contact-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-contact {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.75rem;
          border-radius: 980px;
          font-weight: 400;
          font-size: 1rem;
          text-decoration: none;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          letter-spacing: -0.01em;
        }

        .btn-contact.primary {
          background: #ffffff;
          color: #000000;
        }

        .btn-contact.primary:hover {
          background: #e5e5e7;
          transform: scale(1.02);
        }

        .btn-contact.secondary {
          background: transparent;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .btn-contact.secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.4);
        }

        /* Footer */
        .footer {
          text-align: center;
          padding: 2.5rem 2rem;
          color: #a1a1a6;
          border-top: 0.5px solid rgba(255, 255, 255, 0.1);
          background: #000000;
          font-size: 0.875rem;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .nav-links {
            gap: 1rem;
          }

          .nav-link {
            font-size: 0.8125rem;
            padding: 0.375rem 0.5rem;
          }
          
          .hero-section {
            padding: 4rem 1.5rem 2rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.125rem;
          }
          
          .hero-buttons, .contact-buttons {
            flex-direction: column;
            align-items: stretch;
            max-width: 300px;
            margin: 0 auto;
          }
          
          .projects-grid {
            grid-template-columns: 1fr;
          }
          
          .skills-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 1.25rem;
          }
          
          .project-card,
          .skill-category {
            padding: 1.5rem;
          }

          .section-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;