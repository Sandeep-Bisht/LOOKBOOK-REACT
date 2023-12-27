import React from "react";
import "@css/user/contact.css";
import { useForm } from "react-hook-form";
import { TextField} from '@mui/material'
import Calendly from "layouts/components/calendly/Calendly";
import instagram from "@core/assets/contact/instagram.png"
import facebook from "@core/assets/contact/Facebook.png"
import twitter from "@core/assets/contact/twitter.png"
import linkedin from "@core/assets/contact/LinkedIn.png"
import youtube from "@core/assets/contact/youtube.png"

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12 usr-contact-main">
              <div className="text-center">
                <h1 className="usr-contact-heading">CONTACT US</h1>
                <p className="usr-contact-main-para">LET’S GET IN TOUCH</p>
              </div>
              </div>
              </div>
              <div className="row">
                <div className="col-md-4 usr-contact-part">
                  <div className="usr-contact-main-details">
                    <div className="usr-contact-number">
                      <span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M25.6013 19.3584L23.5388 17.2959C22.9239 16.686 22.0941 16.3422 21.2281 16.3385C20.3621 16.3348 19.5294 16.6716 18.9094 17.2762C18.5786 17.6089 18.1421 17.8159 17.6752 17.8616C17.2082 17.9073 16.74 17.7888 16.3509 17.5265C14.8155 16.5018 13.4965 15.1853 12.4688 13.6518C12.2111 13.2585 12.0969 12.7883 12.1454 12.3206C12.1939 11.8529 12.4021 11.4162 12.735 11.084C13.3342 10.4635 13.6666 9.63303 13.6612 8.77045C13.6557 7.90786 13.3129 7.08168 12.7059 6.46871L10.6434 4.40621C10.026 3.79085 9.18974 3.44531 8.31798 3.44531C7.44622 3.44531 6.61 3.79085 5.99251 4.40621L5.39907 5.00059C2.30532 8.09434 2.53689 14.5987 8.97376 21.0318C12.855 24.914 16.7616 26.5396 19.9294 26.5396C20.8619 26.5707 21.7912 26.4158 22.6633 26.0841C23.5353 25.7524 24.3327 25.2504 25.0088 24.6075L25.6031 24.0131C26.2196 23.3953 26.5657 22.5581 26.5654 21.6854C26.565 20.8126 26.2183 19.9757 25.6013 19.3584ZM24.2756 22.6875L23.6813 23.2818C21.2438 25.7193 15.8634 25.274 10.2975 19.7072C4.73157 14.1403 4.28532 8.75621 6.72282 6.31871L7.31251 5.72528C7.57802 5.46073 7.93755 5.31219 8.31236 5.31219C8.68716 5.31219 9.04669 5.46073 9.3122 5.72528L11.3747 7.78778C11.6354 8.04977 11.7834 8.40326 11.787 8.77283C11.7907 9.1424 11.6498 9.49877 11.3944 9.7659C10.7609 10.4034 10.3657 11.2393 10.2751 12.1335C10.1845 13.0276 10.4039 13.9258 10.8966 14.6775C12.0643 16.4249 13.5659 17.9242 15.315 19.0893C16.0644 19.5821 16.9602 19.8028 17.8528 19.7146C18.7453 19.6264 19.5806 19.2346 20.2191 18.6047C20.4857 18.3462 20.8431 18.2027 21.2144 18.205C21.5857 18.2073 21.9413 18.3551 22.2047 18.6168L24.2672 20.6793C24.4001 20.8103 24.5058 20.9663 24.5782 21.1384C24.6507 21.3104 24.6883 21.495 24.6891 21.6816C24.6899 21.8683 24.6538 22.0532 24.5828 22.2258C24.5119 22.3985 24.4075 22.5553 24.2756 22.6875Z"
                            fill="#6D5D4C"
                          />
                        </svg>
                        Phone
                      </span>
                      <p className="usr-contact-para">123-456-7890</p>
                    </div>
                    <div className="usr-contact-place">
                      <span className="me-2">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.9947 2.80957C13.2302 2.80957 11.1681 3.32333 9.48156 4.6591C7.79501 5.99488 6.56199 8.20227 6.56199 11.2529C6.56199 14.4808 8.58868 17.6271 10.5197 20.04C12.4507 22.4564 14.3818 24.1465 14.3818 24.1465C14.7361 24.4583 15.264 24.4583 15.6183 24.1465C15.6183 24.1465 17.5493 22.4564 19.4804 20.04C21.4114 17.6271 23.4381 14.4808 23.4381 11.2529C23.4381 8.19873 22.2051 5.99488 20.5185 4.6591C18.832 3.32333 16.7592 2.80957 14.9947 2.80957ZM14.9947 4.68745C16.3943 4.68745 18.0844 5.11617 19.3528 6.12598C20.6284 7.13223 21.5638 8.6806 21.5638 11.2529C21.5638 13.6481 19.8701 16.6173 18.0206 18.8637C16.451 20.7699 15.7211 21.4395 15.0018 22.1588C14.3286 21.4643 13.4676 20.699 11.9795 18.8637C10.1441 16.6031 8.43632 13.6481 8.43632 11.2529C8.43632 8.6806 9.37172 7.13223 10.6437 6.12598C11.9193 5.11617 13.5987 4.68745 14.9947 4.68745ZM14.9947 6.5795C12.4188 6.5795 10.3107 8.69477 10.3107 11.2742C10.3107 13.8501 12.4188 15.9583 14.9947 15.9583C17.5742 15.9583 19.6894 13.8501 19.6894 11.2742C19.6848 10.0305 19.1886 8.83912 18.3092 7.9597C17.4298 7.08028 16.2384 6.58417 14.9947 6.5795ZM14.9947 8.45738C16.5608 8.45738 17.8151 9.70812 17.8151 11.2742C17.816 11.6442 17.7436 12.0107 17.602 12.3525C17.4605 12.6943 17.2525 13.0047 16.9903 13.2656C16.728 13.5266 16.4166 13.7329 16.0741 13.8728C15.7315 14.0126 15.3647 14.0832 14.9947 14.0804C14.6257 14.0823 14.2599 14.011 13.9186 13.8706C13.5773 13.7302 13.2672 13.5236 13.0063 13.2627C12.7453 13.0017 12.5387 12.6916 12.3983 12.3503C12.258 12.009 12.1867 11.6432 12.1885 11.2742C12.1862 10.9045 12.2571 10.5381 12.3972 10.1959C12.5372 9.85383 12.7437 9.54285 13.0046 9.28095C13.2655 9.01906 13.5757 8.81144 13.9173 8.67009C14.2589 8.52873 14.625 8.45644 14.9947 8.45738ZM10.2894 21.7832C10.2692 21.786 10.2491 21.7896 10.2292 21.7939C8.19539 22.0029 6.65411 22.3076 5.61242 22.7611C5.09157 22.9879 4.62033 23.2076 4.33688 23.8206C4.19407 24.1569 4.18772 24.5355 4.31916 24.8764C4.45026 25.1988 4.66993 25.415 4.89315 25.5851C5.78603 26.2583 7.06512 26.524 8.80835 26.7826C10.5516 27.0413 12.7023 27.1901 14.9947 27.1901C17.2907 27.1901 19.4379 27.0413 21.1811 26.7826C22.9279 26.524 24.2105 26.2583 25.1069 25.5851C25.3594 25.4088 25.5581 25.1659 25.6809 24.8835C25.8109 24.5397 25.8033 24.1589 25.6597 23.8206C25.3762 23.204 24.9085 22.9879 24.3841 22.7576C23.346 22.3076 21.8118 22.0029 19.778 21.7939C18.584 21.6947 18.297 23.4414 19.5831 23.6611C21.2094 23.8276 22.5736 24.0934 23.3601 24.3697C22.8145 24.5682 22.0137 24.763 20.9047 24.926C19.282 25.167 17.2092 25.3158 14.9947 25.3158C12.7838 25.3158 10.711 25.167 9.08826 24.926C8.25165 24.8209 7.42705 24.6358 6.62576 24.3733C7.86329 24.013 9.13305 23.7745 10.417 23.6611C11.6393 23.4769 11.4728 21.7939 10.2894 21.7832Z"
                            fill="#6D5D4C"
                          />
                        </svg>
                        Address
                      </span>
                      <p className="usr-contact-para">
                        500 TERRY FRANCOIS STREETSAN FRANCISCO, CA 94158
                      </p>
                    </div>
                    <div className="usr-contact-mail">
                      <span className="me-2">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M25.3125 24.375H4.6875C3.94158 24.375 3.22621 24.0787 2.69876 23.5512C2.17132 23.0238 1.875 22.3084 1.875 21.5625V8.4375C1.875 7.69158 2.17132 6.97621 2.69876 6.44876C3.22621 5.92132 3.94158 5.625 4.6875 5.625H25.3125C26.0584 5.625 26.7738 5.92132 27.3012 6.44876C27.8287 6.97621 28.125 7.69158 28.125 8.4375V21.5625C28.125 22.3084 27.8287 23.0238 27.3012 23.5512C26.7738 24.0787 26.0584 24.375 25.3125 24.375ZM4.6875 7.5C4.43886 7.5 4.2004 7.59877 4.02459 7.77459C3.84877 7.9504 3.75 8.18886 3.75 8.4375V21.5625C3.75 21.8111 3.84877 22.0496 4.02459 22.2254C4.2004 22.4012 4.43886 22.5 4.6875 22.5H25.3125C25.5611 22.5 25.7996 22.4012 25.9754 22.2254C26.1512 22.0496 26.25 21.8111 26.25 21.5625V8.4375C26.25 8.18886 26.1512 7.9504 25.9754 7.77459C25.7996 7.59877 25.5611 7.5 25.3125 7.5H4.6875Z"
                            fill="#6D5D4C"
                          />
                          <path
                            d="M15 15.9373C14.8163 15.9359 14.637 15.8805 14.4844 15.778L3.23441 8.27795C3.0525 8.13142 2.93184 7.92226 2.89607 7.69142C2.8603 7.46059 2.91199 7.22471 3.04102 7.03C3.17005 6.83528 3.36712 6.69574 3.59365 6.63872C3.82017 6.58169 4.05982 6.61129 4.26567 6.7217L15.5157 14.2217C15.6819 14.3334 15.808 14.4954 15.8755 14.684C15.943 14.8726 15.9483 15.0779 15.8906 15.2697C15.833 15.4615 15.7154 15.6298 15.5551 15.75C15.3949 15.8701 15.2003 15.9358 15 15.9373Z"
                            fill="#6D5D4C"
                          />
                          <path
                            d="M15.0001 15.9379C14.7991 15.9384 14.6031 15.8741 14.4413 15.7547C14.2795 15.6353 14.1604 15.467 14.1016 15.2747C14.0427 15.0824 14.0473 14.8763 14.1146 14.6868C14.1818 14.4973 14.3082 14.3344 14.4751 14.2223L25.7251 6.72228C25.9314 6.60032 26.1766 6.562 26.4103 6.61517C26.6439 6.66834 26.8484 6.80898 26.9816 7.00819C27.1148 7.20739 27.1666 7.45005 27.1265 7.68631C27.0864 7.92256 26.9573 8.13448 26.7658 8.27853L15.5158 15.7785C15.3632 15.881 15.1839 15.9365 15.0001 15.9379Z"
                            fill="#6D5D4C"
                          />
                        </svg>
                        Mail
                      </span>
                      <p className="usr-contact-para">example@email.com</p>
                    </div>
                    <div className="usr-contact-follow">
                      <p className="usr-contact-text-para">Follow us</p>
                      <div className="usr-contact-menu">
                        <ul className="usr-contact-list-menu">
                        <li><a href="#"><img src={instagram} alt='contact-social-icon' /></a></li>
                                        <li><a href="#"><img src={facebook} alt='contact-social-icon' /></a></li>
                                        <li><a href="#"><img src={twitter} alt='contact-social-icon' /></a></li>
                                        <li><a href="#"><img src={linkedin} alt='contact-social-icon' /></a></li>
                                        <li><a href="#"><img src={youtube} alt='contact-social-icon' /></a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                    
                  <div className="usr-contact-form">
                  <p className="usr-contact-text-para">Send a message</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
                      <TextField
                        defaultValue=""
                        {...register("name", { required: true })}
                        variant="outlined"
                        label="Name"
                        fullWidth
                        margin="normal"
                        className="form-contact-control"
                      />
                      {errors.name && (<span style={{color:"red"}}>This field is required</span>)}
                      <TextField
                        {...register("email", { required: true })}
                        label="Email*"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    
                        // className="form-contact-control"
                      />
                      {errors.email && (<span style={{color:"red"}}>This feild is required</span>)}
                      <TextField
                        { ...register("number", { required: true })}
                        label="Phone number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        // className="form-contact-control"
                      />
                      {errors.number && (<span style={{color:"red"}}>This feild is required</span>)}
                      <TextField
                        {...register("message", { required: true })}
                        fullWidth
                        margin="normal"
                        label="Message"
                        // className="form-contact-control"
                        multiline
                        rows={4}
                        variant="outlined"
                      />
                       {errors.message && (
                        <p style={{color:"red"}}>This field is required</p>
                      )} 
                       <div className="mt-3">
                      <button type="submit" className="usr-contact-btn btn">
                        SEND MESSAGE
                      </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
          
        </div>
      </section>


      <section className="usr-contact-clendly bg-white">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="usr-contact-text text-center">
                        <p className="usr-contact-calendly-text-para">SCHEDULE A MEETING</p>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                        <div className="usr-contact-date">
                            <Calendly/>
                        </div>
                        <div className="mt-4">
                        <button type="submit" className="usr-contact-meeting-btn btn">
                        SCHEDULE A MEETING
                      </button></div>
                            
                        </div>
                        <div className="col-md-8">
                        <div className="usr-contact-image">
                                <img src="images/beauty.jpg" className="img-fluid"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
