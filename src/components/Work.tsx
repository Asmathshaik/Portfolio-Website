import "./styles/Work.css";
import WorkImage from "./WorkImage";

const Work = () => {
  const projects = [
    {
      title: "SecureLife Insurance Transformation Programme",
      category: "PRINCE2 Agile Transformation",
      description: "Leading a £4M, 28-day legacy-to-cloud transformation for SecureLife Insurance Ltd, replacing a 20-year-old claims system. Coordinated 6 vendors and managed 12 stakeholder groups (including Board-level & FCA regulators) to achieve 99.9% uptime (saving £700k/week), full compliance (saving a £500k fine), and automated 70% of operations for a £31M 5-year benefit.",
      tools: "PRINCE2 Agile, £4M Budget Control, Vendor Coordination (6 Vendors), Stakeholder & Risk Management, FCA Regulatory Compliance",
      image: "/images/securelife_project.jpg"
    },
    {
      title: "Policy Information Letter Amendment",
      category: "Hybrid Delivery (Waterfall + Agile)",
      description: "Spearheaded a £15,950 policy amendment project across four banking products (CM, Halifax, SW, Barclays), successfully mitigating risk and cutting complaints by resolving inaccurate letter communications.",
      tools: "Excel, Word, RAID Logs, RAG Dashboards, Governance Gates, Client UAT",
      image: "/images/policy_project.jpg"
    },
    {
      title: "Cyber Risk Assessment Tool",
      category: "Web-Based Risk Assessment App",
      description: "Led the definition and creation of a web application designed to assess cyber risk levels for small to medium business owners based on CIS Controls v8 IG1, featuring a 15-question diagnostic and PDF report generation.",
      tools: "Python, Flask, HTML, CSS, JavaScript, ReportLab, CIS Controls v8",
      image: "/images/cyber_project.jpg"
    },
    {
      title: "Smart Weather App",
      category: "Agile Scrum Management",
      description: "Managed the end-to-end development of a smart weather dashboard as Scrum Master, building the product backlog, running sprints in Jira, and facilitating core agile ceremonies.",
      tools: "Jira, Trello, Confluence, Backlog Refinement, Burndown Charts",
      image: "/images/weather_project.jpg"
    },
    {
      title: "Improving Hospital POS",
      category: "Lean Six Sigma Optimization",
      description: "Applied Lean Six Sigma DMAIC methodology to optimize hospital Point-of-Sale checkouts, mapping current states and executing time-motion studies to minimize delays.",
      tools: "Lean DMAIC, Process Mapping, Ishikawa Diagrams, Root Cause Analysis",
      image: "/images/pos_project.jpg"
    },
    {
      title: "Accenture Job Simulation",
      category: "Agile Project Management",
      description: "Coordinated a simulated brand launch, developing stakeholder matrices, formulating risk registers, and setting up agile roadmap boards to deliver features on-time.",
      tools: "Jira, Stakeholder Matrix, Risk Assessment, Status Reporting",
      image: "/images/accenture_project.jpg"
    },
    {
      title: "Siemens Project Manager Simulation",
      category: "Waterfall Project Management",
      description: "Simulated managing safety-critical train tracking software development roadmap using Waterfall methodology, governing milestones, critical paths, and Gantt charts.",
      tools: "Gantt Charts, Critical Path Method, Change Control Board, WBS",
      image: "/images/siemens_project.jpg"
    }
  ];

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2 className="work-section-title">
          My <span>Portfolio</span>
        </h2>
        <p className="work-section-subtitle">
          Key project management initiatives, simulated engagements, and technical tools.
        </p>
        <div className="work-grid">
          {projects.map((project, index) => (
            <div className="project-card glass-panel" key={index}>
              <div className="project-media">
                <WorkImage image={project.image} alt={project.title} />
              </div>
              <div className="project-info">
                <span className="project-category">{project.category}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tools-section">
                  <h4>Tools & Governance:</h4>
                  <p>{project.tools}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
