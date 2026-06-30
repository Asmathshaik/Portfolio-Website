import { useState, useEffect, useRef } from "react";
import { FaAward, FaPlay } from "react-icons/fa6";
import { TbNotes } from "react-icons/tb";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import "./styles/Landing.css";

const Landing = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.play().then(() => {
        setHasStarted(true);
      }).catch(err => {
        console.warn("Play failed:", err);
      });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

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
              <div className="profile-image-wrapper" style={{ position: "relative" }}>
                <video
                  ref={videoRef}
                  src="/images/profile_video.mp4"
                  muted={isMuted}
                  playsInline
                  className="profile-photo"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                
                {!hasStarted && (
                  <div className="video-play-overlay" onClick={handlePlayClick} data-cursor="disable">
                    <button className="video-play-btn" aria-label="Play Introduction Video">
                      <FaPlay />
                    </button>
                    <span className="video-play-text">Play Intro Video</span>
                  </div>
                )}

                {hasStarted && (
                  <button 
                    className="video-volume-btn" 
                    onClick={toggleMute} 
                    aria-label="Toggle Volume"
                    data-cursor="disable"
                  >
                    {isMuted ? <IoVolumeMuteOutline /> : <IoVolumeHighOutline />}
                  </button>
                )}
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
