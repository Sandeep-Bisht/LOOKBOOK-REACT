import React from 'react'
import celebrate from '@core/assets/5.jpg'
import CommonButton from './common/commonButton'
import { useNavigate } from 'react-router-dom'
import Logo from '@core/assets/images/main-logo.png'

const Celebration = () => {
    const navigate = useNavigate()
  return (
    <>
   


<section className='congratulation-page-wrapper'>
        <div className='container'>
            <div className='row '>
        <div className='congratulation-hero'>        
        <div className='congratulation-main'> 
                    <h1 className='congratulation-heading'>congratulations !</h1>
                    <p className='congratulation-para'>Welcome to LOOKBOOK</p>
                    <p className='text-center congratulation-para'>From one Host to another – welcome aboard. <br/> 
                    Thank you for sharing your interest and helping to create <br/>incredible experiences for our users.</p>
                        <div className='text-center'><button className='btn congratulation-button' onClick={()=>navigate('/become-a-artist')} type="button">Get Started</button>
                        
                </div>  
                    
                </div> 
                
                </div> 
                </div>
        </div>
      </section>
      </>
  )
}

export default Celebration