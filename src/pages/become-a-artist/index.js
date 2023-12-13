import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import MyButtonComponent from "./button";

const ArtistRegistration = () => {
  const [configuration, setConfiguration, userRequests] = useOutletContext();
  const openRequest = userRequests.find(item=>item.status == "progress");
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  var createdAtDate,formattedDate;
  if(openRequest)
  {
    createdAtDate = new Date(openRequest.createdAt);
  // Options for formatting the date
  
  // Formatted date string
   formattedDate = createdAtDate.toLocaleDateString('en-US', options);
  }
  

  const navigate = useNavigate();

  console.log(configuration, "Lookbook config");
  // const handleSubmit = (data) => {
  //     // Handle the form submission here
  //     console.log('Form submitted with data:', data);
  //     setCount(count + 1)
  //   };

  return (
    <>
       {
        openRequest ? <>
         <section className="artist-progress-component py-3">
          <div className="container">
              <div className="row">
                  <div className="col-lg-7 mx-auto">
                         <div className="progress-component">
                            <h1 className="artist-inner-heading mb-lg-4">
                                 Welcome back ,Montu Tiwari
                            </h1>
                            <h2 className="artist-inner-subheading mb-lg-3">
                               Finish your artist request
                            </h2>
                            <button className="progress-component-action-btn"  type="btn">  
                                <span className="progress-component-action-btn-icon">
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" 
                                viewBox="0 0 512 512" height="200px" width="200px" 
                                xmlns="http://www.w3.org/2000/svg">
                                  <path d="M208 448V320h96v128h97.6V256H464L256 64 48 256h62.4v192z"></path></svg>
                                </span>
                                <span className="progress-component-action-btn-title">
                                  Your request started on {formattedDate}
                                </span>
                            </button>
                            <h2 className="artist-inner-subheading mb-lg-3 mt-lg-5">
                               Start a new request
                            </h2>
                            <button className="progress-component-action-btn"  type="btn">  
                                <span className="progress-component-action-btn-icon">
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" 
                                viewBox="0 0 512 512" height="200px" width="200px" 
                                xmlns="http://www.w3.org/2000/svg">
                                  <path d="M208 448V320h96v128h97.6V256H464L256 64 48 256h62.4v192z"></path></svg>
                                </span>
                                <span className="progress-component-action-btn-title">
                                  Create a new request
                                </span>
                            </button>
                         </div>
                  </div>
              </div>
          </div>
      </section>
         </>:<>
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

          
        </div>
      </section>
     
      <footer className="artist-footer-ar">
      <hr className="m-0" />
            <div className="col-md-12 p-3">
              <div
                className="get-started-div text-end"
                onClick={() => navigate("/become-a-artist/about-your-skills")}
              >
                <MyButtonComponent label="Get Started" />
              </div>
            </div>
            </footer>
      </>
       } 
    

 
    
    </>
  );
};

export default ArtistRegistration;
