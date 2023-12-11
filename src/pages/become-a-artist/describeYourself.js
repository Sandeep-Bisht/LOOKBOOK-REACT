import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import ArtistFooter from "./artistFooter";
import { AiOutlineHome } from "react-icons/ai";

const DescribeYourself = () => {
  const navigate = useNavigate();
  const allProducts = useLoaderData();

  const [selectedProducts, setSelectedProducts] = useState([]);

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

  console.log("this is my selected product data ", selectedProducts)

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
            <div className="col-md-12">
              <div className="row">
                {allProducts &&
                  allProducts.length > 0 &&
                  allProducts.map((product, index) => (
                    <div key={index} className="col-md-7 mx-auto">
                      <div
                        className={`artist-card ${
                          selectedProducts.includes(product.title)
                            ? "selected"
                            : ""
                        }`}
                        onClick={(e) => handleChange(product.title)}
                      >
                        <div className="card-body">
                          <h5 className="_6pu6cc">{product.title}</h5>
                          <div>
                            <span>{product.description}</span>
                          </div>
                        </div>
                        <div className="card-icon">
                          <img
                            src={product.icon.thumbnailUrl}
                            alt={product.title}
                            className="img-fluid"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ArtistFooter
        backClick={() => navigate("/become-a-artist/about-you")}
        nextClick={() => {
          // Access the selected products in the next step
          console.log("Selected Products:", selectedProducts);
          navigate("/become-a-artist/location");
        }}
      />
    </>
  );
};

export default DescribeYourself;
