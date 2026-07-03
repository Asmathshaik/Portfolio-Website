import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>

        {/* Let's Connect Banner */}
        <div className="lets-connect-banner">
          <span className="connect-emoji" role="img" aria-label="waving hand">👋</span>
          <div className="connect-text">
            <span className="connect-title">Let's Connect</span>
            <span className="connect-subtitle">I'd love to hear from you — feel free to reach out!</span>
          </div>
          <span className="connect-emoji connect-sparkle" role="img" aria-label="sparkles">✨</span>
        </div>

        <div className="contact-flex">
          <div className="contact-box">
            <div className="contact-item">
              <span className="contact-icon" role="img" aria-label="email">✉️</span>
              <div className="contact-item-content">
                <h4>Email</h4>
                <p>
                  <a href="mailto:asmath2909@gmail.com" data-cursor="disable">
                    asmath2909@gmail.com
                  </a>
                </p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon" role="img" aria-label="phone">📞</span>
              <div className="contact-item-content">
                <h4>Phone</h4>
                <p>
                  <a href="tel:+447482714979" data-cursor="disable">
                    +44 7482 714979
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="contact-box">
            <div className="contact-item">
              <span className="contact-icon" role="img" aria-label="link">🔗</span>
              <div className="contact-item-content">
                <h4>Social</h4>
                <a
                  href="https://www.linkedin.com/in/ashaik-shaik-ab2914364"
                  target="_blank"
                  data-cursor="disable"
                  className="contact-social"
                  rel="noopener noreferrer"
                >
                  LinkedIn <MdArrowOutward />
                </a>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon" role="img" aria-label="github">🐙</span>
              <div className="contact-item-content">
                <h4>GitHub</h4>
                <a
                  href="https://github.com/Asmathshaik"
                  target="_blank"
                  data-cursor="disable"
                  className="contact-social"
                  rel="noopener noreferrer"
                >
                  Github <MdArrowOutward />
                </a>
              </div>
            </div>
          </div>
          <div className="contact-box">
            <h2>
              Portfolio of <span>Asmath Shaik</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
