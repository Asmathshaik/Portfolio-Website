import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline"></div>
          <div className="career-info-box">
            <div className="career-dot"></div>
            <div className="career-info-in">
              <div className="career-role">
                <h4>Project Management Intern</h4>
                <h5>London Success Academy</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Leading a £15,950 Policy Information Letter amendment project across 4 banking products (CM, Halifax, SW, Barclays) using a structured 4-sprint hybrid delivery plan, maintaining weekly RAID logs and RAG dashboards.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-dot"></div>
            <div className="career-info-in">
              <div className="career-role">
                <h4>Assistant to Manager (Volunteer)</h4>
                <h5>Carriers of Hope</h5>
              </div>
              <h3>2025 - 2026</h3>
            </div>
            <p>
              Maintained accurate program data, managed scheduling and stakeholder communications, and coordinated logistics for multiple concurrent community initiatives.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-dot"></div>
            <div className="career-info-in">
              <div className="career-role">
                <h4>Project Community Digital Volunteer</h4>
                <h5>Coventry Independent Advice Services</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Delivered one-to-one digital support sessions to help vulnerable community members access services, partnering with management on community program planning.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-dot"></div>
            <div className="career-info-in">
              <div className="career-role">
                <h4>Project Manager Trainee</h4>
                <h5>Fortray, Simplilearn, Kreativstorm</h5>
              </div>
              <h3>2023 - 2024</h3>
            </div>
            <p>
              Developed and executed project plans, conducted risk assessments, implemented mitigation strategies to reduce schedule slippage, and organized audit-ready documentation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
