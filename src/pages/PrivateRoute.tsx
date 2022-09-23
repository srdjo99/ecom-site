import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { useUserContext } from '../context/UserContext';

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { myUser, isLoading } = useUserContext();

  if (isLoading) return <h1>Spinner</h1>;

  return myUser ? children : <Navigate to="/" replace />;
};
export default PrivateRoute;
