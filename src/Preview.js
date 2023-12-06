import React from "react";

const Preview = (props) => {
  const { formData } = props;
  console.log("this is form data", formData)

  const { name, email, phoneNumber, address, place, proffesion } = formData;
  console.log("this did data", name, email,address, place, proffesion)


  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="text-center">Artist Details</div>
          </div>
        </div>

{formData && (
        <div className="row">
          <div className="col-md-12 d-flex">
                <div className="col-md-6">
                  {/* <p>{name}</p> */}
                  <p>Artist Name</p>
                  <p>Artist Name</p>
                  <p>Artist Name</p>
                </div>

                <div className="col-md-6">
                  <p>{name && name}</p>
                  <p>{email && email}</p>
                  <p>{phoneNumber && phoneNumber}</p>
                </div>
          </div>
        </div>
)
}
      </div>
    </section>
  );
};

export default Preview;
