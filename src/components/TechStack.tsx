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
              {/* PRINCE2 Agile */}
              <div className="method-card">
                <h5><span className="tk-symbol">🔄</span>PRINCE2 Agile</h5>
                <div className="mini-diagram-img-container">
                  <img src="/images/prince2.jpg" alt="PRINCE2 Agile" className="methodology-card-image" />
                </div>
              </div>

              {/* £4M Budget Management */}
              <div className="method-card">
                <h5><span className="tk-symbol">💰</span>£4M Budget Management</h5>
                <div className="mini-diagram-img-container">
                  <img src="/images/budget-control.jpg" alt="£4M Budget Management" className="methodology-card-image" />
                </div>
              </div>

              {/* Stakeholder Management */}
              <div className="method-card">
                <h5><span className="tk-symbol">👥</span>Stakeholder Management</h5>
                <div className="mini-diagram-img-container">
                  <img src="/images/power-interest-grid.jpg" alt="Stakeholder Management" className="methodology-card-image" />
                </div>
              </div>

              {/* Vendor Coordination */}
              <div className="method-card">
                <h5><span className="tk-symbol">🤝</span>Vendor Coordination</h5>
                <div className="mini-diagram-img-container">
                  <img src="/images/vendor-coordination.jpg" alt="Vendor Coordination" className="methodology-card-image" />
                </div>
              </div>

              {/* Agile: Mini Sprint Board */}
              <div className="method-card">
                <h5><span className="tk-symbol">🔄</span>Agile</h5>
                <div className="mini-diagram-img-container">
                  <img src="/images/agile-diagram.jpg" alt="Agile Methodology Diagram" className="methodology-card-image" />
                </div>
              </div>

              {/* Scrum: Burndown Chart */}
              <div className="method-card">
                <h5><span className="tk-symbol">📋</span>Scrum</h5>
                <div className="mini-diagram-img-container">
                  <img src="/images/scrum-diagram.jpg" alt="Scrum Process Diagram" className="methodology-card-image" />
                </div>
              </div>

              {/* Waterfall: Stage-Gate Process */}
              <div className="method-card">
                <h5><span className="tk-symbol">📐</span>Waterfall</h5>
                <div className="mini-diagram-img-container">
                  <img src="/images/waterfall-stage-gate.jpg" alt="Waterfall Stage-Gate" className="methodology-card-image" />
                </div>
              </div>

              {/* Hybrid: Combined Loop */}
              <div className="method-card">
                <h5><span className="tk-symbol">🔀</span>Hybrid</h5>
                <div className="mini-diagram-img-container">
                  <img src="/images/hybrid-diagram.jpg" alt="Hybrid combined workflow" className="methodology-card-image" />
                </div>
              </div>

              {/* Lean Six Sigma: Regression & DMAIC — spans full width */}
              <div className="method-card method-card-full">
                <h5><span className="tk-symbol">📉</span>Lean Six Sigma</h5>
                <div className="mini-diagram-img-container">
                  <img src="/images/sixsigma-diagram.jpg" alt="Lean Six Sigma DMAIC Diagram" className="methodology-card-image methodology-card-image-wide" />
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
              {/* Risk Management / RAID Log */}
              <div className="diagram-card">
                <h5><span className="tk-symbol">⚠️</span>Risk / RAID Management (RAID Log)</h5>
                <div className="diagram-img-container">
                  <img src="/images/raid-log.jpg" alt="RAID Log Template" className="skills-card-image" />
                </div>
              </div>

              {/* Stakeholder Engagement: Power/Interest Grid */}
              <div className="diagram-card">
                <h5><span className="tk-symbol">👥</span>Stakeholder (Power/Interest Grid)</h5>
                <div className="diagram-img-container">
                  <img src="/images/power-interest-grid.jpg" alt="Power/Interest Stakeholder Grid" className="skills-card-image" />
                </div>
              </div>

              {/* Budget Control: Budget vs Actual tracker */}
              <div className="diagram-card">
                <h5><span className="tk-symbol">💰</span>Budget Control (Budget vs Actual)</h5>
                <div className="diagram-img-container">
                  <img src="/images/budget-control.jpg" alt="Budget Control Chart" className="skills-card-image" />
                </div>
              </div>

              {/* Project Planning: Work Breakdown Structure (WBS) */}
              <div className="diagram-card">
                <h5><span className="tk-symbol">📅</span>Project Planning (WBS Structure)</h5>
                <div className="diagram-img-container">
                  <img src="/images/wbs-structure.jpg" alt="WBS Structure diagram" className="skills-card-image" />
                </div>
              </div>

              {/* Root Cause Analysis: Ishikawa / Fishbone Diagram */}
              <div className="diagram-card diagram-card-full">
                <h5><span className="tk-symbol">🔍</span>Root Cause Analysis (Fishbone / Ishikawa)</h5>
                <div className="diagram-img-container">
                  <img src="/images/fishbone-rca.jpg" alt="Ishikawa Fishbone Diagram" className="skills-card-image skills-card-image-wide" />
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
