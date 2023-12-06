import React from 'react';
import WizardForm from "../../WizardForm";

const Profile = () => {

    const handleSubmit = (data) => {
        // Handle the form submission here
        console.log('Form submitted with data:', data);
      };

      
  return (
    <div className="App">
      <h1 className='text-center'>Lookbook</h1>
      <WizardForm onSubmit={handleSubmit} />
    </div>
  )
}

export default Profile