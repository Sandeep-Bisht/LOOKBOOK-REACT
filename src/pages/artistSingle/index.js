import React from "react";
import "@css/user/artistSingle.css";
import Calendar from 'react-calendar';
import { useLoaderData } from "react-router-dom";
import NoDataFound from "pages/become-a-artist/common/noDataFound";
import LocationAwareMap from "pages/become-a-artist/common/googlemap";
import PdfIcon from '@core/assets/images/pdfIcon-removebg.png'
import Review1 from '@core/assets/1.jpg'
import Verified from '@core/assets/images/verified.png'
import { formatIndianRupee } from "configs/formatIndianRupee";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Slider from "react-slick";
import { SpeakerMessage } from "mdi-material-ui";


const ArtistSingle = () => {
    var settings = {
        dots: false,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        centerMode: true,
        centerPadding: "0px",
        autoplayTimeout: 3000,
        responsive: [
            {
                breakpoint: 1400, // Adjust the number of slides for screens larger than 1200 pixels
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 992, // Adjust the number of slides for screens larger than 992 pixels
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768, // Adjust the number of slides for screens larger than 768 pixels
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };

    const artistData = useLoaderData();

    const galleryData = (data) => {
        let newData = [];

        data.map((item) => newData.push({ original: item.url, thumbnail: item.url, originalClass: "usr-single-img", thumbnailClass: "usr-single-thumbnail", originalAlt: "Featured Image", thumbnailAlt: "Thumbnail Image" }))
        return newData;
    }

    return (
        <>
            {
                artistData && artistData?._id ?
                    <>
                        <section className="usr-artist-single">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-8">

                                        {artistData?.gallery && Array.isArray(artistData?.gallery) ?
                                            <ImageGallery items={galleryData(artistData?.gallery)} thumbnailPosition="left" showFullscreenButton={false} showPlayButton={false} autoPlay={false} swipingTransitionDuration={300} />
                                            : null}


                                        <div className="usr-artist-single-tab">
                                            {/* -------tab start--------------- */}
                                            <div className="usr-artist-single-tab-wrapper">
                                                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                                    <li className="nav-item" role="presentation">
                                                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Artist</button>
                                                    </li>
                                                    <li className="nav-item" role="presentation">
                                                        <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Brands Used</button>
                                                    </li>
                                                    <li className="nav-item" role="presentation">
                                                        <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Location</button>
                                                    </li>
                                                    <li className="nav-item" role="presentation">
                                                        <button className="nav-link" id="pills-disabled-tab"
                                                            data-bs-toggle="pill" data-bs-target="#pills-disabled" type="button" role="tab" aria-controls="pills-disabled"
                                                            aria-selected="false">Certification</button>
                                                    </li>

                                                    <li className="nav-item" role="presentation">
                                                        <button className="nav-link" id="pills-review-tab"
                                                            data-bs-toggle="pill" data-bs-target="#pills-review" type="button" role="tab" aria-controls="pills-review"
                                                            aria-selected="false">Reviews</button>
                                                    </li>
                                                </ul>
                                                <div className="tab-content" id="pills-tabContent">
                                                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>

                                                        <div className="usr-artist-single-tab-content">
                                                            <p className="usr-artist-single-tab-content-heading">
                                                                About the Artist:
                                                            </p>
                                                            <p className="usr-common-para">
                                                                {artistData?.description ? artistData?.description : null}
                                                            </p>
                                                            <p className="usr-artist-single-tab-content-follow">
                                                                Follow the Artist:
                                                            </p>
                                                            <div className="usr-artist-single-tab-content-social-box">
                                                                <div className="usr-artist-single-tab-content-social-box-upper">
                                                                    <span><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M9.99984 7.93366C9.59109 7.93366 9.19152 8.05487 8.85166 8.28195C8.5118 8.50904 8.24691 8.83181 8.09049 9.20945C7.93406 9.58708 7.89314 10.0026 7.97288 10.4035C8.05262 10.8044 8.24945 11.1727 8.53848 11.4617C8.82751 11.7507 9.19576 11.9475 9.59665 12.0273C9.99754 12.107 10.4131 12.0661 10.7907 11.9097C11.1684 11.7533 11.4911 11.4884 11.7182 11.1485C11.9453 10.8086 12.0665 10.4091 12.0665 10.0003C12.0665 9.72893 12.013 9.46019 11.9092 9.20945C11.8053 8.95871 11.6531 8.73088 11.4612 8.53897C11.2693 8.34706 11.0415 8.19483 10.7907 8.09097C10.54 7.98711 10.2712 7.93366 9.99984 7.93366ZM18.2748 5.89199C18.2705 5.24846 18.152 4.6108 17.9248 4.00866C17.7576 3.56804 17.4988 3.1679 17.1655 2.83465C16.8323 2.50139 16.4321 2.24259 15.9915 2.07533C15.3894 1.84821 14.7517 1.72971 14.1082 1.72533C13.0332 1.66699 12.7165 1.66699 9.99984 1.66699C7.28317 1.66699 6.9665 1.66699 5.8915 1.72533C5.24797 1.72971 4.61031 1.84821 4.00817 2.07533C3.56755 2.24259 3.16742 2.50139 2.83416 2.83465C2.5009 3.1679 2.2421 3.56804 2.07484 4.00866C1.84772 4.6108 1.72922 5.24846 1.72484 5.89199C1.6665 6.96699 1.6665 7.28366 1.6665 10.0003C1.6665 12.717 1.6665 13.0337 1.72484 14.1087C1.73381 14.7545 1.85215 15.3941 2.07484 16.0003C2.24136 16.4389 2.49994 16.8367 2.83317 17.167C3.165 17.5022 3.56599 17.761 4.00817 17.9253C4.61031 18.1524 5.24797 18.2709 5.8915 18.2753C6.9665 18.3337 7.28317 18.3337 9.99984 18.3337C12.7165 18.3337 13.0332 18.3337 14.1082 18.2753C14.7517 18.2709 15.3894 18.1524 15.9915 17.9253C16.4337 17.761 16.8347 17.5022 17.1665 17.167C17.4997 16.8367 17.7583 16.4389 17.9248 16.0003C18.1517 15.3952 18.2702 14.7549 18.2748 14.1087C18.3332 13.0337 18.3332 12.717 18.3332 10.0003C18.3332 7.28366 18.3332 6.96699 18.2748 5.89199ZM16.1582 12.5587C16.1314 13.0729 16.0217 13.5795 15.8332 14.0587C15.6714 14.4584 15.4309 14.8215 15.126 15.1265C14.821 15.4314 14.4579 15.6719 14.0582 15.8337C13.5744 16.0117 13.0651 16.1102 12.5498 16.1253C11.8915 16.1253 11.7165 16.1253 9.99984 16.1253C8.28317 16.1253 8.10817 16.1253 7.44984 16.1253C6.93461 16.1102 6.42524 16.0117 5.9415 15.8337C5.52826 15.6801 5.15507 15.4351 4.84984 15.117C4.54789 14.818 4.31471 14.4569 4.1665 14.0587C3.9878 13.5754 3.89201 13.0655 3.88317 12.5503C3.88317 11.892 3.88317 11.717 3.88317 10.0003C3.88317 8.28366 3.88317 8.10866 3.88317 7.45033C3.89201 6.93518 3.9878 6.42523 4.1665 5.94199C4.32007 5.52874 4.56507 5.15556 4.88317 4.85033C5.18345 4.55001 5.54422 4.31707 5.9415 4.16699C6.42524 3.989 6.93461 3.8905 7.44984 3.87533C8.10817 3.87533 8.28317 3.87533 9.99984 3.87533C11.7165 3.87533 11.8915 3.87533 12.5498 3.87533C13.0651 3.8905 13.5744 3.989 14.0582 4.16699C14.4714 4.32056 14.8446 4.56555 15.1498 4.88366C15.4518 5.18262 15.685 5.54377 15.8332 5.94199C16.0112 6.42573 16.1097 6.9351 16.1248 7.45033C16.1248 8.10866 16.1248 8.28366 16.1248 10.0003C16.1248 11.717 16.1832 11.892 16.1582 12.5503V12.5587ZM14.8248 6.35866C14.7256 6.08948 14.5692 5.84503 14.3663 5.64217C14.1635 5.43931 13.919 5.28288 13.6498 5.18366C13.2802 5.05554 12.891 4.99348 12.4998 5.00033C11.8498 5.00033 11.6665 5.00033 9.99984 5.00033C8.33317 5.00033 8.14984 5.00033 7.49984 5.00033C7.10673 5.00417 6.71739 5.07752 6.34984 5.21699C6.08478 5.31171 5.84291 5.46175 5.64032 5.65716C5.43773 5.85257 5.27905 6.08886 5.17484 6.35033C5.05382 6.72146 4.99469 7.10999 4.99984 7.50033C4.99984 8.15033 4.99984 8.33366 4.99984 10.0003C4.99984 11.667 4.99984 11.8503 4.99984 12.5003C5.0081 12.893 5.08131 13.2816 5.2165 13.6503C5.31572 13.9195 5.47216 14.164 5.67501 14.3668C5.87787 14.5697 6.12232 14.7261 6.3915 14.8253C6.74706 14.9561 7.12121 15.0292 7.49984 15.042C8.14984 15.042 8.33317 15.042 9.99984 15.042C11.6665 15.042 11.8498 15.042 12.4998 15.042C12.8929 15.0381 13.2823 14.9648 13.6498 14.8253C13.919 14.7261 14.1635 14.5697 14.3663 14.3668C14.5692 14.164 14.7256 13.9195 14.8248 13.6503C14.9643 13.2828 15.0377 12.8934 15.0415 12.5003C15.0415 11.8503 15.0415 11.667 15.0415 10.0003C15.0415 8.33366 15.0415 8.15033 15.0415 7.50033C15.0417 7.10682 14.9683 6.71676 14.8248 6.35033V6.35866ZM9.99984 13.1837C9.58219 13.1837 9.16864 13.1013 8.78289 12.9412C8.39714 12.7811 8.04676 12.5465 7.75182 12.2508C7.45689 11.9551 7.22319 11.6041 7.06412 11.2179C6.90506 10.8317 6.82374 10.418 6.82484 10.0003C6.82484 9.37037 7.01175 8.75457 7.36191 8.2309C7.71207 7.70722 8.20973 7.29921 8.79189 7.05852C9.37406 6.81783 10.0145 6.75528 10.6323 6.87878C11.25 7.00229 11.8172 7.3063 12.2621 7.75233C12.7069 8.19836 13.0095 8.76636 13.1313 9.38441C13.2532 10.0025 13.189 10.6428 12.9468 11.2243C12.7046 11.8059 12.2953 12.3024 11.7707 12.6512C11.2461 13 10.6298 13.1853 9.99984 13.1837ZM13.3332 7.44199C13.149 7.42249 12.9785 7.33551 12.8546 7.1978C12.7307 7.06009 12.6621 6.8814 12.6621 6.69616C12.6621 6.51091 12.7307 6.33223 12.8546 6.19452C12.9785 6.05681 13.149 5.96982 13.3332 5.95033C13.5174 5.96982 13.6879 6.05681 13.8118 6.19452C13.9357 6.33223 14.0042 6.51091 14.0042 6.69616C14.0042 6.8814 13.9357 7.06009 13.8118 7.1978C13.6879 7.33551 13.5174 7.42249 13.3332 7.44199Z" fill="#8C6A54" />
                                                                    </svg>
                                                                    </span> {artistData?.profile_id?.instaId ? artistData?.profile_id?.instaId : null}
                                                                </div>
                                                                <div className="usr-artist-single-tab-content-social-box-lower">
                                                                    <a href={`https://www.instagram.com/${artistData?.profile_id?.instaId ? artistData?.profile_id?.instaId : null}`} target="_blank" className="usr-artist-single-tab-content-social-box-lower-link">
                                                                        https://www.instagram.com/{artistData?.profile_id?.instaId ? artistData?.profile_id?.instaId : null}
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex={0}>
                                                        <div className="usr-artist-single-tab-content">
                                                            <p className="usr-artist-single-tab-content-heading">
                                                                Brands Used
                                                            </p>
                                                            <div className="d-flex flex-wrap">
                                                                {artistData?.products && Array.isArray(artistData?.products) && artistData?.products.length > 0 ?
                                                                    artistData?.products.map((product, ind) => {
                                                                        return (
                                                                            <img src={`${product?.image?.url ? product?.image?.url : null}?tr=h-50,w-100,fo-auto`} key={product._id + ind} className="me-2" />
                                                                        )
                                                                    })
                                                                    :
                                                                    null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex={0}>
                                                        <div className="usr-artist-single-tab-content">
                                                            <p className="usr-artist-single-tab-content-heading">
                                                                Artist Location
                                                            </p>
                                                            <div>
                                                                {artistData?.coords && artistData?.coords?.lat && artistData?.coords?.lng ?
                                                                    <LocationAwareMap coords={artistData?.coords} height="30vh" />
                                                                    :
                                                                    null
                                                                }

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="pills-disabled" role="tabpanel" aria-labelledby="pills-disabled-tab" tabIndex={0}>
                                                        <div className="usr-artist-single-tab-content">
                                                            <p className="usr-artist-single-tab-content-heading">
                                                                Certified By
                                                            </p>
                                                            <div className='row'>
                                                                {artistData?.certificates && Array.isArray(artistData?.certificates) && artistData?.certificates.length > 0 && artistData?.certificates.map((item, index) => (
                                                                    <div className='col-3' key={index}>
                                                                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                                                                            <img src={PdfIcon} alt='certificate' className="img-fluid" style={{ maxHeight: "50px", maxWidth: "50px" }} />
                                                                        </a>
                                                                        <p>{item.name}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="pills-review" role="tabpanel" aria-labelledby="pills-review-tab" tabIndex={0}>
                                                        <div className="usr-artist-single-tab-content position-relative review-tab">

                                                            <Slider {...settings}>
                                                                <div className="usr-single-artist-review-card">
                                                                    <div className="usr-single-artist-review-card-content">
                                                                        <p className="usr-common-para">
                                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                                                        </p>
                                                                        <div className="usr-single-artist-review-card-pic">
                                                                            <div className="pic">
                                                                                <img src={Review1} className="img-fluid " />
                                                                            </div>
                                                                            <div className="detail">
                                                                                <span className="usr-artist-review-name">
                                                                                    User Name
                                                                                </span>
                                                                                <span className="usr-artist-review-date usr-common-para usr-common-para">
                                                                                    January 2024
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div className="usr-single-artist-review-card">
                                                                    <div className="usr-single-artist-review-card-content">
                                                                        <p className="usr-common-para">
                                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                                                        </p>
                                                                        <div className="usr-single-artist-review-card-pic">
                                                                            <div className="pic">
                                                                                <img src={Review1} className="img-fluid " />
                                                                            </div>
                                                                            <div className="detail">
                                                                                <span className="usr-artist-review-name usr-common-para">
                                                                                    User Name
                                                                                </span>
                                                                                <span className="usr-artist-review-date usr-common-para">
                                                                                    January 2024
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div className="usr-single-artist-review-card">
                                                                    <div className="usr-single-artist-review-card-content">
                                                                        <p className="usr-common-para">
                                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                                                        </p>
                                                                        <div className="usr-single-artist-review-card-pic">
                                                                            <div className="pic">
                                                                                <img src={Review1} className="img-fluid " />
                                                                            </div>
                                                                            <div className="detail">
                                                                                <span className="usr-artist-review-name usr-common-para">
                                                                                    User Name
                                                                                </span>
                                                                                <span className="usr-artist-review-date usr-common-para">
                                                                                    January 2024
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div className="usr-single-artist-review-card">
                                                                    <div className="usr-single-artist-review-card-content">
                                                                        <p className="usr-common-para">
                                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                                                        </p>
                                                                        <div className="usr-single-artist-review-card-pic">
                                                                            <div className="pic">
                                                                                <img src={Review1} className="img-fluid " />
                                                                            </div>
                                                                            <div className="detail">
                                                                                <span className="usr-artist-review-name usr-common-para">
                                                                                    User Name
                                                                                </span>
                                                                                <span className="usr-artist-review-date usr-common-para">
                                                                                    January 2024
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div className="usr-single-artist-review-card">
                                                                    <div className="usr-single-artist-review-card-content">
                                                                        <p className="usr-common-para">
                                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                                                        </p>
                                                                        <div className="usr-single-artist-review-card-pic">
                                                                            <div className="pic">
                                                                                <img src={Review1} className="img-fluid " />
                                                                            </div>
                                                                            <div className="detail">
                                                                                <span className="usr-artist-review-name usr-common-para">
                                                                                    User Name
                                                                                </span>
                                                                                <span className="usr-artist-review-date usr-common-para">
                                                                                    January 2024
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div className="usr-single-artist-review-card">
                                                                    <div className="usr-single-artist-review-card-content">
                                                                        <p className="usr-common-para">
                                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                                                        </p>
                                                                        <div className="usr-single-artist-review-card-pic">
                                                                            <div className="pic">
                                                                                <img src={Review1} className="img-fluid " />
                                                                            </div>
                                                                            <div className="detail">
                                                                                <span className="usr-artist-review-name ">
                                                                                    User Name
                                                                                </span>
                                                                                <span className="usr-artist-review-date usr-common-para">
                                                                                    January 2024
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </Slider>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* -------tab end------------ */}
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="usr-detail-card">
                                            <div className="usr-artist-details-tag">
                                                <div className="usr-name">
                                                    <h3>{artistData?.profile_id?.fullName ? artistData?.profile_id?.fullName : null}</h3>
                                                    <div className="rating"><svg xmlns="http://www.w3.org/2000/svg" width={21} height={20} viewBox="0 0 21 20" fill="none">
                                                        <path d="M9.55544 0.717386C9.86673 -0.178174 11.1333 -0.178174 11.4446 0.717386L13.2105 5.79763C13.3478 6.1927 13.7165 6.46057 14.1346 6.46909L19.5119 6.57867C20.4599 6.59799 20.8512 7.80254 20.0957 8.37534L15.8098 11.6247C15.4765 11.8774 15.3357 12.3108 15.4568 12.7111L17.0142 17.8591C17.2888 18.7666 16.2642 19.511 15.4859 18.9695L11.0712 15.8975C10.7279 15.6586 10.2721 15.6586 9.92882 15.8975L5.51409 18.9695C4.73585 19.511 3.7112 18.7666 3.98576 17.8591L5.54321 12.7111C5.66433 12.3108 5.5235 11.8774 5.1902 11.6247L0.904295 8.37534C0.148763 7.80254 0.540144 6.59799 1.48807 6.57867L6.86536 6.46909C7.28353 6.46057 7.65222 6.1927 7.78955 5.79763L9.55544 0.717386Z" fill="#FCF7F2" />
                                                    </svg>4.5</div>
                                                </div>
                                                <div className="usr-rating">
                                                    <div className="usr-access-details">
                                                        <div className="usr-address">
                                                            <p className="fw-700">
                                                                <span><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M10.8333 9.91712V14.1671C10.8333 14.3881 10.7455 14.6001 10.5893 14.7564C10.433 14.9127 10.221 15.0005 10 15.0005C9.77899 15.0005 9.56703 14.9127 9.41074 14.7564C9.25446 14.6001 9.16667 14.3881 9.16667 14.1671V9.91712C8.15496 9.7106 7.25598 9.1358 6.644 8.30413C6.03202 7.47246 5.75065 6.44318 5.85443 5.41585C5.95822 4.38851 6.43976 3.43631 7.20571 2.74384C7.97165 2.05137 8.96744 1.66797 10 1.66797C11.0326 1.66797 12.0283 2.05137 12.7943 2.74384C13.5602 3.43631 14.0418 4.38851 14.1456 5.41585C14.2493 6.44318 13.968 7.47246 13.356 8.30413C12.744 9.1358 11.845 9.7106 10.8333 9.91712ZM10 3.33379C9.50555 3.33379 9.0222 3.48041 8.61107 3.75511C8.19995 4.02981 7.87952 4.42026 7.6903 4.87708C7.50108 5.33389 7.45157 5.83656 7.54804 6.32151C7.6445 6.80646 7.8826 7.25192 8.23223 7.60155C8.58186 7.95118 9.02732 8.18929 9.51227 8.28575C9.99723 8.38221 10.4999 8.3327 10.9567 8.14348C11.4135 7.95427 11.804 7.63383 12.0787 7.22271C12.3534 6.81159 12.5 6.32824 12.5 5.83379C12.5 5.17074 12.2366 4.53486 11.7678 4.06602C11.2989 3.59718 10.663 3.33379 10 3.33379ZM6.49167 12.0171C6.6011 11.9941 6.71399 11.9929 6.82389 12.0136C6.93379 12.0342 7.03855 12.0763 7.13218 12.1375C7.22581 12.1986 7.30649 12.2776 7.3696 12.3699C7.43271 12.4622 7.47702 12.566 7.5 12.6755C7.52298 12.7849 7.52418 12.8978 7.50354 13.0077C7.48289 13.1176 7.4408 13.2223 7.37967 13.316C7.31853 13.4096 7.23956 13.4903 7.14725 13.5534C7.05494 13.6165 6.9511 13.6608 6.84167 13.6838C4.95 14.0588 4.16667 14.7338 4.16667 15.0005C4.16667 15.4838 6.20833 16.6671 10 16.6671C13.7917 16.6671 15.8333 15.4838 15.8333 15.0005C15.8333 14.7338 15.05 14.0588 13.1583 13.6505C13.0489 13.6275 12.9451 13.5832 12.8528 13.52C12.7604 13.4569 12.6815 13.3763 12.6203 13.2826C12.5592 13.189 12.5171 13.0842 12.4965 12.9743C12.4758 12.8644 12.477 12.7516 12.5 12.6421C12.523 12.5327 12.5673 12.4288 12.6304 12.3365C12.6935 12.2442 12.7742 12.1653 12.8678 12.1041C12.9615 12.043 13.0662 12.0009 13.1761 11.9802C13.286 11.9596 13.3989 11.9608 13.5083 11.9838C16.0417 12.5671 17.5 13.6588 17.5 15.0005C17.5 17.1921 13.725 18.3338 10 18.3338C6.275 18.3338 2.5 17.1921 2.5 15.0005C2.5 13.6588 3.95833 12.5671 6.49167 12.0171Z" fill="#6D5D4C" />
                                                                </svg>
                                                                </span>
                                                                {artistData?.address?.city ? artistData?.address?.city : null},{artistData?.address?.country ? artistData?.address?.country : null}</p>
                                                        </div>
                                                        {artistData?.travel ?
                                                            <div className="usr-globally">
                                                                <p>
                                                                    Globally Available
                                                                    <span className="ms-2">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                                                            <g clipPath="url(#clip0_1284_5396)">
                                                                                <path d="M18.8754 5.33002C17.1796 2.16507 13.8273 0 9.95552 0C4.9618 0 0.817976 3.59863 0 8.3061H1.8651C2.65796 4.60693 5.98019 1.81907 9.95554 1.81907C13.1133 1.81907 15.8528 3.58044 17.2457 6.15677L16.1983 6.68812L19.2681 8.0036L19.9843 4.76784L18.8754 5.33002ZM18.1385 11.1874C17.5539 15.1354 14.1122 18.1796 9.9555 18.1796C6.86287 18.1796 4.17505 16.4879 2.75677 13.999L3.81694 13.4619L0.746539 12.1467L0.0312286 15.3813L1.11543 14.8318C2.84124 17.9079 6.15115 20 9.95552 20C15.1299 20 19.4029 16.1426 20 11.1874H18.1385Z" fill="#6D5D4C" />
                                                                                <path d="M3.78857 10.0005C3.79509 6.57039 6.56581 3.78453 9.99881 3.7832C13.4341 3.78453 16.205 6.57039 16.2113 10.0006C16.205 13.4299 13.4341 16.2162 9.99881 16.217C6.56581 16.2162 3.79509 13.4298 3.78857 10.0005ZM4.45199 10.0005C4.45311 13.0756 6.94076 15.557 9.99881 15.5627C13.0598 15.557 15.5458 13.0756 15.5458 10.0006C15.5458 6.92528 13.0598 4.44394 9.99881 4.43726C6.94076 4.44394 4.45313 6.92526 4.45199 10.0005Z" fill="#6D5D4C" />
                                                                                <path d="M9.66846 15.8903V4.11035H10.3312V15.8903H9.66846Z" fill="#6D5D4C" />
                                                                                <path d="M9.71024 16.1107C8.84574 15.7041 8.12392 14.8074 7.66471 13.9924C7.25651 13.2538 6.96872 12.5116 6.80089 11.6549C6.69081 11.0921 6.64996 10.4897 6.6432 9.93284C6.6416 9.89909 6.6416 9.86735 6.6416 9.84004C6.64635 7.86341 7.352 5.72763 8.78308 4.44654C8.87541 4.36531 9.21443 4.10541 9.5213 3.94006C9.63159 3.88969 9.71024 3.83577 9.88593 3.82753C9.96321 3.8229 10.1169 3.85949 10.2058 3.98911C10.3101 4.13715 10.2721 4.34179 10.1213 4.44589C10.0463 4.49626 9.95734 4.51183 9.8749 4.49805C9.86301 4.50337 9.8484 4.51137 9.83357 4.51935C9.76462 4.55531 9.67496 4.6108 9.58803 4.66937C9.41706 4.78171 9.23646 4.92305 9.22944 4.93284C7.98844 6.02658 7.30279 8.01676 7.30684 9.84004V9.92216C7.31312 10.4555 7.3529 11.0237 7.4522 11.5306C7.60632 12.3194 7.86579 12.9879 8.24861 13.6777C8.64805 14.4106 9.34786 15.2278 9.99264 15.5177C10.1573 15.5954 10.2288 15.7898 10.1515 15.9527C10.0953 16.0721 9.97508 16.1418 9.85021 16.1418C9.80258 16.1418 9.7545 16.1325 9.71024 16.1107Z" fill="#6D5D4C" />
                                                                                <path d="M10.1721 15.953C10.0935 15.7901 10.1651 15.5957 10.3309 15.518C10.9757 15.2281 11.6748 14.4109 12.0743 13.678C12.4558 12.9882 12.715 12.3197 12.8696 11.5309C12.9693 11.024 13.0098 10.4558 13.0165 9.92492V9.8397C13.0192 8.01706 12.3335 6.02688 11.0934 4.93312C11.0624 4.90407 10.9132 4.77512 10.7421 4.66148C10.5785 4.5434 10.3671 4.45528 10.3372 4.46352C10.1546 4.45817 10.0106 4.3055 10.0173 4.12659C10.0238 3.9448 10.1775 3.80298 10.3597 3.80876C10.6706 3.8294 10.9025 3.98255 11.1154 4.11906C11.3257 4.25977 11.4875 4.40223 11.5378 4.44552C12.9707 5.72793 13.6765 7.86373 13.6797 9.8397V9.92936C13.6734 10.4918 13.6312 11.0924 13.522 11.6552C13.3544 12.5119 13.0646 13.2541 12.657 13.9927C12.1978 14.8077 11.4776 15.7044 10.6131 16.111C10.5695 16.1316 10.5217 16.1422 10.4734 16.1421C10.348 16.1421 10.2271 16.0733 10.1721 15.953Z" fill="#6D5D4C" />
                                                                                <path d="M4.76971 7.82546C4.58526 7.82546 4.437 7.6792 4.437 7.49611C4.437 7.31611 4.58526 7.16895 4.76973 7.16895H15.3112C15.494 7.16895 15.6423 7.31609 15.6423 7.49611C15.6423 7.6792 15.494 7.82546 15.3112 7.82546H4.76969H4.76971ZM4.24558 10.4873C4.06249 10.4873 3.91309 10.3401 3.91309 10.1584C3.91309 9.97768 4.06249 9.83162 4.24558 9.83162H15.8112C15.9941 9.83162 16.1428 9.97768 16.1428 10.1584C16.1428 10.3401 15.9941 10.4873 15.8112 10.4873H4.24558ZM4.93619 13.1497C4.75287 13.1497 4.60412 13.0023 4.60412 12.8217C4.60412 12.6402 4.75285 12.4928 4.93619 12.4928H15.0964C15.2792 12.4928 15.4271 12.6402 15.4271 12.8217C15.4271 13.0024 15.2792 13.1497 15.0964 13.1497H4.93619Z" fill="#6D5D4C" />
                                                                            </g>
                                                                            <defs>
                                                                                <clipPath id="clip0_1284_5396">
                                                                                    <rect width={20} height={20} fill="white" />
                                                                                </clipPath>
                                                                            </defs>
                                                                        </svg></span>
                                                                </p>
                                                            </div>
                                                            :
                                                            null
                                                        }
                                                        <div className="usr-experience">
                                                            <p>Experience in Years:<span>{artistData?.experience ? artistData?.experience : null}</span></p>
                                                        </div>
                                                    </div>
                                                    <div className="usr-verifed-svg">
                                                        <p>

                                                            <img src={Verified} className="img-fluid " />
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="usr-artist-charges">
                                                <h6 className="fw-700">Charges:</h6>
                                                {/* <p>
                                        <span>{artistData?.pricing?.totalPrice ? formatIndianRupee(artistData?.pricing?.totalPrice) : null}</span></p> */}
                                                <p>Party Makeup:<span className="font-style-italic">25000/-</span></p>
                                                <p>Wedding Function:<span className="font-style-italic">35000/-</span></p>
                                                <p>Bridal Makeup:<span className="font-style-italic">45000/-</span></p>
                                                <p>Bridal Relatives:<span className="font-style-italic">20000/-</span></p>
                                            </div>
                                            <div className="usr-artist-order">
                                                <h6 className="fw-700">Minimum Order:</h6>
                                                <p>Bridal Makeup + One Party Makeup</p>
                                            </div>
                                            <div className="usr-card-booking-button">
                                                {/* <button className="usr-btn fw-300" data-bs-toggle="modal" data-bs-target="#exampleModalToggle">Book Now</button> */}
                                                <button className="usr-btn fw-300" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Book Now</button>


                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </section>

                        {/* <div className="modal-lg modal fade usr-artist-single-modal" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog  modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-body py-4">
                                        <div className="row">
                                            <div className="col-lg-6 usr-artist-single-modal-separator">

                                                <Calendar

                                                    className="common-calendor-si"
                                                    minDate={new Date()}
                                                />
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="usr-artist-single-modal-time-box">
                                                    <div className="usr-artist-single-modal-time-box-upper">
                                                        <p className="usr-common-para">
                                                            Only some sessions are still available for booking. Bookings close 1 day before the session starts.
                                                        </p>
                                                    </div>
                                                    <div className="usr-artist-single-modal-time-box-lower">
                                                        <button className="usr-artist-single-modal-time-box-btn">
                                                            <span>10:00 am</span>
                                                            <span>10:30 am</span>
                                                        </button>
                                                        <button className="usr-artist-single-modal-time-box-btn">
                                                            <span>10:30 am</span>
                                                            <span>11:00 am</span>
                                                        </button>
                                                        <button className="usr-artist-single-modal-time-box-btn">
                                                            <span>11:00 am</span>
                                                            <span>11:30 am</span>
                                                        </button>
                                                        <button className="usr-artist-single-modal-time-box-btn active">
                                                            <span>11:30 am</span>
                                                            <span>12:00 pm</span>
                                                        </button>
                                                        <button className="usr-artist-single-modal-time-box-btn active">
                                                            <span>12:00 pm</span>
                                                            <span>12:30 pm</span>
                                                        </button>
                                                    </div>
                                                    <div className="d-flex justify-content-center">
                                                        <button class="usr-common-action-btn">Confirm</button>
                                                    </div>
                                                    <div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div> */}

                        <div class="modal modal-lg fade usr-artist-single-modal" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header border-0">
                                        <h1 class="usr-artist-booking-heading fw-700">Select Service you want</h1>
                                      
                                    </div>
                                    <div class="modal-body usr-artist-single-modal-body">
                                        <div className="usr-artist-single-modal-body-wrapper">
                                        <button class="usr-common-action-btn " type="button">
                                            Party Makeup
                                        </button>
                                        <button class="usr-common-action-btn " type="button">
                                            Wedding Function
                                        </button>
                                        <button class="usr-common-action-btn" type="button">
                                            Bridal Makeup
                                        </button>
                                        <button class="usr-common-action-btn usr-home-banner-action-btn" type="button">
                                            Bridal Relatives
                                        </button>
                                        </div>
                                    </div>
                                    <div class="modal-footer border-0  py-xl-4 py-lg-4 justify-content-center">
                                        <button class="usr-btn fw-300" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">next</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="modal modal-lg fade usr-artist-single-modal" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex={-1}>
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                     
                                        <div className="modal-body py-4">
                                        <div className="row">
                                            <div className="col-lg-6 usr-artist-single-modal-separator">

                                                <Calendar

                                                    className="common-calendor-si"
                                                    minDate={new Date()}
                                                />
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="usr-artist-single-modal-time-box">
                                                    <div className="usr-artist-single-modal-time-box-upper">
                                                       <div className="usr-artist-single-modal-time-box-upper-top">
                                                            <p className="usr-artist-single-modal-time-box-heading">
                                                            Select Number of Sessions:
                                                            </p>
                                                       </div>
                                                       <div className="usr-artist-single-modal-time-box-upper-bottom">
                                                       <button class="usr-session-btn">1</button>
                                                       <button class="usr-session-btn">2</button>
                                                       <button class="usr-session-btn">3</button>
                                                       <button class="usr-session-btn">4</button>
                                                       </div>
                                                    </div>
                                                    <div className="usr-artist-single-modal-time-box-lower">
                                                    <p className="usr-artist-single-modal-time-box-heading">
                                                            Select Number of Sessions:
                                                            </p>
                                                            <div className="usr-artist-single-modal-time-box-upper-bottom">
                                                        <button className="usr-artist-single-modal-time-box-btn">
                                                            <span>10:00 am</span>
                                               
                                                        </button>
                                                        <button className="usr-artist-single-modal-time-box-btn">
                                                            <span>11:00 am</span>
                                                          
                                                        </button>
                                                        <button className="usr-artist-single-modal-time-box-btn">
                                                            <span>12:00 pm</span>
                                         
                                                </button>
                                                        <button className="usr-artist-single-modal-time-box-btn ">
                                                            <span>01:00 pm</span>
                                                        
                                                        </button>
                                                        <button className="usr-artist-single-modal-time-box-btn ">
                                                            <span>02:00 pm</span>
                                                
                                                        </button>
                                                        <button className="usr-artist-single-modal-time-box-btn ">
                                                            <span>03:00 pm</span>
                                                
                                                        </button>
                                                        <button className="usr-artist-single-modal-time-box-btn ">
                                                            <span>04:00 pm</span>
                                                
                                                        </button>
                                                        <button className="usr-artist-single-modal-time-box-btn ">
                                                            <span>05:00 pm</span>
                                                
                                                        </button></div>
                                                    </div>
                                                    <div className="d-flex justify-content-center">
                                                    <button className="usr-common-action-btn me-2" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Book more</button>
                                                        <button class="usr-common-action-btn">Confirm</button>
                                                    </div>
                                                    <div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                     
                                    </div>
                                </div>
                            </div>
                           
                        </div>



                    </>
                    :
                    <NoDataFound />
            }
        </>
    );
};

export default ArtistSingle;