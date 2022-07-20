import * as React from 'react';
import UserDataService from '../services/user.services';
import { AccountContext } from '../context/Account';
import { useLocation, Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Home = () => {
  const [userData, setUserData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { logout, user } = React.useContext(AccountContext);
  const location = useLocation();

  let id = user().username;

  React.useEffect(() => {
    async function fetchData() {
      const req = await UserDataService.getUser(id);

      setUserData(req.data);
    }

    fetchData();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  function isLoggedIn() {
    try {
      if (location.state.token) {
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  const Loading = () => (
    <div className="flex h-screen">
      <div className="m-auto">
        <h1>{<Skeleton />}</h1>
        {<Skeleton count={5} />}
      </div>
    </div>
  );

  const LoggedIn = () => (
    <div>
      {userData.songs.length > 0 ? (
        <div className="flex flex-col items-center justify-center pt-12 gap-y-8">
          <h2 className="text-3xl items-center font-semibold">
            Your song of the day is:
          </h2>
          <img
            className="h-64 w-64"
            src={userData.songs[userData.songs.length - 1].img}
            alt={userData.songs[userData.songs.length - 1].song}
          />
          <h2 className="text-gray-800 font-semibold text-xl">
            {userData.songs[userData.songs.length - 1].song} by{' '}
            {JSON.stringify(userData.songs[userData.songs.length - 1].artists)
              .replace('[', '')
              .replace(']', '')
              .replaceAll('"', '')
              .replaceAll(',', ', ')}
          </h2>
          <button className="px-2 py-1 bg-yellow-200 rounded cursor-pointer hover:bg-yellow-400">
            <a
              href={userData.songs[userData.songs.length - 1].url}
              className="font-semibold"
            >
              Click here to listen!
            </a>
          </button>
          <div className="relative overflow-x-auto mx-auto w-4/5 rounded-lg my-4">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-black uppercase bg-gray-300  ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Past Songs (Old to New)
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Song Link
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Song Artists
                  </th>
                </tr>
              </thead>
              <tbody>
                {userData.songs.length > 7
                  ? userData.songs.slice(-7).map((song) => (
                      <tr
                        className="bg-gray-200 border-b  dark:border-gray-600"
                        key={song.song}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-black"
                        >
                          {song.song}
                        </th>
                        <td className="px-6 py-4 text-black">
                          <a href={song.url}>{song.url}</a>
                        </td>
                        <td className="px-6 py-4 text-black">
                          {JSON.stringify(song.artists)
                            .replace('[', '')
                            .replace(']', '')
                            .replaceAll('"', '')
                            .replaceAll(',', ', ')}
                        </td>
                      </tr>
                    ))
                  : userData.songs.map((song) => (
                      <tr
                        className="bg-gray-200 border-b  dark:border-gray-600"
                        key={song.song}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-black"
                        >
                          {song.song}
                        </th>
                        <td className="px-6 py-4 text-black">
                          <a href={song.url}>{song.url}</a>
                        </td>
                        <td className="px-6 py-4 text-black">
                          {JSON.stringify(song.artists)
                            .replace('[', '')
                            .replace(']', '')
                            .replaceAll('"', '')
                            .replaceAll(',', ', ')}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

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
            <h1 className="text-2xl font-bold">
              Please come back at 12pm ADT while we generate songs specific to
              your profile!
            </h1>
            <button
              className="w-full px-2 py-1 bg-yellow-200 rounded cursor-pointer hover:bg-yellow-400"
              onClick={logout}
            >
              <span className="font-semibold">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const NotLoggedIn = () => (
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
  );

  return (
    <div>
      {isLoggedIn() ? !loading ? <LoggedIn /> : <Loading /> : <NotLoggedIn />}
    </div>
  );
};

export default Home;
