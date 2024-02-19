import React, { useState } from "react";
import Cookies from "universal-cookie";
import { formatIndianRupee } from "configs/formatIndianRupee";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { FaHeart, FaStar } from "react-icons/fa";
import { axiosAuth } from "configs/axiosInstance";

const BASE_URL = process.env.REACT_APP_APIURL;

export const ArtistCard = ({ artistInfo, wishlist, wishListCB }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const {service_slug, artist_slug} = useParams();
  const navigate = useNavigate();
  let cookies = new Cookies();
  const [userWishlist, setUserWishlist] = useState(wishlist ? wishlist : []);
  const location = useLocation();

  const handleWishlistUpdate = (artist) => {
    // Perform any logic you need, then call the updateWishlist function
    if (artist) {
      wishListCB(artist);
    }
  };

  const wishlistHandler = async (artist_id) => {
    const token = cookies.get("LOOKBOOK_TOKEN");
    if (token) {
      let resposne = await axiosAuth.post(
        `${BASE_URL}/wishlist/mark_user_wishlist`,
        { artist_id }
      );
      if (resposne) {
        setUserWishlist(resposne.data.data);
        if (wishListCB) {
          let resposne = await axiosAuth.get(
            `${BASE_URL}/wishlist/get_user_wishlist`,
            { artist_id }
          );
          if (wishListCB) {
            handleWishlistUpdate(resposne.data.data);
          }
        }
      }
    } else {
      navigate(
        `/login?redirectUrl=${location.pathname}${
          location.search ? location.search : ""
        }`
      );
    }
  };
  
  return (
    <div className={`usr-all-artist-card`}>
      <div className="usr-all-artist-card-wrapper">
        <div
          className="usr-all-artist-card-favourite"
          onClick={() => wishlistHandler(artistInfo?._id)}
        >
          {location.pathname === "/wishlist" ? 
          <button className="usr-all-artist-card-favourite-button"
          onClick={() => wishlistHandler(artistInfo?._id)}
          >X</button> :
          <button
            className={`usr-all-artist-card-favourite-button ${
              userWishlist?.artist?.includes(artistInfo?._id)
                ? "usr-whishlist-icon"
                : ""
            }`}
          >
            <FaHeart />
          </button>
            }
        </div>
        <Link to={`/services/${service_slug ? service_slug : `${artistInfo?.featuredCategory ? artistInfo?.featuredCategory?.slug : artistInfo?.categories[0]?.slug}`}/${artist_slug ? artist_slug : `${artistInfo?.userName}`}`}>
        <Slider className="usr-all-artist-card-carsouel" {...settings}>
          {Array.isArray(artistInfo?.gallery) && artistInfo?.gallery.map((item, index) => {
            return (
              <div key={`gallery${index}`}>
                <img
                  src={`${item.url}?tr=h-400,w-400,fo-auto`}
                  alt={item.name}
                  className="common-cursor-pointer"
                  onClick={() => navigate(`/artists/${artistInfo?.featuredService}/${artistInfo?._id}`)}
                />
              </div>
            );
          })}
        </Slider>
        </Link>
      </div>
      <div className="usr-all-artist-card-body">
        <div className="d-flex justify-content-between">
        <h4 className="usr-all-artist-card-name">
          {artistInfo?.profile?.fullName}
        </h4>
        <span className="usr-all-artist-card-rating">
          <FaStar />
          4.5
        </span>
        </div>
        <div className="d-flex justify-content-between">
        <span className="usr-all-artist-card-date">
          18-23 Dec
        </span>
        <span className="usr-all-artist-card-date">
          5 Kms
        </span>
        </div>
        <div className="usr-all-artist-prize-list mt-2">
          <span className="usr-all-artist-card-prize">
            {formatIndianRupee(artistInfo?.pricing?.totalPrice)}/-Onwards
          </span>
        </div>
      </div>
    </div>
  );
};
