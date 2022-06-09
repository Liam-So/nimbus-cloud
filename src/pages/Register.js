import React from 'react'
import { Link } from "react-router-dom";

const Register = () => {
  const genres = ["r&b", "hip-hop", "jazz", "pop", "disco", "funk", "soul", "classical"]

  return (
    <div className="flex min-h-screen items-center bg-gray-50">
      <div className="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto shadow-md">
        <div className="py-8 px-8 rounded-xl">
          <h2 className="text-2xl font-semibold text-gray-900 text-center">
            Register
          </h2>
          <div
            className="mt-6"
          >
            <div className="my-2">
              <label className="text-gray-800">Email</label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-3 mt-3 bg-gray-100"
                required
                placeholder="Email"
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
              />
            </div>
            <label className="text-gray-800">Select genres</label>
            <div className="my-2 flex flex-wrap gap-x-4">
              {genres.map((genre, key) => {
                return (
                  <div key={key} className="bg-yellow-200 px-1 mt-2 rounded text-yellow-700 hover:bg-yellow-600 cursor-pointer">
                    {genre}
                  </div>
                )
              })}
            </div>
            <div className="my-3">
              <Link to="/">
                <button className="w-full text-center bg-indigo-500 py-3 text-white rounded-sm hover:bg-indigo-700">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Register