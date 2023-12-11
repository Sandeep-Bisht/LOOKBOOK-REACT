import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArtistFooter from "./artistFooter";

const InsightStory = () => {
  let navigate = useNavigate();
  const [experience, setExperience] = useState(1);

  const decreaseExperience = () => {
    if (experience > 0) {
      setExperience(experience - 1);
    }
  };

  const increaseExperience = () => {
    setExperience(experience + 1);
  };

  return (
    <>
      <section className="insight-wrapper">
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

          <div className="col-md-12 mt-4 mb-5">
            <div className="row">
              <div className="col-md-8 mx-auto">
                <div className="insight-card mb-4">
                  <div>Year of experience ?</div>
                  <div className="d-flex">
                    <span
                      className="plus-button me-3"
                      onClick={decreaseExperience}
                    >
                      -
                    </span>
                    {experience}
                    <span
                      className="plus-button ms-3"
                      onClick={increaseExperience}
                    >
                      +
                    </span>
                  </div>
                </div>
                <hr className="" />
                <div className="insight-card mb-4">
                  <div>Level of education ?</div>
                  <div>2</div>
                </div>
                <hr className="" />
                <div className="insight-card mb-4">
                  <div>How many languages do you speak?</div>
                  <div>2</div>
                </div>
                <hr className="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ArtistFooter
        backClick={() => navigate("/become-a-artist/location")}
        nextClick={() => navigate("/become-a-artist/stand-out")}
      />
    </>
  );
};

export default InsightStory;
