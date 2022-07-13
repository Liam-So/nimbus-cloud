import React from 'react';
import { genres } from '../services/genres';
import { useNavigate, useLocation } from 'react-router-dom';
import UserPool from '../UserPool';
import UserDataService from '../services/user.services';

const Genre = () => {
  const [selectedGenres, setSelectedGenres] = React.useState([]);

  const nav = useNavigate();

  const { state } = useLocation();

  const onSubmit = async () => {
    let id = UserPool.getCurrentUser().username;

    if (state) {
      const { phone_number } = state;

      let data = {
        id: id,
        genres: selectedGenres,
        phone_number: phone_number,
      };

      let response = await UserDataService.postUser(data);
      console.log(response);
      if (response.status === 200) {
        nav('/');
      } else {
        alert('An error occurred while submitting selected genres.');
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center bg-gray-50">
      <div className="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto shadow-md">
        <div className="py-8 px-8 rounded-xl">
          <h2 className="text-2xl font-semibold text-gray-900 text-center">
            Select Your Genres
          </h2>

          <div className="my-2 flex flex-wrap gap-x-4">
            {genres.map((genre, key) => {
              return (
                <div
                  key={key}
                  className="bg-yellow-200 px-1 mt-2 rounded text-yellow-700 hover:bg-yellow-500 cursor-pointer"
                  onClick={() => {
                    setSelectedGenres([...selectedGenres, genre]);
                  }}
                >
                  {genre}
                </div>
              );
            })}
          </div>
          <div className="my-3">
            <button
              className="w-full text-center bg-indigo-500 py-3 text-white rounded-sm hover:bg-indigo-700"
              onClick={onSubmit}
            >
              Submit Genres
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Genre;
