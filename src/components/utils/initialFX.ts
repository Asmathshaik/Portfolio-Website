import gsap from "gsap";

export function initialFX() {
  document.body.style.overflowY = "auto";

  const mainElem = document.getElementsByTagName("main")[0];
  if (mainElem) {
    mainElem.classList.add("main-active");
  }

  const tl = gsap.timeline();

  // Dark blue background transition
  gsap.to("body", {
    backgroundColor: "#060a13",
    duration: 0.5,
    delay: 0.1,
  });

  // Animate Greeting, Name, Subtitle
  tl.fromTo(
    [".greeting", ".name", ".subtitle"],
    { opacity: 0, y: 25 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power2.out",
    }
  );

  // Stagger Cert Badges
  tl.fromTo(
    ".cert-badge",
    { opacity: 0, scale: 0.92, y: 15 },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: "power2.out",
    },
    "-=0.4"
  );

  // Hero action buttons
  tl.fromTo(
    ".hero-actions a",
    { opacity: 0, y: 15 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: "power2.out",
    },
    "-=0.3"
  );

  // Profile Video Card
  tl.fromTo(
    ".hero-visual",
    { opacity: 0, x: 25, scale: 0.96 },
    {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
    },
    "-=0.6"
  );

  // Navigation header & floating widgets
  tl.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0, y: -15 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
    },
    "-=0.5"
  );
}
