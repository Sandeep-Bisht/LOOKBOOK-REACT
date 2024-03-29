import React, { useRef, useState } from 'react';
import { Link, Outlet, useLoaderData, useOutletContext } from "react-router-dom";
import Slider from "react-slick";

const ArtistFilter = () => {
  const categories = useLoaderData()
  const [ wishlist ] = useOutletContext();
  const [activeIndex, setActiveIndex] = useState(0);
  const linkRefs = useRef([]);

  const settings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerPadding: "0px",
    afterChange: (index) => setActiveIndex(index),
    responsive: [
      {
          breakpoint: 1200, // Adjust the number of slides for screens larger than 1200 pixels
          settings: {
              slidesToShow: 3,
          },
      },
      {
          breakpoint: 991, // Adjust the number of slides for screens larger than 992 pixels
          settings: {
              slidesToShow: 2,
          },
      },
      {
          breakpoint: 767, // Adjust the number of slides for screens larger than 768 pixels
          settings: {
              slidesToShow: 2,
          },
      },
      {
          breakpoint: 575, // Adjust the number of slides for screens larger than 768 pixels
          settings: {
              slidesToShow: 1,
          },
      },
      {
          breakpoint: 481, // Adjust the number of slides for screens larger than 768 pixels
          settings: {
              slidesToShow: 1,
          },
      },
  ],
  };


  return (
    <>
    <section className="usr-artist-filter">
      <div className="container">
        <div className="row position-relative g-0 usr-artist-filter-row-custom-padding ">
        <div className="col-lg-2 col-md-2  col-sm-3 col-6"> 
        <Link
        ref={(el) => (linkRefs.current[0] = el)}
        className={`btn service-title-filter justify-content-center w-100 ${activeIndex === 0 ? 'active' : ""}`}
        to="/services"
        onClick={() => setActiveIndex(0)}
      >
      <span>
      <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_3292_6755)">
        <path d="M1.5 10.8625C1.5 11.7384 2.24141 12.4511 3.1527 12.4511H5.47663C5.24673 12.9862 5.11932 13.5648 5.11932 14.1638V14.4114C5.11932 15.2874 5.86072 16 6.77202 16H12.8473C13.7586 16 14.5 15.2874 14.5 14.4114V14.1638C14.5 12.9587 14.0125 11.8254 13.128 10.9743C12.7042 10.5661 12.2102 10.2581 11.6784 10.0354C12.7494 9.42038 13.4474 8.29863 13.4474 7.03755C13.4474 5.11443 11.8224 3.54984 9.82351 3.54274C9.82351 3.52676 9.82812 3.51256 9.82812 3.49659C9.82812 1.56903 8.19574 0 6.19034 0C4.18494 0 2.55256 1.56814 2.55256 3.49659C2.55256 4.76654 3.26811 5.87054 4.32436 6.48289C2.6652 7.17777 1.5 8.76632 1.5 10.6149V10.8625ZM13.5767 14.1638V14.4114C13.5767 14.7984 13.2499 15.1125 12.8473 15.1125H6.77202C6.36946 15.1125 6.04261 14.7984 6.04261 14.4114V14.1638C6.04261 13.4707 6.24112 12.8078 6.61967 12.2416C7.31214 11.1722 8.50504 10.5341 9.81058 10.5341C9.99155 10.5341 10.1633 10.5501 10.3359 10.5741H10.3396C11.1503 10.6823 11.8889 11.0373 12.4761 11.6018C13.1852 12.286 13.5767 13.1956 13.5767 14.1638ZM12.5241 7.03755C12.5241 8.29952 11.5888 9.37778 10.2916 9.60231C10.1365 9.63159 9.97308 9.64757 9.80966 9.64757C8.313 9.64757 7.09517 8.47701 7.09517 7.03844C7.09517 6.88225 7.10533 6.77486 7.12933 6.67902C7.1358 6.65239 7.13949 6.62488 7.14133 6.59826C7.14226 6.59293 7.14318 6.58761 7.1441 6.58228C7.34261 5.4845 8.24098 4.6352 9.41726 4.46214C9.51605 4.43996 9.637 4.42931 9.80966 4.42931C11.3063 4.42842 12.5241 5.59898 12.5241 7.03755ZM3.47585 3.49659C3.47585 2.05802 4.69368 0.887459 6.19034 0.887459C7.687 0.887459 8.90483 2.05802 8.90483 3.49659C8.90483 3.55072 8.90298 3.60486 8.89929 3.65722C8.85682 3.66787 8.81804 3.68384 8.77649 3.69538C8.71094 3.71402 8.64723 3.73443 8.58352 3.75573C8.47827 3.79123 8.37578 3.83205 8.27422 3.87731C8.21513 3.90393 8.15604 3.92878 8.09879 3.95807C7.99354 4.01132 7.89382 4.07166 7.79503 4.13467C7.74979 4.16396 7.70177 4.19058 7.65746 4.22164C7.37862 4.41777 7.13118 4.65206 6.92159 4.91652C6.88928 4.95735 6.8625 5.00083 6.83203 5.04343C6.76371 5.13839 6.69815 5.23512 6.63906 5.33718C6.60767 5.39131 6.58089 5.44722 6.55227 5.50313C6.50334 5.59987 6.45902 5.69838 6.41839 5.79955C6.39439 5.86078 6.37223 5.92201 6.35192 5.98414C6.33899 6.02496 6.32053 6.06312 6.30852 6.10483C6.27159 6.10572 6.23189 6.10661 6.18942 6.10661C4.69368 6.10572 3.47585 4.93516 3.47585 3.49659ZM2.4233 10.614C2.4233 8.62344 4.10277 7.00294 6.17188 6.99318C6.17188 7.00826 6.17188 7.02335 6.17188 7.03755C6.17188 7.25232 6.19865 7.46087 6.23743 7.66498C6.24666 7.71468 6.25682 7.7626 6.2679 7.81142C6.31498 8.01021 6.37408 8.20456 6.45533 8.38915C6.46087 8.40246 6.46918 8.414 6.47472 8.42731C6.55319 8.60125 6.64922 8.76543 6.7554 8.9234C6.78217 8.96334 6.80802 9.00239 6.83665 9.04143C6.95483 9.20295 7.08409 9.35737 7.22812 9.49759C7.24474 9.51356 7.26229 9.52687 7.27891 9.54196C7.41371 9.66798 7.56051 9.78246 7.7147 9.88807C7.75256 9.91381 7.78856 9.93954 7.82734 9.9635C7.85966 9.98392 7.8892 10.0079 7.92244 10.0274C7.86889 10.0496 7.82088 10.0806 7.76825 10.1055C7.65746 10.157 7.54851 10.2093 7.44233 10.2697C7.37031 10.3105 7.30199 10.3549 7.23274 10.3992C7.1321 10.4631 7.03331 10.5288 6.93821 10.6007C6.87081 10.6513 6.80618 10.7045 6.74155 10.7587C6.65199 10.8341 6.5652 10.9122 6.48118 10.9947C6.41932 11.0551 6.36023 11.1172 6.30206 11.1811C6.22358 11.2672 6.14972 11.3559 6.0777 11.4482C6.04631 11.4882 6.00937 11.5237 5.97983 11.5654H3.1527C2.75014 11.5654 2.4233 11.2512 2.4233 10.8643V10.614Z" fill="#6D5D4C" stroke="#6D5D4C" stroke-width="0.3"/>
        </g>
        <defs>
        <clipPath id="clip0_3292_6755">
        <rect width="16" height="16" fill="white" transform="translate(0.5)"/>
        </clipPath>
        </defs>
      </svg>
      </span>
      <span className='service-title-filter'>All Services</span>
        </Link>
        </div>
        <div className="col-lg-10 col-md-10  col-sm-9 col-6"> 
          <Slider className="" {...settings}>
        {categories && Array.isArray(categories) &&
          categories.map((item, index) => (
            <Link
              key={index}
              ref={(el) => (linkRefs.current[index + 1] = el)}
              onClick={() => setActiveIndex(index + 1)}
              to={`/services/${item?.slug}`}
              className={`d-flex btn justify-content-center ${activeIndex === index + 1 ? 'active' : ''}`}
            >
          <span>
            <img src={item?.icon?.thumbnailUrl} className="img-fluid service-icons" alt={item.title} />
          </span>
          <span className='service-title-filter'>{item.title}</span>
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
