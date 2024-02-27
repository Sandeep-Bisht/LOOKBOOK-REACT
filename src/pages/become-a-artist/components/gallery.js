import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDrag, useDrop } from "react-dnd";
import { IoAdd } from "react-icons/io5";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { axiosAuth } from "configs/axiosInstance";
import { MdDeleteForever } from "react-icons/md";

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
    <div ref={ref} style={{ opacity }} className="card h-100">
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

                      <div class="custom-kyc-update-dropshadow-box">
                        <div class="dropstart">
                          <button
                            class="btn btn-secondary dropdown-toggle usr-gallary-dropdown"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            ...
                          </button>
                          <ul class="dropdown-menu">
                            <li>
                              <a
                                class="dropdown-item "
                                href="#"
                                onClick={() => removeImage(index)}
                              >
                                Remove
                              </a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">
                                Move Up
                              </a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">
                                Move Down
                              </a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">
                                Make Cover Photo
                              </a>
                            </li>
                          </ul>
                        </div>
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
                    <div className="uploading card  h-100">
                      <img
                        alt="Binary Image"
                        src={URL.createObjectURL(image)}
                      />
                      <div className="circular-progressbar">
                        <CircularProgressbar
                          value={progress}
                          strokeWidth={50}
                          styles={buildStyles({
                            strokeLinecap: "butt",
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
                    className: "dropzone custom-index-dropzone",
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
