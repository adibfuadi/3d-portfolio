import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { showcaseProjects } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const ShowcaseSection = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Each card fades up on scroll; cards in the same row are offset
    // slightly so the grid reveals diagonally instead of all at once.
    gsap.utils.toArray(".showcase-card").forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          delay: 0.15 * (index % 2),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          {showcaseProjects.map(({ title, desc, imgPath, url }) => {
            // A project with a live demo renders as a real link: keyboard
            // accessible, middle-clickable, and no popup blocker to fight.
            const Wrapper = url ? "a" : "div";

            return (
              <Wrapper
                key={title}
                className={`showcase-card ${url ? "is-clickable" : ""}`}
                {...(url && {
                  href: url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
              >
                <div className="image-wrapper">
                  <img src={imgPath} alt={title} loading="lazy" />
                </div>

                <div className="text-content">
                  <h2>{title}</h2>
                  <p>{desc}</p>
                  {url && (
                    <span className="live-link">
                      Live demo
                      {/* inlined so `currentColor` follows the link colour */}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  )}
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShowcaseSection;
