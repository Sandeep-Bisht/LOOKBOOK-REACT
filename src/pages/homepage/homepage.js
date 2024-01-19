import EmergingArtist from "./emergingArtist/index.js"
import '@css/user/homepage.css'
import Slider from "react-slick";
import checked from "@core/assets/images/checked.png";
import { useLoaderData, useNavigate } from "react-router-dom";
import { truncateDescription } from "configs/truncateDescription.js";
import { formatIndianRupee } from "configs/formatIndianRupee.js";



const Homepage = () => {

    const { allArtists, allBlogs } = useLoaderData()

    const navigate = useNavigate();

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

    return (
        <>
            <section className='usr-home-banner'>
                <div className='container'>
                    {
                        allArtists?.length > 0 ?
                            <Slider {...settings}>
                                {[...Array(allArtists.length > 6 ? 6 : allArtists.length)].map((_, index) => {
                                    return (
                                        <div className="item">
                                            <img src={`${allArtists[index]?.gallery[0]?.url}?tr=h-500,w-400,fo-auto`} className="img-fluid owl-pic" />
                                        </div>
                                    )
                                })}
                            </Slider>
                            :
                            <div className="p-5">
                                No Data Found.
                            </div>
                    }
                    <div className="col-md-12 usr-content text-center">
                        <h1 className="usr-home-banner-heading">Experience the Beauty of</h1>
                        <span className="usr-home-banner-tag ">Professional Makeup</span>
                    </div>
                    <div className="usr-button d-flex justify-content-center mt-lg-2">
                        <button className="usr-common-action-btn usr-home-banner-action-btn" type="button" onClick={() => navigate('/artists')}>Consult A Professional</button>
                    </div>
                </div>
            </section>
            <section className="usr-artist-area usr-overlap-section">
                <div className="container-fluid">
                    <div className="row d-none">
                        <div className="col-lg-12">
                            <h1 className="common-heading  text-center">
                                The Experts at LookBook
                            </h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 mx-auto">
                            <div className="usr-artist-area-wrapper">

                                <div className="row">
                                    <div className="heading-box-one">
                                        <h2 className="common-heading">The Experts</h2>
                                    </div>

                                    <div className="col-lg-5 mx-auto">
                                        <ul id="cards">
                                            {
                                                allArtists?.length > 0 ?
                                                    <>
                                                        {[...Array(allArtists.length > 5 ? 5 : allArtists.length)].map((_, index) => {
                                                            return (
                                                                <li className="card usr-artist-area-card" id={`card${index + 1}`}>
                                                                    <div className="card-body">
                                                                        <div className="row align-items-center ">
                                                                            <div className="col-lg-12 mx-auto">
                                                                                <div className="usr-expert-pic-expert-info">
                                                                                    <div className="row g-0">
                                                                                        <div className="col-lg-6 col-6">
                                                                                            <div className="usr-expert-pic-name-box common-cursor-pointer" onClick={() => navigate(`/artists/${allArtists[index]?._id}`)}>
                                                                                                <p className="usr-expert-pic-name">
                                                                                                    {allArtists[index]?.profile_id?.fullName}
                                                                                                </p>
                                                                                                <span className="usr-expert-pic-profile">
                                                                                                    Make up Artist
                                                                                                </span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-lg-6 col-6">
                                                                                            <div className="usr-expert-pic-charges-box">
                                                                                                <p className="usr-expert-pic-name invisible">
                                                                                                    Charges:
                                                                                                </p>
                                                                                                <span className="usr-expert-pic-profile">
                                                                                                    {formatIndianRupee(allArtists[index]?.pricing?.totalPrice)}/onwards
                                                                                                </span>
                                                                                            </div>
                                                                                        </div>

                                                                                    </div>
                                                                                </div>
                                                                                <div className="expert-pic">
                                                                                    <img src={allArtists[index]?.gallery[0]?.url} className="img-fluid common-cursor-pointer" onClick={() => navigate(`/artists/${allArtists[index]?._id}`)} />
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
                                                    </>
                                                    :
                                                    <li className="p-5">
                                                        No Data Found.
                                                    </li>
                                            }
                                        </ul>
                                    </div>
                                    <div className="heading-box-two">
                                        <h2 className="common-heading">at LookBook</h2>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="user-select-package  usr-overlap-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="usr-common-heading text-center">
                                Select Your Package
                            </h2>
                        </div>

                    </div>
                    <div className="row mt-lg-4">
                        <div className="col-lg-4 col-md-4 ">
                            <div className="usr-package-card">
                                <div className="usr-package-card-icon">
                                    <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M49.583 40.8343V35.0009H20.4163V46.6676H5.83301V64.1676H64.1663V40.8343H49.583ZM20.4163 58.3343H11.6663V52.5009H20.4163V58.3343ZM43.7497 58.3343H26.2497V40.8343H43.7497V58.3343ZM58.333 58.3343H49.583V46.6676H58.333V58.3343ZM26.5122 22.8093L25.4913 28.6426C25.3872 29.1894 25.4417 29.7546 25.6485 30.2714C25.8552 30.7882 26.2055 31.2351 26.658 31.5593C27.0832 31.847 27.5768 32.0174 28.0889 32.0532C28.601 32.0891 29.1136 31.9891 29.5747 31.7634L34.8538 28.8468L40.133 31.7634C40.5456 31.9862 41.0058 32.1063 41.4747 32.1134C42.0925 32.1156 42.6951 31.9216 43.1955 31.5593C43.648 31.2351 43.9983 30.7882 44.205 30.2714C44.4118 29.7546 44.4663 29.1894 44.3622 28.6426L43.3413 22.8093L47.6288 18.6384C48.0226 18.2579 48.3013 17.7743 48.4331 17.2428C48.5649 16.7114 48.5444 16.1536 48.374 15.6332C48.2035 15.1129 47.8901 14.651 47.4695 14.3004C47.0489 13.9498 46.5381 13.7248 45.9955 13.6509L40.1622 12.8051L37.5372 7.46759C37.2983 6.97446 36.9254 6.55858 36.4612 6.26759C35.9969 5.9766 35.4601 5.82227 34.9122 5.82227C34.3643 5.82227 33.8274 5.9766 33.3632 6.26759C32.8989 6.55858 32.526 6.97446 32.2872 7.46759L29.6622 12.8051L23.8288 13.6509C23.2863 13.7248 22.7755 13.9498 22.3549 14.3004C21.9342 14.651 21.6208 15.1129 21.4504 15.6332C21.28 16.1536 21.2595 16.7114 21.3913 17.2428C21.523 17.7743 21.8017 18.2579 22.1955 18.6384L26.5122 22.8093ZM32.083 18.3468C32.5474 18.2796 32.9888 18.1013 33.3696 17.8271C33.7504 17.5529 34.0595 17.1909 34.2705 16.7718L34.9997 15.3426L35.6997 16.7718C35.9107 17.1909 36.2197 17.5529 36.6006 17.8271C36.9814 18.1013 37.4227 18.2796 37.8872 18.3468L39.4622 18.5801L38.3247 19.6884C37.9826 20.0193 37.7267 20.4288 37.5793 20.8813C37.4318 21.3337 37.3974 21.8154 37.4788 22.2843L37.7705 23.8301L36.3413 23.1009C35.9316 22.871 35.4696 22.7502 34.9997 22.7502C34.5298 22.7502 34.0678 22.871 33.658 23.1009L32.2288 23.8301L32.5205 22.2843C32.602 21.8154 32.5675 21.3337 32.4201 20.8813C32.2726 20.4288 32.0167 20.0193 31.6747 19.6884L30.5372 18.5801L32.083 18.3468Z" fill="#6D5D4C" />
                                    </svg>

                                </div>
                                <div className="usr-package-card-content">
                                    <p className="usr-package-card-title">
                                        Economical
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
                            <div className="usr-package-card">
                                <div className="usr-package-card-icon">
                                    <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M63.6282 51.7543L52.9619 33.5718C54.0032 31.1743 54.5894 28.534 54.5894 25.7559C54.5894 14.9015 45.7585 6.06836 34.9019 6.06836C24.0476 6.06836 15.2144 14.9015 15.2144 25.7559C15.2144 28.5405 15.8029 31.1874 16.8507 33.5915L6.35944 52.019C5.90006 52.8262 6.00069 53.8368 6.611 54.5368C7.21912 55.2368 8.2035 55.4774 9.07194 55.1318L19.5457 50.9602L21.3044 62.0815C21.4488 63.0002 22.1597 63.7265 23.0741 63.8905C23.2054 63.9168 23.3366 63.9277 23.4679 63.9277C24.2422 63.9277 24.9751 63.5143 25.3688 62.8209L34.9129 46.0318L44.7697 62.823C45.1679 63.5034 45.8919 63.9037 46.6554 63.9037C46.7932 63.9037 46.9354 63.8905 47.0754 63.8621C47.9854 63.6827 48.6854 62.9499 48.8188 62.029L50.4398 50.8837L60.9682 54.8999C61.8344 55.2259 62.8188 54.9765 63.4182 54.2677C64.011 53.5655 64.0985 52.5549 63.6282 51.7543ZM34.8998 10.4455C43.3413 10.4455 50.2122 17.3143 50.2122 25.758C50.2122 34.1996 43.3413 41.0705 34.8998 41.0705C26.456 41.0705 19.5872 34.2018 19.5872 25.758C19.5872 17.3143 26.456 10.4455 34.8998 10.4455ZM24.6469 55.2324L23.4351 47.5784C23.3322 46.9221 22.9341 46.3468 22.3566 46.0187C21.7769 45.6884 21.0813 45.6402 20.4644 45.8874L13.2479 48.7596L19.4319 37.8965C22.1685 41.3768 26.0469 43.9077 30.5007 44.9293L24.6469 55.2324ZM49.4422 45.8284C48.821 45.5921 48.1297 45.6512 47.5544 45.9859C46.9813 46.3205 46.5941 46.9002 46.5001 47.5587L45.3822 55.239L39.3273 44.9249C43.7898 43.8946 47.6682 41.3484 50.4026 37.8549L56.7069 48.6021L49.4422 45.8284Z" fill="#6D5D4C" />
                                        <path d="M33.0358 31.8487C33.447 32.26 34.0027 32.4896 34.5823 32.4896C34.6239 32.4896 34.6633 32.4896 34.7027 32.4875C35.3239 32.4525 35.9014 32.155 36.2908 31.6693L45.043 20.7318C45.7977 19.789 45.6423 18.4109 44.7017 17.6584C43.7545 16.9037 42.3808 17.059 41.6261 17.9996L34.403 27.0275L29.5686 22.1931C28.7133 21.3378 27.3308 21.3378 26.4755 22.1931C25.6202 23.0484 25.6202 24.4309 26.4755 25.2862L33.0358 31.8487Z" fill="#6D5D4C" />
                                    </svg>


                                </div>
                                <div className="usr-package-card-content">
                                    <p className="usr-package-card-title">
                                        Standard
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
                            <div className="usr-package-card">
                                <div className="usr-package-card-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
                                        <path d="M19.6875 8.75C18.999 8.75 18.3506 9.07419 17.9375 9.625L4.8125 27.125C4.21024 27.928 4.23178 29.0379 4.86474 29.8169L33.3022 64.8169C33.7176 65.3284 34.3413 65.625 35 65.625C35.6587 65.625 36.2824 65.3284 36.6978 64.8169L65.1354 29.8169C65.7681 29.0379 65.7899 27.928 65.1875 27.125L52.0625 9.625C51.6495 9.07419 51.0011 8.75 50.3125 8.75H19.6875ZM10.9375 26.25L20.7813 13.125H25.462L21.3604 26.25H10.9375ZM25.9441 26.25L30.0456 13.125H39.9542L44.0558 26.25H25.9441ZM43.8992 30.625L35 54.8957L26.1008 30.625H43.8992ZM40.1022 53.6891L48.559 30.625H58.8416L40.1022 53.6891ZM48.6395 26.25L44.5379 13.125H49.2188L59.0625 26.25H48.6395ZM11.1584 30.625H21.4409L29.8976 53.6887L11.1584 30.625Z" fill="#6D5D4C" />
                                    </svg>

                                </div>
                                <div className="usr-package-card-content">
                                    <p className="usr-package-card-title">
                                        Premium
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
                        {
                            allArtists?.length > 0 ?
                                <>
                                    {[...Array(allArtists.length > 4 ? 4 : allArtists.length)].map((_, index) => {
                                        return (
                                            <div className="col-lg-3 col-md-6 col-sm-6">
                                                <div className="usr-featured-artist-card common-cursor-pointer" onClick={() => navigate(`/artists/${allArtists[index]?._id}`)}>
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
                                                                <h3>Makeup Artist</h3>
                                                            </div>
                                                            <div className="desc">
                                                                <p>{truncateDescription(allArtists[index]?.description, 45)}</p>
                                                            </div>
                                                        </div>
                                                        <div className="prizeButton">
                                                            <div className="prize">
                                                                <span className="usr-charges">Charges</span>
                                                                <span className="usr-price">{formatIndianRupee(allArtists[index]?.pricing?.totalPrice)}</span>
                                                            </div>
                                                            <div className="reserveButton">
                                                                <button className="rButton">
                                                                    <span className="me-2">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
                                                                            <path d="M7.05238 12.4713C6.9456 12.4719 6.8428 12.4308 6.76592 12.3567L3.69675 9.37752C3.65806 9.33991 3.62715 9.29503 3.6058 9.24547C3.58445 9.19591 3.57307 9.14263 3.57231 9.08867C3.57155 9.03471 3.58142 8.98113 3.60137 8.93099C3.62132 8.88084 3.65095 8.83512 3.68856 8.79643C3.72618 8.75773 3.77105 8.72683 3.82061 8.70548C3.87018 8.68413 3.92346 8.67274 3.97742 8.67198C4.03138 8.67122 4.08496 8.6811 4.1351 8.70105C4.18524 8.721 4.23097 8.75062 4.26966 8.78824L7.05238 11.4891L13.5181 5.21981C13.5963 5.14384 13.7014 5.10202 13.8104 5.10356C13.9193 5.10509 14.0232 5.14985 14.0992 5.228C14.1752 5.30614 14.217 5.41126 14.2155 5.52024C14.2139 5.62922 14.1692 5.73312 14.091 5.8091L7.33884 12.3567C7.26196 12.4308 7.15916 12.4719 7.05238 12.4713Z" fill="#FCF7F2" stroke="#FCF7F2" stroke-width="1.63689" />
                                                                        </svg>
                                                                    </span>
                                                                    Reserve</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    })}
                                </>
                                :
                                <div className="p-5">
                                    No Data Found.
                                </div>
                        }
                    </div>
                </div>
            </section>
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
                                                    return (<div className="usr-blog-main-content-wrapper common-cursor-pointer" key={`blog${ind}`} onClick={() => navigate(`/blogs/${blog?.category?.slug}/${blog?.slug}`)}>
                                                        <div className="usr-blog-main-content">
                                                            <img src={blog.featuredImage.url} className="img-fluid" />
                                                            <div className="usr-card-body">
                                                                <h4 className="usr-blog-heading">{blog.title}</h4>
                                                                <p className="usr-blog-para">
                                                                    {truncateDescription(blog.description, 75)}
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
                                                                        0
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>)
                                                })}
                                            </Slider>
                                        </div>
                                        :
                                        <div className="p-5">No Data Found.</div>}
                                    <div className="recent-blog-main-btn text-center">
                                        <button type="button" className="usr-common-action-btn" onClick={() => navigate(`/blogs`)}>LOAD ALL</button>
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