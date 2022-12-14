import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserPool from '../UserPool';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

const Register = () => {
  const [email, setEmail] = React.useState('');
  const [number, setNumber] = React.useState();
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const nav = useNavigate();

  const onSubmit = (e) => {
    if (!isValidPhoneNumber(number)) {
      alert('Invalid Phone Number');
    } else if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      const attributeList = [];
      const dataPhoneNumber = {
        Name: 'phone_number',
        Value: number,
      };
      const attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);
      attributeList.push(attributePhoneNumber);

      e.preventDefault();
      UserPool.signUp(email, password, attributeList, null, (err, data) => {
        if (err) {
          console.error(err);
        } else {
          // TODO - this might not be the best way to do it (sending password like this??)
          nav('/confirm', {
            state: {
              username: email,
              password: password,
              phone_number: number,
            },
          });
        }
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center bg-gray-50">
      <div className="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto shadow-md">
        <div className="py-8 px-8 rounded-xl">
          <h2 className="text-2xl font-semibold text-gray-900 text-center">
            Register
          </h2>
          <div className="mt-6">
            <div className="my-2">
              <label className="text-gray-800">Email</label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-3 mt-3 bg-gray-100"
                required
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-2">
              <label className="text-gray-800">Phone Number</label>
              <PhoneInput
                name="phone"
                defaultCountry={'CA'}
                className="w-full px-4 py-3 mt-3 bg-gray-100"
                required
                placeholder="Phone Number"
                number={number}
                onChange={setNumber}
              />
            </div>
            <div className="my-2">
              <label className="text-gray-800">Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-3 mt-3 mb-2 bg-gray-100"
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="my-2">
              <label className="text-gray-800">Confirm Password</label>
              <input
                type="password"
                name="confirm_password"
                className="w-full px-4 py-3 mt-3 mb-2 bg-gray-100"
                required
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="my-3">
              <button
                className="w-full text-center bg-indigo-500 py-3 text-white rounded-sm hover:bg-indigo-700"
                onClick={onSubmit}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
