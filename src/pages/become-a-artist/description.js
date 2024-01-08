import React, { useRef } from "react";
import ArtistFooter from "./common/artistFooter";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { axiosAuth } from "configs/axiosInstance";

const BASE_URL = process.env.REACT_APP_APIURL;

const Description = () => {
  const [artistPayload, setArtistPayload] = useOutletContext();
  let navigate = useNavigate();
  const { request_id } = useParams();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
    setError,
  } = useForm();
  const submitBtn = useRef(null);


  const submitForm = async ({ description }) => {
    if (description == artistPayload.description) {
      navigate(`/become-a-artist/${request_id}/finish-setup`);
    } else {
      let payload = {
        currentStep: 10,
        description,
      };

      if (artistPayload?.currentStep > 9) {
        delete payload.currentStep;
      }

      try {
        await axiosAuth.post(`${BASE_URL}/users/updateArtistRequest`, payload);
        setArtistPayload((prev) => {
          return { ...prev, ...payload };
        });
        navigate(`/become-a-artist/${request_id}/finish-setup`);
      } catch (error) {
        throw error;
      }
    }
  };

  return (
    <>
      <section className="description-box-ar">
        <div className="container h-min-75vh">
          <div className="description-box-ar-heading">
            <h1 className="text-center">Create your description</h1>
            <p className="text-center">
              Describe yourself and your work - you can always change it later.
            </p></div>
          <div className="row my-5">
            <div className="col-lg-8 mx-auto">
              <form onSubmit={handleSubmit(submitForm)}>
                <div className="description-box">
                  <div className="">
                    <Controller
                      name="description"
                      control={control}
                      defaultValue={artistPayload.description}
                      rules={{ required: "Description is required" }}
                      render={({ field }) => (
                        <>
                        <label htmlFor="floatingTextarea2" className="mb-2">Description</label>
                          <textarea
                            {...field}
                            className={`form-control resize-none ${errors.description ? "is-invalid" : ""
                              }`}
                            placeholder="Write something here...."
                            id="floatingTextarea2"
                            style={{ height: 150 }}
                          />
                          
                          {errors.description && (
                            <div className="invalid-feedback">
                              {errors.description.message}
                            </div>
                          )}
                        </>
                      )}
                    />
                  </div>
                </div>
                <button type="submit" hidden ref={submitBtn}></button>
              </form>
            </div>
          </div>
        </div>
        <div className="horizontal-bar"></div>
      </section>

      <ArtistFooter
        backClick={() =>
          navigate(`/become-a-artist/${request_id}/you-are-best-in`)
        }
        nextClick={() => submitBtn.current.click()}
      />
    </>
  );
};

export default Description;
