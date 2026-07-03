import { useState, useEffect } from "react";
import { FaCircleCheck, FaXmark, FaArrowUpRightFromSquare } from "react-icons/fa6";
import "./styles/Certifications.css";

interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
  image: string;
  category: string;
  symbol?: string;
}

const Certifications = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const certificationsList: CertificationItem[] = [
    // Project Management & Agile
    { 
      name: "PMP (Project Management Professional)", 
      issuer: "Simplilearn / PMI", 
      date: "Oct 2023",
      image: "/certificates/pmp.png",
      category: "Project Management & Agile",
      symbol: "🎯"
    },
    { 
      name: "PRINCE2® Foundation", 
      issuer: "PeopleCert UK", 
      date: "Nov 2023",
      image: "/certificates/prince2-peoplecert.png",
      category: "Project Management & Agile"
    },
    { 
      name: "PRINCE2® Foundation (Training)", 
      issuer: "Simplilearn", 
      date: "Jul 2023",
      image: "/certificates/prince2-simplilearn.png",
      category: "Project Management & Agile"
    },
    { 
      name: "EXIN Agile Scrum Master", 
      issuer: "Simplilearn", 
      date: "Oct 2023",
      image: "/certificates/agile-scrum.png",
      category: "Project Management & Agile",
      symbol: "📋"
    },
    { 
      name: "Certified Lean Six Sigma Green Belt", 
      issuer: "Simplilearn", 
      date: "Oct 2023",
      image: "/certificates/lean-six-sigma.png",
      category: "Project Management & Agile",
      symbol: "📉"
    },
    { 
      name: "Digital Project Manager Master Program", 
      issuer: "Simplilearn", 
      date: "Jul 2024",
      image: "/certificates/digital-project-manager.png",
      category: "Project Management & Agile"
    },
    // Digital & Technology
    { 
      name: "Digital Skills in Data and AI", 
      issuer: "Simplilearn", 
      date: "Sep 2023",
      image: "/certificates/data-skills-ai.png",
      category: "Digital & Technology",
      symbol: "🤖"
    },
    { 
      name: "Digital Transformation", 
      issuer: "Simplilearn", 
      date: "Sep 2023",
      image: "/certificates/digital-transformation.png",
      category: "Digital & Technology",
      symbol: "🤖"
    },
    { 
      name: "Digital Marketing For Leaders", 
      issuer: "Simplilearn", 
      date: "Jul 2023",
      image: "/certificates/digital-marketing.png",
      category: "Digital & Technology"
    },
    { 
      name: "Microsoft Project 2021", 
      issuer: "Simplilearn", 
      date: "Oct 2023",
      image: "/certificates/microsoft-project.png",
      category: "Digital & Technology",
      symbol: "📊"
    },
  ];

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  // Group by category for the minimal list layout
  const pmAgileCerts = certificationsList.filter(c => c.category === "Project Management & Agile");
  const digitalTechCerts = certificationsList.filter(c => c.category === "Digital & Technology");

  return (
    <div className="cert-section section-container" id="certifications">
      <div className="cert-container">
        <h2>
          Professional <span>&</span>
          <br /> Certifications
        </h2>

        {/* Folder Card Trigger */}
        <div className="folder-trigger-area">
          <button 
            className="folder-trigger-button card-3d-style"
            onClick={() => setIsModalOpen(true)}
            type="button"
            aria-label="Open Certificates Modal"
          >
            <div className="folder-content-wrapper">
              <span className="folder-3d">📁</span>
              <span className="folder-btn-text">View My Certs Here</span>
              <span className="eyes-emoji">👀</span>
            </div>
            <p className="folder-subtitle">Explore my project management certifications</p>
          </button>
        </div>

        {/* Minimalist Lists Below Folder - All using checkmark icons */}
        <div className="minimal-lists-wrapper">
          <div className="minimal-list-category">
            <h4 className="minimal-category-title">Project Management & Agile</h4>
            <ul className="minimal-certs-list">
              {pmAgileCerts.map((cert, index) => (
                <li key={index}>
                  <FaCircleCheck className="minimal-check-icon" />
                  <span>{cert.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="minimal-list-category">
            <h4 className="minimal-category-title">Digital & Technology</h4>
            <ul className="minimal-certs-list">
              {digitalTechCerts.map((cert, index) => (
                <li key={index}>
                  <FaCircleCheck className="minimal-check-icon" />
                  <span>{cert.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Popup overlay */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div className="modal-content-container" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>My Certificates</h3>
                <button 
                  className="modal-close-btn" 
                  onClick={() => setIsModalOpen(false)}
                  type="button"
                  aria-label="Close Modal"
                >
                  <FaXmark />
                </button>
              </div>
              
              <div className="modal-scroll-area">
                <div className="certs-grid">
                  {certificationsList.map((cert, index) => (
                    <div className="cert-card" key={index}>
                      <div className="cert-card-media">
                        <img 
                          src={cert.image} 
                          alt={`${cert.name} certificate`} 
                          loading="lazy" 
                          className="cert-card-img" 
                        />
                        <a 
                          href={cert.image} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="cert-img-overlay-link"
                        >
                          View High-Res <FaArrowUpRightFromSquare />
                        </a>
                      </div>
                      <div className="cert-card-body">
                        <h4 className="cert-card-name">
                          {cert.symbol && <span className="cert-emoji-span card-emoji">{cert.symbol} </span>}
                          {cert.name}
                        </h4>
                        <div className="cert-card-meta">
                          <p><strong>Issued By:</strong> {cert.issuer}</p>
                          <p><strong>Date:</strong> {cert.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Certifications;
