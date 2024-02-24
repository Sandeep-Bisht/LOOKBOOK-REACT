import React from 'react'
import '@css/user/about.css'
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { ImQuotesLeft } from "react-icons/im";
import { ImQuotesRight } from "react-icons/im";

const AboutUS = () => {
  return (
    <>
      <section>
        <div className='container bg-white'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='usr-about-main'>
                    <div className='usr-about-part'>
                        <h1 className='usr-about-heading'>Welcome to Lookbook!</h1>
                        <p className='usr-about-para'>Where beauty meets talent.</p>
                        <p className='usr-common-para  pe-4'>We're passionate about connecting makeup artists with clients to create unforgettable beauty experiences. 
                          We believe that beauty is a form of art, and every individual deserves to feel confident and empowered. Our platform serves as the bridge between skilled makeup artists and clients seeking professional beauty services. Whether you're a makeup enthusiast or a seasoned artist, we're here to make beauty accessible and enjoyable for everyone.
                       </p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

       <section className='usr-our-story'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-4'>
                   <div className='usr-about-content'>
                    <img src='images/Snapinsta.jpg' className='img-fluid'/>
                    </div> 
                </div>
                <div className='col-md-4'>
                    <div className='usr-about-us-text'>
                    <div className='usr-about-para-text'>
                    <p className='usr-about-main-para'>Our story</p>
                    <p className='usr-common-para'>Founded in 2024, Lookbook was born out of a desire 
                        to simplify the process of finding and booking talented makeup artists.
                         Exasperated by the lack of a centralised platform, our founder 
                         envisioned a space where artists could showcase their skills, 
                         and clients could discover the perfect match for their beauty needs.</p>
                         <p className='usr-about-main-para'>Mission </p>
                         <p className='usr-common-para'>At Lookbook, our mission is to 
                         empower makeup artists and beauty enthusiasts by providing a seamless 
                         platform for connecting talent with individuals seeking professional 
                         makeup services. We believe that everyone deserves to look and feel their best</p>
                    </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='usr-about-image'>
                        <img src='images/about-image.jpg' className='img-fluid'/>
                    </div>
                </div>
            </div>
        </div>
       </section>
      
       <section className='pt-5'>
        <div className='container bg-white'>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='usr-about-image-section'>
                        <img src='images/image (3).jpg' className='img-fluid'/>
                    </div>   
                </div>
                <div className='col-md-6 usr-about-value-section'>
                    <div className='usr-about-value-part'>  
                    <p className='usr-about-main-para'>Values</p>
                    <p className='usr-common-para'>We are committed to 
                    fostering a community built on trust, inclusivity, 
                    and creativity. Our values drive every decision we 
                    make, ensuring that both makeup artists and clients 
                    have a positive and empowering experience.</p>
                    <p className='usr-about-main-para'>Why Choose Us</p>
                    <p className='usr-common-para'>Choosing Lookbook means
                     gaining access to a curated selection of top-tier makeup artists, 
                     hassle-free booking, and a platform designed with your convenience 
                     in mind. We prioritise quality, reliability, and personalization
                      in every beauty experience.</p>
                    </div>   
                </div>
            </div>
        </div>
       </section>

       <section className='pt-5'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-8 mx-auto'>
            <p className='usr-about-main-para text-center'>Testimonials</p>
            <p className='usr-common-para text-center'>Discover what makeup artists and 
            clients are saying about their experiences with Lookbook. Our
             community thrives on positive connections, and we're proud to share their stories</p> </div> </div>
             <div className='row usr-testimonials-path'>
             <div className='col-md-4'><div className='testimonial-text'>
             
                <p className='usr-common-para'><sup><ImQuotesLeft /> </sup> Lorem ipsum dolor sit amet consectetur. Id magna amet egestas sit
                     euismod. Facilisis tristique elementum fermentum non sed 
                     interdum auctor malesuada quis. Ut venenatis tellus tellus 
                     pharetra et at. Lobortis.<sup> <ImQuotesRight /></sup></p>
                     <p className='test-demo-text '>Jone Doe <span className='testimonial-taxt-demo ps-2'>Customer</span></p>
                    
                     </div></div>
             <div className='col-md-4'>
             <div className='testimonial-text'>
             
                <p className='usr-common-para'><sup><ImQuotesLeft /> </sup>Lorem ipsum dolor sit amet consectetur. Id magna amet egestas sit
                     euismod. Facilisis tristique elementum fermentum non sed 
                     interdum auctor malesuada quis. Ut venenatis tellus tellus 
                     pharetra et at. Lobortis.<sup> <ImQuotesRight /></sup></p>
                     <p className='test-demo-text '>Jone Doe <span className='testimonial-taxt-demo ps-2' >Makeup Artist</span></p>
                    </div>
             </div>
             <div className='col-md-4'>
             <div className='testimonial-text'>
             
                <p className='usr-common-para'><sup><ImQuotesLeft /> </sup>Lorem ipsum dolor sit amet consectetur. Id magna amet egestas sit
                     euismod. Facilisis tristique elementum fermentum non sed 
                     interdum auctor malesuada quis. Ut venenatis tellus tellus 
                     pharetra et at. Lobortis.<sup> <ImQuotesRight /></sup></p>
                     <p className='test-demo-text '>Jone Doe <span className='testimonial-taxt-demo ps-2'>Customer</span></p>
                    </div>
             </div>


            </div>
            <div className='row'>
                <div className='col-12 text-center'>
                <button type='button' className='usr-testimonials-btn-left me-3'><span className='left-part'><MdKeyboardArrowLeft /></span></button>
                <button type='button' className='usr-testimonials-btn-right ms-3'><span className='right-part'><MdKeyboardArrowRight /></span></button>
                </div>
           </div>
        </div>
       </section>

       <section className='py-5'>
        <div className='container bg-white'>
            <div className='row'>
                <div className='col-md-8'>
                    <div className='usr-beauty-journey-text'>
                <p className='usr-about-main-para'>Join Us on the Beauty Journey</p>
                    <p className='usr-common-para'>Whether you're a makeup artist ready
                     to showcase your skills or a client looking for the perfect beauty 
                     experience, we invite you to join us on this exciting beauty journey.
                     At Lookbook, beauty knows no bounds, and every face tells a unique story.
                     <br/>
                     Ready to elevate your beauty experience? Join Lookbook today!
                     <br/> Makeup 
                     artists, showcase your talent to a broader audience. Clients, discover
                      the perfect artist for your next beauty transformation.
                      <br/>
                       Let's create beauty together!</p>
                </div></div>
                <div className='col-md-4'>
                    <div className='usr-beauty-journey-text-right'>
                <p className='usr-about-main-para'>Contact Info</p>
                    <p className='usr-common-para'>Have questions or want to learn more? Reach out to
                     us at info@mylookbook.in or follow us on Instagram. 
                     <br/>
                     We're here to make
                      your beauty journey exceptional.</p>
                </div></div>      
            </div>
        </div>
       </section>

       <section>
        <div className='container'>
            <div className='row'>
            <div className='col-md-12 mb-5'>
                    <div className='text-center mt-3'>
                    <div className='usr-about-text-para'>
                        <p className='usr-common-para-last ps-4 pe-4'>Ready to discover the 
                        perfect makeup artist or showcase your talent? 
                        </p>
                        <p className='usr-common-para-last ps-4 pe-4'>Let's embark on this beauty adventure together!</p></div></div>
            </div>
            </div>
        </div>
       </section>
    </>
  )
}

export default AboutUS
