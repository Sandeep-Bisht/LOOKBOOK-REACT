import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ArtistFooter from "./common/artistFooter";
import NoDataFound from "./common/noDataFound";
import { axiosAuth } from "configs/axiosInstance";

const BASE_URL = process.env.REACT_APP_APIURL;

const DescribeYourself = () => {
  const [artistPayload, setArtistPayload, , allProducts] = useOutletContext();
  const navigate = useNavigate();
  const { request_id } = useParams();

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [attemptedNextWithoutSelection, setAttemptedNextWithoutSelection] = useState(false);

  useEffect(() => {
    if (artistPayload) {
      if (artistPayload.products && Array.isArray(artistPayload.products)) {
        setSelectedProducts(artistPayload.products);
      }
    }
  }, [artistPayload]);

  const handleChange = (product) => {
    // Check if the product is already selected
    const isSelected = selectedProducts.includes(product);
    setAttemptedNextWithoutSelection(false);

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

  const handleNextClick = async () => {
    if(selectedProducts.length > 0){
    try {
      let payload = { currentStep: 4, products: selectedProducts };

      if (artistPayload.currentStep > 3) {
        delete payload.currentStep;
      }

      if (artistPayload.products && Array.isArray(artistPayload.products)) {
        const areEqual = selectedProducts.every(
          (element, index) => element === artistPayload.products[index]
        );

        if (areEqual) {
          return navigate(`/become-a-artist/${request_id}/location`);
        } else {
          await axiosAuth.post(
            `${BASE_URL}/users/updateArtistRequest`,
            payload
          );
          setArtistPayload((prev) => {
            return { ...prev, ...payload };
          });
          navigate(`/become-a-artist/${request_id}/location`);
        }
      } else {
        await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`, payload);
        setArtistPayload((prev) => {
          return { ...prev, ...payload };
        });
        navigate(`/become-a-artist/${request_id}/location`);
      }
    } catch (error) {
      throw error;
    }
    }else{
      setAttemptedNextWithoutSelection(true);
    }
  };

  return (
    <>
      <section className="describe-yourself">
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-12 describe-yourself-heading">
                <h4 className="text-center">Which brands you used?</h4>
            </div>
          </div>

          <div className="row my-5">
            <div className="col-md-10 mx-auto">
              <div className="row describe-yourself-allProducts">
                {allProducts && Array.isArray(allProducts) && allProducts.length > 0? (
                  <>
                        { allProducts.map((product, index) => (
                          <div key={index} className={`col-md-3 ${attemptedNextWithoutSelection ? 'border-highlight' : ''}`}>
                            <div
                              className={`artist-card w-100 px-5 py-4 ${
                                selectedProducts.includes(product._id)
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={(e) => handleChange(product._id)}
                            >
                              <div className="">
                                <img
                                  src={product.icon.url}
                                  alt={product.title}
                                  className="img-fluid"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <NoDataFound />
                    )}
              </div>
            </div>
          </div>
        </div>
        <div className="horizontal-bar"></div>
      </section>

      <ArtistFooter
        backClick={() => navigate(`/become-a-artist/${request_id}/about-you`)}
        nextClick={() => handleNextClick()}
      />
    </>
  );
};

export default DescribeYourself;
