import { useEffect } from 'react';
import React from 'react'
import { Helmet } from 'react-helmet';
import "@css/Calendly.css"

const Calendly = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script);
        };
      }, []);
  return (
    <div>
        <Helmet>
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
      </Helmet>

      {/* Replace 'YOUR_CALENDLY_LINK' with your actual Calendly link */}
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/sandeepbisht29/30min"
        style={{ minWidth: '300px', height: '450px' , borderRadius:'16px', border:'1px solid #8C6A54'}}
      />
    </div>
  );
};

export default Calendly
