import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArtistFooter from "./artistFooter";
import { IoMdImages } from "react-icons/io";
import { FaTrash } from "react-icons/fa6";

const ArtistGallery = () => {
  const navigate = useNavigate();
  const { request_id } = useParams();
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (event) => {
    const files = event.target.files;
    // Convert FileList to an array
    const newImages = Array.from(files);
    // Update the state with the new array of images
    setSelectedImages([...selectedImages, ...newImages]);
  };

  const removeImage = (index) => {
    // Create a copy of the selectedImages array
    const updatedImages = [...selectedImages];
    // Remove the image at the specified index
    updatedImages.splice(index, 1);
    // Update the state with the modified array
    setSelectedImages(updatedImages);
  };

  console.log("this is selected image", selectedImages)

  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="">
                <h1 className="text-center">
                  Share some insights of your work
                </h1>
              </div>
            </div>
          </div>
          <div className="row mb-5 mt-5">
            <div className="col-md-12">
              <div className="row mb-3">
                <div className="col-md-8 cover-image mx-auto">
                  <div>
                    <label className="upload-image" htmlFor="imageInput">
                      <h1 className="text-center">
                      <IoMdImages />
                      </h1>
                    <input
                      type="file"
                      id="imageInput"
                      hidden
                      onChange={handleImageChange}
                      multiple // Enable multiple file selection
                    />
                    <h4>Drag your photos here</h4>
                    <p className="text-center mt-3"><b><u>Upload from your device</u></b></p>
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8 mx-auto">
                  <div className="row">
                    {/* Display selected images with remove option */}
                    {selectedImages.length > 0 &&
                      selectedImages.map((image, index) => (
                        <div
                          className="col-md-6 multiple-images"
                          key={index}
                        >
                          <div className="multipale-image-display">
                            <div className="dynamic-img-wrapper">
                            <img src={URL.createObjectURL(image)} className="img-fluid" alt={`Selected Image ${index + 1}`} />
                            <button
                              type="button"
                              className="btn dropshadow-gallery"
                              onClick={() => removeImage(index)}
                            >
                              <FaTrash/>
                            </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ArtistFooter
        backClick={() => navigate(`/become-a-artist/${request_id}/stand-out`)}
        nextClick={() => navigate(`/become-a-artist/${request_id}/you-are-best-in`)}
      />
    </>
  );
};

export default ArtistGallery;
