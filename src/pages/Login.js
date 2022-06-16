import * as React from 'react'
import { Link } from "react-router-dom"
import { AccountContext } from '../context/Account'

const Login = () => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const { authenticate } = React.useContext(AccountContext)

  const onSubmit = (e) => {
    e.preventDefault()
    authenticate(email, password).then(data => {
      console.log("Logged in!", data)
    }).catch(err => {
      console.error(err)
    })
  }

  return (
    <div className="flex min-h-screen items-center bg-gray-50">
      <div className="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto shadow-md">
        <div className="py-8 px-8 rounded-xl">
          <h2 className="text-2xl font-semibold text-gray-900 text-center">
            Login
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
                onChange={(e) => setEmail(e.target.value)}
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
              <label className="text-gray-800">Don't have an account? Register <Link to="/register" className='font-bold hover:text-green-500'>here</Link></label>
              <div className="my-3">
                <Link to="/home">
                  <button className="w-full text-center bg-indigo-500 py-3 text-white rounded-sm hover:bg-indigo-700" onClick={onSubmit}>
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Login