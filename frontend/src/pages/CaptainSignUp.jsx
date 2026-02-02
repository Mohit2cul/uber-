import React, { useState } from 'react'
import logo from '../../public/Uber_logo_2018.png'
import { Link } from 'react-router-dom'

const CaptainSignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userData, setUserData] = useState({})
    const submitHandler = (e) => {
      e.preventDefault()
      const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      }
  
      // console.log(userData);
      setUserData(userData)
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
    }
  return (
        <div>
      <div className='bg-white'>
        <div>
          <img className='ml-5 lg:w-[10%] mt-4 h-[6%] w-[30%]' src={logo} alt="Uber Logo" />
          <form onSubmit={submitHandler} className='flex flex-col p-6 lg:w-[40%] w-full mx-auto bg-[#f7f7f7] '>
            <h3 className='text-xl font-semibold mb-2 mt-4'>
              What's our Captain's name
            </h3>
            <div className='flex gap-4'>
              <input className=' py-2 px-3 rounded-md w-1/2 text-md font-medium border-[2px] solid black' type="text" placeholder="First name" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <input className=' py-2 px-3 rounded-md w-1/2 text-md font-medium border-[2px] solid black' type="text" placeholder="Last name" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <h3 className='text-xl font-semibold mb-2 mt-4'>What's our Captain's Email?</h3>
            <input className='mb-3 py-2 px-3 rounded-md w-full text-md font-medium border-[2px] solid black' type="email" placeholder="email@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <h3 className='text-xl font-semibold mb-2'>Password</h3>
            <input className='mb-3 py-2 px-3  rounded-md w-full text-md font-medium border-[2px] solid black' type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}  />
            <button className='mt-2 bg-black text-white px-5 py-2 text-lg font-medium rounded-xl shadow-lg' type="submit">Login</button>

          </form>
          <div className='flex gap-2 text-center justify-center mb-4'>
            <p className='text-md font-medium'>Already have an account?</p> <Link to="/captain-login" className='font-medium text-blue-800 text-md'>Login here</Link>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center w-full'>
          {/* <Link to='/captain-login' className='flex items-center justify-center bg-[#10b461] text-white px-5 py-2 text-lg font-medium rounded-xl shadow-lg lg:w-[35.9%] w-[86%] mx-auto mb-4'>Sign in as Captain</Link> */}
        </div>
      </div>
    </div>
  )
}

export default CaptainSignUp



