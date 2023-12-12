import React from "react";
import ArtistFooter from "./artistFooter";
import { useNavigate } from "react-router-dom";
import SkillIMG from '@core/assets/images/skill-pic.png'

const AboutSkills = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="about-skills-ar">
        <div className="container">
          <div className="row align-items-center" >
              <div className="col-lg-6">
              <h2 className="artist-inner-subheading mb-lg-3">
                               Step 1
                            </h2>
              <h1 className="artist-inner-heading mb-lg-4">
                                 Tell us about your skills
                            </h1>
                    <p className="">

                    Show wherein form yielding whala gathered wherein moved. Behold may yod winged created that Won't theya are not second god give best
                    Show wherein form yielding whala gathered wherein moved.
                    </p>
                            
              </div>
              <div className="col-lg-6 text-center">
                 <img src={SkillIMG} className="img-fluid"/>
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
