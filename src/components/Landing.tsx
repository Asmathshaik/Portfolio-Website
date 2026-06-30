import { useState, useEffect } from "react";
import { FaAward } from "react-icons/fa6";
import { TbNotes } from "react-icons/tb";
import "./styles/Landing.css";

const Landing = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate coordinates from -1 to 1 based on screen width/height
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setCoords({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const cardStyle = {
    transform: `perspective(1000px) rotateX(${coords.y * 12}deg) rotateY(${coords.x * 12}deg) translate3d(${coords.x * 10}px, ${-coords.y * 10}px, 0)`,
    transition: "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)",
  };

  return (
    <div className="landing-section" id="landingDiv">
      <div className="landing-container">
        <div className="hero-content">
          <div className="hero-text">
            <span className="badge-pm">PMP® | PRINCE2® | Agile Scrum Master</span>
            <h2 className="greeting">Hello! I'm</h2>
            <h1 className="name">
              ASMATH
              <br />
              <span>SHAIK</span>
            </h1>
            <p className="subtitle">Project Management Professional</p>
            
            <div className="cert-badges">
              <div className="cert-badge">
                <FaAward />
                <span>PMP Certified</span>
              </div>
              <div className="cert-badge">
                <FaAward />
                <span>Scrum Master</span>
              </div>
              <div className="cert-badge">
                <FaAward />
                <span>Lean Six Sigma</span>
              </div>
            </div>

            <div className="hero-actions">
              <a href="/resume.txt" target="_blank" rel="noopener noreferrer" className="btn-primary">
                <TbNotes /> View UK Standard CV
              </a>
              <a href="#work" className="btn-secondary">
                View Projects
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="profile-image-card glass-panel" style={cardStyle}>
              <div className="profile-image-wrapper">
                <img src="/images/profile_video.png" alt="Asmath Shaik" className="profile-photo" />
              </div>
              <div className="profile-card-footer">
                <h4>Asmath Shaik</h4>
                <p>Project Management Professional</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
