import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDrag, useDrop } from "react-dnd";
import { IoAdd } from "react-icons/io5";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { axiosAuth } from "configs/axiosInstance";
import { BsThreeDots } from "react-icons/bs";

const BASE_URL = process.env.REACT_APP_APIURL;

const acceptedImages = {
  "image/*": [".jpeg", ".png", ".jpg", ".webp"],
};

function DropzoneWithoutClick({ children, onUpload, handleUpload, disabled }) {
  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    noClick: true,
    onDrop: (files) => {
      onUpload(files);
      handleUpload(files);
    },
    disabled,
    accept: acceptedImages,
  });

  return (
    <div {...getRootProps({ className: "dropzone col-12" })}>
      <input {...getInputProps()} />
      <div className={isDragAccept ? "dragged row g-3" : "row g-3"}>
        {children}
      </div>
    </div>
  );
}

const ImageCard = ({ src, title, id, index, moveImage }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: "image",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveImage(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "image",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  const opacity = isDragging ? 0.5 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity }} className="card overflow-hidden justify-content-center h-100">
      <img src={src} alt={title} />
    </div>
  );
};

const Gallery = (props) => {
  const [uploading, setUploading] = useState(false);

  const [binaryFiles, setBinaryFiles] = useState([]);
  const [artistPayload, setArtistPayload] = props.context;
  const [images, setImages] = React.useState(
    artistPayload.gallery ? artistPayload.gallery : []
  );
  const [progress, setProgress] = useState(0);

  const handleUpload = async (files) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("gallery", file);
    });

    try {
      setUploading(true);
      const response = await axiosAuth.post(
        `${BASE_URL}/users/updateArtistRequest`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percentCompleted = Math.round((loaded * 100) / total);
            setProgress(percentCompleted);
          },
        }
      );

      setBinaryFiles([]);
      setProgress(0);
      setUploading(false);
      setImages(response?.data?.data?.gallery);
      setArtistPayload(response?.data?.data);
      // Handle response if needed
    } catch (error) {
      // Handle error
      setBinaryFiles([]);
      setProgress(0);
      setUploading(false);
      console.error(error, "file upload error");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    disabled: uploading,
    accept: acceptedImages,
    onDrop: (files) => {
      setBinaryFiles(files);
      handleUpload(files);
    },
  });

  const updateImages = async (gallery) => {
    try {
      const response = await axiosAuth.post(
        `${BASE_URL}/users/updateArtistRequest`,
        { gallery }
      );

      setImages(response?.data?.data?.gallery);
      setArtistPayload(response?.data?.data);
      // Handle response if needed
    } catch (error) {
      // Handle error
      console.error(error, "file drag change error");
    }
  };

  const moveImage = React.useCallback((dragIndex, hoverIndex) => {
    setImages((prevCards) => {
      const clonedCards = [...prevCards];
      const removedItem = clonedCards.splice(dragIndex, 1)[0];

      clonedCards.splice(hoverIndex, 0, removedItem);
      setImages(clonedCards);
      updateImages(clonedCards);
      return clonedCards;
    });
  }, []);

  const removeImage = async (index) => {
    // Create a copy of the array
    const updatedGallery = [...images];

    // Use splice to remove the item at the specified index
    updatedGallery.splice(index, 1);

    // Update the state with the new array
    setImages(updatedGallery);

    try {
      const response = await axiosAuth.post(
        `${BASE_URL}/users/updateArtistRequest`,
        { gallery: updatedGallery }
      );
      setArtistPayload(response?.data?.data);
      setImages(response?.data?.data?.gallery);
      // Handle response if needed
    } catch (error) {
      console.error(error, "file upload error");
    }
  };

  const handleCoverPhoto = async (index) => {
    const newData = images.find((item, ind) => ind == index);
    images.splice(index, 1);
    let oldData = [...images];
    oldData.unshift(newData);
    setImages(oldData);
    try {
      const response = await axiosAuth.post(
        `${BASE_URL}/users/updateArtistRequest`,
        { gallery: oldData }
      );
      setArtistPayload(response?.data?.data);
      setImages(response?.data?.data?.gallery);
    } catch (error) {
      console.error(error, "file upload error");
    }
  };

  const downWoardImage = async (index) => {
    const imageData = images[index];
    const nextImageData = images[index + 1];
    if (!nextImageData) return;

    const newImages = [...images];
    newImages[index] = nextImageData;
    newImages[index + 1] = imageData;

    setImages(newImages);

    try {
      const response = await axiosAuth.post(
        `${BASE_URL}/users/updateArtistRequest`,
        { gallery: newImages }
      );
      setArtistPayload(response?.data?.data);
      setImages(response?.data?.data?.gallery);
    } catch (error) {
      console.error(error, "file upload error");
    }
  };

  const moveUpwardImage = async (index) => {
    if (index <= 0 || index >= images.length) return;

    const imageData = images[index];
    const previousImageData = images[index - 1];

    const newImages = [...images];
    newImages[index] = previousImageData;
    newImages[index - 1] = imageData;

    setImages(newImages);

    try {
      const response = await axiosAuth.post(
        `${BASE_URL}/users/updateArtistRequest`,
        { gallery: newImages }
      );
      setArtistPayload(response?.data?.data);
      setImages(response?.data?.data?.gallery);
    } catch (error) {
      console.error(error, "file upload error");
    }
  };

  return (
    <>
      {images.length > 0 || binaryFiles.length > 0 ? (
        <>
          <DropzoneWithoutClick
            onUpload={setBinaryFiles}
            handleUpload={handleUpload}
            disabled={uploading}
          >
            <>
              {React.Children.toArray(
                images.map((image, index) => (
                  <div className={index === 0 ? "col-12" : "col-6"}>
                    <div className="h-100 custom-kyc-img-wrapper">
                      <ImageCard
                        src={image?.url}
                        title={image?.name}
                        id={image?.fileId}
                        index={index}
                        moveImage={moveImage}
                      />

                        <div class="ar-action-btn-wrapper">
                          <button
                            className="ar-action-dropdown-btn"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <BsThreeDots/>
                          </button>
                          <ul class="dropdown-menu">
                            <li>
                              <span
                                class="dropdown-item "
                                onClick={() => removeImage(index)}
                              >
                                Remove
                              </span>
                            </li>
                            {index > 0 && (
                              <li>
                                <span
                                  class="dropdown-item"
                                  onClick={() => moveUpwardImage(index)}
                                >
                                  Move Up
                                </span>
                              </li>
                            )}
                            {index < images.length - 1 && (
                              <li>
                                <span
                                  class="dropdown-item"
                                  onClick={() => downWoardImage(index)}
                                >
                                  Move Down
                                </span>
                              </li>
                            )}
                            {index > 0 && (
                              <li>
                                <span
                                  class="dropdown-item"
                                  onClick={() => handleCoverPhoto(index)}
                                >
                                  Make Cover Photo
                                </span>
                              </li>
                            )}
                          </ul>
                        </div>
                    </div>
                  </div>
                ))
              )}
              {React.Children.toArray(
                binaryFiles.map((image, index) => (
                  <div
                    className={`${
                      index === 0 && images.length == 0 ? "col-12" : "col-6"
                    }`}
                  >
                    <div className="uploading card overflow-hidden justify-content-center  h-100">
                      <img
                        alt="Binary Image"
                        src={URL.createObjectURL(image)}
                      />
                      <div className="circular-progressbar">
                        <CircularProgressbar
                          value={progress}
                          strokeWidth={10}
                          text={`${progress}%`} 
                          styles={buildStyles({
                            strokeLinecap: "round",
                            trailColor: "#FCF7F2",
                            pathColor: "#8C6A54",
                          })}
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div className="col-6">
                <div
                  {...getRootProps({
                    className: "dropzone custom-index-dropzone h-100",
                  })}
                >
                  <input {...getInputProps()} />
                  <IoAdd className="fs-1 mb-2" />
                  <h6>Add more</h6>
                </div>
              </div>
            </>
          </DropzoneWithoutClick>
        </>
      ) : (
        <div
          {...getRootProps({
            className: `${props.className} dropzone col-12 custom-index-dropzone `,
          })}
        >
          <input {...getInputProps()} />
          <svg xmlns="http://www.w3.org/2000/svg" width="57" height="50" viewBox="0 0 57 50" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M56.0459 22.4465L44.8018 46.554C44.5333 47.1298 44.1541 47.647 43.6858 48.0763C43.2174 48.5055 42.6691 48.8383 42.0721 49.0556C41.4752 49.2729 40.8413 49.3705 40.2066 49.3428C39.5719 49.3151 38.9489 49.1626 38.3731 48.8941L31.7703 45.8149C31.5296 45.7364 31.3197 45.5841 31.1704 45.3795C31.0211 45.1749 30.9401 44.9285 30.9388 44.6753C30.9388 44.3524 31.067 44.0427 31.2954 43.8144C31.5237 43.586 31.8334 43.4578 32.1563 43.4578C32.3553 43.462 32.5501 43.5164 32.7225 43.616L32.7334 43.5953L39.3959 46.7013C39.6837 46.8356 39.9952 46.9119 40.3126 46.9258C40.63 46.9397 40.947 46.8909 41.2455 46.7823C41.544 46.6736 41.8181 46.5072 42.0523 46.2925C42.2865 46.0779 42.476 45.8192 42.6102 45.5312L53.8543 21.4177C54.1252 20.8362 54.1542 20.171 53.9347 19.5682C53.7153 18.9655 53.2655 18.4745 52.6842 18.2033L44.333 14.3072C44.333 14.3072 43.0777 13.8737 43.0777 12.9411C43.0777 12.6182 43.206 12.3085 43.4343 12.0801C43.6627 11.8518 43.9724 11.7235 44.2953 11.7235C44.501 11.7287 44.7019 11.787 44.8785 11.8928L53.7069 16.0093C54.2834 16.2782 54.8011 16.6581 55.2307 17.1271C55.6602 17.5962 55.9931 18.1454 56.2103 18.7432C56.4276 19.341 56.5248 19.9758 56.4966 20.6112C56.4684 21.2467 56.3152 21.8703 56.0459 22.4465ZM34.5914 39.6139H5.3702C4.07854 39.6139 2.83979 39.1008 1.92645 38.1875C1.01311 37.2742 0.5 36.0354 0.5 34.7437V5.52254C0.5 4.23089 1.01311 2.99213 1.92645 2.07879C2.83979 1.16545 4.07854 0.652344 5.3702 0.652344H34.5914C35.8831 0.652344 37.1218 1.16545 38.0352 2.07879C38.9485 2.99213 39.4616 4.23089 39.4616 5.52254V34.7437C39.4616 36.0354 38.9485 37.2742 38.0352 38.1875C37.1218 39.1008 35.8831 39.6139 34.5914 39.6139ZM21.1984 27.4384V26.2209L22.6083 25.6511C23.3145 25.0837 25.0982 23.4023 25.0982 23.4023L25.1469 23.1588C25.5632 21.2306 25.8621 19.2789 26.0418 17.3145C26.0418 13.3697 24.1728 11.6091 19.9796 11.6091C15.7863 11.6091 13.9174 13.3684 13.9174 17.3145C14.0932 19.2794 14.392 21.2313 14.8123 23.1588L14.861 23.4571C15.6363 24.2404 16.4725 24.9611 17.3619 25.6121L18.7633 26.2209V27.4384C18.7535 27.3398 18.7633 29.8735 18.7633 29.8735C18.7633 31.8423 17.4239 32.4109 15.5733 32.4109C11.4336 32.5729 10.792 33.9365 10.6471 34.0948C10.5131 34.2884 10.3707 36.7503 10.2331 37.1788H29.7334C29.5958 36.7515 29.4594 34.3018 29.3109 34.0802C29.2537 34.012 28.7106 32.596 24.4857 32.4134C22.545 32.4134 21.1984 31.8435 21.1984 29.8735C21.1984 29.8735 21.2203 27.2668 21.1984 27.4384ZM37.0265 5.52254C37.0265 4.87672 36.77 4.25734 36.3133 3.80067C35.8566 3.344 35.2372 3.08744 34.5914 3.08744H5.3702C4.72437 3.08744 4.10499 3.344 3.64832 3.80067C3.19165 4.25734 2.9351 4.87672 2.9351 5.52254V34.7437C2.9351 35.3896 3.19165 36.009 3.64832 36.4656C4.10499 36.9223 4.72437 37.1788 5.3702 37.1788H7.56179C7.98672 36.3947 8.21075 33.346 8.64663 32.691C8.64663 32.691 9.40516 30.2096 15.3785 29.977C15.5056 29.9873 15.6334 29.969 15.7525 29.9233C15.8715 29.8776 15.9789 29.8058 16.0665 29.7132C16.1541 29.6205 16.2198 29.5094 16.2588 29.3879C16.2978 29.2665 16.309 29.1379 16.2916 29.0115V28.169C16.2916 28.0472 16.2721 27.9462 16.2661 27.8317C15.7352 27.4092 15.6098 27.2485 14.6832 26.4815C14.6832 26.4815 12.6451 25.1421 12.4174 23.6482C11.9738 21.559 11.6587 19.4447 11.4738 17.317C11.4738 13.1164 13.3488 9.17641 19.9711 9.17641C26.5032 9.17641 28.4683 13.1152 28.4683 17.317C28.28 19.4443 27.9649 21.5584 27.5247 23.6482C27.3348 25.0679 25.2589 26.4815 25.2589 26.4815C24.7439 26.9962 24.184 27.4639 23.586 27.8792C23.586 27.9778 23.5641 28.0679 23.5641 28.169V29.0127C23.5467 29.1391 23.5579 29.2677 23.5969 29.3892C23.6358 29.5106 23.7016 29.6217 23.7892 29.7144C23.8768 29.807 23.9841 29.8789 24.1032 29.9245C24.2223 29.9702 24.3501 29.9886 24.4772 29.9783C30.5406 30.2388 31.2955 32.6922 31.2955 32.6922C31.7302 33.346 31.9554 36.396 32.3815 37.1801H34.5731C35.219 37.1801 35.8383 36.9235 36.295 36.4668C36.7517 36.0102 37.0082 35.3908 37.0082 34.745V5.52254H37.0265Z" fill="#6D5D4C"/>
          </svg>
          <h4>Drag your photos here</h4>
          <p>Choose atleast 3 photos</p>
          <p>
            <b>
              <u>Upload from your device</u>
            </b>
          </p>
        </div>
      )}
    </>
  );
};
export default Gallery;
