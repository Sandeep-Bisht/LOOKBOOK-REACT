import { axiosLocal } from "configs/axiosInstance";
import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";


const ArtistFilter = ({ services }) => {

  let navigate = useNavigate()

  const settings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    // autoplay:true,
    // centerMode: true,
    centerPadding: "0px",
    // autoplayTimeout:3000
  };


  const getArtistByServiceID = async (service_id) => {
    navigate(`/artists-by-service/${service_id}`)
  };

  return (
    <section className="usr-artist-filter">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <Slider className="" {...settings}>
              <div
                onClick={() => navigate("/artists")}
              >
                All Artist
              </div>
              {services && services.length > 0 &&
                services.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => getArtistByServiceID(item._id)}
                      className="d-flex"
                    >
                      <div className="">
                        <img src={item?.icon?.thumbnailUrl} className="img-fluid service-icons" />
                      </div>
                      <span>
                        {item.title}
                      </span>

                    </div>
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
