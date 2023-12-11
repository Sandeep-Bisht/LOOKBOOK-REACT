import React from "react";
import ArtistFooter from "./artistFooter";
import { useNavigate } from "react-router-dom";

const AboutSkills = () => {
  const navigate = useNavigate();
  return (
    <>
      <section>
        <div className="container">
          <div className="row" style={{ height: "75vh" }}>
            <div className="col-md-12">
              <div>
                <h1 className="text-center">Step 1 will be here</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ArtistFooter
        backClick={() => navigate("/become-a-artist")}
        nextClick={() => navigate("/become-a-artist/about-you")}
      />
    </>
  );
};

export default AboutSkills;
