import * as React from 'react'
import { AccountContext } from '../context/Account';

const Home = () => {
  const { logout } = React.useContext(AccountContext)

  return (
    <>
      <div className='flex flex-col items-center justify-center pt-12 gap-y-8'>
        <h2 className='text-3xl items-center font-semibold'>Your song of the day is:</h2>
        <img className='h-64 w-64' src="https://i.scdn.co/image/ab67616d0000b273baf2a68126739ff553f2930a" alt="runway" />
        <p className='text-gray-800 font-semibold'>Runaway by Kanye West</p>
        <button className="px-2 py-1 bg-yellow-200 rounded cursor-pointer hover:bg-yellow-400" onClick={logout}><span className="font-semibold">Logout</span></button>
      </div>
    </>
  )
}

export default Home