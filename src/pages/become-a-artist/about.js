import React from 'react'
import { useOutletContext } from 'react-router-dom';

const AboutYou = () => {
    const [configuration, setConfiguration] = useOutletContext();

    console.log(configuration,'about page config')

      
  return (
    <div className="App">
      <h1 className='text-center'>About You</h1>
    </div>
  )
}

export default AboutYou