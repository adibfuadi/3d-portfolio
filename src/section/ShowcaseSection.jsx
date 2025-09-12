import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ShowcaseSection = () => {
  const sectionRef = useRef(null);
  const rydeRef = useRef(null);
  const libraryRef = useRef(null);
  const ycDirectoryRef = useRef(null);

  useGSAP(() => {
    // Animation for the main section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animations for each app showcase
    const cards = [rydeRef.current, libraryRef.current, ycDirectoryRef.current];

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

  const handleWorknest = () => {
    window.open('https://worknest-ashy.vercel.app/', '_blank'); // Ganti URL dengan link yang Anda inginkan
  };
  const handleRedefine = () => {
    window.open('https://redifined.vercel.app', '_blank'); // Ganti URL dengan link yang Anda inginkan
  };

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          <div ref={rydeRef} className="first-project-wrapper cursor-pointer group relative" onClick={handleWorknest}>
            <div className="image-wrapper">
              <img src="/images/project_worknest.png" alt="Ryde App Interface" />
            </div>
            <div className="text-content">
            <h2>
              B2B Project Management System
              {/* Tooltip */}
              <span
                className="
                  absolute left-1/2 top-1/2 -translate-x-1/2 mt-2 
                  hidden group-hover:block
                  bg-black/70 text-white text-sm px-2 py-1 rounded 
                  whitespace-nowrap z-10
                "
              >
                Click to see project details
              </span>
            </h2>
              
              <p className="text-white-50 md:text-xl">
                A web app built with React, MongoDB, Express, Node for a fast,
                user-friendly experience.
              </p>
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden">
            <div className="first-project-wrapper w-full" ref={libraryRef}>
              <div className="image-wrapper bg-[#ffdd04]">
                <img
                  src="/images/airplane.png"
                  alt="Library Management Platform"
                />
              </div>
              <h2>
              Discover & Book Your Perfect Holiday with AirPlane
              </h2>
            </div>

            <div className="first-project-wrapper w-full cursor-pointer group relative" ref={ycDirectoryRef} onClick={handleRedefine}>
              <div className="image-wrapper bg-[#FFE7EB]">
                <img src="/images/web-game.png" alt="YC Directory App" />
              </div>
              <h2>
                Redefine - A Gaming Showcase App
                <span
                className="
                  absolute left-1/2 top-1/2 -translate-x-1/2 mt-2 
                  hidden group-hover:block
                  bg-black/70 text-white text-sm px-2 py-1 rounded 
                  whitespace-nowrap z-10
                "
              >
                Click to see project details
              </span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseSection;