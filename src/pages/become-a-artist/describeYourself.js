import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ArtistFooter from "./common/artistFooter";
import NoDataFound from "./common/noDataFound";
import { axiosAuth } from "configs/axiosInstance";

const BASE_URL = process.env.REACT_APP_APIURL

const DescribeYourself = () => {
  const [artistPayload, setArtistPayload, ,allProducts] = useOutletContext();
  const navigate = useNavigate();
  const { request_id } = useParams();

  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(()=>{
    if(artistPayload){
      if(artistPayload.products && Array.isArray(artistPayload.products)){
        setSelectedProducts(artistPayload.products);
      }
    }
  },[artistPayload])

  const handleChange = (product) => {
    // Check if the product is already selected
    const isSelected = selectedProducts.includes(product);

    if (isSelected) {
      // If selected, remove it from the list
      setSelectedProducts((prevSelected) =>
        prevSelected.filter((item) => item !== product)
      );
    } else {
      // If not selected, add it to the list
      setSelectedProducts((prevSelected) => [...prevSelected, product]);
    }
  };

  
  const handleNextClick = async () =>{
    try{

      let payload = {currentStep:4,products:selectedProducts}

      if(artistPayload.currentStep > 3){
          delete payload.currentStep;
      }

        if(artistPayload.products && Array.isArray(artistPayload.products)){
          const areEqual = selectedProducts.every((element, index) => element === artistPayload.products[index]);

          if(areEqual){
            return navigate(`/become-a-artist/${request_id}/location`)
          }
          else{
            await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`,payload);
            setArtistPayload((prev) => {return {...prev,...payload}})
            navigate(`/become-a-artist/${request_id}/location`)
          }

        }else{
          await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`,payload);
          setArtistPayload((prev) => {return {...prev,...payload}})
          navigate(`/become-a-artist/${request_id}/location`)
        }
    }
    catch(error){
        throw error;
    }
}



  return (
    <>
      <section className="describe-yourself">
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-12">
              <div className="">
                <h1 className="text-center">Which brands you used?</h1>
              </div>
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-md-10 mx-auto">
              <div className="row">
              {(allProducts && Array.isArray(allProducts)) ?
                <>
                {
                  allProducts.length > 0 ?
                  <>
                  {allProducts.map((product, index) => (
                    <div key={index} className="col-md-6">
                    <div
                      className={`artist-card ${
                        selectedProducts.includes(product._id)
                          ? "selected"
                          : ""
                      }`}
                      onClick={(e) => handleChange(product._id)}
                    >
                      <div className="card-body">
                        <h5 className="_6pu6cc">{product.title}</h5>
                        <div>
                          <span>{product.description}</span>
                        </div>
                      </div>
                      <div className= "card-icon ">
                        <img 
                          src={product.icon.thumbnailUrl}
                          alt={product.title}
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                  ))}
                  </> : 
                  <NoDataFound/>
                }
                </> : <NoDataFound/>}

              </div>
            </div>
          </div>
        </div>
      </section>

      <ArtistFooter
        backClick={() => navigate(`/become-a-artist/${request_id}/about-you`)}
        nextClick={() => handleNextClick()}
      />
    </>
  );
};

export default DescribeYourself;
