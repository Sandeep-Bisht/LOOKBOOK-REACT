import React from 'react'
import '@css/user/about.css'

const AboutUS = () => {
  return (
    <>
      <section>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='usr-about-main'>
                    <div className='usr-about-part'>
                        <h1 className='usr-about-heading'>Welcome to Lookbook!</h1>
                        <p className='usr-about-para'>Where beauty meets talent.</p>
                        <p className='usr-common-para ps-4 pe-4'>We're passionate about connecting makeup artists with clients to create unforgettable beauty experiences. 
                          We believe that beauty is a form of art, and every individual deserves to feel confident and empowered. Our platform serves as the bridge between skilled makeup artists and clients seeking professional beauty services. Whether you're a makeup enthusiast or a seasoned artist, we're here to make beauty accessible and enjoyable for everyone.

                       </p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

       <section>
        <div className='container bg-white'>
            <div className='row'>
                <div className='col-md-4'>
                   <div className='usr-about-content'>
                    <img src='images/Snapinsta 2.jpg' className='img-fluid'/>
                    <p className='usr-about-main-para'>Meet the Team</p>
                    <p className='usr-common-para'>Meet the faces behind Lookbook. Our team brings together a diverse blend of talents, from seasoned professionals in the beauty industry to 
                    tech enthusiasts dedicated to creating a cutting-edge platform.</p>
                    </div> 
                </div>
                <div className='col-md-4'>
                    <div className='usr-about-us-text'>
                    <div className='usr-about-para-text'>
                        <p className='usr-about-main-para'>Our story </p>
                        <p className='usr-common-para'>Founded in 2024, Lookbook was born out of a desire 
                        to simplify the process of finding and booking talented makeup artists.
                         Exasperated by the lack of a centralised platform, our founder 
                         envisioned a space where artists could showcase their skills, 
                         and clients could discover the perfect match for their beauty needs</p>
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
        <div className='container'>
            <div className='row'>
            <p className='usr-about-main-para text-center'>Why Choose Us</p>
                <div className='col-md-4 mx-auto'>
                
                    <div className='usr-about-image-section'>
                       
                        <img src='images/image (3).jpg' className='img-fluid'/>
                    </div>
                    
                </div>
                <div className='col-md-12 mb-5'>
                    <div className='text-center mt-3'>
                    <div className='usr-about-text-para'>
                        <p className='usr-common-para ps-4 pe-4'>Choosing Lookbook means gaining access to a curated selection of 
                        top-tier makeup artists, hassle-free booking, and a platform designed with your 
                        convenience in mind. We prioritise quality, reliability, and personalization in every 
                        beauty experience</p></div></div>
            </div>
            </div>
        </div>
       </section>
    </>
  )
}

export default AboutUS
