import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;

  const paras = document.querySelectorAll(".para");
  const titles = document.querySelectorAll(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 85%" : "top 80%";

  paras.forEach((para) => {
    gsap.fromTo(
      para,
      { autoAlpha: 0, y: 25 },
      {
        autoAlpha: 1,
        y: 0,
        scrollTrigger: {
          trigger: para,
          start: TriggerStart,
          toggleActions: "play none none none",
        },
        duration: 0.8,
        ease: "power2.out",
      }
    );
  });

  titles.forEach((title) => {
    gsap.fromTo(
      title,
      { autoAlpha: 0, y: 25 },
      {
        autoAlpha: 1,
        y: 0,
        scrollTrigger: {
          trigger: title,
          start: TriggerStart,
          toggleActions: "play none none none",
        },
        duration: 0.6,
        ease: "power2.out",
      }
    );
  });
}
