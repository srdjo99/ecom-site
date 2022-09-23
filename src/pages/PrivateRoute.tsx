import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { useUserContext } from '../context/UserContext';

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useAuth0();

  return user ? children : <Navigate to="/" />;
};
export default PrivateRoute;
