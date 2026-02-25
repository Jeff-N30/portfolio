import React from 'react';
import { Mail, Github, Linkedin, MessageCircle } from 'lucide-react';

export const ContactSection = () => (
  <section id="contact" className="contact">
    <div className="container">
      <h2 className="section-title">Get in Touch</h2>
      <p className="contact-desc">
        Have a project in mind? Let's build something together.
      </p>
      <div className="contact-links">
        <a href="mailto:jeffnader30@gmail.com" className="contact-link primary">
          <Mail size={18} />
          <span>Email Me</span>
        </a>
        <a href="https://wa.me/96176369668" className="contact-link" target="_blank" rel="noopener noreferrer">
          <MessageCircle size={18} />
          <span>WhatsApp</span>
        </a>
        <a href="https://github.com/Jeff-N30" className="contact-link" target="_blank" rel="noopener noreferrer">
          <Github size={18} />
          <span>GitHub</span>
        </a>
        <a href="https://www.linkedin.com/in/jeff-nader-8431ab385" className="contact-link" target="_blank" rel="noopener noreferrer">
          <Linkedin size={18} />
          <span>LinkedIn</span>
        </a>
      </div>
    </div>

    <footer className="footer">
      <span>&copy; {new Date().getFullYear()} Jeff Nader</span>
    </footer>

    <style jsx>{`
      .contact {
        padding: 80px 24px 60px;
        border-top: 1px solid #1a1a1a;
      }

      .container {
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
      }

      .section-title {
        font-size: 32px;
        font-weight: 600;
        color: #fff;
        margin: 0 0 16px;
        letter-spacing: -1px;
      }

      .contact-desc {
        font-size: 16px;
        color: #666;
        margin: 0 0 40px;
        line-height: 1.6;
      }

      .contact-links {
        display: flex;
        justify-content: center;
        gap: 12px;
        flex-wrap: wrap;
      }

      .contact-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 20px;
        font-size: 14px;
        font-weight: 500;
        color: #fff;
        text-decoration: none;
        background: transparent;
        border: 1px solid #222;
        border-radius: 8px;
        transition: all 0.15s ease;
      }

      .contact-link:hover {
        border-color: #444;
        background: rgba(255, 255, 255, 0.04);
      }

      .contact-link.primary {
        background: #fff;
        color: #000;
        border-color: #fff;
      }

      .contact-link.primary:hover {
        background: #e5e5e5;
        border-color: #e5e5e5;
      }

      .footer {
        margin-top: 80px;
        padding-top: 24px;
        border-top: 1px solid #1a1a1a;
        text-align: center;
      }

      .footer span {
        font-size: 13px;
        color: #444;
      }

      @media (max-width: 600px) {
        .contact {
          padding: 80px 20px 40px;
        }

        .section-title {
          font-size: 28px;
        }

        .contact-desc {
          font-size: 15px;
          margin-bottom: 32px;
        }

        .contact-links {
          flex-direction: column;
          gap: 10px;
        }

        .contact-link {
          width: 100%;
          justify-content: center;
          padding: 14px 20px;
        }

        .footer {
          margin-top: 60px;
        }
      }
    `}</style>
  </section>
);
