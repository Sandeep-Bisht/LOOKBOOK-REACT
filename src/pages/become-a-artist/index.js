import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';

const ArtistRegistration = () => {
  const [configuration, setConfiguration] = useOutletContext();

  console.log(configuration,'Lookbook config')
    // const handleSubmit = (data) => {
    //     // Handle the form submission here
    //     console.log('Form submitted with data:', data);
    //     setCount(count + 1)
    //   };

      
  return (
    <div className="App">
      <h1 className='text-center'>Lookbook</h1>
      {/* <p>{configuration}</p> */}
      {/* <button type='button' onClick={()=>handleSubmit()}>Sumit</button> */}
      <Link to="/become-a-artist/about-you">Next</Link>
      {/* <WizardForm onSubmit={handleSubmit} /> */}
    </div>
  )
}

export default ArtistRegistration