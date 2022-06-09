import React from 'react'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className='flex flex-col items-center justify-center pt-12 gap-y-8'>
        <h2 className='text-3xl items-center font-semibold'>Your song of the day is:</h2>
        <img className='h-64 w-64' src="https://i.scdn.co/image/ab67616d0000b273baf2a68126739ff553f2930a" alt="runway" />
        <p className='text-gray-800 font-semibold'>Runaway by Kanye West</p>
        <Link to="/">
          <div className="px-2 py-1 bg-yellow-200 rounded cursor-pointer hover:bg-yellow-400"><span className="font-semibold">Logout</span></div>
        </Link>
      </div>
    </>
  )
}

export default Home