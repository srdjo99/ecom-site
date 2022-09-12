import React, { useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

type UserContextProps = {};

const UserContext = React.createContext<UserContextProps | null>(null);

export const UserProvider: React.FC<React.ReactNode | any> = ({ children }) => (
  <UserContext.Provider value="user context">{children}</UserContext.Provider>
);
// make sure use
export const useUserContext = () => useContext(UserContext);
