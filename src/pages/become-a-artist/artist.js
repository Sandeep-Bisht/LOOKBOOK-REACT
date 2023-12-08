import React from 'react'
import { useState } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom'
import BecomeAristHeader from './header';

const ArtistCreation = () => {
    
    const userProfile = useLoaderData();

    const [configuration, setConfiguration] = useState(userProfile);
    return (<>
    <BecomeAristHeader />
    <Outlet context={[configuration, setConfiguration]} />
 </>
    );
}

export default ArtistCreation