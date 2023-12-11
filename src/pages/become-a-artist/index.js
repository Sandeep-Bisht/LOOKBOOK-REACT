import React from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import "../../css/artistRegistration.css";
import MyButtonComponent from "./button";
import ArtistFooter from "./artistFooter";

const ArtistRegistration = () => {
  const [configuration, setConfiguration] = useOutletContext();
  const navigate = useNavigate();

  console.log(configuration, "Lookbook config");
  // const handleSubmit = (data) => {
  //     // Handle the form submission here
  //     console.log('Form submitted with data:', data);
  //     setCount(count + 1)
  //   };

  return (
    <>
      <section className="artist-registration">
        <div className="container">
          {/* <p>{configuration}</p> */}
          {/* <button type='button' onClick={()=>handleSubmit()}>Sumit</button> */}
          {/* <Link to="/become-a-artist/about-you">Next</Link> */}
          <div className="row artist-landing-page">
            <div className="col-md-6">
              <div>
                <h1>It’s easy to get started on Lookbook</h1>
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <div className="artist-steps-heading">
                  <h3>1. Tell us about your place</h3>
                  <span>
                    Share some basic info, such as where it is and how many
                    guests can stay.
                  </span>
                </div>
                <div className="artist-steps-heading">
                  <h3>2. Make it stand out</h3>
                  <span>
                    Add 5 or more photos plus a title and description – we’ll
                    help you out.
                  </span>
                </div>
                <div className="artist-steps-heading">
                  <h3>3. Finish up and publish</h3>
                  <span>
                    Share some basic info, such as where it is and how many
                    guests can stay.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <hr className="" />
          <div className="row">
            <div className="col-md-12">
              <div
                className="get-started-div"
                onClick={() => navigate("/become-a-artist/about-your-skills")}
              >
                <MyButtonComponent label="Get Started" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ArtistRegistration;
