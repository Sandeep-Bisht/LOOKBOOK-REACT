import React from 'react'
import {  useOutletContext, useParams } from 'react-router-dom'
import PdfIcon from '@core/assets/images/pdfIcon-removebg.png'


function Certificates() {

    const [artistInformation] = useOutletContext();

    const artistCertificates = artistInformation?.certificates;

  return (
    <section>
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <h3>Artist Certificate</h3>
                </div>
                <div className='row'>
    {artistCertificates && artistCertificates.map((item, index) => (
        <div className='col-6' key={index}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
            <img src={PdfIcon} alt='certificate' className="img-fluid w-100" style={{ maxHeight: "200px", maxWidth:"200px" }} />
            </a>
            <p>{item.name}</p>
        </div>
    ))}
</div>

            </div>
        </div>
    </section>
  )
}

export default Certificates