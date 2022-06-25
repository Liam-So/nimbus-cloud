import * as React from 'react';
import { AccountContext } from '../context/Account';
import { useLocation, Link } from 'react-router-dom';

const Home = () => {
  const { logout } = React.useContext(AccountContext);
  const location = useLocation();

  function isLoggedIn() {
    try {
      if (location.state.token) {
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  return (
    <>
      <div>
        {isLoggedIn() ? (
          <div className="flex flex-col items-center justify-center pt-12 gap-y-8">
            <h2 className="text-3xl items-center font-semibold">
              Your song of the day is:
            </h2>
            <img
              className="h-64 w-64"
              src="https://i.scdn.co/image/ab67616d0000b273baf2a68126739ff553f2930a"
              alt="runway"
            />
            <p className="text-gray-800 font-semibold">Runaway by Kanye West</p>
            <button
              className="px-2 py-1 bg-yellow-200 rounded cursor-pointer hover:bg-yellow-400"
              onClick={logout}
            >
              <span className="font-semibold">Logout</span>
            </button>
          </div>
        ) : (
          <div className="flex h-screen">
            <div className="m-auto">
              <h1 className="font-bold">
                You do not have access to this page. Please login to continue
              </h1>
              <button className="w-full text-center bg-indigo-500 py-3 text-white rounded-sm hover:bg-indigo-700">
                <Link to={'/'}>Login</Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
