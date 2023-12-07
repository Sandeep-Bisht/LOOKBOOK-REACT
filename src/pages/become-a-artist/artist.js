import React from 'react'
import { useState } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom'

const ArtistCreation = () => {
    
    const userProfile = useLoaderData();

    const [configuration, setConfiguration] = useState(userProfile);
    return <Outlet context={[configuration, setConfiguration]} />;
}

export default ArtistCreation