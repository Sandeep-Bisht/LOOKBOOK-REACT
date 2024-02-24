import React from 'react'
import celebrate from '@core/assets/5.jpg'
import CommonButton from './common/commonButton'
import { useNavigate } from 'react-router-dom'
import Logo from '@core/assets/images/main-logo.png'

const Celebration = () => {
    const navigate = useNavigate()
  return (
    <div className='celebration-page-wrapper'>
        <div className='container-fluid h-100'>
            <div className='row h-100 g-3'>
                <div className='col-6 h-100'>
                    <img src={celebrate} alt="publish celebration" className='h-100 w-100'/>
                </div>
                <div className='col-6 h-100 d-flex align-items-center'>
                    <div className='px-5'>
                        <h1>Congratulations!</h1>
                        <p>Thank You for showing your interest in LOOKBOOK. 
                        We are excited to welcome you on board.  Let's create incredible beauty experiences together!
                        </p>
                        <img src={Logo} alt="publish celebration" width={180}/>
                        <div className='mt-4'>
                        <CommonButton label="Get started" onClick={()=>navigate('/become-a-artist')}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Celebration