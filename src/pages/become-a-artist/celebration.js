import React from 'react'
import celebrate from '@core/assets/images/skill-pic.png'
import CommonButton from './common/commonButton'
import { useNavigate } from 'react-router-dom'

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
                        <p>From one Host to another – welcome aboard. <br/>
                        Thank you for sharing your interest and helping to create incredible experiences for our users.</p>
                        <svg
                        width
                        height={38}
                        viewBox="0 0 297 38"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            d="M22.35 37H0.0500247V1.6H8.65002V29.55H22.35V37ZM61.7547 19.15C61.7547 30.35 53.5547 37.95 42.4547 37.95C31.4047 37.95 23.2047 30.35 23.2047 19.15C23.2047 7.8 31.4047 0.649997 42.4547 0.649997C53.5547 0.649997 61.7547 7.8 61.7547 19.15ZM52.6047 19.15C52.6047 12.95 48.4547 8.35 42.4547 8.35C36.4547 8.35 32.3547 12.95 32.3547 19.15C32.3547 25.55 36.5047 30.15 42.4547 30.15C48.4047 30.15 52.6047 25.55 52.6047 19.15ZM104.284 19.15C104.284 30.35 96.084 37.95 84.984 37.95C73.934 37.95 65.734 30.35 65.734 19.15C65.734 7.8 73.934 0.649997 84.984 0.649997C96.084 0.649997 104.284 7.8 104.284 19.15ZM95.134 19.15C95.134 12.95 90.984 8.35 84.984 8.35C78.984 8.35 74.884 12.95 74.884 19.15C74.884 25.55 79.034 30.15 84.984 30.15C90.934 30.15 95.134 25.55 95.134 19.15ZM142.713 37H131.563L118.413 20.7H118.313V37H109.913V1.6H118.313V16H118.463L131.113 1.6H141.813L126.563 17.9L142.713 37ZM173.06 26.7C173.06 34.4 166.31 37 159.56 37H145.46V1.6H159.56C165.06 1.6 171.61 3.55 171.61 10.7C171.61 14.6 169.26 17.2 165.81 18.35V18.45C169.86 19.15 173.06 22.05 173.06 26.7ZM163.36 11.85C163.36 9.45 161.51 8.4 157.91 8.4H153.71V15.7H158.31C161.51 15.7 163.36 14.35 163.36 11.85ZM164.51 25.9C164.51 22.95 162.11 22 158.46 22H153.71V30.1H158.51C161.21 30.1 164.51 29.35 164.51 25.9ZM215.612 19.15C215.612 30.35 207.412 37.95 196.312 37.95C185.262 37.95 177.062 30.35 177.062 19.15C177.062 7.8 185.262 0.649997 196.312 0.649997C207.412 0.649997 215.612 7.8 215.612 19.15ZM206.462 19.15C206.462 12.95 202.312 8.35 196.312 8.35C190.312 8.35 186.212 12.95 186.212 19.15C186.212 25.55 190.362 30.15 196.312 30.15C202.262 30.15 206.462 25.55 206.462 19.15ZM258.141 19.15C258.141 30.35 249.941 37.95 238.841 37.95C227.791 37.95 219.591 30.35 219.591 19.15C219.591 7.8 227.791 0.649997 238.841 0.649997C249.941 0.649997 258.141 7.8 258.141 19.15ZM248.991 19.15C248.991 12.95 244.841 8.35 238.841 8.35C232.841 8.35 228.741 12.95 228.741 19.15C228.741 25.55 232.891 30.15 238.841 30.15C244.791 30.15 248.991 25.55 248.991 19.15ZM296.571 37H285.421L272.271 20.7H272.171V37H263.771V1.6H272.171V16H272.321L284.971 1.6H295.671L280.421 17.9L296.571 37Z"
                            fill="white"
                        />
                        </svg>
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