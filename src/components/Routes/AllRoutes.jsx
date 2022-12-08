import React from 'react'
import { UserAuthContextProvider } from '../../context/UserAuthContext';
import { PublicRoutes } from './PublicRoutes';


export const AllRoutes = () => ( 
    <UserAuthContextProvider >
        <PublicRoutes />
    </UserAuthContextProvider>
);