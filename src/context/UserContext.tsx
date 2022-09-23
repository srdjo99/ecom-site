import React, { useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

type UserContextProps = {
  myUser: any;
  isLoading: any;
  loginWithRedirect: () => void;
  logout: (obj: any) => void;
};

const defaultUserContextValues = {
  isLoading: null,
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

  const [myUser, setMyUser] = useState<any>(null);

  useEffect(() => {
    if (isAuthenticated) {
      setMyUser(user);
    } else {
      setMyUser(false);
    }
  }, [isAuthenticated]);

  return (
    <UserContext.Provider
      value={{ isLoading, myUser, loginWithRedirect, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => useContext(UserContext);
