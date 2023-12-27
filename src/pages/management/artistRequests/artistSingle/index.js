import React from "react";
import "@css/user/artistSingle.css";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Calendar from 'react-calendar';
import slider1 from "@core/assets/1.jpg"
import slider2 from "@core/assets/2.jpg"
import slider3 from "@core/assets/3.jpg"
import slider4 from "@core/assets/4.jpg"
import slider5 from "@core/assets/5.jpg"
import slider6 from "@core/assets/6.jpg"


const ArtistSingle = () => {


    return (
        <>
            <section className="usr-artist-single">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">

                            <Carousel className="usr-artist-single-carousel" showArrows={true}
                                autoPlay infiniteLoop
                            >
                                <div>
                                    <img src={slider1} className="img-fluid " />

                                </div>
                                <div>
                                    <img src={slider2} className="img-fluid " />

                                </div>
                                <div>
                                    <img src={slider3} className="img-fluid " />

                                </div>
                                <div>
                                    <img src={slider4} className="img-fluid " />

                                </div>
                                <div>
                                    <img src={slider5} className="img-fluid " />

                                </div>
                                <div>
                                    <img src={slider6} className="img-fluid " />

                                </div>
                            </Carousel>
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
                                            <button className="nav-link" id="pills-disabled-tab" data-bs-toggle="pill" data-bs-target="#pills-disabled" type="button" role="tab" aria-controls="pills-disabled" aria-selected="false">Certification</button>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="pills-tabContent">
                                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>

                                            <div className="usr-artist-single-tab-content">
                                                <p className="usr-artist-single-tab-content-heading">
                                                    About the Artist:
                                                </p>
                                                <p className="usr-common-para">
                                                    Lorem ipsum dolor sit amet consectetur. Quisque fringilla non donec vestibulum mi enim. Semper arcu enim nunc sed lectus integer purus eleifend. Pellentesque maecenas porttitor facilisis pellentesque mauris id
                                                </p>
                                                <p className="usr-artist-single-tab-content-follow">
                                                    Follow the Artist:
                                                </p>
                                                <div className="usr-artist-single-tab-content-social-box">
                                                    <div className="usr-artist-single-tab-content-social-box-upper">
                                                        <span><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M9.99984 7.93366C9.59109 7.93366 9.19152 8.05487 8.85166 8.28195C8.5118 8.50904 8.24691 8.83181 8.09049 9.20945C7.93406 9.58708 7.89314 10.0026 7.97288 10.4035C8.05262 10.8044 8.24945 11.1727 8.53848 11.4617C8.82751 11.7507 9.19576 11.9475 9.59665 12.0273C9.99754 12.107 10.4131 12.0661 10.7907 11.9097C11.1684 11.7533 11.4911 11.4884 11.7182 11.1485C11.9453 10.8086 12.0665 10.4091 12.0665 10.0003C12.0665 9.72893 12.013 9.46019 11.9092 9.20945C11.8053 8.95871 11.6531 8.73088 11.4612 8.53897C11.2693 8.34706 11.0415 8.19483 10.7907 8.09097C10.54 7.98711 10.2712 7.93366 9.99984 7.93366ZM18.2748 5.89199C18.2705 5.24846 18.152 4.6108 17.9248 4.00866C17.7576 3.56804 17.4988 3.1679 17.1655 2.83465C16.8323 2.50139 16.4321 2.24259 15.9915 2.07533C15.3894 1.84821 14.7517 1.72971 14.1082 1.72533C13.0332 1.66699 12.7165 1.66699 9.99984 1.66699C7.28317 1.66699 6.9665 1.66699 5.8915 1.72533C5.24797 1.72971 4.61031 1.84821 4.00817 2.07533C3.56755 2.24259 3.16742 2.50139 2.83416 2.83465C2.5009 3.1679 2.2421 3.56804 2.07484 4.00866C1.84772 4.6108 1.72922 5.24846 1.72484 5.89199C1.6665 6.96699 1.6665 7.28366 1.6665 10.0003C1.6665 12.717 1.6665 13.0337 1.72484 14.1087C1.73381 14.7545 1.85215 15.3941 2.07484 16.0003C2.24136 16.4389 2.49994 16.8367 2.83317 17.167C3.165 17.5022 3.56599 17.761 4.00817 17.9253C4.61031 18.1524 5.24797 18.2709 5.8915 18.2753C6.9665 18.3337 7.28317 18.3337 9.99984 18.3337C12.7165 18.3337 13.0332 18.3337 14.1082 18.2753C14.7517 18.2709 15.3894 18.1524 15.9915 17.9253C16.4337 17.761 16.8347 17.5022 17.1665 17.167C17.4997 16.8367 17.7583 16.4389 17.9248 16.0003C18.1517 15.3952 18.2702 14.7549 18.2748 14.1087C18.3332 13.0337 18.3332 12.717 18.3332 10.0003C18.3332 7.28366 18.3332 6.96699 18.2748 5.89199ZM16.1582 12.5587C16.1314 13.0729 16.0217 13.5795 15.8332 14.0587C15.6714 14.4584 15.4309 14.8215 15.126 15.1265C14.821 15.4314 14.4579 15.6719 14.0582 15.8337C13.5744 16.0117 13.0651 16.1102 12.5498 16.1253C11.8915 16.1253 11.7165 16.1253 9.99984 16.1253C8.28317 16.1253 8.10817 16.1253 7.44984 16.1253C6.93461 16.1102 6.42524 16.0117 5.9415 15.8337C5.52826 15.6801 5.15507 15.4351 4.84984 15.117C4.54789 14.818 4.31471 14.4569 4.1665 14.0587C3.9878 13.5754 3.89201 13.0655 3.88317 12.5503C3.88317 11.892 3.88317 11.717 3.88317 10.0003C3.88317 8.28366 3.88317 8.10866 3.88317 7.45033C3.89201 6.93518 3.9878 6.42523 4.1665 5.94199C4.32007 5.52874 4.56507 5.15556 4.88317 4.85033C5.18345 4.55001 5.54422 4.31707 5.9415 4.16699C6.42524 3.989 6.93461 3.8905 7.44984 3.87533C8.10817 3.87533 8.28317 3.87533 9.99984 3.87533C11.7165 3.87533 11.8915 3.87533 12.5498 3.87533C13.0651 3.8905 13.5744 3.989 14.0582 4.16699C14.4714 4.32056 14.8446 4.56555 15.1498 4.88366C15.4518 5.18262 15.685 5.54377 15.8332 5.94199C16.0112 6.42573 16.1097 6.9351 16.1248 7.45033C16.1248 8.10866 16.1248 8.28366 16.1248 10.0003C16.1248 11.717 16.1832 11.892 16.1582 12.5503V12.5587ZM14.8248 6.35866C14.7256 6.08948 14.5692 5.84503 14.3663 5.64217C14.1635 5.43931 13.919 5.28288 13.6498 5.18366C13.2802 5.05554 12.891 4.99348 12.4998 5.00033C11.8498 5.00033 11.6665 5.00033 9.99984 5.00033C8.33317 5.00033 8.14984 5.00033 7.49984 5.00033C7.10673 5.00417 6.71739 5.07752 6.34984 5.21699C6.08478 5.31171 5.84291 5.46175 5.64032 5.65716C5.43773 5.85257 5.27905 6.08886 5.17484 6.35033C5.05382 6.72146 4.99469 7.10999 4.99984 7.50033C4.99984 8.15033 4.99984 8.33366 4.99984 10.0003C4.99984 11.667 4.99984 11.8503 4.99984 12.5003C5.0081 12.893 5.08131 13.2816 5.2165 13.6503C5.31572 13.9195 5.47216 14.164 5.67501 14.3668C5.87787 14.5697 6.12232 14.7261 6.3915 14.8253C6.74706 14.9561 7.12121 15.0292 7.49984 15.042C8.14984 15.042 8.33317 15.042 9.99984 15.042C11.6665 15.042 11.8498 15.042 12.4998 15.042C12.8929 15.0381 13.2823 14.9648 13.6498 14.8253C13.919 14.7261 14.1635 14.5697 14.3663 14.3668C14.5692 14.164 14.7256 13.9195 14.8248 13.6503C14.9643 13.2828 15.0377 12.8934 15.0415 12.5003C15.0415 11.8503 15.0415 11.667 15.0415 10.0003C15.0415 8.33366 15.0415 8.15033 15.0415 7.50033C15.0417 7.10682 14.9683 6.71676 14.8248 6.35033V6.35866ZM9.99984 13.1837C9.58219 13.1837 9.16864 13.1013 8.78289 12.9412C8.39714 12.7811 8.04676 12.5465 7.75182 12.2508C7.45689 11.9551 7.22319 11.6041 7.06412 11.2179C6.90506 10.8317 6.82374 10.418 6.82484 10.0003C6.82484 9.37037 7.01175 8.75457 7.36191 8.2309C7.71207 7.70722 8.20973 7.29921 8.79189 7.05852C9.37406 6.81783 10.0145 6.75528 10.6323 6.87878C11.25 7.00229 11.8172 7.3063 12.2621 7.75233C12.7069 8.19836 13.0095 8.76636 13.1313 9.38441C13.2532 10.0025 13.189 10.6428 12.9468 11.2243C12.7046 11.8059 12.2953 12.3024 11.7707 12.6512C11.2461 13 10.6298 13.1853 9.99984 13.1837ZM13.3332 7.44199C13.149 7.42249 12.9785 7.33551 12.8546 7.1978C12.7307 7.06009 12.6621 6.8814 12.6621 6.69616C12.6621 6.51091 12.7307 6.33223 12.8546 6.19452C12.9785 6.05681 13.149 5.96982 13.3332 5.95033C13.5174 5.96982 13.6879 6.05681 13.8118 6.19452C13.9357 6.33223 14.0042 6.51091 14.0042 6.69616C14.0042 6.8814 13.9357 7.06009 13.8118 7.1978C13.6879 7.33551 13.5174 7.42249 13.3332 7.44199Z" fill="#8C6A54" />
                                                        </svg>
                                                        </span> ishakhannamakeup
                                                    </div>
                                                    <div className="usr-artist-single-tab-content-social-box-lower">
                                                        <a href="#" target="_blank" className="usr-artist-single-tab-content-social-box-lower-link">
                                                            https://www.instagram.com/ishakhannamakeup/
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

                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex={0}>
                                            <div className="usr-artist-single-tab-content">
                                                <p className="usr-artist-single-tab-content-heading">
                                                    Artist Location
                                                </p>

                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="pills-disabled" role="tabpanel" aria-labelledby="pills-disabled-tab" tabIndex={0}>
                                            <div className="usr-artist-single-tab-content">
                                                <p className="usr-artist-single-tab-content-heading">
                                                    Certified By
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* -------tab end------------ */}
                            </div>
                        </div>
                        <div className="col-lg-5">


                            <div className="usr-detail-card">
                                <div className="usr-artist-details-tag">
                                    <div className="usr-name">
                                        <h3>Isha Khanna</h3>
                                        <div className="rating"><svg xmlns="http://www.w3.org/2000/svg" width={21} height={20} viewBox="0 0 21 20" fill="none">
                                            <path d="M9.55544 0.717386C9.86673 -0.178174 11.1333 -0.178174 11.4446 0.717386L13.2105 5.79763C13.3478 6.1927 13.7165 6.46057 14.1346 6.46909L19.5119 6.57867C20.4599 6.59799 20.8512 7.80254 20.0957 8.37534L15.8098 11.6247C15.4765 11.8774 15.3357 12.3108 15.4568 12.7111L17.0142 17.8591C17.2888 18.7666 16.2642 19.511 15.4859 18.9695L11.0712 15.8975C10.7279 15.6586 10.2721 15.6586 9.92882 15.8975L5.51409 18.9695C4.73585 19.511 3.7112 18.7666 3.98576 17.8591L5.54321 12.7111C5.66433 12.3108 5.5235 11.8774 5.1902 11.6247L0.904295 8.37534C0.148763 7.80254 0.540144 6.59799 1.48807 6.57867L6.86536 6.46909C7.28353 6.46057 7.65222 6.1927 7.78955 5.79763L9.55544 0.717386Z" fill="#FCF7F2" />
                                        </svg>4.5</div>
                                    </div>
                                    <div className="usr-rating">
                                        <div className="usr-access-details">
                                            <div className="usr-address">
                                                <p>-Dehli,India</p>
                                            </div>
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
                                            <div className="usr-experience">
                                                <p>Experience in Years:<span>08</span></p>
                                            </div>
                                        </div>
                                        <div className="usr-verifed-svg">
                                            <p>Lookbook Verified<svg width={20} height={21} viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                                <rect y="0.5" width={20} height={20} rx={3} fill="url(#pattern0)" />
                                                <defs>
                                                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width={1} height={1}>
                                                        <use xlinkHref="#image0_1284_5376" transform="translate(-0.135417) scale(0.00231481)" />
                                                    </pattern>
                                                    <image id="image0_1284_5376" width={549} height={432} xlinkHref="data:image/png;base64,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B275wb+I1pZvmhUArFFS3XZE75nXmBX4G0oJAABwAh/fAAAAJ1BKAACAEyglAADACZQSAADgBEoJAABwAqUEAAA4gVICAACcQCkBAABOoJQAAAAnUEoAAIATKCUAAMAJlBIAAOAESgkAAHACpQQAADiBUgIAAJxAKQEAAE6glAAAACdQSgAAgBMoJQAAwAmUEgAA4ARKCQAAcAKlBAAAOIFSAgAAnEApAQAATqCUAAAAJ1BKAACAEyglAADACZQSAADgBEoJAABwAqUEAAA4gVICAACcQCkBAABOoJQAAAAnUEoAAIATKCUAAMAJlBIAAOAESgkAAHACpQQAADiBUgIAAJxAKQEAAE6glAAAACdQSgAAgBMoJQAAwAmUEgAA4ARKCQAAcAKlBAAAOIFSAgAAnEApAQAATqCUAAAAJ1BKAACAEyglAADACZQSAADgBEoJAABwAqUEAAA4gVICAACcQCkBAABOoJQAAAAnUEoAAIATKCUAAMAJlBIAAOAESgkAAHACpQQAADiBUgIAAJxAKQEAAE6glAAAACdQSgAAgBMoJQAAwAmUEgAA4ARKCQAAcAKlBAAAOIFSAgAAnEApAQAATqCUAAAAJ1BKAACAEyglAADACZQSAADgBEoJAABwAqUEAAA4gVICAACcQCkBAABOoJQAAAAnUEoAAIATKCUAAMAJlBIAAOAESgkAAHACpQQAADhAiP8H4OGuKR4WY9QAAAAASUVORK5CYII=" />
                                                </defs>
                                            </svg>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="usr-artist-charges">
                                    <h6>Charges:</h6>
                                    <p>Party Makeup:<span>25000/-</span></p>
                                    <p>Wedding Function:<span>35000/-</span></p>
                                    <p>Bridal Makeup:<span>45000/-</span></p>
                                    <p>Bridal Relatives:<span>20000/-</span></p>
                                </div>
                                <div className="usr-artist-order">
                                    <h6>Minimum Order:</h6>
                                    <p>Bridal Makeup + One Party Makeup</p>
                                </div>
                                <div className="usr-card-booking-button">
                                    <button className="usr-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">Book Now</button>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>
            </section>

            {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button> */}


            <div className="modal-lg modal fade usr-artist-single-modal" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header d-none">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
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
                                       </div>
                                  </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>


        </>
    );
};

export default ArtistSingle;