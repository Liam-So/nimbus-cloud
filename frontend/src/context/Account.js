import * as React from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Pool from '../UserPool';
import { useNavigate } from 'react-router-dom';

const AccountContext = React.createContext();

const Account = ({ children }) => {
  const nav = useNavigate();

  const authenticate = async (Username, Password) => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username,
        Pool,
      });

      const authDetails = new AuthenticationDetails({
        Username,
        Password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log('onSuccess:', data);
          resolve(data);
        },
        onFailure: (err) => {
          console.error('onFailure:', err);
          reject(err);
        },
        newPasswordRequired: (data) => {
          resolve(data);
        },
      });
    });
  };

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
      nav('/');
    }
  };

  const user = () => {
    const user = Pool.getCurrentUser();
    return user;
  };

  return (
    <AccountContext.Provider value={{ authenticate, logout, user }}>
      {children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
