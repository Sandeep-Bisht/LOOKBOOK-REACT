import React, { useEffect, useRef } from 'react';
import '@css/user/homepage.css'
import { Link } from 'react-router-dom';

const EmergingArtist = ({artists}) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let progress = 7;
    let startX = 0;
    let active = 0;
    let isDown = false;
    let loading = true;

    const speedWheel = 0.07;
    const speedDrag = -0.15;

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
        loading = false;
    };

    animate();

    $items.forEach((item, i) => {
      item.addEventListener("click", () => {
        progress = (i / $items.length) * 100 + 10;
        animate();
      });
    });

    const handleWheel = (e) => {
      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      let runCarousel = sectionTop <= 0 && sectionTop >= -1200

      if(runCarousel){
        const wheelProgress = e.deltaY * speedWheel;
        progress = progress + wheelProgress;
        animate();
      }
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
      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      let runCarousel = sectionTop <= 0 && sectionTop >= -1200

      if(runCarousel){
      if (e.key === "ArrowLeft") {
        progress -= 10;
      } else if (e.key === "ArrowRight") {
        progress += 10;
      }
      animate();
    }
    };

    document.addEventListener("wheel", handleWheel);
    // window.addEventListener('scroll', handleWheel);
    // document.addEventListener("mousedown", handleMouseDown);
    // document.addEventListener("mousemove", handleMouseMove);
    // document.addEventListener("mouseup", handleMouseUp);
    // document.addEventListener("touchstart", handleMouseDown);
    // document.addEventListener("touchmove", handleMouseMove);
    // document.addEventListener("touchend", handleMouseUp);
    // document.addEventListener('keydown', handleArrowKeys);

    return () => {
      document.removeEventListener("wheel", handleWheel);
      // window.removeEventListener('scroll', handleWheel);
      // document.removeEventListener("mousedown", handleMouseDown);
      // document.removeEventListener("mousemove", handleMouseMove);
      // document.removeEventListener("mouseup", handleMouseUp);
      // document.removeEventListener("touchstart", handleMouseDown);
      // document.removeEventListener("touchmove", handleMouseMove);
      // document.removeEventListener("touchend", handleMouseUp);
      // document.removeEventListener('keydown', handleArrowKeys);
    };
  }, []);

    return (
        <>
        {/* <section className='custom-section'></section> */}
                <section className={`usr-emerging-artist usr-overlap-section`} ref={sectionRef}>
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
                                      {artists && Array.isArray(artists) && artists.length > 0 && artists.map((item,ind)=>{
                                        return(
                                          <Link className="usr-emerging-artist-carousel-item common-cursor-pointer" key={ind} to={`/services/${item?.featuredService ? item?.featuredService?.slug : item?.services[0]?.slug}/${item?.profile_id?.alias}`}>
                                            <div className="usr-emerging-artist-carousel-box">
                                                <img className="img-fluid" src={item?.gallery[0] ? item?.gallery[0].url : null} />
                                                <p>{item?.profile_id?.fullName ? item?.profile_id?.fullName : null }</p>
                                            </div>
                                        </Link>
                                        )
                                      })}
                                    </div>
                                </div>
                                {/* ------------------paste------------------------ */}
                            </div>
                        </div>
                    </div>
                </section>
        {/* <section className='custom-section'></section> */}
        </>

    );
};

export default EmergingArtist;