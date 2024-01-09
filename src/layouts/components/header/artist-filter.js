import { axiosLocal } from "configs/axiosInstance";
import { getAllArtists } from "configs/initialapis";
import React, { useState } from "react";
import Slider from "react-slick";

const BASE_URL = process.env.REACT_APP_APIURL;

const ArtistFilter = ({ services, setAllArtists, allArtists }) => {

    const artists = useState([...allArtists])

  const settings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    // autoplay:true,
    centerMode: true,
    centerPadding: "0px",
    // autoplayTimeout:3000
  };

  const getAllArtists= ()=> {
    setAllArtists(artists[0])
  }



  const getArtistByServiceID = async (service_id) => {
    try {
      let response = await axiosLocal.get(`${BASE_URL}/search/findArtist`, {
        params: { service: service_id },
      });
      if (response) {
        setAllArtists(response.data)
      }
    } catch (error) {
      console.log("this is error", error);
    }
  };

  return (
    <section className="usr-artist-filter">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">            
            <Slider className="" {...settings}>
            <div
            onClick={() => getAllArtists()}
            >
                All Artist
            </div>
              {services &&
                services.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => getArtistByServiceID(item._id)}
                    >
                      {item.title}
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
