import React from "react";
import "@css/user/profile.css";
import "@css/common.css";
import profileImg from "@core/assets/5.jpg";
import Slider from "react-slick";
import { Link, useLoaderData } from "react-router-dom";

const NewProfile = () => {
  const userData = useLoaderData();
  var settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div>
      <section className="usr-new-profile">
        <div className="container view-details">
          <div className="row">
            <div className="col-md-12 usr-new-profile-name">
              <h1>About {userData?.fullName ? userData?.fullName :  "User"}</h1>
            </div>
          </div>
          <div className="row"> 
            <div className="col-md-12 col-lg-4 mb-3">
              <div className="usr-new-profile-photo">
                <img src={userData?.image ? userData?.image.thumbnailUrl :  profileImg} className="img-fluid" />
                <div className="rating_review">
                  <div>
                    <h1>4.5</h1>
                    <p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="15"
                        viewBox="0 0 16 15"
                        fill="none"
                      >
                        <path
                          d="M7.04894 0.92705C7.3483 0.00573921 8.6517 0.00573969 8.95106 0.92705L10.0206 4.21885C10.1545 4.63087 10.5385 4.90983 10.9717 4.90983H14.4329C15.4016 4.90983 15.8044 6.14945 15.0207 6.71885L12.2205 8.75329C11.87 9.00793 11.7234 9.4593 11.8572 9.87132L12.9268 13.1631C13.2261 14.0844 12.1717 14.8506 11.388 14.2812L8.58778 12.2467C8.2373 11.9921 7.7627 11.9921 7.41221 12.2467L4.61204 14.2812C3.82833 14.8506 2.77385 14.0844 3.0732 13.1631L4.14277 9.87132C4.27665 9.4593 4.12999 9.00793 3.7795 8.75329L0.979333 6.71885C0.195619 6.14945 0.598395 4.90983 1.56712 4.90983H5.02832C5.46154 4.90983 5.8455 4.63087 5.97937 4.21885L7.04894 0.92705Z"
                          fill="#6D5D4C"
                        />
                      </svg>
                      Rating
                    </p>
                  </div>
                  <hr></hr>
                  <div>
                    <h1>173</h1>
                    <p>Reviews</p>
                  </div>
                </div>
                {/* <div className="edit_image_button">
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="23"
                      viewBox="0 0 20 23"
                      fill="none"
                    >
                      <path
                        d="M2.5 14.5501V17.0835C2.5 17.3168 2.68333 17.5001 2.91667 17.5001H5.45C5.55833 17.5001 5.66667 17.4585 5.74167 17.3751L14.8417 8.28346L11.7167 5.15846L2.625 14.2501C2.54167 14.3335 2.5 14.4335 2.5 14.5501ZM17.2583 5.8668C17.5833 5.5418 17.5833 5.0168 17.2583 4.6918L15.3083 2.7418C14.9833 2.4168 14.4583 2.4168 14.1333 2.7418L12.6083 4.2668L15.7333 7.3918L17.2583 5.8668Z"
                        fill="#6D5D4C"
                      />
                    </svg>
                    Update Profile Picture
                  </button>
                </div> */}
              </div>
            </div>
            <div className="col-md-6 col-lg-4  mb-3">
              <div className="usr-user-details">
                <div>
                  <h1>Hi {userData?.fullName ? userData?.fullName :  "User"} Welcome to your profile page</h1>
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_2082_6088)">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M2.72736 1.09277H17.2728C18.2728 1.09277 19.091 1.92611 19.091 2.94463V14.0557C19.091 15.0743 18.2728 15.9076 17.2728 15.9076H2.72736C1.72736 15.9076 0.90918 15.0743 0.90918 14.0557V2.94463C0.90918 1.92611 1.72736 1.09277 2.72736 1.09277Z"
                          stroke="#6D5D4C"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M19.091 2.94434L10.0001 9.42582L0.90918 2.94434"
                          stroke="#6D5D4C"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2082_6088">
                          <rect
                            width="20"
                            height="16.6667"
                            fill="white"
                            transform="translate(0 0.166992)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    example@mail.com
                  </p>
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2.86133 9.02958C2.87459 5.1254 6.05031 1.97119 9.95449 1.98442C13.8587 1.99772 17.0129 5.17344 16.9997 9.07762V9.15768C16.9516 11.6955 15.5346 14.0412 13.7973 15.8746C12.8037 16.9063 11.6942 17.8197 10.4909 18.5965C10.1691 18.8749 9.69183 18.8749 9.37006 18.5965C7.57614 17.4289 6.00167 15.9547 4.71868 14.2414C3.57517 12.7473 2.92593 10.9339 2.86133 9.0536V9.02958Z"
                        stroke="#6D5D4C"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.93081 11.431C11.1822 11.431 12.1966 10.4165 12.1966 9.16518C12.1966 7.91383 11.1822 6.89941 9.93081 6.89941C8.67946 6.89941 7.66504 7.91383 7.66504 9.16518C7.66504 10.4165 8.67946 11.431 9.93081 11.431Z"
                        stroke="#6D5D4C"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    From- Dehradun, India
                  </p>
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_2082_6110)">
                        <path
                          d="M9.99199 2.16699C5.39199 2.16699 1.66699 5.90033 1.66699 10.5003C1.66699 15.1003 5.39199 18.8337 9.99199 18.8337C14.6003 18.8337 18.3337 15.1003 18.3337 10.5003C18.3337 5.90033 14.6003 2.16699 9.99199 2.16699ZM15.767 7.16699H13.3087C13.042 6.12533 12.6587 5.12533 12.1587 4.20033C13.692 4.72533 14.967 5.79199 15.767 7.16699ZM10.0003 3.86699C10.692 4.86699 11.2337 5.97533 11.592 7.16699H8.40866C8.76699 5.97533 9.30866 4.86699 10.0003 3.86699ZM3.55033 12.167C3.41699 11.6337 3.33366 11.0753 3.33366 10.5003C3.33366 9.92533 3.41699 9.36699 3.55033 8.83366H6.36699C6.30033 9.38366 6.25033 9.93366 6.25033 10.5003C6.25033 11.067 6.30033 11.617 6.36699 12.167H3.55033ZM4.23366 13.8337H6.69199C6.95866 14.8753 7.34199 15.8753 7.84199 16.8003C6.30866 16.2753 5.03366 15.217 4.23366 13.8337ZM6.69199 7.16699H4.23366C5.03366 5.78366 6.30866 4.72533 7.84199 4.20033C7.34199 5.12533 6.95866 6.12533 6.69199 7.16699ZM10.0003 17.1337C9.30866 16.1337 8.76699 15.0253 8.40866 13.8337H11.592C11.2337 15.0253 10.692 16.1337 10.0003 17.1337ZM11.9503 12.167H8.05033C7.97533 11.617 7.91699 11.067 7.91699 10.5003C7.91699 9.93366 7.97533 9.37533 8.05033 8.83366H11.9503C12.0253 9.37533 12.0837 9.93366 12.0837 10.5003C12.0837 11.067 12.0253 11.617 11.9503 12.167ZM12.1587 16.8003C12.6587 15.8753 13.042 14.8753 13.3087 13.8337H15.767C14.967 15.2087 13.692 16.2753 12.1587 16.8003ZM13.6337 12.167C13.7003 11.617 13.7503 11.067 13.7503 10.5003C13.7503 9.93366 13.7003 9.38366 13.6337 8.83366H16.4503C16.5837 9.36699 16.667 9.92533 16.667 10.5003C16.667 11.0753 16.5837 11.6337 16.4503 12.167H13.6337Z"
                          fill="#6D5D4C"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2082_6110">
                          <rect
                            width="20"
                            height="20"
                            fill="white"
                            transform="translate(0 0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    Speaks- English, Hindi and Punjabi
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4  mb-3">
              <div className="confirmation">
                <div>
                  <h4>
                    Confirmed<br></br>Information
                  </h4>
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="23"
                      viewBox="0 0 18 23"
                      fill="none"
                    >
                      <path
                        d="M6.72449 16.1719C6.54215 16.372 6.28383 16.5388 6.0559 16.5388C5.82797 16.5388 5.56965 16.3637 5.3797 16.1635L1.125 11.4932L2.47739 10.0087L6.06349 13.9451L15.5454 3.46191L16.875 4.97143L6.72449 16.1719Z"
                        fill="#6D5D4C"
                      />
                    </svg>
                    Identity
                  </p>
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="23"
                      viewBox="0 0 18 23"
                      fill="none"
                    >
                      <path
                        d="M6.72449 16.1719C6.54215 16.372 6.28383 16.5388 6.0559 16.5388C5.82797 16.5388 5.56965 16.3637 5.3797 16.1635L1.125 11.4932L2.47739 10.0087L6.06349 13.9451L15.5454 3.46191L16.875 4.97143L6.72449 16.1719Z"
                        fill="#6D5D4C"
                      />
                    </svg>
                    {userData.email ? userData.email : "Email address"}
                  </p>
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="23"
                      viewBox="0 0 18 23"
                      fill="none"
                    >
                      <path
                        d="M6.72449 16.1719C6.54215 16.372 6.28383 16.5388 6.0559 16.5388C5.82797 16.5388 5.56965 16.3637 5.3797 16.1635L1.125 11.4932L2.47739 10.0087L6.06349 13.9451L15.5454 3.46191L16.875 4.97143L6.72449 16.1719Z"
                        fill="#6D5D4C"
                      />
                    </svg>
                    {userData.mobile ? userData.mobile : "Phone number"} 
                  </p>
                  <a href="">Learn about identity verification</a>
                </div>
              </div>
            </div>
          </div>
          <div className="usr-user-other-details">
            <div className="other-details">
              <div className="details">
                <h6>Name</h6>
                <p>{userData?.fullName ? userData?.fullName :  "User Name"}</p>
              </div>
              <hr></hr>
              <div className="details">
                <h6>Email</h6>
                <p>{userData?.email ? userData?.email :  "name@example.com"}</p>
              </div>
              <hr></hr>
              <div className="details">
                <h6>Gender</h6>
                <p>{userData?.gender ? userData?.gender :  "Male"}</p>
              </div>
              <hr></hr>
              <div className="details">
                <h6>Phone Number</h6>
                {userData?.mobile ? <p>+91 {userData?.mobile}</p> : <p>+91 1234567890</p> }
              </div>
              <hr></hr>
              <div className="details">
                <h6>Data of Birth</h6>
                <p>{userData?.dob ? userData?.dob :  "28-08-1995"}</p>
              </div>
              <hr></hr>
              <Link className="details edit-button" type="button" to="/user/new-profile/edit" >
                <h6>Edit Details</h6>
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="23"
                    viewBox="0 0 20 23"
                    fill="none"
                  >
                    <path
                      d="M2.5 14.5501V17.0835C2.5 17.3168 2.68333 17.5001 2.91667 17.5001H5.45C5.55833 17.5001 5.66667 17.4585 5.74167 17.3751L14.8417 8.28346L11.7167 5.15846L2.625 14.2501C2.54167 14.3335 2.5 14.4335 2.5 14.5501ZM17.2583 5.8668C17.5833 5.5418 17.5833 5.0168 17.2583 4.6918L15.3083 2.7418C14.9833 2.4168 14.4583 2.4168 14.1333 2.7418L12.6083 4.2668L15.7333 7.3918L17.2583 5.8668Z"
                      fill="#6D5D4C"
                    />
                  </svg>
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className="container review-section">
          <h4>Review</h4>
          <Slider {...settings}>
            <div className="review-cards">
              <div className="review">
                <p>
                  lorem isalncokenko ojnaofj koa iaehfoa aoh ojef haewjh oh oaho
                  aoi fhoasn oah oano heoao ah oa
                </p>
                <div classname="review-profile">
                  <img width="50px" />
                  <div className="about-profile">
                    <h6>John Doe</h6>
                    <p>Jan 2024</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="review-cards">
              <div className="review">
                <p>
                  lorem isalncokenko ojnaofj koa iaehfoa aoh ojef haewjh oh oaho
                  aoi fhoasn oah oano heoao ah oa
                </p>
                <div classname="review-profile">
                  <img width="50px" />
                  <div className="about-profile">
                    <h6>John Doe</h6>
                    <p>Jan 2024</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="review-cards">
              <div className="review">
                <p>
                  lorem isalncokenko ojnaofj koa iaehfoa aoh ojef haewjh oh oaho
                  aoi fhoasn oah oano heoao ah oa
                </p>
                <div classname="review-profile">
                  <img width="50px" />
                  <div className="about-profile">
                    <h6>John Doe</h6>
                    <p>Jan 2024</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="review-cards">
              <div className="review">
                <p>
                  lorem isalncokenko ojnaofj koa iaehfoa aoh ojef haewjh oh oaho
                  aoi fhoasn oah oano heoao ah oa
                </p>
                <div classname="review-profile">
                  <img width="50px" />
                  <div className="about-profile">
                    <h6>John Doe</h6>
                    <p>Jan 2024</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="review-cards">
              <div className="review">
                <p>
                  lorem isalncokenko ojnaofj koa iaehfoa aoh ojef haewjh oh oaho
                  aoi fhoasn oah oano heoao ah oa
                </p>
                <div classname="review-profile">
                  <img width="50px" />
                  <div className="about-profile">
                    <h6>John Doe</h6>
                    <p>Jan 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
          <button className="more-review-button">Show more reviews</button>
        </div>
      </section>
    </div>
  );
};

export default NewProfile;
