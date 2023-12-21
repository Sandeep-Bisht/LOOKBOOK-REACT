import React from 'react';
import { Link } from "react-router-dom";
import '../../css/user/homepage.css'

const FeatureArtist = () => {
  
     
    return (
        <>
              <section className="usr-featured-artist usr-overlap-section" id="yourNextSectionId">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h2 className="usr-common-heading text-center">
                                    Featured Artist
                                </h2>
                            </div>

                        </div>
                        <div className="row mt-lg-4">
                            <div className="col-lg-3">
                                <div className="usr-featured-artist-card">
                                    <div className="imgBx">
                                        <img className="image"
                                            src="images/artist/4.jpg"
                                        />
                                    </div>
                                    <div className="content">
                                        <div className="name">
                                            <h2>John Doe</h2>
                                            <div className="profession">
                                                <h3>Makeup Artist</h3>
                                            </div>
                                            <div className="desc">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                            </div>
                                        </div>
                                        <div className="prizeButton">
                                            <div className="prize">
                                                <span className="usr-charges">Charges</span>
                                                <span className="usr-price">₹ 5,000</span>
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
                            <div className="col-lg-3">
                                <div className="usr-featured-artist-card">
                                    <div className="imgBx">
                                        <img className="image"
                                            src="images/artist/1.jpg"
                                        />
                                    </div>
                                    <div className="content">
                                        <div className="name">
                                            <h2>John Doe</h2>
                                            <div className="profession">
                                                <h3>Makeup Artist</h3>
                                            </div>
                                            <div className="desc">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                            </div>
                                        </div>
                                        <div className="prizeButton">
                                            <div className="prize">
                                                <span className="usr-charges">Charges</span>
                                                <span className="usr-price">₹ 5,000</span>
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
                            <div className="col-lg-3">
                                <div className="usr-featured-artist-card">
                                    <div className="imgBx">
                                        <img className="image"
                                            src="images/artist/2.jpg"
                                        />
                                    </div>
                                    <div className="content">
                                        <div className="name">
                                            <h2>John Doe</h2>
                                            <div className="profession">
                                                <h3>Makeup Artist</h3>
                                            </div>
                                            <div className="desc">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                            </div>
                                        </div>
                                        <div className="prizeButton">
                                            <div className="prize">
                                                <span className="usr-charges">Charges</span>
                                                <span className="usr-price">₹ 5,000</span>
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
                            <div className="col-lg-3">
                                <div className="usr-featured-artist-card">
                                    <div className="imgBx">
                                        <img className="image"
                                            src="images/artist/3.jpg"
                                        />
                                    </div>
                                    <div className="content">
                                        <div className="name">
                                            <h2>John Doe</h2>
                                            <div className="profession">
                                                <h3>Makeup Artist</h3>
                                            </div>
                                            <div className="desc">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                            </div>
                                        </div>
                                        <div className="prizeButton">
                                            <div className="prize">
                                                <span className="usr-charges">Charges</span>
                                                <span className="usr-price">₹ 5,000</span>
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
                        </div>
                    </div>
                </section>  
        
              

        </>

    );
};

export default FeatureArtist;