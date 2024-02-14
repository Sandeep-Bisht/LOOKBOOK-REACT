
import React, { useEffect, useRef, useState } from 'react'
import EmergingArtist from "./emergingArtist/index.js"
import '@css/user/homepage.css'
// Import aos animation
import 'aos/dist/aos.css'
import Slider from "react-slick";
import checked from "@core/assets/images/checked.svg";
import { Link, useLoaderData } from "react-router-dom";
import { truncateDescription } from "configs/truncateDescription.js";
import { formatIndianRupee } from "configs/formatIndianRupee.js";
import Aos from 'aos';


const Homepage = () => {
    const { allArtists, allBlogs, allSliders } = useLoaderData()

    const sectionRef = useRef(null);
    const lastCardRef = useRef(null);
    const [showPlaceholder, setShowPlaceholder] = useState(false);

    useEffect(() => {

        Aos.init();

    }, [])

    useEffect(() => {
        
        const handleScroll = () => {
            if(sectionRef && sectionRef.current){
                const sectionTop = sectionRef.current.getBoundingClientRect().top;
                const lastCardTop = lastCardRef.current.getBoundingClientRect().top;
                const shouldShowPlaceholder = sectionTop <= 150 && lastCardTop >= -50; 
                setShowPlaceholder(shouldShowPlaceholder);
            }
        };
        
        // Attach scroll event listener to handle scrolling
        window.addEventListener('scroll', handleScroll);
    
        // Cleanup event listener when the component unmounts
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
        
      }, []);

    var settings = {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        centerMode: true,
        centerPadding: "0px",
        autoplayTimeout: 3000,
        responsive: [
            {
                breakpoint: 1200, // Adjust the number of slides for screens larger than 1200 pixels
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 992, // Adjust the number of slides for screens larger than 992 pixels
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768, // Adjust the number of slides for screens larger than 768 pixels
                settings: {
                    slidesToShow: 3,
                },
            },
        ],
    };

    var settingsblog = {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        centerMode: true,
        centerPadding: "0px",
        autoplayTimeout: 3000,
        responsive: [
            {
                breakpoint: 1200, // Adjust the number of slides for screens larger than 1200 pixels
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 992, // Adjust the number of slides for screens larger than 992 pixels
                settings: {
                    slidesToShow: 3,
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
                    slidesToShow: 2,
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

    var getPrice = ( artist ) =>{

        if(artist && artist.pricing && Array.isArray(artist.pricing) && artist.pricing.length > 0){

            return artist?.featuredService ? 
            artist.pricing.find(
                (price) => price.service === artist?.featuredService?._id
              )?.totalPrice 
              :
              artist.pricing.find(
                (price) => price.service === artist?.services[0]?._id
              )?.totalPrice
        }

        return 0;
    }

    return (
        <>
            {allSliders && Array.isArray(allSliders) && allSliders?.length > 0 && 
                <section className='usr-home-banner'>
                    <div className='container'>

                        <Slider {...settings}>
                            {[...Array(allSliders.length > 6 ? 6 : allSliders.length)].map((_, index) => {
                                return (
                                    <div className="item">
                                        <img src={`${allSliders[index]?.image?.url}?tr=h-400,w-400,fo-auto`} className="img-fluid w-100 owl-pic" />
                                    </div>
                                )
                            })}
                        </Slider>
                        <div className="col-md-12 usr-content text-center">
                            <h1 className="usr-home-banner-heading">Experience the Beauty of Professional Makeup</h1>

                        </div>
                        <div className="usr-button d-flex justify-content-center mt-lg-2">
                            <Link to="/services" className="usr-common-action-btn usr-home-banner-action-btn btn">Explore artists</Link>
                        </div>
                    </div>
                </section>
            }
                {allArtists && Array.isArray(allArtists) && allArtists?.length > 0 ? <>
                <section className="usr-artist-area usr-overlap-section" ref={sectionRef}>
                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-lg-12 mx-auto">
                                <div className="usr-artist-area-wrapper">

                                    <div className="row">
                                        {showPlaceholder &&
                                        <div className="heading-box-one" data-aos="fade-up" data-aos-delay="100">
                                            <h2 className="common-heading fw-400">The Experts</h2>
                                        </div>
                                        }

                                        <div className="col-lg-6  col-xl-5 col-xxl-5 mx-auto">
                                            <ul id="cards">
                                                {[...Array(allArtists.length > 5 ? 5 : allArtists.length)].map((_, index) => {
                                                    return (

                                                        <li className="card usr-artist-area-card" id={`card${index + 1}`} ref={((allArtists.length > 5 ? 5 : allArtists.length) - 1) === index ? lastCardRef : null}>
                                                            <div className="card-body">
                                                                <div className="row align-items-center ">
                                                                    <div className="col-lg-12 mx-auto">
                                                                        <div className="usr-expert-pic-expert-info">
                                                                            <div className="row g-0">
                                                                                <div className="col-lg-6 col-6">
                                                                                    <Link to={`/services/${allArtists[index]?.featuredService ? allArtists[index]?.featuredService?.slug : allArtists[index]?.services[0]?.slug}/${allArtists[index]?.profile_id?.alias}`} className="usr-expert-pic-name-box common-cursor-pointer btn w-100 text-start h-100">

                                                                                        <div className="text-layer">
                                                                                            <p className="usr-expert-pic-name">
                                                                                                {allArtists[index]?.profile_id?.fullName}
                                                                                            </p>
                                                                                            <span className="usr-expert-pic-profile">
                                                                                                {allArtists[index]?.featuredService?.title}
                                                                                            </span>
                                                                                        </div>
                                                                                    </Link>
                                                                                </div>
                                                                                <div className="col-lg-6 col-6">
                                                                                    <div className="usr-expert-pic-charges-box">
                                                                                        <p className="usr-expert-pic-name ">
                                                                                            {formatIndianRupee(getPrice(allArtists[index]))}
                                                                                            <span className="ms-1">/-</span>

                                                                                        </p>
                                                                                        <span className="usr-expert-pic-profile">
                                                                                            onwards
                                                                                        </span>
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                        <div className="expert-pic">
                                                                            <Link to={`/services/${allArtists[index]?.featuredService ? allArtists[index]?.featuredService?.slug : allArtists[index]?.services[0]?.slug}/${allArtists[index]?.profile_id?.alias}`}>
                                                                                <img src={allArtists[index]?.gallery[0]?.url} className="img-fluid" />
                                                                            </Link>
                                                                            <span className="usr-expert-certification">

                                                                                <span className="ms-2">

                                                                                    <img src={checked} className="img-fluid " />

                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                        <div className="usr-expert-pic-insta-box">
                                                                            <span className="usr-insta-icon">
                                                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <g clipPath="url(#clip0_919_448)">
                                                                                        <path d="M5.07157 19.9292C4.29798 19.9206 3.53167 19.7787 2.80627 19.5098C2.27656 19.314 1.7973 19.0023 1.40353 18.5975C0.997602 18.2045 0.685428 17.7251 0.490196 17.1949C0.22152 16.4695 0.0798397 15.7033 0.0713725 14.9298C0.0119608 13.6439 0 13.2582 0 10C0 6.74176 0.0131373 6.35745 0.0707843 5.07059C0.0802789 4.29741 0.222134 3.53156 0.490196 2.80627C0.686378 2.27647 0.99811 1.79702 1.40275 1.40275C1.79602 0.997182 2.27551 0.685298 2.80569 0.490196C3.53108 0.221297 4.2974 0.0794173 5.07098 0.0707843C6.35725 0.0119608 6.74353 0 10 0C13.2565 0 13.6425 0.0131373 14.9294 0.0707843C15.7028 0.0802118 16.4688 0.222068 17.1943 0.490196C17.7243 0.685556 18.2036 0.997331 18.5971 1.40255C19.0024 1.79613 19.3143 2.27561 19.5098 2.80569C19.7788 3.53107 19.9207 4.29738 19.9294 5.07098C19.9882 6.35784 20.0002 6.74314 20.0002 10.0004C20.0002 13.2576 19.9882 13.6429 19.9294 14.9298C19.9201 15.7033 19.7781 16.4694 19.5098 17.1949C19.3068 17.721 18.9959 18.1988 18.5971 18.5975C18.1983 18.9962 17.7205 19.307 17.1943 19.5098C16.4689 19.7788 15.7026 19.9207 14.929 19.9294C13.6433 19.9882 13.2569 20.0002 9.99961 20.0002C6.74235 20.0002 6.35706 19.9888 5.07137 19.9294" fill="url(#paint0_radial_919_448)" />
                                                                                        <path d="M5.07157 19.9292C4.29798 19.9206 3.53167 19.7787 2.80627 19.5098C2.27656 19.314 1.7973 19.0023 1.40353 18.5975C0.997602 18.2045 0.685428 17.7251 0.490196 17.1949C0.22152 16.4695 0.0798397 15.7033 0.0713725 14.9298C0.0119608 13.6439 0 13.2582 0 10C0 6.74176 0.0131373 6.35745 0.0707843 5.07059C0.0802789 4.29741 0.222134 3.53156 0.490196 2.80627C0.686378 2.27647 0.99811 1.79702 1.40275 1.40275C1.79602 0.997182 2.27551 0.685298 2.80569 0.490196C3.53108 0.221297 4.2974 0.0794173 5.07098 0.0707843C6.35725 0.0119608 6.74353 0 10 0C13.2565 0 13.6425 0.0131373 14.9294 0.0707843C15.7028 0.0802118 16.4688 0.222068 17.1943 0.490196C17.7243 0.685556 18.2036 0.997331 18.5971 1.40255C19.0024 1.79613 19.3143 2.27561 19.5098 2.80569C19.7788 3.53107 19.9207 4.29738 19.9294 5.07098C19.9882 6.35784 20.0002 6.74314 20.0002 10.0004C20.0002 13.2576 19.9882 13.6429 19.9294 14.9298C19.9201 15.7033 19.7781 16.4694 19.5098 17.1949C19.3068 17.721 18.9959 18.1988 18.5971 18.5975C18.1983 18.9962 17.7205 19.307 17.1943 19.5098C16.4689 19.7788 15.7026 19.9207 14.929 19.9294C13.6433 19.9882 13.2569 20.0002 9.99961 20.0002C6.74235 20.0002 6.35706 19.9888 5.07137 19.9294" fill="url(#paint1_radial_919_448)" />
                                                                                        <path d="M7.54455 10.0429C7.54459 9.55304 7.68988 9.07421 7.96206 8.66694C8.23424 8.25967 8.62108 7.94226 9.07366 7.75485C9.52623 7.56743 10.0242 7.51844 10.5046 7.61406C10.9851 7.70967 11.4264 7.94561 11.7727 8.29202C12.119 8.63844 12.3548 9.07978 12.4503 9.56022C12.5459 10.0407 12.4967 10.5386 12.3092 10.9912C12.1217 11.4437 11.8042 11.8305 11.3969 12.1026C10.9895 12.3746 10.5107 12.5198 10.0208 12.5198C9.364 12.5196 8.73412 12.2586 8.26973 11.7941C7.80535 11.3296 7.54449 10.6997 7.54455 10.0429ZM6.20553 10.0429C6.20553 10.7975 6.42929 11.5351 6.84852 12.1626C7.26775 12.79 7.86362 13.279 8.56077 13.5678C9.25792 13.8565 10.025 13.9321 10.7651 13.7849C11.5052 13.6377 12.1851 13.2743 12.7186 12.7407C13.2522 12.2071 13.6156 11.5273 13.7628 10.7872C13.91 10.0471 13.8345 9.27999 13.5457 8.58284C13.2569 7.88568 12.7679 7.28981 12.1405 6.87058C11.5131 6.45135 10.7754 6.22759 10.0208 6.22759C9.51978 6.22757 9.02364 6.32624 8.56074 6.51796C8.09784 6.70969 7.67723 6.99072 7.32294 7.34501C6.96865 7.6993 6.68762 8.1199 6.4959 8.58281C6.30417 9.04571 6.2055 9.54185 6.20553 10.0429ZM13.0955 6.07642C13.0954 6.25275 13.1477 6.42515 13.2456 6.57181C13.3435 6.71847 13.4827 6.83281 13.6455 6.90036C13.8084 6.96791 13.9877 6.98565 14.1606 6.95132C14.3336 6.917 14.4925 6.83215 14.6173 6.70752C14.742 6.58289 14.827 6.42406 14.8615 6.25113C14.8959 6.0782 14.8784 5.89893 14.8109 5.73598C14.7435 5.57304 14.6293 5.43375 14.4827 5.33572C14.3362 5.23769 14.1638 5.18532 13.9875 5.18524C13.7511 5.18535 13.5245 5.27926 13.3573 5.44635C13.1901 5.61345 13.0957 5.84006 13.0955 6.07642ZM7.01945 16.0909C6.54829 16.0857 6.08154 15.9995 5.63964 15.836C5.31917 15.7125 5.02811 15.5232 4.7852 15.2804C4.54228 15.0376 4.35291 14.7466 4.22925 14.4262C4.06568 13.9843 3.97945 13.5176 3.97435 13.0464C3.93827 12.2633 3.93121 12.028 3.93121 10.0439C3.93121 8.05975 3.93906 7.82505 3.97435 7.04112C3.98007 6.57002 4.06627 6.10336 4.22925 5.66132C4.35276 5.34074 4.54209 5.04961 4.78501 4.80669C5.02793 4.56376 5.31907 4.37444 5.63964 4.25093C6.08152 4.08736 6.54829 4.00113 7.01945 3.99603C7.80258 3.95995 8.03788 3.95289 10.0212 3.95289C12.0045 3.95289 12.24 3.96054 13.024 3.99622C13.4951 4.00194 13.9617 4.08815 14.4038 4.25112C14.7243 4.37465 15.0155 4.56397 15.2584 4.8069C15.5013 5.04982 15.6906 5.34095 15.8142 5.66151C15.9777 6.1034 16.0639 6.57016 16.069 7.04132C16.1051 7.82563 16.1122 8.05975 16.1122 10.0441C16.1122 12.0284 16.1049 12.2629 16.069 13.0468C16.0636 13.5179 15.9773 13.9846 15.8142 14.4266C15.6905 14.747 15.5011 15.038 15.2582 15.2808C15.0153 15.5236 14.7242 15.7129 14.4038 15.8364C13.9619 16 13.4951 16.0862 13.024 16.0913C12.2408 16.1274 12.0055 16.1345 10.0212 16.1345C8.0369 16.1345 7.80239 16.1268 7.01945 16.0909ZM6.95788 2.65818C6.34138 2.67031 5.7314 2.78699 5.15396 3.00328C4.66033 3.19413 4.21203 3.48604 3.8378 3.86027C3.46358 4.23449 3.17167 4.68279 2.98082 5.17642C2.76456 5.75387 2.64787 6.36384 2.63572 6.98034C2.59906 7.7725 2.59082 8.02583 2.59082 10.0437C2.59082 12.0615 2.59925 12.3147 2.63572 13.107C2.64787 13.7235 2.76456 14.3335 2.98082 14.9109C3.17168 15.4045 3.46359 15.8528 3.83782 16.2271C4.21204 16.6013 4.66034 16.8932 5.15396 17.0841C5.73143 17.3002 6.34139 17.4169 6.95788 17.4292C7.75043 17.4652 8.00337 17.4741 10.0212 17.4741C12.0391 17.4741 12.2922 17.4656 13.0845 17.4292C13.701 17.417 14.311 17.3003 14.8885 17.0841C15.3821 16.8932 15.8304 16.6013 16.2046 16.2271C16.5788 15.8528 16.8707 15.4045 17.0616 14.9109C17.2781 14.3336 17.3948 13.7235 17.4067 13.107C17.4428 12.3143 17.451 12.0615 17.451 10.0437C17.451 8.02583 17.4426 7.77269 17.4067 6.98034C17.3946 6.36384 17.2779 5.75386 17.0616 5.17642C16.8707 4.68288 16.5789 4.23466 16.2048 3.86044C15.8307 3.48622 15.3825 3.19427 14.8891 3.00328C14.3116 2.78685 13.7017 2.67016 13.0851 2.65818C12.2928 2.62191 12.0396 2.61328 10.0222 2.61328C8.00474 2.61328 7.75062 2.62171 6.95788 2.65818Z" fill="white" />
                                                                                    </g>
                                                                                    <defs>
                                                                                        <radialGradient id="paint0_radial_919_448" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1.29431 19.562) scale(25.3925)">
                                                                                            <stop offset="0.09" stop-color="#FA8F21" />
                                                                                            <stop offset="0.78" stop-color="#D82D7E" />
                                                                                        </radialGradient>
                                                                                        <radialGradient id="paint1_radial_919_448" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(13.8533 18.9196) scale(22.3457)">
                                                                                            <stop offset="0.64" stop-color="#8C3AAA" stop-opacity="0" />
                                                                                            <stop offset="1" stop-color="#8C3AAA" />
                                                                                        </radialGradient>
                                                                                        <clipPath id="clip0_919_448">
                                                                                            <rect width="20" height="20" fill="white" />
                                                                                        </clipPath>
                                                                                    </defs>
                                                                                </svg>

                                                                            </span>
                                                                            <a href={`https://www.instagram.com/${allArtists[index]?.profile_id?.instaId}`} target="_blank">
                                                                                {`https://www.instagram.com/${allArtists[index]?.profile_id?.instaId}`}
                                                                            </a>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                        {showPlaceholder &&
                                        <div className="heading-box-two" data-aos="fade-up" data-aos-delay="100">
                                            <h2 className="common-heading fw-400">at LookBook</h2>
                                        </div>
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
                :
                <div className="p-5 text-center">
                    No Artist Registered Yet.
                </div>
            }

            <section className="user-select-package  usr-overlap-section">
                <div className="container">
                    <div className="row mt-lg-4">
                        <div className="col-lg-4 col-md-4 ">
                            <div className="usr-package-card" data-aos="fade-up" data-aos-delay="100">
                                <div className="usr-package-card-icon">
                                    <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M55.5001 49.2105H54.0003C54.0003 47.2684 54.1803 45.1842 51.9155 43.6526C63.7643 28.4632 53.6403 5 34.5022 5C15.3641 5 5.22512 28.4474 17.0889 43.6526C14.7942 45.2 15.0041 47.4737 15.0041 49.2105H13.5043C13.1065 49.2105 12.725 49.3769 12.4437 49.673C12.1625 49.9691 12.0044 50.3707 12.0044 50.7895V58.6842C12.0044 60.3593 12.6365 61.9657 13.7616 63.1501C14.8867 64.3346 16.4127 65 18.0039 65H51.0006C52.5917 65 54.1177 64.3346 55.2428 63.1501C56.3679 61.9657 57 60.3593 57 58.6842V50.7895C57 50.3707 56.842 49.9691 56.5607 49.673C56.2794 49.3769 55.8979 49.2105 55.5001 49.2105ZM34.5022 8.15789C38.3215 8.16433 42.0549 9.35147 45.239 11.572C48.423 13.7924 50.9175 16.9484 52.4128 20.6482C53.908 24.348 54.3381 28.4286 53.6498 32.3835C52.9615 36.3384 51.185 39.9934 48.5408 42.8947H43.9513C57.255 33.0579 50.3857 11.3158 34.5022 11.3158C18.6188 11.3158 11.7495 33.0579 25.0532 42.8947H20.4636C17.8195 39.9934 16.043 36.3384 15.3546 32.3835C14.6663 28.4286 15.0965 24.348 16.5917 20.6482C18.0869 16.9484 20.5814 13.7924 23.7655 11.572C26.9495 9.35147 30.6829 8.16433 34.5022 8.15789ZM34.5022 42.8947C31.8324 42.8947 29.2226 42.0613 27.0028 40.4998C24.7829 38.9384 23.0528 36.719 22.0311 34.1223C21.0094 31.5257 20.7421 28.6684 21.2629 25.9119C21.7838 23.1553 23.0694 20.6232 24.9572 18.6358C26.845 16.6485 29.2503 15.295 31.8688 14.7467C34.4872 14.1984 37.2014 14.4798 39.6679 15.5554C42.1345 16.631 44.2427 18.4524 45.726 20.7893C47.2092 23.1262 48.0009 25.8736 48.0009 28.6842C48.0009 32.4531 46.5787 36.0676 44.0472 38.7326C41.5157 41.3976 38.0823 42.8947 34.5022 42.8947ZM19.8337 46.0526H49.5007C49.8985 46.0526 50.28 46.219 50.5613 46.5151C50.8426 46.8112 51.0006 47.2128 51.0006 47.6316V49.2105H18.0039C18.0039 47.4579 17.7789 46.0526 19.8337 46.0526ZM40.0817 52.3684C39.1368 56.3632 40.0817 55.5263 30.8426 55.5263C29.4627 55.5263 29.3427 54.2474 28.9228 52.3684H40.0817ZM54.0003 58.6842C54.0003 59.5217 53.6843 60.325 53.1217 60.9172C52.5591 61.5094 51.7962 61.8421 51.0006 61.8421H18.0039C17.2083 61.8421 16.4453 61.5094 15.8827 60.9172C15.3202 60.325 15.0041 59.5217 15.0041 58.6842V52.3684H25.8331L26.478 55.1C26.7221 56.124 27.2841 57.0329 28.0748 57.6823C28.8656 58.3316 29.8397 58.6843 30.8426 58.6842H38.1619C39.1647 58.6843 40.1389 58.3316 40.9296 57.6823C41.7204 57.0329 42.2824 56.124 42.5264 55.1L43.1714 52.3684H54.0003V58.6842Z" fill="#6D5D4C" />
                                        <path d="M30 31.0213L34.488 35L39 31L30 31.0213Z" fill="#6D5D4C" />
                                        <path d="M33 22L33.0044 33L36 33L35.9956 22.0016L33 22Z" fill="#6D5D4C" />
                                    </svg>


                                </div>
                                <div className="usr-package-card-content">
                                    <p className="usr-package-card-title">
                                        Book Artist
                                    </p>
                                    <p className="usr-package-card-price">
                                        Under 10,000 /-
                                    </p>
                                    <p className="usr-package-card-para">
                                        Lorem ipsum dolor sit amet consectetur. Mi et donec morbi quam cras egestas phasellus.
                                        Accumsan pulvinar at ultrices dolor accumsan feugiat tellus.
                                    </p>
                                    <button className="btn usr-book-now">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 ">
                            <div className="usr-package-card" data-aos="fade-up" data-aos-delay="500">
                                <div className="usr-package-card-icon">
                                    <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M55.5001 49.2105H54.0003C54.0003 47.2684 54.1803 45.1842 51.9155 43.6526C63.7643 28.4632 53.6403 5 34.5022 5C15.3641 5 5.22512 28.4474 17.0889 43.6526C14.7942 45.2 15.0041 47.4737 15.0041 49.2105H13.5043C13.1065 49.2105 12.725 49.3769 12.4437 49.673C12.1625 49.9691 12.0044 50.3707 12.0044 50.7895V58.6842C12.0044 60.3593 12.6365 61.9657 13.7616 63.1501C14.8867 64.3346 16.4127 65 18.0039 65H51.0006C52.5917 65 54.1177 64.3346 55.2428 63.1501C56.3679 61.9657 57 60.3593 57 58.6842V50.7895C57 50.3707 56.842 49.9691 56.5607 49.673C56.2794 49.3769 55.8979 49.2105 55.5001 49.2105ZM34.5022 8.15789C38.3215 8.16433 42.0549 9.35147 45.239 11.572C48.423 13.7924 50.9175 16.9484 52.4128 20.6482C53.908 24.348 54.3381 28.4286 53.6498 32.3835C52.9615 36.3384 51.185 39.9934 48.5408 42.8947H43.9513C57.255 33.0579 50.3857 11.3158 34.5022 11.3158C18.6188 11.3158 11.7495 33.0579 25.0532 42.8947H20.4636C17.8195 39.9934 16.043 36.3384 15.3546 32.3835C14.6663 28.4286 15.0965 24.348 16.5917 20.6482C18.0869 16.9484 20.5814 13.7924 23.7655 11.572C26.9495 9.35147 30.6829 8.16433 34.5022 8.15789ZM34.5022 42.8947C31.8324 42.8947 29.2226 42.0613 27.0028 40.4998C24.7829 38.9384 23.0528 36.719 22.0311 34.1223C21.0094 31.5257 20.7421 28.6684 21.2629 25.9119C21.7838 23.1553 23.0694 20.6232 24.9572 18.6358C26.845 16.6485 29.2503 15.295 31.8688 14.7467C34.4872 14.1984 37.2014 14.4798 39.6679 15.5554C42.1345 16.631 44.2427 18.4524 45.726 20.7893C47.2092 23.1262 48.0009 25.8736 48.0009 28.6842C48.0009 32.4531 46.5787 36.0676 44.0472 38.7326C41.5157 41.3976 38.0823 42.8947 34.5022 42.8947ZM19.8337 46.0526H49.5007C49.8985 46.0526 50.28 46.219 50.5613 46.5151C50.8426 46.8112 51.0006 47.2128 51.0006 47.6316V49.2105H18.0039C18.0039 47.4579 17.7789 46.0526 19.8337 46.0526ZM40.0817 52.3684C39.1368 56.3632 40.0817 55.5263 30.8426 55.5263C29.4627 55.5263 29.3427 54.2474 28.9228 52.3684H40.0817ZM54.0003 58.6842C54.0003 59.5217 53.6843 60.325 53.1217 60.9172C52.5591 61.5094 51.7962 61.8421 51.0006 61.8421H18.0039C17.2083 61.8421 16.4453 61.5094 15.8827 60.9172C15.3202 60.325 15.0041 59.5217 15.0041 58.6842V52.3684H25.8331L26.478 55.1C26.7221 56.124 27.2841 57.0329 28.0748 57.6823C28.8656 58.3316 29.8397 58.6843 30.8426 58.6842H38.1619C39.1647 58.6843 40.1389 58.3316 40.9296 57.6823C41.7204 57.0329 42.2824 56.124 42.5264 55.1L43.1714 52.3684H54.0003V58.6842Z" fill="#6D5D4C" />
                                        <path d="M30 31.0213L34.488 35L39 31L30 31.0213Z" fill="#6D5D4C" />
                                        <path d="M33 22L33.0044 33L36 33L35.9956 22.0016L33 22Z" fill="#6D5D4C" />
                                    </svg>



                                </div>
                                <div className="usr-package-card-content">
                                    <p className="usr-package-card-title">
                                        Book Artist
                                    </p>
                                    <p className="usr-package-card-price">
                                        Under 50,000 /-
                                    </p>
                                    <p className="usr-package-card-para">
                                        Lorem ipsum dolor sit amet consectetur. Mi et donec morbi quam cras egestas phasellus.
                                        Accumsan pulvinar at ultrices dolor accumsan feugiat tellus.
                                    </p>
                                    <button className="btn usr-book-now">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 ">
                            <div className="usr-package-card" data-aos="fade-up" data-aos-delay="800">
                                <div className="usr-package-card-icon">
                                    <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M55.5001 49.2105H54.0003C54.0003 47.2684 54.1803 45.1842 51.9155 43.6526C63.7643 28.4632 53.6403 5 34.5022 5C15.3641 5 5.22512 28.4474 17.0889 43.6526C14.7942 45.2 15.0041 47.4737 15.0041 49.2105H13.5043C13.1065 49.2105 12.725 49.3769 12.4437 49.673C12.1625 49.9691 12.0044 50.3707 12.0044 50.7895V58.6842C12.0044 60.3593 12.6365 61.9657 13.7616 63.1501C14.8867 64.3346 16.4127 65 18.0039 65H51.0006C52.5917 65 54.1177 64.3346 55.2428 63.1501C56.3679 61.9657 57 60.3593 57 58.6842V50.7895C57 50.3707 56.842 49.9691 56.5607 49.673C56.2794 49.3769 55.8979 49.2105 55.5001 49.2105ZM34.5022 8.15789C38.3215 8.16433 42.0549 9.35147 45.239 11.572C48.423 13.7924 50.9175 16.9484 52.4128 20.6482C53.908 24.348 54.3381 28.4286 53.6498 32.3835C52.9615 36.3384 51.185 39.9934 48.5408 42.8947H43.9513C57.255 33.0579 50.3857 11.3158 34.5022 11.3158C18.6188 11.3158 11.7495 33.0579 25.0532 42.8947H20.4636C17.8195 39.9934 16.043 36.3384 15.3546 32.3835C14.6663 28.4286 15.0965 24.348 16.5917 20.6482C18.0869 16.9484 20.5814 13.7924 23.7655 11.572C26.9495 9.35147 30.6829 8.16433 34.5022 8.15789ZM34.5022 42.8947C31.8324 42.8947 29.2226 42.0613 27.0028 40.4998C24.7829 38.9384 23.0528 36.719 22.0311 34.1223C21.0094 31.5257 20.7421 28.6684 21.2629 25.9119C21.7838 23.1553 23.0694 20.6232 24.9572 18.6358C26.845 16.6485 29.2503 15.295 31.8688 14.7467C34.4872 14.1984 37.2014 14.4798 39.6679 15.5554C42.1345 16.631 44.2427 18.4524 45.726 20.7893C47.2092 23.1262 48.0009 25.8736 48.0009 28.6842C48.0009 32.4531 46.5787 36.0676 44.0472 38.7326C41.5157 41.3976 38.0823 42.8947 34.5022 42.8947ZM19.8337 46.0526H49.5007C49.8985 46.0526 50.28 46.219 50.5613 46.5151C50.8426 46.8112 51.0006 47.2128 51.0006 47.6316V49.2105H18.0039C18.0039 47.4579 17.7789 46.0526 19.8337 46.0526ZM40.0817 52.3684C39.1368 56.3632 40.0817 55.5263 30.8426 55.5263C29.4627 55.5263 29.3427 54.2474 28.9228 52.3684H40.0817ZM54.0003 58.6842C54.0003 59.5217 53.6843 60.325 53.1217 60.9172C52.5591 61.5094 51.7962 61.8421 51.0006 61.8421H18.0039C17.2083 61.8421 16.4453 61.5094 15.8827 60.9172C15.3202 60.325 15.0041 59.5217 15.0041 58.6842V52.3684H25.8331L26.478 55.1C26.7221 56.124 27.2841 57.0329 28.0748 57.6823C28.8656 58.3316 29.8397 58.6843 30.8426 58.6842H38.1619C39.1647 58.6843 40.1389 58.3316 40.9296 57.6823C41.7204 57.0329 42.2824 56.124 42.5264 55.1L43.1714 52.3684H54.0003V58.6842Z" fill="#6D5D4C" />
                                        <path d="M30 31.0213L34.488 35L39 31L30 31.0213Z" fill="#6D5D4C" />
                                        <path d="M33 22L33.0044 33L36 33L35.9956 22.0016L33 22Z" fill="#6D5D4C" />
                                    </svg>


                                </div>
                                <div className="usr-package-card-content">
                                    <p className="usr-package-card-title">
                                        Book Artist
                                    </p>
                                    <p className="usr-package-card-price">
                                        Above 50,000 /-
                                    </p>
                                    <p className="usr-package-card-para">
                                        Lorem ipsum dolor sit amet consectetur. Mi et donec morbi quam cras egestas phasellus.
                                        Accumsan pulvinar at ultrices dolor accumsan feugiat tellus.
                                    </p>
                                    <button className="btn usr-book-now">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {allArtists && Array.isArray(allArtists) && allArtists?.length > 0 ? <>
                <EmergingArtist artists={allArtists} />
                <section className="usr-featured-artist usr-overlap-section" id="yourNextSectionId">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h2 className="usr-common-heading text-center">
                                    Artists on our Radar
                                </h2>
                            </div>

                        </div>
                        <div className="row mt-lg-4 justify-content-center">
                            {[...Array(allArtists.length > 4 ? 4 : allArtists.length)].map((_, index) => {
                                return (
                                    <div className="col-lg-3 col-md-6 col-sm-6">
                                        <div className="usr-featured-artist-card">
                                            <div className="imgBx">
                                                <img className="image"
                                                    src={`${allArtists[index]?.gallery[0]?.url}?tr=h-220,w-300,fo-auto`}
                                                />
                                                <span className="usr-expert-certification">

                                                    <span className="ms-2">

                                                        <img src={checked} className="img-fluid " />

                                                    </span>
                                                </span>

                                            </div>
                                            <div className="content">
                                                <div className="name">
                                                    <h2>{allArtists[index]?.profile_id?.fullName}</h2>
                                                    <div className="profession">
                                                        <h3>{allArtists[index]?.featuredService?.slug}</h3>
                                                    </div>
                                                    <div className="desc">
                                                        <p>{truncateDescription(allArtists[index]?.description, 45)}</p>
                                                    </div>
                                                </div>
                                                <div className="prizeButton">
                                                    <div className="prize">

                                                        <span className="usr-price">{formatIndianRupee(getPrice(allArtists[index]))}</span>
                                                        <span className="usr-price">Onwards</span>
                                                    </div>
                                                    <div className="reserveButton">
                                                        <Link className="rButton btn" to={`/services/${allArtists[index]?.featuredService ? allArtists[index]?.featuredService?.slug : allArtists[index]?.services[0]?.slug}/${allArtists[index]?.profile_id?.alias}`}>
                                                            <span className="me-1">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
                                                                    <path d="M7.05238 12.4713C6.9456 12.4719 6.8428 12.4308 6.76592 12.3567L3.69675 9.37752C3.65806 9.33991 3.62715 9.29503 3.6058 9.24547C3.58445 9.19591 3.57307 9.14263 3.57231 9.08867C3.57155 9.03471 3.58142 8.98113 3.60137 8.93099C3.62132 8.88084 3.65095 8.83512 3.68856 8.79643C3.72618 8.75773 3.77105 8.72683 3.82061 8.70548C3.87018 8.68413 3.92346 8.67274 3.97742 8.67198C4.03138 8.67122 4.08496 8.6811 4.1351 8.70105C4.18524 8.721 4.23097 8.75062 4.26966 8.78824L7.05238 11.4891L13.5181 5.21981C13.5963 5.14384 13.7014 5.10202 13.8104 5.10356C13.9193 5.10509 14.0232 5.14985 14.0992 5.228C14.1752 5.30614 14.217 5.41126 14.2155 5.52024C14.2139 5.62922 14.1692 5.73312 14.091 5.8091L7.33884 12.3567C7.26196 12.4308 7.15916 12.4719 7.05238 12.4713Z" fill="#FCF7F2" stroke="#FCF7F2" stroke-width="1.63689" />
                                                                </svg>
                                                            </span>
                                                            Book</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })}
                        </div>
                        <div className="row">
                            <div className="col-lg-12">

                                <div className="usr-button d-flex justify-content-center mt-lg-5">
                                    <Link to="/services" className="usr-common-action-btn usr-home-banner-action-btn btn d-inline">
                                        View All Artists
                                    </Link></div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
                :
                <div className="p-5 text-center">
                    No Artist Registered Yet.
                </div>
            }

            <section className="usr-recent-blog usr-overlap-section ">
                <div className="container-fluid">
                    <div className="usr-blog-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <h1 className="usr-common-heading text-center">Recent Blog</h1>
                                </div>
                            </div>
                            <div className="row mt-lg-5 mt-5 pt-lg-3">
                                <div className="col-lg-12">
                                    {allBlogs && Array.isArray(allBlogs) && allBlogs.length > 0 ?
                                        <div className="blog-section-card ">
                                            <Slider {...settingsblog}>
                                                {allBlogs.map((blog, ind) => {
                                                    return (<Link className="usr-blog-main-content-wrapper common-cursor-pointer btn" key={`blog${ind}`} to={`/blogs/${blog?.category?.slug}/${blog?.slug}`}>
                                                        <div className="usr-blog-main-content">
                                                            <img src={blog.featuredImage.url} className="img-fluid" />
                                                            <div className="usr-card-body">
                                                                <h4 className="usr-blog-heading">{truncateDescription(blog.title, 20)}</h4>
                                                                <p className="usr-blog-para">
                                                                    {truncateDescription(blog.description, 70)}
                                                                </p>
                                                            </div>
                                                            <div className="blog-card-icon">
                                                                <div className="usr-blog-card-view-comment-box me-2">
                                                                    <span className="usr-blog-card-view-comment-box-icon me-1">
                                                                        <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M9 1.8C7.24 1.8 5.8 3.24 5.8 5C5.8 6.76 7.24 8.2 9 8.2C10.76 8.2 12.2 6.76 12.2 5C12.2 3.24 10.76 1.8 9 1.8ZM9 7.4C7.68 7.4 6.6 6.32 6.6 5C6.6 3.68 7.68 2.6 9 2.6C10.32 2.6 11.4 3.68 11.4 5C11.4 6.32 10.32 7.4 9 7.4ZM17.88 4.72L16.16 2.98C14.26 1.06 11.72 0 9 0C6.28 0 3.74 1.06 1.84 2.98L0.12 4.72C-0.04 4.88 -0.04 5.12 0.12 5.28L1.84 7.02C3.74 8.94 6.28 10 9 10C11.72 10 14.26 8.94 16.16 7.02L17.88 5.28C18.04 5.12 18.04 4.88 17.88 4.72ZM15.6 6.46C13.84 8.22 11.5 9.2 9 9.2C6.5 9.2 4.16 8.22 2.4 6.46L0.96 5L2.4 3.54C4.16 1.78 6.5 0.8 9 0.8C11.5 0.8 13.84 1.78 15.6 3.54L17.04 5L15.6 6.46Z" fill="#6D5D4C" />
                                                                        </svg>

                                                                    </span>
                                                                    <span className="usr-blog-card-view-comment-box-number">
                                                                        2
                                                                    </span>
                                                                </div>
                                                                <div className="usr-blog-card-view-comment-box">
                                                                    <span className="usr-blog-card-view-comment-box-icon me-1">
                                                                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M15.2004 0.400391H0.800391C0.580391 0.400391 0.400391 0.580391 0.400391 0.800391V10.4004C0.400391 10.6204 0.580391 10.8004 0.800391 10.8004H4.00039V13.2004C4.00039 13.5604 4.42039 13.7404 4.68039 13.4804L7.40039 10.8004H15.2004C15.4204 10.8004 15.6004 10.6204 15.6004 10.4004V0.800391C15.6004 0.580391 15.4204 0.400391 15.2004 0.400391ZM14.8004 10.0004H7.24039C7.14039 10.0004 7.04039 10.0404 6.96039 10.1204L4.80039 12.2404V10.4004C4.80039 10.1804 4.62039 10.0004 4.40039 10.0004H1.20039V1.20039H14.8004V10.0004Z" fill="#6D5D4C" />
                                                                        </svg>
                                                                    </span>
                                                                    <span className="usr-blog-card-view-comment-box-number">
                                                                        {blog.comments && Array.isArray(blog.comments) && blog.comments.length>0 ? blog.comments.length : 0}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    )
                                                })}
                                            </Slider>
                                        </div>
                                        :
                                        <div className="p-5 text-center">No Data Found.</div>}
                                    <div className="recent-blog-main-btn text-center">
                                        <Link type="button" className="usr-common-action-btn btn" to={`/blogs`}>LOAD ALL</Link>
                                    </div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default Homepage;