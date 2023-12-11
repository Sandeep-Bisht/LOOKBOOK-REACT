import React from "react";
import { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import BecomeAristHeader from "./header";

const ArtistCreation = () => {
  const userProfile = useLoaderData();

  let obj = {
    user_id : "",
    services: [],
    products : [],
    coords : {},
    address : {} ,
    travel : false,
    education : "",
    languages: {},
    gallery : [],
    description : "",
    pricing :{},
    status: "progress"
  }

  const [configuration, setConfiguration] = useState(userProfile);
  const [artistPayload, setArtistPayload]= useState(obj)



 
  return (
    <>
      <BecomeAristHeader />
      <Outlet context={[artistPayload, setArtistPayload]} />
    </>
  );
};

export default ArtistCreation;
