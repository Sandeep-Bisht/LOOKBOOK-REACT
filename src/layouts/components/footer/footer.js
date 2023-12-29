import React from "react";
import { Link } from "react-router-dom";
import '@css/footer.css'
import instagram from "@core/assets/footer/instagram.png"
import facebook from "@core/assets/footer/Facebook.png"
import twitter from "@core/assets/footer/twitter.png"
import linkedin from "@core/assets/footer/LinkedIn.png"
import youtube from "@core/assets/footer/youtube.png"
const Footer = () => {
    return (
        <>

            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row usr-footer">
                                <div className="col-md-2 usr-recent-icon">
                                    <ul className="usr-icon-list">
                                        <li><a href="#">
                                            </a></li>
                                        <li><a><img src={instagram} alt='footer-social-icon' /></a></li>
                                        <li><a><img src={facebook} alt='footer-social-icon' /></a></li>
                                        <li><a><img src={twitter} alt='footer-social-icon' /></a></li>
                                        <li><a><img src={linkedin} alt='footer-social-icon' /></a></li>
                                        <li><a><img src={youtube} alt='footer-social-icon' /></a></li>
                                    </ul>
                                </div>
                                <div className="col-md-6 usr-footer-menu">
                                    <ul className="usr-footer-menu-list">
                                        <li><Link to="/" className="footer-link active">HOME</Link></li>
                                        <li><Link to="/artists" className="footer-link">ARTIST</Link></li>
                                        <li><Link to="/about-us" className="footer-link">ABOUT US</Link></li>
                                        <li><Link to="/contact" className="footer-link">CONTACT US</Link></li>
                                        <li><Link to="/become-a-artist" className="footer-link">JOIN US</Link></li>
                                        <li><Link to="/blogs" className="footer-link">BLOG</Link></li>
                                    </ul>
                                </div>
                                <div className="col-md-4 usr-footer-last-icon">
                                    <div>
                                        
                                    <a className="footer-link" href="">
                                        <span className="me-2"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5331 6.05339L9.99981 10.8617L3.46647 6.05339M2.69564 4.46172C2.47462 4.46172 2.26266 4.54952 2.10638 4.7058C1.9501 4.86208 1.8623 5.07404 1.8623 5.29505V14.7159C1.8623 14.9369 1.9501 15.1489 2.10638 15.3051C2.26266 15.4614 2.47462 15.5492 2.69564 15.5492H17.304C17.525 15.5492 17.7369 15.4614 17.8932 15.3051C18.0495 15.1489 18.1373 14.9369 18.1373 14.7159V5.28255C18.1373 5.06154 18.0495 4.84958 17.8932 4.6933C17.7369 4.53702 17.525 4.44922 17.304 4.44922H2.69564V4.46172Z" stroke="#6D5D4C" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</span>
                                        
                                        INFO@MYLOOKBOOK.IN</a></div>
                                    <div>
                                    
                                    <a className="footer-link">
                                        <span className="me-2">
                                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.3082 15.2743C18.3082 15.5743 18.2415 15.8827 18.0998 16.1827C17.9582 16.4827 17.7748 16.766 17.5332 17.0327C17.1248 17.4827 16.6748 17.8077 16.1665 18.016C15.6665 18.2243 15.1248 18.3327 14.5415 18.3327C13.6915 18.3327 12.7832 18.1327 11.8248 17.7243C10.8665 17.316 9.90817 16.766 8.95817 16.0743C7.99984 15.3743 7.0915 14.5993 6.22484 13.741C5.3665 12.8743 4.5915 11.966 3.89984 11.016C3.2165 10.066 2.6665 9.11602 2.2665 8.17435C1.8665 7.22435 1.6665 6.31602 1.6665 5.44935C1.6665 4.88268 1.7665 4.34102 1.9665 3.84102C2.1665 3.33268 2.48317 2.86602 2.92484 2.44935C3.45817 1.92435 4.0415 1.66602 4.65817 1.66602C4.8915 1.66602 5.12484 1.71602 5.33317 1.81602C5.54984 1.91602 5.7415 2.06602 5.8915 2.28268L7.82484 5.00768C7.97484 5.21602 8.08317 5.40768 8.15817 5.59102C8.23317 5.76602 8.27484 5.94102 8.27484 6.09935C8.27484 6.29935 8.2165 6.49935 8.09984 6.69102C7.9915 6.88268 7.83317 7.08268 7.63317 7.28268L6.99984 7.94102C6.90817 8.03268 6.8665 8.14102 6.8665 8.27435C6.8665 8.34102 6.87484 8.39935 6.8915 8.46602C6.9165 8.53268 6.9415 8.58268 6.95817 8.63268C7.10817 8.90768 7.3665 9.26602 7.73317 9.69935C8.10817 10.1327 8.50817 10.5743 8.9415 11.016C9.3915 11.4577 9.82484 11.866 10.2665 12.241C10.6998 12.6077 11.0582 12.8577 11.3415 13.0077C11.3832 13.0243 11.4332 13.0493 11.4915 13.0743C11.5582 13.0993 11.6248 13.1077 11.6998 13.1077C11.8415 13.1077 11.9498 13.0577 12.0415 12.966L12.6748 12.341C12.8832 12.1327 13.0832 11.9743 13.2748 11.8743C13.4665 11.7577 13.6582 11.6993 13.8665 11.6993C14.0248 11.6993 14.1915 11.7327 14.3748 11.8077C14.5582 11.8827 14.7498 11.991 14.9582 12.1327L17.7165 14.091C17.9332 14.241 18.0832 14.416 18.1748 14.6243C18.2582 14.8327 18.3082 15.041 18.3082 15.2743Z" stroke="#6D5D4C" stroke-miterlimit="10"/>
</svg>

                                            </span>

                                        +91
                                        9958306204</a></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <p className="footer-link text-center mt-lg-3 pb-2">© 2023 by LOOKBOOK</p>
                        </div>
                    </div>
                </div>
            </footer>


        </>

    );
};

export default Footer;