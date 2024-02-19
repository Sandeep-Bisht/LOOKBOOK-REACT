import { axiosAuth } from "configs/axiosInstance";
import { formatIndianRupee } from "configs/formatIndianRupee";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const SetupPrice = () => {
  const artist = useLoaderData();
  const [artistData,setArtistData] = useState(artist)
  const {register,handleSubmit, reset} = useForm();
  
  const submitForm = async(data) =>{

    const formData = new FormData();

    Object.keys(data).forEach((item) => {
      if (item === 'icon') {
        formData.append(item, data.icon[0]);
      }
      else {
        formData.append(item, data[item]);
      }
    });
    
    try {
      const response = await axiosAuth.post("/artists/add-service", formData);
      if(response.statusText=="OK")
      {
        setArtistData(response.data);
      }
    } catch (error) {
      console.log(
        error.message ||
        "An error occured while trying to create service."
      );
    }
  }
  return(
    <section className="artist-set-price-wrapper">
      <div className="container">
        <div className="row justify-content-center">
          {artistData?.services && Array.isArray(artistData?.services) && artistData?.services.length > 0 && 
          <div className="col-8">
          <Table>
                <Thead>
                  <Tr>
                    <Th>Service</Th>
                    <Th>Session Time</Th>
                    <Th>Price</Th>
                    <Th>Platform Fee</Th>
                    <Th>GST</Th>
                    <Th>TOtal Price</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {artistData?.services.map((item, index) => (
                    <Tr key={index}>
                      <Td className="text-capitalize">
                          {item.title}
                      </Td>
                      <Td className="text-capitalize">
                          {item.pricing?.sessionTime} Hrs
                      </Td>
                      <Td className="text-capitalize">
                          {formatIndianRupee(item.pricing?.amount)}
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
                        update, remove
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
          </div>
          }
          <div className="col-4">
            <form onSubmit={handleSubmit(submitForm)}>
              <label htmlFor="title">Title</label>
              <input type="text" name="title" id="title" className="form-control" {...register("title", {required:"Title is required."})}/>
              <label htmlFor="icon">Icon</label>
              <input type="file" name="icon" id="icon" className="form-control" {...register("icon", {required:"Icon is required."})} />
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
};

export default SetupPrice;
