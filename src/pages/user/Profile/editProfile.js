import React from 'react'
import "@css/user/profile.css"
import profileImg from "@core/assets/5.jpg"

const EditProfile = () => {
    return (
        <div>
            <section className='usr-new-profile'>
                <div className='container view-details'>
                    <div className='row'>
                        <div className='col-md-12 usr-new-profile-name'>
                            <h1>Edit your details</h1>
                        </div>
                    </div>
                    <div className='row usr-new-profile-edit'>
                        <div className='col-md-5 mb-3'>
                            <div className='usr-new-profile-photo'>
                                <img src={profileImg} className='img-fluid' />
                                <div className='edit_image_button'>
                                    <button><svg xmlns="http://www.w3.org/2000/svg" width="20" height="23" viewBox="0 0 20 23" fill="none">
                                        <path d="M2.5 14.5501V17.0835C2.5 17.3168 2.68333 17.5001 2.91667 17.5001H5.45C5.55833 17.5001 5.66667 17.4585 5.74167 17.3751L14.8417 8.28346L11.7167 5.15846L2.625 14.2501C2.54167 14.3335 2.5 14.4335 2.5 14.5501ZM17.2583 5.8668C17.5833 5.5418 17.5833 5.0168 17.2583 4.6918L15.3083 2.7418C14.9833 2.4168 14.4583 2.4168 14.1333 2.7418L12.6083 4.2668L15.7333 7.3918L17.2583 5.8668Z" fill="#6D5D4C" />
                                    </svg>Update Profile Picture</button>
                                </div>
                                <div className='user-new-profile-update-details'>
                                    <h6>John Doe</h6>
                                    <p>example@gmail.com</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-7 mb-3'>
                            <div className='user-update-form'>
                                <form>
                                    <input className='form-control mb-4' type='text' name='name' placeholder='Enter your Name' />
                                    <input className='form-control mb-4' type='email' name='email' placeholder='Enter your Email' />
                                    <select class="form-select mb-4" aria-label="Default select example">
                                        <option value="male" selected>Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <input className='form-control mb-4' type='number' name='number' placeholder='Enter your Mobile Number' />
                                    <input className='form-control mb-4' type='date' name='date' placeholder='Enter your Date of Birth' />
                                    <button className='user-update-form-button'>Update Changes</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default EditProfile
