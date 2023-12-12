import React, { useState } from 'react';

const Certificates = () => {
  const [selectedCertificates, setSelectedCertificates] = useState([]);

  const handleCertificateChange = (event) => {
    const files = event.target.files;
    // Convert FileList to an array
    const newCertificates = Array.from(files);
    // Update the state with the new array of certificates
    setSelectedCertificates([...selectedCertificates, ...newCertificates]);
  };

  const handleRemoveCertificate = (index) => {
    const updatedCertificates = [...selectedCertificates];
    updatedCertificates.splice(index, 1);
    setSelectedCertificates(updatedCertificates);
  };

  return (
    <section className="about">
      <div className="container">
        <div className="row mb-3">
          <div className="col-md-12">
            <h1 className="text-center">Upload your certificates</h1>
          </div>
        </div>
      </div>

      <div className="certificate-upload-container">
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={handleCertificateChange}
          multiple // Enable multiple file selection
        />

        {selectedCertificates.length > 0 && (
          <div className="certificate-preview">
            {selectedCertificates.map((certificate, index) => (
              <div key={index} className="certificate-item">
                <img
                  src={URL.createObjectURL(certificate)}
                  alt={`Certificate ${index + 1}`}
                  className="certificate-image img-fluid"
                />
                <button onClick={() => handleRemoveCertificate(index)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Certificates;
