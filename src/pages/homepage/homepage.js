import React from "react";
import Header from "layouts/components/header/header";
import Footer from "layouts/components/footer/footer"
import '../../css/home.css'
const Homepage = () => {
    return (
        <>
            <Header />
            <section className="home-banner">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="center-mode-slider">
                                <div className="home-banner-single-card">
                                    <img src="images/slider/slider-image1.jpg" alt="Image 1" className="img-fluid" />
                                    <slider1 />
                                </div>
                                <div className="home-banner-single-card"><img src="./images/slider/slider-image4.jpg" alt="Image 1" className="img-fluid" />
                                </div>
                                <div className="home-banner-single-card">
                                    <img src="images/slider/slider-image2.jpg" alt="Image 1" className="img-fluid" />
                                </div>
                                <div className="home-banner-single-card"> <img src="./images/slider/slider-image5.jpg" alt="Image 1" className="img-fluid" />
                                </div>
                                <div className="home-banner-single-card">
                                    <img src="images/slider/slider-image3.jpg" alt="Image 1" className="img-fluid" />
                                </div>
                                <div className="home-banner-single-card"> <img src="./images/slider/slider-image6.jpg" alt="Image 1" className="img-fluid" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div></section>
            <section className="home-selection-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <form className="home-selction-form">
                                <button className=" custom-search">
                                    <svg width={46} height={45} viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M41.2062 38.0438L34.25 31.1438C36.9502 27.777 38.2578 23.5037 37.904 19.2024C37.5502 14.9012 35.5619 10.899 32.3479 8.01871C29.1338 5.13845 24.9384 3.59909 20.6242 3.71714C16.3101 3.83519 12.2051 5.60168 9.15339 8.6534C6.10168 11.7051 4.33519 15.8101 4.21714 20.1242C4.09909 24.4384 5.63845 28.6338 8.51871 31.8479C11.399 35.0619 15.4012 37.0502 19.7024 37.404C24.0037 37.7578 28.277 36.4502 31.6438 33.75L38.5438 40.65C38.7181 40.8258 38.9254 40.9652 39.1539 41.0604C39.3824 41.1556 39.6275 41.2046 39.875 41.2046C40.1225 41.2046 40.3676 41.1556 40.5961 41.0604C40.8246 40.9652 41.0319 40.8258 41.2062 40.65C41.5442 40.3004 41.7331 39.8331 41.7331 39.3469C41.7331 38.8606 41.5442 38.3934 41.2062 38.0438ZM21.125 33.75C18.5291 33.75 15.9915 32.9802 13.8331 31.538C11.6747 30.0959 9.99248 28.046 8.99908 25.6477C8.00568 23.2494 7.74577 20.6104 8.2522 18.0644C8.75863 15.5184 10.0087 13.1798 11.8442 11.3442C13.6798 9.50866 16.0184 8.25863 18.5644 7.7522C21.1104 7.24577 23.7494 7.50569 26.1477 8.49909C28.546 9.49249 30.5958 11.1748 32.038 13.3331C33.4802 15.4915 34.25 18.0291 34.25 20.625C34.25 24.106 32.8672 27.4444 30.4058 29.9058C27.9444 32.3672 24.606 33.75 21.125 33.75Z" fill="#FEFEFE" />
                                    </svg>
                                </button>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="dropdown">
                                            <button className="custom-drodown-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <div className="left">
                                                    <svg width={22} height={27} viewBox="0 0 22 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M1.29892 11.4891C1.31693 6.18839 5.62862 1.9059 10.9294 1.92385C16.2301 1.94192 20.5126 6.25361 20.4946 11.5543V11.663C20.4294 15.1087 18.5054 18.2935 16.1467 20.7826C14.7978 22.1834 13.2914 23.4235 11.6576 24.4783C11.2207 24.8561 10.5727 24.8561 10.1359 24.4783C7.70025 22.8929 5.56259 20.8914 3.82066 18.5652C2.26811 16.5367 1.38663 14.0747 1.29892 11.5217V11.4891Z" stroke="#6D5D4C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M10.8963 14.75C12.5952 14.75 13.9725 13.3727 13.9725 11.6738C13.9725 9.97479 12.5952 8.5975 10.8963 8.5975C9.19729 8.5975 7.82001 9.97479 7.82001 11.6738C7.82001 13.3727 9.19729 14.75 10.8963 14.75Z" stroke="#6D5D4C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                                <div className="right">
                                                    <p className="mb-0">
                                                        <span>Location</span>
                                                        <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill="none" d="M0 0h24v24H0V0z">
                                                            </path>
                                                            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z">
                                                            </path>
                                                        </svg>
                                                    </p>
                                                </div>
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item" href="#">Action</a></li>
                                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="dropdown">
                                            <button className="custom-drodown-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <div className="left">
                                                    <svg width={30} height={31} viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.69068 14.3147C8.03912 13.3474 7.68755 12.2383 7.68755 11.0978C7.68755 10.1852 7.68755 9.23871 7.68755 8.32607C7.68755 6.63979 8.45627 5.0224 9.82971 3.82974C11.1985 2.63749 13.0594 1.96738 15 1.96738C16.9407 1.96738 18.8016 2.63749 20.1704 3.82974C21.5438 5.0224 22.3125 6.63979 22.3125 8.32607V11.0978C22.3125 12.2383 21.961 13.3474 21.3094 14.3147C24.4735 14.8523 26.9485 17.1516 27.2485 20.0424C27.4219 21.6952 27.6188 23.6028 27.825 25.5349C27.8485 25.7632 27.7594 25.9894 27.5813 26.1585C27.4031 26.3277 27.1547 26.4239 26.8875 26.4239H3.11254C2.84536 26.4239 2.59693 26.3277 2.4188 26.1585C2.24068 25.9894 2.15161 25.7632 2.17504 25.5349C2.38129 23.6028 2.57816 21.6952 2.7516 20.0424C3.0516 17.1516 5.52662 14.8523 8.69068 14.3147ZM19.8891 15.8261C18.5485 16.8732 16.8094 17.4565 15 17.4565C13.1907 17.4565 11.4516 16.8732 10.111 15.8261C7.25626 15.8277 4.87503 17.7194 4.61721 20.1899L4.13908 24.7935H25.861L25.3829 20.1899C25.125 17.7194 22.7438 15.8277 19.8891 15.8261ZM20.4375 8.32607V11.0978C20.4375 12.352 19.8656 13.5545 18.8438 14.441C17.8266 15.328 16.4438 15.8261 15 15.8261C13.5563 15.8261 12.1735 15.328 11.1563 14.441C10.1344 13.5545 9.56255 12.352 9.56255 11.0978C9.56255 10.1852 9.56255 9.23871 9.56255 8.32607C9.56255 7.07186 10.1344 5.86942 11.1563 4.98287C12.1735 4.09591 13.5563 3.59781 15 3.59781C16.4438 3.59781 17.8266 4.09591 18.8438 4.98287C19.8656 5.86942 20.4375 7.07186 20.4375 8.32607Z" fill="#6D5D4C" stroke="#6D5D4C" />
                                                    </svg>
                                                </div>
                                                <div className="right">
                                                    <p className="mb-0">
                                                        <span>Artist Type</span>
                                                        <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill="none" d="M0 0h24v24H0V0z">
                                                            </path>
                                                            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z">
                                                            </path>
                                                        </svg>
                                                    </p>
                                                </div>
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item" href="#">Action</a></li>
                                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="dropdown">
                                            <button className="custom-drodown-btn dropdown-toggle border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <div className="left">
                                                    <svg width={30} height={31} viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M23.75 5.04546H21.25V3.9091C21.25 3.60772 21.1183 3.31868 20.8839 3.10557C20.6495 2.89246 20.3315 2.77274 20 2.77274C19.6685 2.77274 19.3505 2.89246 19.1161 3.10557C18.8817 3.31868 18.75 3.60772 18.75 3.9091V5.04546H11.25V3.9091C11.25 3.60772 11.1183 3.31868 10.8839 3.10557C10.6495 2.89246 10.3315 2.77274 10 2.77274C9.66848 2.77274 9.35054 2.89246 9.11612 3.10557C8.8817 3.31868 8.75 3.60772 8.75 3.9091V5.04546H6.25C5.25544 5.04546 4.30161 5.40463 3.59835 6.04396C2.89509 6.68329 2.5 7.55041 2.5 8.45455V22.0909C2.5 22.9951 2.89509 23.8622 3.59835 24.5015C4.30161 25.1408 5.25544 25.5 6.25 25.5H23.75C24.7446 25.5 25.6984 25.1408 26.4017 24.5015C27.1049 23.8622 27.5 22.9951 27.5 22.0909V8.45455C27.5 7.55041 27.1049 6.68329 26.4017 6.04396C25.6984 5.40463 24.7446 5.04546 23.75 5.04546ZM25 22.0909C25 22.3923 24.8683 22.6813 24.6339 22.8944C24.3995 23.1076 24.0815 23.2273 23.75 23.2273H6.25C5.91848 23.2273 5.60054 23.1076 5.36612 22.8944C5.1317 22.6813 5 22.3923 5 22.0909V14.1364H25V22.0909ZM25 11.8636H5V8.45455C5 8.15317 5.1317 7.86413 5.36612 7.65102C5.60054 7.43791 5.91848 7.31819 6.25 7.31819H8.75V8.45455C8.75 8.75594 8.8817 9.04497 9.11612 9.25808C9.35054 9.47119 9.66848 9.59092 10 9.59092C10.3315 9.59092 10.6495 9.47119 10.8839 9.25808C11.1183 9.04497 11.25 8.75594 11.25 8.45455V7.31819H18.75V8.45455C18.75 8.75594 18.8817 9.04497 19.1161 9.25808C19.3505 9.47119 19.6685 9.59092 20 9.59092C20.3315 9.59092 20.6495 9.47119 20.8839 9.25808C21.1183 9.04497 21.25 8.75594 21.25 8.45455V7.31819H23.75C24.0815 7.31819 24.3995 7.43791 24.6339 7.65102C24.8683 7.86413 25 8.15317 25 8.45455V11.8636Z" fill="#6D5D4C" />
                                                    </svg>
                                                </div>
                                                <div className="right">
                                                    <p className="mb-0">
                                                        <span>Date</span>
                                                        <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill="none" d="M0 0h24v24H0V0z">
                                                            </path>
                                                            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z">
                                                            </path>
                                                        </svg>
                                                    </p>
                                                </div>
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item" href="#">Action</a></li>
                                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <section className="artist-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="common-heading  text-center">
                                The Experts at LookBook
                            </h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 mx-auto">
                            <ul id="cards">
                                <li className="card" id="card1">
                                    <div className="card-body">
                                        <div className="row align-items-center w-100">
                                            <div className="col-lg-8 col-md-6">
                                                <div className="expert-pic">
                                                    <img src="images/1.jpg" className="img-fluid" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="artist-info mb-3">
                                                    <div className="artist-name ">
                                                        ballu 320
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="card" id="card2">
                                    <div className="card-body">
                                        <div className="row align-items-center w-100">
                                            <div className="col-lg-8 col-md-6">
                                                <div className="expert-pic">
                                                    <img src="images/2.jpg" className="img-fluid" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="artist-info">
                                                    <div className="artist-name ">
                                                        gilu 320
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="card" id="card3">
                                    <div className="card-body">
                                        <div className="row align-items-center w-100">
                                            <div className="col-lg-8 col-md-6">
                                                <div className="expert-pic">
                                                    <img src="images/3.jpg" className="img-fluid" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="artist-info">
                                                    <div className="artist-name ">
                                                        tilu 320
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="card" id="card4">
                                    <div className="card-body">
                                        <div className="row align-items-center w-100">
                                            <div className="col-lg-8 col-md-6">
                                                <div className="expert-pic">
                                                    <img src="images/4.jpg" className="img-fluid" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="artist-info">
                                                    <div className="artist-name ">
                                                        chintu 320
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="card" id="card5">
                                    <div className="card-body">
                                        <div className="row align-items-center w-100">
                                            <div className="col-lg-8 col-md-6">
                                                <div className="expert-pic">
                                                    <img src="images/5.jpg" className="img-fluid" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="artist-info">
                                                    <div className="artist-name ">
                                                        pinto 320
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section className="home-pricing-card">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="common-heading  text-center mb-lg-5">
                                Select your package
                            </h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="pricing-card">
                                <div className="front">
                                    <img src="images/package1.jpg" alt="Product Image" className="img-fluid" />
                                    <button className="btn package-btn">
                                        Economical
                                    </button>
                                </div>
                                <div className="back">
                                    <div className="pricing-detail-card">
                                        <h3 className="pricing-detail-card-heading">Economical</h3>
                                        <p className="price">Under 10,000/-</p>
                                        <p className="common-para">Lorem ipsum dolor sit amet consectetur.
                                            Mi et donec morbi quam cras egestas phasellus. Accumsan pulvinar at ultrices dolor
                                            accumsan feugiat tellus.</p>
                                        <a href="#" className="book-now">
                                            <span><svg width={21} height={20} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.25014 14.5001C8.11968 14.5009 7.99408 14.4507 7.90014 14.3601L4.15014 10.7201C4.10287 10.6742 4.06511 10.6194 4.03902 10.5588C4.01293 10.4982 3.99903 10.4331 3.9981 10.3672C3.99717 10.3013 4.00923 10.2358 4.03361 10.1746C4.05798 10.1133 4.09418 10.0574 4.14014 10.0101C4.18611 9.96287 4.24093 9.92511 4.30149 9.89902C4.36204 9.87293 4.42714 9.85903 4.49307 9.8581C4.559 9.85717 4.62447 9.86923 4.68573 9.89361C4.747 9.91798 4.80287 9.95418 4.85014 10.0001L8.25014 13.3001L16.1501 5.64014C16.2456 5.54732 16.3741 5.49622 16.5072 5.4981C16.6404 5.49997 16.7673 5.55466 16.8601 5.65014C16.953 5.74562 17.0041 5.87406 17.0022 6.00721C17.0003 6.14036 16.9456 6.26732 16.8501 6.36014L8.60014 14.3601C8.50621 14.4507 8.38061 14.5009 8.25014 14.5001Z" fill="#FCF7F2" stroke="#FCF7F2" strokeWidth={2} />
                                            </svg>
                                            </span>Book Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="pricing-card">
                                <div className="front">
                                    <img src="images/package2.jpg" alt="Product Image" className="img-fluid" />
                                    <button className="btn package-btn">
                                        Standard
                                    </button>
                                </div>
                                <div className="back">
                                    <div className="pricing-detail-card">
                                        <h3 className="pricing-detail-card-heading">Standard</h3>
                                        <p className="price">Under 50,000/-</p>
                                        <p className="common-para">Lorem ipsum dolor sit amet consectetur.
                                            Mi et donec morbi quam cras egestas phasellus. Accumsan pulvinar at ultrices dolor
                                            accumsan feugiat tellus.</p>
                                        <a href="#" className="book-now">
                                            <span><svg width={21} height={20} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.25014 14.5001C8.11968 14.5009 7.99408 14.4507 7.90014 14.3601L4.15014 10.7201C4.10287 10.6742 4.06511 10.6194 4.03902 10.5588C4.01293 10.4982 3.99903 10.4331 3.9981 10.3672C3.99717 10.3013 4.00923 10.2358 4.03361 10.1746C4.05798 10.1133 4.09418 10.0574 4.14014 10.0101C4.18611 9.96287 4.24093 9.92511 4.30149 9.89902C4.36204 9.87293 4.42714 9.85903 4.49307 9.8581C4.559 9.85717 4.62447 9.86923 4.68573 9.89361C4.747 9.91798 4.80287 9.95418 4.85014 10.0001L8.25014 13.3001L16.1501 5.64014C16.2456 5.54732 16.3741 5.49622 16.5072 5.4981C16.6404 5.49997 16.7673 5.55466 16.8601 5.65014C16.953 5.74562 17.0041 5.87406 17.0022 6.00721C17.0003 6.14036 16.9456 6.26732 16.8501 6.36014L8.60014 14.3601C8.50621 14.4507 8.38061 14.5009 8.25014 14.5001Z" fill="#FCF7F2" stroke="#FCF7F2" strokeWidth={2} />
                                            </svg>
                                            </span>Book Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="pricing-card">
                                <div className="front">
                                    <img src="images/package3.jpg" alt="Product Image" className="img-fluid" />
                                    <button className="btn package-btn">
                                        Premium
                                    </button>
                                </div>
                                <div className="back">
                                    <div className="pricing-detail-card">
                                        <h3 className="pricing-detail-card-heading">Premium</h3>
                                        <p className="price">Above 50,000/-</p>
                                        <p className="common-para">Lorem ipsum dolor sit amet consectetur.
                                            Mi et donec morbi quam cras egestas phasellus. Accumsan pulvinar at ultrices dolor
                                            accumsan feugiat tellus.</p>
                                        <a href="#" className="book-now">
                                            <span><svg width={21} height={20} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.25014 14.5001C8.11968 14.5009 7.99408 14.4507 7.90014 14.3601L4.15014 10.7201C4.10287 10.6742 4.06511 10.6194 4.03902 10.5588C4.01293 10.4982 3.99903 10.4331 3.9981 10.3672C3.99717 10.3013 4.00923 10.2358 4.03361 10.1746C4.05798 10.1133 4.09418 10.0574 4.14014 10.0101C4.18611 9.96287 4.24093 9.92511 4.30149 9.89902C4.36204 9.87293 4.42714 9.85903 4.49307 9.8581C4.559 9.85717 4.62447 9.86923 4.68573 9.89361C4.747 9.91798 4.80287 9.95418 4.85014 10.0001L8.25014 13.3001L16.1501 5.64014C16.2456 5.54732 16.3741 5.49622 16.5072 5.4981C16.6404 5.49997 16.7673 5.55466 16.8601 5.65014C16.953 5.74562 17.0041 5.87406 17.0022 6.00721C17.0003 6.14036 16.9456 6.26732 16.8501 6.36014L8.60014 14.3601C8.50621 14.4507 8.38061 14.5009 8.25014 14.5001Z" fill="#FCF7F2" stroke="#FCF7F2" strokeWidth={2} />
                                            </svg>
                                            </span>Book Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="home-recent-blog">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="common-heading  text-center mb-lg-5">
                                Recent Blogs
                            </h2>
                        </div>
                    </div>
                    <div className="row g-0">
                        <div className="col-lg-8">
                            <div className="row g-0">
                                <div className="col-lg-12">
                                    <div className="recent-blog-card first-card">
                                        <img src="images/blog/image1.jpg" className="img-fluid" />
                                        <div className="recent-blog-inner-wrapper">
                                            <div className="recent-blog-inner-wrapper-content">
                                                <div className="upper">
                                                    <p className="recent-blog-inner-wrapper-heading">
                                                        Makeup Artist Carrer
                                                    </p>
                                                    <p className="recent-blog-inner-wrapper-para">
                                                        Importance and demand for makeup artists in various industries
                                                    </p>
                                                    <p className="blog-publish-detail-box">
                                                        <span className="blog-publish-detail">Oct 3</span> -
                                                        <span className="blog-publish-detail">2 min</span>
                                                    </p>
                                                </div>
                                                <div className="bottom">
                                                    <p className="blog-publish-detail-box">
                                                        <span className="blog-publish-detail">
                                                            <svg width={18} height={10} viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9 1.8C7.24 1.8 5.8 3.24 5.8 5C5.8 6.76 7.24 8.2 9 8.2C10.76 8.2 12.2 6.76 12.2 5C12.2 3.24 10.76 1.8 9 1.8ZM9 7.4C7.68 7.4 6.6 6.32 6.6 5C6.6 3.68 7.68 2.6 9 2.6C10.32 2.6 11.4 3.68 11.4 5C11.4 6.32 10.32 7.4 9 7.4ZM17.88 4.72L16.16 2.98C14.26 1.06 11.72 0 9 0C6.28 0 3.74 1.06 1.84 2.98L0.12 4.72C-0.04 4.88 -0.04 5.12 0.12 5.28L1.84 7.02C3.74 8.94 6.28 10 9 10C11.72 10 14.26 8.94 16.16 7.02L17.88 5.28C18.04 5.12 18.04 4.88 17.88 4.72ZM15.6 6.46C13.84 8.22 11.5 9.2 9 9.2C6.5 9.2 4.16 8.22 2.4 6.46L0.96 5L2.4 3.54C4.16 1.78 6.5 0.8 9 0.8C11.5 0.8 13.84 1.78 15.6 3.54L17.04 5L15.6 6.46Z" fill="#FCF7F2" />
                                                            </svg> 2
                                                        </span>-
                                                        <span className="blog-publish-detail">
                                                            <svg width={16} height={14} viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M15.2 0.399902H0.800024C0.580024 0.399902 0.400024 0.579902 0.400024 0.799902V10.3999C0.400024 10.6199 0.580024 10.7999 0.800024 10.7999H4.00002V13.1999C4.00002 13.5599 4.42002 13.7399 4.68002 13.4799L7.40002 10.7999H15.2C15.42 10.7999 15.6 10.6199 15.6 10.3999V0.799902C15.6 0.579902 15.42 0.399902 15.2 0.399902ZM14.8 9.9999H7.24002C7.14002 9.9999 7.04002 10.0399 6.96002 10.1199L4.80002 12.2399V10.3999C4.80002 10.1799 4.62002 9.9999 4.40002 9.9999H1.20002V1.1999H14.8V9.9999Z" fill="#FCF7F2" />
                                                            </svg>
                                                            0</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="recent-blog-card">
                                        <img src="images/blog/image3.jpg" className="img-fluid" />
                                        <div className="recent-blog-inner-wrapper">
                                            <div className="recent-blog-inner-wrapper-content">
                                                <div className="upper">
                                                    <p className="recent-blog-inner-wrapper-heading">
                                                        Makeup Artist Carrer
                                                    </p>
                                                    <p className="recent-blog-inner-wrapper-para">
                                                        Importance and demand for makeup artists in various industries
                                                    </p>
                                                    <p className="blog-publish-detail-box">
                                                        <span className="blog-publish-detail">Oct 3</span> -
                                                        <span className="blog-publish-detail">2 min</span>
                                                    </p>
                                                </div>
                                                <div className="bottom">
                                                    <p className="blog-publish-detail-box">
                                                        <span className="blog-publish-detail">
                                                            <svg width={18} height={10} viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9 1.8C7.24 1.8 5.8 3.24 5.8 5C5.8 6.76 7.24 8.2 9 8.2C10.76 8.2 12.2 6.76 12.2 5C12.2 3.24 10.76 1.8 9 1.8ZM9 7.4C7.68 7.4 6.6 6.32 6.6 5C6.6 3.68 7.68 2.6 9 2.6C10.32 2.6 11.4 3.68 11.4 5C11.4 6.32 10.32 7.4 9 7.4ZM17.88 4.72L16.16 2.98C14.26 1.06 11.72 0 9 0C6.28 0 3.74 1.06 1.84 2.98L0.12 4.72C-0.04 4.88 -0.04 5.12 0.12 5.28L1.84 7.02C3.74 8.94 6.28 10 9 10C11.72 10 14.26 8.94 16.16 7.02L17.88 5.28C18.04 5.12 18.04 4.88 17.88 4.72ZM15.6 6.46C13.84 8.22 11.5 9.2 9 9.2C6.5 9.2 4.16 8.22 2.4 6.46L0.96 5L2.4 3.54C4.16 1.78 6.5 0.8 9 0.8C11.5 0.8 13.84 1.78 15.6 3.54L17.04 5L15.6 6.46Z" fill="#FCF7F2" />
                                                            </svg> 2
                                                        </span>-
                                                        <span className="blog-publish-detail">
                                                            <svg width={16} height={14} viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M15.2 0.399902H0.800024C0.580024 0.399902 0.400024 0.579902 0.400024 0.799902V10.3999C0.400024 10.6199 0.580024 10.7999 0.800024 10.7999H4.00002V13.1999C4.00002 13.5599 4.42002 13.7399 4.68002 13.4799L7.40002 10.7999H15.2C15.42 10.7999 15.6 10.6199 15.6 10.3999V0.799902C15.6 0.579902 15.42 0.399902 15.2 0.399902ZM14.8 9.9999H7.24002C7.14002 9.9999 7.04002 10.0399 6.96002 10.1199L4.80002 12.2399V10.3999C4.80002 10.1799 4.62002 9.9999 4.40002 9.9999H1.20002V1.1999H14.8V9.9999Z" fill="#FCF7F2" />
                                                            </svg>
                                                            0</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="recent-blog-card">
                                        <img src="images/blog/image4.jpg" className="img-fluid" />
                                        <div className="recent-blog-inner-wrapper">
                                            <div className="recent-blog-inner-wrapper-content">
                                                <div className="upper">
                                                    <p className="recent-blog-inner-wrapper-heading">
                                                        Makeup Artist Carrer
                                                    </p>
                                                    <p className="recent-blog-inner-wrapper-para">
                                                        Importance and demand for makeup artists in various industries
                                                    </p>
                                                    <p className="blog-publish-detail-box">
                                                        <span className="blog-publish-detail">Oct 3</span> -
                                                        <span className="blog-publish-detail">2 min</span>
                                                    </p>
                                                </div>
                                                <div className="bottom">
                                                    <p className="blog-publish-detail-box">
                                                        <span className="blog-publish-detail">
                                                            <svg width={18} height={10} viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9 1.8C7.24 1.8 5.8 3.24 5.8 5C5.8 6.76 7.24 8.2 9 8.2C10.76 8.2 12.2 6.76 12.2 5C12.2 3.24 10.76 1.8 9 1.8ZM9 7.4C7.68 7.4 6.6 6.32 6.6 5C6.6 3.68 7.68 2.6 9 2.6C10.32 2.6 11.4 3.68 11.4 5C11.4 6.32 10.32 7.4 9 7.4ZM17.88 4.72L16.16 2.98C14.26 1.06 11.72 0 9 0C6.28 0 3.74 1.06 1.84 2.98L0.12 4.72C-0.04 4.88 -0.04 5.12 0.12 5.28L1.84 7.02C3.74 8.94 6.28 10 9 10C11.72 10 14.26 8.94 16.16 7.02L17.88 5.28C18.04 5.12 18.04 4.88 17.88 4.72ZM15.6 6.46C13.84 8.22 11.5 9.2 9 9.2C6.5 9.2 4.16 8.22 2.4 6.46L0.96 5L2.4 3.54C4.16 1.78 6.5 0.8 9 0.8C11.5 0.8 13.84 1.78 15.6 3.54L17.04 5L15.6 6.46Z" fill="#FCF7F2" />
                                                            </svg> 2
                                                        </span>-
                                                        <span className="blog-publish-detail">
                                                            <svg width={16} height={14} viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M15.2 0.399902H0.800024C0.580024 0.399902 0.400024 0.579902 0.400024 0.799902V10.3999C0.400024 10.6199 0.580024 10.7999 0.800024 10.7999H4.00002V13.1999C4.00002 13.5599 4.42002 13.7399 4.68002 13.4799L7.40002 10.7999H15.2C15.42 10.7999 15.6 10.6199 15.6 10.3999V0.799902C15.6 0.579902 15.42 0.399902 15.2 0.399902ZM14.8 9.9999H7.24002C7.14002 9.9999 7.04002 10.0399 6.96002 10.1199L4.80002 12.2399V10.3999C4.80002 10.1799 4.62002 9.9999 4.40002 9.9999H1.20002V1.1999H14.8V9.9999Z" fill="#FCF7F2" />
                                                            </svg>
                                                            0</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="row g-0">
                                <div className="col-lg-12">
                                    <div className="recent-blog-card custom-height-one">
                                        <img src="images/blog/image2.jpg" className="img-fluid" />
                                        <div className="recent-blog-inner-wrapper">
                                            <div className="recent-blog-inner-wrapper-content">
                                                <div className="upper">
                                                    <p className="recent-blog-inner-wrapper-heading">
                                                        Makeup Artist Carrer
                                                    </p>
                                                    <p className="recent-blog-inner-wrapper-para">
                                                        Importance and demand for makeup artists in various industries
                                                    </p>
                                                    <p className="blog-publish-detail-box">
                                                        <span className="blog-publish-detail">Oct 3</span> -
                                                        <span className="blog-publish-detail">2 min</span>
                                                    </p>
                                                </div>
                                                <div className="bottom">
                                                    <p className="blog-publish-detail-box">
                                                        <span className="blog-publish-detail">
                                                            <svg width={18} height={10} viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9 1.8C7.24 1.8 5.8 3.24 5.8 5C5.8 6.76 7.24 8.2 9 8.2C10.76 8.2 12.2 6.76 12.2 5C12.2 3.24 10.76 1.8 9 1.8ZM9 7.4C7.68 7.4 6.6 6.32 6.6 5C6.6 3.68 7.68 2.6 9 2.6C10.32 2.6 11.4 3.68 11.4 5C11.4 6.32 10.32 7.4 9 7.4ZM17.88 4.72L16.16 2.98C14.26 1.06 11.72 0 9 0C6.28 0 3.74 1.06 1.84 2.98L0.12 4.72C-0.04 4.88 -0.04 5.12 0.12 5.28L1.84 7.02C3.74 8.94 6.28 10 9 10C11.72 10 14.26 8.94 16.16 7.02L17.88 5.28C18.04 5.12 18.04 4.88 17.88 4.72ZM15.6 6.46C13.84 8.22 11.5 9.2 9 9.2C6.5 9.2 4.16 8.22 2.4 6.46L0.96 5L2.4 3.54C4.16 1.78 6.5 0.8 9 0.8C11.5 0.8 13.84 1.78 15.6 3.54L17.04 5L15.6 6.46Z" fill="#FCF7F2" />
                                                            </svg> 2
                                                        </span>-
                                                        <span className="blog-publish-detail">
                                                            <svg width={16} height={14} viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M15.2 0.399902H0.800024C0.580024 0.399902 0.400024 0.579902 0.400024 0.799902V10.3999C0.400024 10.6199 0.580024 10.7999 0.800024 10.7999H4.00002V13.1999C4.00002 13.5599 4.42002 13.7399 4.68002 13.4799L7.40002 10.7999H15.2C15.42 10.7999 15.6 10.6199 15.6 10.3999V0.799902C15.6 0.579902 15.42 0.399902 15.2 0.399902ZM14.8 9.9999H7.24002C7.14002 9.9999 7.04002 10.0399 6.96002 10.1199L4.80002 12.2399V10.3999C4.80002 10.1799 4.62002 9.9999 4.40002 9.9999H1.20002V1.1999H14.8V9.9999Z" fill="#FCF7F2" />
                                                            </svg>
                                                            0</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="recent-blog-card custom-height-two">
                                        <img src="images/blog/image5.jpg" className="img-fluid" />
                                        <div className="recent-blog-inner-wrapper">
                                            <div className="recent-blog-inner-wrapper-content">
                                                <div className="upper">
                                                    <p className="recent-blog-inner-wrapper-heading">
                                                        Makeup Artist Carrer
                                                    </p>
                                                    <p className="recent-blog-inner-wrapper-para">
                                                        Importance and demand for makeup artists in various industries
                                                    </p>
                                                    <p className="blog-publish-detail-box">
                                                        <span className="blog-publish-detail">Oct 3</span> -
                                                        <span className="blog-publish-detail">2 min</span>
                                                    </p>
                                                </div>
                                                <div className="bottom">
                                                    <p className="blog-publish-detail-box">
                                                        <span className="blog-publish-detail">
                                                            <svg width={18} height={10} viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9 1.8C7.24 1.8 5.8 3.24 5.8 5C5.8 6.76 7.24 8.2 9 8.2C10.76 8.2 12.2 6.76 12.2 5C12.2 3.24 10.76 1.8 9 1.8ZM9 7.4C7.68 7.4 6.6 6.32 6.6 5C6.6 3.68 7.68 2.6 9 2.6C10.32 2.6 11.4 3.68 11.4 5C11.4 6.32 10.32 7.4 9 7.4ZM17.88 4.72L16.16 2.98C14.26 1.06 11.72 0 9 0C6.28 0 3.74 1.06 1.84 2.98L0.12 4.72C-0.04 4.88 -0.04 5.12 0.12 5.28L1.84 7.02C3.74 8.94 6.28 10 9 10C11.72 10 14.26 8.94 16.16 7.02L17.88 5.28C18.04 5.12 18.04 4.88 17.88 4.72ZM15.6 6.46C13.84 8.22 11.5 9.2 9 9.2C6.5 9.2 4.16 8.22 2.4 6.46L0.96 5L2.4 3.54C4.16 1.78 6.5 0.8 9 0.8C11.5 0.8 13.84 1.78 15.6 3.54L17.04 5L15.6 6.46Z" fill="#FCF7F2" />
                                                            </svg> 2
                                                        </span>-
                                                        <span className="blog-publish-detail">
                                                            <svg width={16} height={14} viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M15.2 0.399902H0.800024C0.580024 0.399902 0.400024 0.579902 0.400024 0.799902V10.3999C0.400024 10.6199 0.580024 10.7999 0.800024 10.7999H4.00002V13.1999C4.00002 13.5599 4.42002 13.7399 4.68002 13.4799L7.40002 10.7999H15.2C15.42 10.7999 15.6 10.6199 15.6 10.3999V0.799902C15.6 0.579902 15.42 0.399902 15.2 0.399902ZM14.8 9.9999H7.24002C7.14002 9.9999 7.04002 10.0399 6.96002 10.1199L4.80002 12.2399V10.3999C4.80002 10.1799 4.62002 9.9999 4.40002 9.9999H1.20002V1.1999H14.8V9.9999Z" fill="#FCF7F2" />
                                                            </svg>
                                                            0</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>





            <Footer />
        </>
    );
};

export default Homepage;