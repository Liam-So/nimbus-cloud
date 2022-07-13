import React from 'react';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { useLocation, useNavigate } from 'react-router-dom';
import { AccountContext } from '../context/Account';
import UserPool from '../UserPool';

const Confirm = () => {
  // grab our state from register
  const { state } = useLocation();
  const { authenticate, user } = React.useContext(AccountContext);
  const nav = useNavigate();

  const [code, setCode] = React.useState(null);

  const onSubmit = () => {
    if (state) {
      const { username, password, phone_number } = state;
      const userData = {
        Username: username,
        Pool: UserPool,
      };

      const cognitoUser = new CognitoUser(userData);
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          authenticate(username, password)
            .then((data) => {
              console.log('authenticated!', data);
            })
            .catch((err) => {
              console.error(err);
            });
          nav('/genre', { state: { phone_number: phone_number } });
        }
      });
    } else {
      alert('Your account cannot be verified right now. Please try again.');
    }
  };

  return (
    <div>
      <div className="flex min-h-screen items-center bg-gray-50">
        <div className="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto shadow-md">
          <div className="py-8 px-8 rounded-xl">
            <h2 className="text-2xl font-semibold text-gray-900 text-center">
              Confirm
            </h2>
            <div className="mt-6">
              <div className="my-2">
                <label className="text-gray-800">
                  Enter your verification code
                </label>
                <input
                  type="number"
                  name="code"
                  className="w-full px-4 py-3 mt-3 bg-gray-100"
                  required
                  placeholder="Verification Code"
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <div className="my-2">
                <div className="my-3">
                  <button
                    className="w-full text-center bg-indigo-500 py-3 text-white rounded-sm hover:bg-indigo-700"
                    onClick={onSubmit}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
