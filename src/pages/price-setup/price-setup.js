import { axiosAuth } from "configs/axiosInstance";
import { formatIndianRupee } from "configs/formatIndianRupee";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { RxTrash } from "react-icons/rx";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "@css/user/cart.css";
import { toast } from "react-toastify";

const SetupPrice = () => {
  const artist = useLoaderData();
  const [artistData, setArtistData] = useState(artist);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const  generateUniqueId = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('en-US', { timeZone: 'UTC' });
    const numericDate = formattedDate.replace(/\D/g, '');
    const randomNumber = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const uniqueId = `${numericDate}${randomNumber}`;

    return uniqueId;
}
  const submitForm = async (data) => {
    setIsSubmitting(true)
    const formData = new FormData();
    const uniqueId = await generateUniqueId();
    data._id = uniqueId;

   

    Object.keys(data).forEach((item) => {
      if (item === "icon") {
        formData.append(item, data.icon[0]);
      } else {
        formData.append(item, data[item]);
      }
    });

    try {
      const response = await axiosAuth.post("/artists/add-service", formData);
      if (response.statusText == "OK") {
        reset();
        setIsSubmitting(false)
        toast.success('Service created successfully');        
        setArtistData(response.data);
      }
    } catch (error) {
      setIsSubmitting(false)
      toast.warn('Error creating in service');
      console.log(
        error.message || "An error occured while trying to create service."
      );
    }
  };

  const deleteArtistService = async(id) => {
    try {
      let response = await axiosAuth.post("/artists/delete-artist-service", {id});
      if(response.statusText == "OK"){
        toast.success('Service deleted successfully');
        setArtistData(response.data);
      }
    } catch (error) {
      toast.warn('Error deleting in service');
      console.log(
        error.message || "An error occured while deleting the service."
      );
    }
 
  }
  return (
    <section className="artist-set-price-wrapper user-cart-section">
      <div className="container">
        <div className="row justify-content-center">
          {artistData?.services &&
            Array.isArray(artistData?.services) &&
            artistData?.services.length > 0 && (
              <div className="col-lg-9">
                <div className="user-cart-table">
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Service</Th>
                        <Th>Session Time</Th>
                        <Th>Price</Th>
                        <Th>Platform Fee</Th>
                        <Th>GST</Th>
                        <Th>Total Price</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {artistData?.services.map((item, index) => (
                        
                        <Tr key={index}>
                          <Td className="text-capitalize">{item.title}</Td>
                          <Td className="text-capitalize">
                            {item.pricing?.sessionTime} Hrs
                          </Td>
                          <Td className="text-capitalize">
                            {formatIndianRupee(item.pricing?.price)}
                          </Td>
                          <Td className="text-capitalize">
                            {formatIndianRupee(item.pricing?.platformFee)}
                          </Td>
                          <Td className="text-capitalize">
                            {formatIndianRupee(item.pricing?.gstAmount)}
                          </Td>
                          <Td className="text-capitalize">
                            {formatIndianRupee(item.pricing?.totalPrice)}
                          </Td>
                          <Td className="text-capitalize">
                            <div className="action-btn-wrapper">
                              <button className="action-btn">
                                <CiEdit />
                              </button>
                              <button className="action-btn" onClick={()=> deleteArtistService(item?._id)}>
                                <RxTrash />
                              </button>
                            </div>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </div>
              </div>
            )}
          <div className="col-lg-3">
            <form
              onSubmit={handleSubmit(submitForm)}
              className="artist-set-price-form"
            >
              <div className="form-group mb-3">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="form-control"
                  {...register("title", { required: "Title is required." })}
                />
                 {errors.title && <p className="text-danger">{errors.title.message}</p>}
              </div>
              <div className="form-group ">
                <label htmlFor="icon">Icon</label>
                <input
                  type="file"
                  name="icon"
                  id="icon"
                  className="form-control"
                  {...register("icon", { required: "Icon is required." })}
                />
                 {errors.icon && <p className="text-danger">{errors.icon.message}</p>}
              </div>
              <div className="form-group mb-3">
                <label htmlFor="title">Price</label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  defaultValue={artist?.pricing?.price}
                  className="form-control"
                  {...register("price", { 
                    required: "Price is required.",
                    min: {
                      value: artist?.pricing?.price,
                      message: `Minimum Price should be ${artist?.pricing?.price}`
                  }
                   })}
                />
                 {errors.price && <p className="text-danger">{errors.price.message}</p>}
              </div>
              <div className="form-group mb-3">
                <label htmlFor="title">Session</label>
                <input
                  type="number"
                  name="sessionTime"
                  defaultValue={artist?.pricing?.sessionTime}
                  id="sessionTime"
                  className="form-control"
                  {...register("sessionTime", { 
                    required: "Session is required.",
                    min: {
                      value: 1,
                      message: "Session must be at least 1hrs."
                  },
                  max: {
                    value: 5,
                    message: "Session cannot exceed 5hrs."
                }
                   })}
                />
                 {errors.sessionTime && <p className="text-danger">{errors.sessionTime.message}</p>}
              </div>
              <button
                type="submit"
                className="btn-success usr-common-action-btn mt-5"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SetupPrice;
