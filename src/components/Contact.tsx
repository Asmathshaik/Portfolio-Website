import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:asmath2909@gmail.com" data-cursor="disable">
                asmath2909@gmail.com
              </a>
            </p>
            <h4>Phone</h4>
            <p>
              <a href="tel:+447482714979" data-cursor="disable">
                +44 7482 714979
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/Asmathshaik"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
              rel="noopener noreferrer"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/ashaik-shaik-ab2914364"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
              rel="noopener noreferrer"
              style={{ marginTop: "10px", display: "inline-flex" }}
            >
              LinkedIn <MdArrowOutward />
            </a>
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
