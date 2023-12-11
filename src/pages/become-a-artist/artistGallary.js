import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArtistFooter from "./artistFooter";
import { FaRegImage } from "react-icons/fa6";

const ArtistGallery = () => {
  const navigate = useNavigate();
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
                  <div className="upload-image">
                    <label htmlFor="imageInput" className="text-center f-20">
                      <FaRegImage />
                    </label>
                    <input
                      type="file"
                      id="imageInput"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                      multiple // Enable multiple file selection
                    />
                    <p>Drag your photos here</p>
                    <label htmlFor="imageInput">Upload from your device</label>
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
                            <img src={URL.createObjectURL(image)} className="img-fluid" alt={`Selected Image ${index + 1}`} />
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => removeImage(index)}
                            >
                              Remove
                            </button>
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
        backClick={() => navigate("/become-a-artist/stand-out")}
        nextClick={() => navigate("/become-a-artist/you-are-best-in")}
      />
    </>
  );
};

export default ArtistGallery;
