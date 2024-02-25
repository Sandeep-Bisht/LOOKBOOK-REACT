import React from 'react'
import { useNavigate } from 'react-router-dom'

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
                                <p className='text-center congratulation-para'>Thank You for showing your interest in LOOKBOOK. <br />
                                    We are excited to welcome you on board.  Let's create incredible beauty experiences together!</p>
                                <div className='text-center'><button className='btn congratulation-button' onClick={() => navigate('/become-a-artist')} type="button">Get Started</button>

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