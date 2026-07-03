import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

const textureLoader = new THREE.TextureLoader();
const imageUrls = [
  "/images/jira.jpg",
  "/images/msproject.jpg",
  "/images/trello.jpg",
  "/images/excel.jpg",
  "/images/scrum.jpg",
  "/images/sixsigma.jpg",
  "/images/prince2.jpg",
  "/images/pmp.jpg",
];
const textures = imageUrls.map((url) => textureLoader.load(url));

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = [...Array(30)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };
    window.addEventListener("resize", handleResize);

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const workElem = document.getElementById("work");
      if (workElem) {
        const threshold = workElem.getBoundingClientRect().top;
        setIsActive(scrollY > threshold);
      }
    };

    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
  }, []);

  return (
    <div className="techstack" id="toolkit">
      <h2>My PM Toolkit</h2>
      <div className="toolkit-grid">
        <div className="toolkit-info toolkit-dashboard">
          {/* Tools & Software: Homepage-style SaaS Cards */}
          <div className="dashboard-widget tools-widget">
            <div className="widget-header">
              <span className="widget-dot green-dot"></span>
              <h4>Tools & Software (Homepage UI Visuals)</h4>
            </div>
            <div className="tools-homepage-grid">
              {/* Jira UI Card */}
              <div className="tool-homepage-card jira-ui">
                <div className="tool-ui-header">
                  <span className="tool-logo-dot blue"></span>
                  <span><span className="tk-symbol">🐞</span>Jira Software</span>
                </div>
                <div className="tool-ui-body image-body">
                  <img src="/images/jira-dashboard.jpg" alt="Jira Dashboard" className="tool-screenshot" />
                </div>
              </div>

              {/* Trello UI Card */}
              <div className="tool-homepage-card trello-ui">
                <div className="tool-ui-header">
                  <span className="tool-logo-dot cyan"></span>
                  <span><span className="tk-symbol">📌</span>Trello Board</span>
                </div>
                <div className="tool-ui-body image-body">
                  <img src="/images/trello-dashboard.jpg" alt="Trello Board" className="tool-screenshot" />
                </div>
              </div>

              {/* Asana UI Card */}
              <div className="tool-homepage-card asana-ui">
                <div className="tool-ui-header">
                  <span className="tool-logo-dot coral"></span>
                  <span><span className="tk-symbol">🎯</span>Asana Tasks</span>
                </div>
                <div className="tool-ui-body image-body">
                  <img src="/images/asana-tasks.jpg" alt="Asana Tasks" className="tool-screenshot" />
                </div>
              </div>

              {/* MS Project UI Card */}
              <div className="tool-homepage-card msp-ui">
                <div className="tool-ui-header">
                  <span className="tool-logo-dot green"></span>
                  <span><span className="tk-symbol">📅</span>MS Project</span>
                </div>
                <div className="tool-ui-body image-body">
                  <img src="/images/msproject-gantt.jpg" alt="MS Project Gantt" className="tool-screenshot" />
                </div>
              </div>

              {/* Excel UI Card */}
              <div className="tool-homepage-card excel-ui">
                <div className="tool-ui-header">
                  <span className="tool-logo-dot darkgreen"></span>
                  <span><span className="tk-symbol">📊</span>Excel Sheet</span>
                </div>
                <div className="tool-ui-body image-body">
                  <img src="/images/excel-sheet.jpg" alt="Excel Sheet" className="tool-screenshot" />
                </div>
              </div>

              {/* Slack UI Card */}
              <div className="tool-homepage-card slack-ui">
                <div className="tool-ui-header">
                  <span className="tool-logo-dot purple"></span>
                  <span><span className="tk-symbol">💬</span>Slack</span>
                </div>
                <div className="tool-ui-body image-body">
                  <img src="/images/slack.jpg" alt="Slack Dashboard" className="tool-screenshot" />
                </div>
              </div>

              {/* Google Meet UI Card */}
              <div className="tool-homepage-card meet-ui">
                <div className="tool-ui-header">
                  <span className="tool-logo-dot red"></span>
                  <span><span className="tk-symbol">📹</span>Google Meet</span>
                </div>
                <div className="tool-ui-body image-body">
                  <img src="/images/google-meet.jpg" alt="Google Meet Dashboard" className="tool-screenshot" />
                </div>
              </div>

              {/* Microsoft Teams UI Card */}
              <div className="tool-homepage-card teams-ui">
                <div className="tool-ui-header">
                  <span className="tool-logo-dot indigo"></span>
                  <span><span className="tk-symbol">💻</span>Microsoft Teams</span>
                </div>
                <div className="tool-ui-body image-body">
                  <img src="/images/ms-teams.jpg" alt="Microsoft Teams Dashboard" className="tool-screenshot" />
                </div>
              </div>
            </div>
          </div>

          {/* Methodologies Widget */}
          <div className="dashboard-widget methodologies-widget">
            <div className="widget-header">
              <span className="widget-dot blue-dot"></span>
              <h4>Methodologies</h4>
            </div>
            <div className="methodologies-cards-grid">
              {/* Agile: Sprint Iteration Loop */}
              <div className="method-card">
                <h5><span className="tk-symbol">🔄</span>Agile</h5>
                <div className="svg-diagram-container">
                  <svg viewBox="0 0 220 150" className="inline-svg-diagram">
                    <defs>
                      <marker id="agileArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#fbbf24" /></marker>
                    </defs>
                    <ellipse cx="110" cy="78" rx="58" ry="42" fill="none" stroke="rgba(59,130,246,0.15)" strokeWidth="18" />
                    <path d="M 110,36 A 58,42 0 1,1 52,78" fill="none" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#agileArrow)" />
                    <text x="110" y="72" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="800">Sprint</text>
                    <text x="110" y="88" textAnchor="middle" fill="#94a3b8" fontSize="8">Iterate → Deliver → Review</text>
                    <text x="110" y="26" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontWeight="700">PLAN</text>
                    <text x="186" y="82" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontWeight="700">BUILD</text>
                    <text x="110" y="135" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontWeight="700">REVIEW</text>
                    <text x="34" y="82" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontWeight="700">RETRO</text>
                    <circle cx="110" cy="36" r="3" fill="#3b82f6" /><circle cx="168" cy="78" r="3" fill="#3b82f6" />
                    <circle cx="110" cy="120" r="3" fill="#3b82f6" /><circle cx="52" cy="78" r="3" fill="#fbbf24" />
                  </svg>
                </div>
              </div>

              {/* Scrum: Sprint Cycle */}
              <div className="method-card">
                <h5><span className="tk-symbol">📋</span>Scrum</h5>
                <div className="svg-diagram-container">
                  <svg viewBox="0 0 220 150" className="inline-svg-diagram">
                    <defs>
                      <marker id="scrumArr" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><path d="M0,0 L7,2.5 L0,5" fill="#3b82f6" /></marker>
                    </defs>
                    <rect x="8" y="50" width="40" height="50" rx="5" fill="rgba(59,130,246,0.12)" stroke="#3b82f6" strokeWidth="1" />
                    <text x="28" y="70" textAnchor="middle" fill="#60a5fa" fontSize="7" fontWeight="700">BACK</text>
                    <text x="28" y="80" textAnchor="middle" fill="#60a5fa" fontSize="7" fontWeight="700">LOG</text>
                    <rect x="14" y="86" width="28" height="4" rx="1" fill="rgba(59,130,246,0.25)" />
                    <rect x="14" y="92" width="20" height="4" rx="1" fill="rgba(59,130,246,0.15)" />
                    <line x1="52" y1="75" x2="68" y2="75" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#scrumArr)" />
                    <circle cx="110" cy="75" r="35" fill="none" stroke="rgba(251,191,36,0.2)" strokeWidth="12" />
                    <path d="M 110,40 A 35,35 0 1,1 75,75" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4,2" />
                    <text x="110" y="72" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="800">SPRINT</text>
                    <text x="110" y="84" textAnchor="middle" fill="#94a3b8" fontSize="7">2-4 weeks</text>
                    <line x1="148" y1="75" x2="164" y2="75" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#scrumArr)" />
                    <rect x="168" y="50" width="42" height="50" rx="5" fill="rgba(16,185,129,0.12)" stroke="#10b981" strokeWidth="1" />
                    <text x="189" y="72" textAnchor="middle" fill="#10b981" fontSize="7" fontWeight="700">DONE</text>
                    <text x="189" y="84" textAnchor="middle" fill="#10b981" fontSize="6">Increment</text>
                    <text x="84" y="30" textAnchor="middle" fill="#cbd5e1" fontSize="6">Planning</text>
                    <text x="140" y="30" textAnchor="middle" fill="#cbd5e1" fontSize="6">Review</text>
                    <text x="110" y="125" textAnchor="middle" fill="#cbd5e1" fontSize="6">Daily Standup · Retro</text>
                  </svg>
                </div>
              </div>

              {/* Waterfall: Cascading Stages */}
              <div className="method-card">
                <h5><span className="tk-symbol">📐</span>Waterfall</h5>
                <div className="svg-diagram-container">
                  <svg viewBox="0 0 220 150" className="inline-svg-diagram">
                    {[
                      { x: 6, y: 18, w: 60, label: 'Requirements', color: '#3b82f6' },
                      { x: 36, y: 42, w: 60, label: 'Design', color: '#6366f1' },
                      { x: 66, y: 66, w: 60, label: 'Development', color: '#8b5cf6' },
                      { x: 96, y: 90, w: 60, label: 'Testing', color: '#a855f7' },
                      { x: 126, y: 114, w: 60, label: 'Deployment', color: '#10b981' },
                    ].map((s, i) => (
                      <g key={i}>
                        <rect x={s.x} y={s.y} width={s.w} height="20" rx="4" fill={`${s.color}22`} stroke={s.color} strokeWidth="1.2" />
                        <text x={s.x + s.w / 2} y={s.y + 13} textAnchor="middle" fill="#e2e8f0" fontSize="7" fontWeight="700">{s.label}</text>
                        {i < 4 && <line x1={s.x + s.w / 2 + 10} y1={s.y + 20} x2={s.x + s.w / 2 + 20} y2={s.y + 28} stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />}
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Hybrid: Linear + Agile Loop */}
              <div className="method-card">
                <h5><span className="tk-symbol">🔀</span>Hybrid</h5>
                <div className="svg-diagram-container">
                  <svg viewBox="0 0 220 150" className="inline-svg-diagram">
                    <defs>
                      <marker id="hybArr" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><path d="M0,0 L7,2.5 L0,5" fill="#94a3b8" /></marker>
                    </defs>
                    <rect x="10" y="55" width="36" height="22" rx="4" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" strokeWidth="1" />
                    <text x="28" y="69" textAnchor="middle" fill="#60a5fa" fontSize="7" fontWeight="700">Plan</text>
                    <line x1="48" y1="66" x2="62" y2="66" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#hybArr)" />
                    <ellipse cx="110" cy="70" rx="38" ry="32" fill="none" stroke="rgba(251,191,36,0.12)" strokeWidth="12" />
                    <ellipse cx="110" cy="70" rx="38" ry="32" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="5,3" />
                    <text x="110" y="66" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="800">Agile</text>
                    <text x="110" y="78" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="800">Sprints</text>
                    <text x="110" y="112" textAnchor="middle" fill="#94a3b8" fontSize="6">Iterative Delivery</text>
                    <line x1="150" y1="66" x2="165" y2="66" stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#hybArr)" />
                    <rect x="170" y="55" width="40" height="22" rx="4" fill="rgba(16,185,129,0.15)" stroke="#10b981" strokeWidth="1" />
                    <text x="190" y="69" textAnchor="middle" fill="#10b981" fontSize="7" fontWeight="700">Release</text>
                    <text x="110" y="20" textAnchor="middle" fill="#64748b" fontSize="7">Waterfall Governance + Agile Execution</text>
                  </svg>
                </div>
              </div>

              {/* Lean Six Sigma: DMAIC — spans full width */}
              <div className="method-card method-card-full">
                <h5><span className="tk-symbol">📉</span>Lean Six Sigma</h5>
                <div className="svg-diagram-container svg-diagram-wide">
                  <svg viewBox="0 0 480 110" className="inline-svg-diagram">
                    <defs>
                      <marker id="dmaicArr" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><path d="M0,0 L7,2.5 L0,5" fill="#fbbf24" /></marker>
                    </defs>
                    {[
                      { x: 20, label: 'Define', sub: 'Problem statement', color: '#3b82f6' },
                      { x: 110, label: 'Measure', sub: 'Collect data', color: '#6366f1' },
                      { x: 200, label: 'Analyse', sub: 'Root causes', color: '#a855f7' },
                      { x: 290, label: 'Improve', sub: 'Implement fix', color: '#f59e0b' },
                      { x: 380, label: 'Control', sub: 'Sustain gains', color: '#10b981' },
                    ].map((s, i) => (
                      <g key={i}>
                        <rect x={s.x} y="20" width="75" height="40" rx="6" fill={`${s.color}18`} stroke={s.color} strokeWidth="1.5" />
                        <text x={s.x + 37.5} y="38" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="800">{s.label[0]}</text>
                        <text x={s.x + 37.5} y="52" textAnchor="middle" fill="#94a3b8" fontSize="7">{s.label}</text>
                        <text x={s.x + 37.5} y="80" textAnchor="middle" fill="#64748b" fontSize="6">{s.sub}</text>
                        {i < 4 && <line x1={s.x + 78} y1="40" x2={s.x + 106} y2="40" stroke="#fbbf24" strokeWidth="1.5" markerEnd="url(#dmaicArr)" />}
                      </g>
                    ))}
                    <text x="240" y="102" textAnchor="middle" fill="#64748b" fontSize="7" fontWeight="600">Continuous Improvement Cycle</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Core Skills: PM Diagrams */}
          <div className="dashboard-widget skills-widget">
            <div className="widget-header">
              <span className="widget-dot amber-dot"></span>
              <h4>Core Skills (PM Diagrams)</h4>
            </div>
            <div className="pm-diagrams-grid">
              {/* RAID Log */}
              <div className="diagram-card">
                <h5><span className="tk-symbol">⚠️</span>RAID Log</h5>
                <div className="svg-diagram-container">
                  <svg viewBox="0 0 220 130" className="inline-svg-diagram">
                    <rect x="10" y="8" width="200" height="18" rx="3" fill="rgba(59,130,246,0.15)" />
                    <text x="42" y="21" textAnchor="middle" fill="#60a5fa" fontSize="8" fontWeight="800">Type</text>
                    <text x="100" y="21" textAnchor="middle" fill="#60a5fa" fontSize="8" fontWeight="800">Impact</text>
                    <text x="168" y="21" textAnchor="middle" fill="#60a5fa" fontSize="8" fontWeight="800">Mitigation</text>
                    <line x1="68" y1="8" x2="68" y2="118" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                    <line x1="132" y1="8" x2="132" y2="118" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                    {[
                      { y: 30, tag: 'Risk', tagColor: '#ef4444', impact: 'High', fix: 'Resource reallocation' },
                      { y: 52, tag: 'Assm', tagColor: '#fbbf24', impact: 'Med', fix: 'Validate bi-weekly' },
                      { y: 74, tag: 'Issue', tagColor: '#f97316', impact: 'High', fix: 'Escalate to sponsor' },
                      { y: 96, tag: 'Dep', tagColor: '#3b82f6', impact: 'Low', fix: 'Track in register' },
                    ].map((r, i) => (
                      <g key={i}>
                        <rect x="10" y={r.y} width="200" height="18" rx="2" fill={`${r.tagColor}08`} />
                        <rect x="20" y={r.y + 3} width="30" height="12" rx="3" fill={`${r.tagColor}20`} />
                        <text x="35" y={r.y + 12} textAnchor="middle" fill={r.tagColor} fontSize="7" fontWeight="700">{r.tag}</text>
                        <text x="100" y={r.y + 12} textAnchor="middle" fill="#e2e8f0" fontSize="7">{r.impact}</text>
                        <text x="168" y={r.y + 12} textAnchor="middle" fill="#94a3b8" fontSize="6.5">{r.fix}</text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Power/Interest Grid */}
              <div className="diagram-card">
                <h5><span className="tk-symbol">👥</span>Power / Interest Grid</h5>
                <div className="svg-diagram-container">
                  <svg viewBox="0 0 220 150" className="inline-svg-diagram">
                    <text x="6" y="78" textAnchor="middle" fill="#64748b" fontSize="7" fontWeight="700" transform="rotate(-90,6,78)">POWER →</text>
                    <text x="120" y="145" textAnchor="middle" fill="#64748b" fontSize="7" fontWeight="700">INTEREST →</text>
                    <rect x="30" y="10" width="88" height="60" rx="4" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.2)" strokeWidth="1" />
                    <rect x="122" y="10" width="88" height="60" rx="4" fill="rgba(239,68,68,0.1)" stroke="rgba(239,68,68,0.25)" strokeWidth="1" />
                    <rect x="30" y="74" width="88" height="56" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                    <rect x="122" y="74" width="88" height="56" rx="4" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
                    <text x="74" y="38" textAnchor="middle" fill="#fbbf24" fontSize="7.5" fontWeight="700">Keep</text>
                    <text x="74" y="49" textAnchor="middle" fill="#fbbf24" fontSize="7.5" fontWeight="700">Satisfied</text>
                    <text x="166" y="35" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="800">Manage</text>
                    <text x="166" y="47" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="800">Closely</text>
                    <text x="74" y="103" textAnchor="middle" fill="#64748b" fontSize="7.5" fontWeight="600">Monitor</text>
                    <text x="166" y="100" textAnchor="middle" fill="#60a5fa" fontSize="7.5" fontWeight="700">Keep</text>
                    <text x="166" y="111" textAnchor="middle" fill="#60a5fa" fontSize="7.5" fontWeight="700">Informed</text>
                  </svg>
                </div>
              </div>

              {/* Budget Control */}
              <div className="diagram-card">
                <h5><span className="tk-symbol">💰</span>Budget Control</h5>
                <div className="svg-diagram-container">
                  <svg viewBox="0 0 220 150" className="inline-svg-diagram">
                    <line x1="35" y1="15" x2="35" y2="115" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <line x1="35" y1="115" x2="210" y2="115" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <text x="30" y="20" textAnchor="end" fill="#64748b" fontSize="6">£20k</text>
                    <text x="30" y="50" textAnchor="end" fill="#64748b" fontSize="6">£15k</text>
                    <text x="30" y="80" textAnchor="end" fill="#64748b" fontSize="6">£10k</text>
                    <text x="30" y="110" textAnchor="end" fill="#64748b" fontSize="6">£5k</text>
                    <rect x="55" y="35" width="28" height="80" rx="4" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="1" />
                    <text x="69" y="130" textAnchor="middle" fill="#94a3b8" fontSize="6.5">Budget</text>
                    <text x="69" y="50" textAnchor="middle" fill="#60a5fa" fontSize="8" fontWeight="700">£15.9k</text>
                    <rect x="100" y="50" width="28" height="65" rx="4" fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="1" />
                    <text x="114" y="130" textAnchor="middle" fill="#94a3b8" fontSize="6.5">Actual</text>
                    <text x="114" y="65" textAnchor="middle" fill="#10b981" fontSize="8" fontWeight="700">£12.5k</text>
                    <rect x="145" y="50" width="28" height="30" rx="4" fill="rgba(251,191,36,0.15)" stroke="#fbbf24" strokeWidth="1" />
                    <text x="159" y="130" textAnchor="middle" fill="#94a3b8" fontSize="6.5">Variance</text>
                    <text x="159" y="70" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="700">£3.4k</text>
                    <circle cx="195" cy="60" r="8" fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="1.5" />
                    <text x="195" y="64" textAnchor="middle" fill="#10b981" fontSize="8" fontWeight="800">✓</text>
                    <text x="195" y="78" textAnchor="middle" fill="#10b981" fontSize="6" fontWeight="700">On Track</text>
                  </svg>
                </div>
              </div>

              {/* WBS Structure */}
              <div className="diagram-card">
                <h5><span className="tk-symbol">📅</span>WBS Structure</h5>
                <div className="svg-diagram-container">
                  <svg viewBox="0 0 220 120" className="inline-svg-diagram">
                    <rect x="75" y="4" width="70" height="20" rx="5" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="1.5" />
                    <text x="110" y="18" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontWeight="800">Project</text>
                    <line x1="110" y1="24" x2="110" y2="34" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    <line x1="38" y1="34" x2="182" y2="34" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    <line x1="38" y1="34" x2="38" y2="40" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    <line x1="110" y1="34" x2="110" y2="40" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    <line x1="182" y1="34" x2="182" y2="40" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    <rect x="10" y="40" width="56" height="18" rx="4" fill="rgba(99,102,241,0.15)" stroke="#6366f1" strokeWidth="1" />
                    <text x="38" y="53" textAnchor="middle" fill="#c7d2fe" fontSize="7" fontWeight="700">Initiation</text>
                    <rect x="82" y="40" width="56" height="18" rx="4" fill="rgba(168,85,247,0.15)" stroke="#a855f7" strokeWidth="1" />
                    <text x="110" y="53" textAnchor="middle" fill="#d8b4fe" fontSize="7" fontWeight="700">Execution</text>
                    <rect x="154" y="40" width="56" height="18" rx="4" fill="rgba(16,185,129,0.15)" stroke="#10b981" strokeWidth="1" />
                    <text x="182" y="53" textAnchor="middle" fill="#6ee7b7" fontSize="7" fontWeight="700">Closure</text>
                    <line x1="38" y1="58" x2="38" y2="68" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
                    <line x1="18" y1="68" x2="58" y2="68" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
                    <rect x="4" y="72" width="28" height="14" rx="3" fill="rgba(99,102,241,0.08)" stroke="rgba(99,102,241,0.3)" strokeWidth="0.8" />
                    <text x="18" y="82" textAnchor="middle" fill="#94a3b8" fontSize="5.5">Charter</text>
                    <rect x="44" y="72" width="28" height="14" rx="3" fill="rgba(99,102,241,0.08)" stroke="rgba(99,102,241,0.3)" strokeWidth="0.8" />
                    <text x="58" y="82" textAnchor="middle" fill="#94a3b8" fontSize="5.5">Scope</text>
                    <line x1="110" y1="58" x2="110" y2="68" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
                    <line x1="86" y1="68" x2="134" y2="68" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
                    <rect x="72" y="72" width="28" height="14" rx="3" fill="rgba(168,85,247,0.08)" stroke="rgba(168,85,247,0.3)" strokeWidth="0.8" />
                    <text x="86" y="82" textAnchor="middle" fill="#94a3b8" fontSize="5.5">Design</text>
                    <rect x="96" y="72" width="28" height="14" rx="3" fill="rgba(168,85,247,0.08)" stroke="rgba(168,85,247,0.3)" strokeWidth="0.8" />
                    <text x="110" y="82" textAnchor="middle" fill="#94a3b8" fontSize="5.5">Build</text>
                    <rect x="120" y="72" width="28" height="14" rx="3" fill="rgba(168,85,247,0.08)" stroke="rgba(168,85,247,0.3)" strokeWidth="0.8" />
                    <text x="134" y="82" textAnchor="middle" fill="#94a3b8" fontSize="5.5">Test</text>
                    <line x1="182" y1="58" x2="182" y2="68" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
                    <line x1="166" y1="68" x2="198" y2="68" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
                    <rect x="152" y="72" width="28" height="14" rx="3" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.3)" strokeWidth="0.8" />
                    <text x="166" y="82" textAnchor="middle" fill="#94a3b8" fontSize="5.5">Report</text>
                    <rect x="184" y="72" width="28" height="14" rx="3" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.3)" strokeWidth="0.8" />
                    <text x="198" y="82" textAnchor="middle" fill="#94a3b8" fontSize="5.5">Lessons</text>
                  </svg>
                </div>
              </div>

              {/* Root Cause Analysis: Fishbone — spans full width */}
              <div className="diagram-card diagram-card-full">
                <h5><span className="tk-symbol">🔍</span>Root Cause Analysis (Fishbone / Ishikawa)</h5>
                <div className="svg-diagram-container svg-diagram-wide">
                  <svg viewBox="0 0 480 120" className="inline-svg-diagram">
                    <line x1="40" y1="60" x2="430" y2="60" stroke="#3b82f6" strokeWidth="2.5" />
                    <rect x="430" y="42" width="40" height="36" rx="5" fill="rgba(239,68,68,0.15)" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="450" y="57" textAnchor="middle" fill="#ef4444" fontSize="7" fontWeight="800">PRO</text>
                    <text x="450" y="67" textAnchor="middle" fill="#ef4444" fontSize="7" fontWeight="800">BLEM</text>
                    {[
                      { x: 100, label: 'People', sub1: 'Training', sub2: 'Capacity' },
                      { x: 220, label: 'Process', sub1: 'Workflow', sub2: 'Approvals' },
                      { x: 340, label: 'Equipment', sub1: 'Tools', sub2: 'Systems' },
                    ].map((b, i) => (
                      <g key={`u${i}`}>
                        <line x1={b.x} y1="14" x2={b.x + 40} y2="60" stroke="rgba(59,130,246,0.4)" strokeWidth="1.5" />
                        <text x={b.x - 4} y="12" textAnchor="middle" fill="#60a5fa" fontSize="8" fontWeight="700">{b.label}</text>
                        <line x1={b.x + 8} y1="30" x2={b.x + 18} y2="42" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                        <text x={b.x - 6} y="34" textAnchor="end" fill="#64748b" fontSize="5.5">{b.sub1}</text>
                        <line x1={b.x + 20} y1="18" x2={b.x + 26} y2="28" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                        <text x={b.x + 6} y="20" textAnchor="end" fill="#64748b" fontSize="5.5">{b.sub2}</text>
                      </g>
                    ))}
                    {[
                      { x: 100, label: 'Materials', sub1: 'Quality', sub2: 'Supply' },
                      { x: 220, label: 'Environment', sub1: 'Culture', sub2: 'Conditions' },
                      { x: 340, label: 'Management', sub1: 'Oversight', sub2: 'Decisions' },
                    ].map((b, i) => (
                      <g key={`l${i}`}>
                        <line x1={b.x} y1="106" x2={b.x + 40} y2="60" stroke="rgba(251,191,36,0.35)" strokeWidth="1.5" />
                        <text x={b.x - 4} y="114" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="700">{b.label}</text>
                        <line x1={b.x + 8} y1="90" x2={b.x + 18} y2="78" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                        <text x={b.x - 6} y="92" textAnchor="end" fill="#64748b" fontSize="5.5">{b.sub1}</text>
                        <line x1={b.x + 20} y1="98" x2={b.x + 26} y2="88" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                        <text x={b.x + 6} y="102" textAnchor="end" fill="#64748b" fontSize="5.5">{b.sub2}</text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isDesktop && (
          <div className="toolkit-visual">
            <Canvas
              shadows
              gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
              camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
              onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
              className="tech-canvas"
            >
              <ambientLight intensity={1} />
              <spotLight
                position={[20, 20, 25]}
                penumbra={1}
                angle={0.2}
                color="white"
                castShadow
                shadow-mapSize={[512, 512]}
              />
              <directionalLight position={[0, 5, -4]} intensity={2} />
              <Physics gravity={[0, 0, 0]}>
                <Pointer isActive={isActive} />
                {spheres.map((props, i) => (
                  <SphereGeo
                    key={i}
                    {...props}
                    material={materials[Math.floor(Math.random() * materials.length)]}
                    isActive={isActive}
                  />
                ))}
              </Physics>
              <Environment
                files="/models/char_enviorment.hdr"
                environmentIntensity={0.5}
                environmentRotation={[0, 4, 2]}
              />
              <EffectComposer enableNormalPass={false}>
                <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
              </EffectComposer>
            </Canvas>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechStack;
