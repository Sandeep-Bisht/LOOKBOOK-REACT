import React, { useRef, useState } from 'react';
import { Link, Outlet, useLoaderData, useOutletContext } from "react-router-dom";
import Slider from "react-slick";

const ArtistFilter = () => {
  const services = useLoaderData()
  const [ wishlist ] = useOutletContext();
  const [activeIndex, setActiveIndex] = useState(0);
  const linkRefs = useRef([]);

  const settings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerPadding: "0px",
    afterChange: (index) => setActiveIndex(index),
  };


  return (
    <>
    <section className="usr-artist-filter">
      <div className="container">
        <div className="row">
        <div className="col-lg-12">
  <Slider className="" {...settings}>
    <Link
      ref={(el) => (linkRefs.current[0] = el)}
      className={`btn ${activeIndex === 0 ? 'active' : ""}`}
      to="/services"
      onClick={() => setActiveIndex(0)}
    >
      All Services
    </Link>
    {services &&
      services.map((item, index) => (
        <Link
          key={index}
          ref={(el) => (linkRefs.current[index + 1] = el)}
          onClick={() => setActiveIndex(index + 1)}
          to={`/services/${item._id}`}
          className={`d-flex btn ${activeIndex === index + 1 ? 'active' : ''}`}
        >
          <div className="">
            <img src={item?.icon?.thumbnailUrl} className="img-fluid service-icons" alt={item.title} />
          </div>
          <span>{item.title}</span>
        </Link>
      ))}
  </Slider>
</div>

        </div>
      </div>
    </section>
    <Outlet context={[wishlist]} />
    </>
  );
};

export default ArtistFilter;
