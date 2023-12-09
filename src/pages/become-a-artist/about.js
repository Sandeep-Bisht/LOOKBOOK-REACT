import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import ArtistFooter from "./artistFooter";
import { AiOutlineHome } from "react-icons/ai";

const AboutYou = () => {
  const [configuration, setConfiguration] = useOutletContext();

  const navigate = useNavigate();
  console.log(configuration, "about page config");

  const [artistArray] = useState([]);

  const handleChange = (proffesion) => {
    console.log("value", proffesion);
    const index = artistArray.indexOf(proffesion);
    if (index !== -1) {
      // Element found, remove it using splice
      artistArray.splice(index, 1);
    } else {
      artistArray.push(proffesion);
    }

    console.log(artistArray, "check array");
  };

  return (
    <>
      <section className="about">
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-12">
              <h1 className="text-center">Which of the best describe you ?</h1>
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-md-7 mx-auto">
              <div className="row">
                <div className="col-md-4">
                  <div
                    className="artist-card"
                    onClick={(e) => handleChange("Hair")}
                  >
                    <div className="">
                      <AiOutlineHome />
                    </div>
                    <div>
                      <span>Hair</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="artist-card"
                    onClick={(e) => handleChange("MakeUp")}
                  >
                    <div>
                      <AiOutlineHome />
                    </div>
                    <div>
                      <span>Make-up</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="artist-card"
                    onClick={(e) => handleChange("Dressing")}
                  >
                    <div>
                      <AiOutlineHome />
                    </div>
                    <div>
                      <span>Dressing</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="artist-card"
                    onClick={(e) => handleChange("Tattos")}
                  >
                    <div>
                      <AiOutlineHome />
                    </div>
                    <div>
                      <span>Tattos</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="artist-card"
                    onClick={(e) => handleChange("Message")}
                  >
                    <div>
                      <AiOutlineHome />
                    </div>
                    <div>
                      <span>Message</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="artist-card"
                    onClick={(e) => handleChange("Cabin")}
                  >
                    <div>
                      <AiOutlineHome />
                    </div>
                    <div>
                      <span>Cabin</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="artist-card"
                    onClick={(e) => handleChange("Potraits")}
                  >
                    <div>
                      <AiOutlineHome />
                    </div>
                    <div>
                      <span>Potraits</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="artist-card"
                    onClick={(e) => handleChange("NailArt")}
                  >
                    <div>
                      <AiOutlineHome />
                    </div>
                    <div>
                      <span>Nail art</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="artist-card"
                    onClick={(e) => handleChange("Grooming")}
                  >
                    <div>
                      <AiOutlineHome />
                    </div>
                    <div>
                      <span>Grooming</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ArtistFooter
        backClick={() => navigate("/become-a-artist/about-your-skills")}
        nextClick={() => navigate("/become-a-artist/describe-yourself")}
      />
    </>
  );
};

export default AboutYou;