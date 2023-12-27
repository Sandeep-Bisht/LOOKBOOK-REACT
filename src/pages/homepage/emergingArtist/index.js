import React, { useEffect, useRef,useState } from 'react';
import '@css/user/homepage.css'

const EmergingArtist = () => {
  const [isNextSectionVisible, setNextSectionVisible] = useState(false);
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    let progress = 7;
    let startX = 0;
    let active = 0;
    let isDown = false;

    const speedWheel = 0.07;
    const speedDrag = -0.15;
    const thresholdToShowNextSection = 90;

    const getZindex = (array, index) =>
      array.map((_, i) => (index === i ? array.length : array.length - Math.abs(index - i)));

    const $items = document.querySelectorAll(".usr-emerging-artist-carousel-item");
    const $cursors = document.querySelectorAll(".cursor");

    const displayItems = (item, index, active) => {
      const zIndex = getZindex([...$items], active)[index];
      item.style.setProperty("--zIndex", zIndex);
      item.style.setProperty("--active", (index - active) / $items.length);
    };

    const animate = () => {
      progress = Math.max(0, Math.min(progress, 90));
      active = Math.floor((progress / 100) * $items.length);

      $items.forEach((item, index) => displayItems(item, index, active));

      // Check if progress has reached the threshold to show the next section
      if (progress >= thresholdToShowNextSection && !isNextSectionVisible) {
        setNextSectionVisible(true);
      } else if (progress < thresholdToShowNextSection && isNextSectionVisible) {
        setNextSectionVisible(false);
      }

      // Check if all slides are scrolled, and set sticky accordingly
      if (progress >= 100) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    animate();

    $items.forEach((item, i) => {
      item.addEventListener("click", () => {
        progress = (i / $items.length) * 100 + 10;
        animate();
      });
    });

    const handleWheel = (e) => {
      const wheelProgress = e.deltaY * speedWheel;
      progress = progress + wheelProgress;
      animate();
    };

    const handleMouseMove = (e) => {
      $cursors.forEach(($cursor) => {
        $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      });

      if (!isDown) return;
      const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const mouseProgress = (x - startX) * speedDrag;
      progress = progress + mouseProgress;
      startX = x;
      animate();
    };

    const handleMouseDown = (e) => {
      isDown = true;
      startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    };

    const handleMouseUp = () => {
      isDown = false;
    };

    const handleArrowKeys = (e) => {
      if (e.key === "ArrowLeft") {
        progress -= 10;
      } else if (e.key === "ArrowRight") {
        progress += 10;
      }
      animate();
    };

    const cursor = document.querySelector(".custom-cursor");

    document.addEventListener("wheel", handleWheel);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchstart", handleMouseDown);
    document.addEventListener("touchmove", handleMouseMove);
    document.addEventListener("touchend", handleMouseUp);
    document.addEventListener('keydown', handleArrowKeys);

    // Use Intersection Observer to detect when the section is in view
    const sectionRef = document.querySelector(".usr-emerging-artist");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSticky(false);
          }
        });
      },
      { threshold: 0 } // Change threshold as needed
    );

    if (sectionRef) {
      observer.observe(sectionRef);
    }

    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchstart", handleMouseDown);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("touchend", handleMouseUp);
      document.removeEventListener('keydown', handleArrowKeys);
      if (sectionRef) {
        observer.unobserve(sectionRef);
      }
    };
  }, [isNextSectionVisible]);

      
     
    return (
        <>
                
        
                <section className={`usr-emerging-artist usr-overlap-section ${isSticky ? 'sticky' : ''}`}>

                    <div className="container-fluid">
                        <div className="row d-none">
                            <div className="col-lg-12">
                                <h2 className="usr-common-heading text-center">
                                    Emerging Artist
                                </h2>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                {/* -----------------------copy------------------ */}
                                <div className="usr-emerging-artist-wrapper mt-lg-4">
                                <h2 className="usr-common-heading text-center">
                                    Emerging Artist
                                </h2>
                                    <div className="usr-emerging-artist-custom-cursor" />
                                    <div className="usr-emerging-artist-carousel">
                                        <div className="usr-emerging-artist-carousel-item" data-description="Learn about my skills and goals!">
                                            <div className="usr-emerging-artist-carousel-box">
                                                <img className="img-fluid" src="images/circular-slider/Meru Jain.jpeg" />
                                                <p>Meru Jain</p>
                                            </div>
                                        </div>
                                        <div className="usr-emerging-artist-carousel-item" data-description="Get to know about me!">
                                            <div className="usr-emerging-artist-carousel-box">
                                                <img className="img-fluid" src="images/circular-slider/Saaba Arora.jpeg" />
                                                <p>Saaba Arora</p>
                                            </div>
                                        </div>
                                        <div className="usr-emerging-artist-carousel-item" data-description="Some of the models and assets I created in the past.">
                                            <div className="usr-emerging-artist-carousel-box">
                                                <img className="img-fluid" src="images/circular-slider/Jazz Wahan.jpeg" />
                                                <p>Jazz Wahan</p>
                                            </div>
                                        </div>
                                        <div className="usr-emerging-artist-carousel-item" data-description="Our award winning Jam Game! - Enhancer Gaming Hackathon 2023">
                                            <div className="usr-emerging-artist-carousel-box">
                                                <img className="img-fluid" src="images/circular-slider/Nazrana Bhagu.jpeg" />
                                                <p>Nazrana Bhagu</p>
                                            </div>
                                        </div>
                                        <div className="usr-emerging-artist-carousel-item" data-description="Unforgettable VR experience of being an Ape who has guns! - BUG Spring Jam 2023">
                                            <div className="usr-emerging-artist-carousel-box">
                                                <img className="img-fluid" src="images/circular-slider/Pankhi Bhavnani.jpeg" />
                                                <p>Pankhi Bhavnani</p>
                                            </div>
                                        </div>
                                        <div className="usr-emerging-artist-carousel-item" data-description="Fight off the endless waves of demons in this procedurally generated hotel! - BUG Fall Jam 2022">
                                            <div className="usr-emerging-artist-carousel-box">
                                                <img className="img-fluid" src="images/circular-slider/Akash Kapoor.jpeg" />
                                                <p>Akash Kapoor</p>
                                            </div>
                                        </div>
                                        <div className="usr-emerging-artist-carousel-item" data-description="Fight off the endless waves of demons in this procedurally generated hotel! - BUG Fall Jam 2022">
                                            <div className="usr-emerging-artist-carousel-box">
                                                <img className="img-fluid" src="images/circular-slider/Suhani Sood.jpeg" />
                                                <p>Suhani Sood</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/* ------------------paste------------------------ */}
                            </div>
                        </div>
                    </div>
                </section>

        </>

    );
};

export default EmergingArtist;