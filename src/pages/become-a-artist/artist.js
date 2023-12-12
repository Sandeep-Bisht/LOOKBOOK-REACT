import React from "react";
import { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import BecomeAristHeader from "./header";

const ArtistCreation = () => {
  const userRequests = useLoaderData();

  let payload = {
    services: [],
    products : [],
    coords : {},
    address : {} ,
    languages: {},
    gallery : [],
    pricing :{},
   
  }

  const [artistPayload, setArtistPayload]= useState(payload)



 
  return (
    <>
    <div className="artist-wrapper-ar">
      <BecomeAristHeader />

         <Outlet context={[artistPayload, setArtistPayload, userRequests]} />
      </div>
    </>
  );
};

export default ArtistCreation;
