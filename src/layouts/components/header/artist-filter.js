import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";


const ArtistFilter = ({ services }) => {


  const settings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerPadding: "0px",
  };


  return (
    <section className="usr-artist-filter">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <Slider className="" {...settings}>
              <Link
                className="btn"
                to={"/artists"}
              >
                All Artist
              </Link>
              {services && services.length > 0 &&
                services.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      to={`/artists/${item._id}`}
                      className="d-flex btn"
                    >
                      <div className="">
                        <img src={item?.icon?.thumbnailUrl} className="img-fluid service-icons" />
                      </div>
                      <span>
                        {item.title}
                      </span>

                    </Link>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistFilter;
