import React from 'react';
import { Mail, Github, Linkedin, MessageCircle } from 'lucide-react';

export const ContactSection = () => (
  <section id="contact" className="contact-section scroll-fade-in">
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

    <style jsx>{`
      .contact-section {
        padding: 5rem 0;
        position: relative;
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
      }

      .contact-content {
        text-align: center;
        max-width: 700px;
        margin: 0 auto;
      }

      .section-title {
        text-align: center;
        font-size: clamp(2.5rem, 5vw, 3.5rem);
        font-weight: 700;
        margin-bottom: 1.5rem;
        letter-spacing: -0.02em;
        color: #ffffff;
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

      @media (max-width: 768px) {
        .contact-buttons {
          flex-direction: column;
          align-items: stretch;
          max-width: 300px;
          margin: 0 auto;
        }
      }

      @media (max-width: 480px) {
        .container {
          padding: 0 1.25rem;
        }

        .section-title {
          font-size: 2rem;
        }
      }
    `}</style>
  </section>
);
