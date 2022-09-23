import React, { useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

type UserContextProps = {
  myUser: any;
  loginWithRedirect: () => void;
  logout: (obj: any) => void;
};

const defaultUserContextValues = {
  myUser: null,
  loginWithRedirect: () => {},
  logout: (obj: any) => {},
};

const UserContext = React.createContext<UserContextProps>(
  defaultUserContextValues,
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } =
    useAuth0();

  const [myUser, setMyUser] = useState(null);

  useEffect(() => {
    console.log(user, isAuthenticated, isLoading);
  }, [isAuthenticated]);

  return (
    <UserContext.Provider value={{ myUser, loginWithRedirect, logout }}>
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => useContext(UserContext);
