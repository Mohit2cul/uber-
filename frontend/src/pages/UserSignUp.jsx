import React, { useState, useContext } from 'react'
import logo from '../../public/Uber_logo_2018.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import {UserDataContext} from '../context/UserContext.jsx';

const UserSignUp = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userData, setUserData] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate();
  const {user, setUser} = React.useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault()

    const trimmedFirst = firstName.trim()
    const trimmedLast = lastName.trim()
    const trimmedEmail = email.trim()

    if (trimmedFirst.length < 3) {
      setErrorMessage('First name must be at least 3 characters long.')
      return
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.')
      return
    }

    const newUser = {
      fullname: {
        firstname: trimmedFirst,
        lastname: trimmedLast
      },
      email: trimmedEmail,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

      if (response.status === 201) {
        const data = response.data;
        // setUserData(response.data);
        setUser(data.user)
        localStorage.setItem('token', data.token);
        navigate('/home');
      }

      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
      setErrorMessage('')
    } catch (error) {
      if (error?.response?.status === 409) {
        setErrorMessage('An account with this email already exists. Please log in.');
      } else if (error?.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else if (error?.response?.data?.errors?.length) {
        setErrorMessage(error.response.data.errors[0].msg);
      } else if (error?.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Signup failed. Please try again.');
      }
    }
  }
  return (
    <div>
      <div className='bg-white'>
        <div>
          <img className='ml-5 lg:w-[10%] mt-4 h-[6%] w-[30%]' src={logo} alt="Uber Logo" />
          <form onSubmit={submitHandler} className='flex flex-col p-6 lg:w-[40%] w-full mx-auto bg-[#f7f7f7] '>
            {errorMessage && (
              <div className='mb-3 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm font-medium text-red-700'>
                {errorMessage}
              </div>
            )}
            <h3 className='text-xl font-semibold mb-2 mt-4'>
              What's your name
            </h3>
            <div className='flex gap-4'>
              <input className=' py-2 px-3 rounded-md w-1/2 text-md font-medium border-[2px] solid black' type="text" placeholder="First name" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <input className=' py-2 px-3 rounded-md w-1/2 text-md font-medium border-[2px] solid black' type="text" placeholder="Last name" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <h3 className='text-xl font-semibold mb-2 mt-4'>What's your Email?</h3>
            <input className='mb-3 py-2 px-3 rounded-md w-full text-md font-medium border-[2px] solid black' type="email" placeholder="email@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <h3 className='text-xl font-semibold mb-2'>Password</h3>
            <input className='mb-3 py-2 px-3  rounded-md w-full text-md font-medium border-[2px] solid black' type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}  />
            <button className='mt-2 bg-black text-white px-5 py-2 text-lg font-medium rounded-xl shadow-lg' type="submit">Create Account</button>

          </form>
          <div className='flex gap-2 text-center justify-center mb-4'>
            <p className='text-md font-medium'>Already have an account?</p> <Link to="/login" className='font-medium text-blue-800 text-md'>Login here</Link>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center w-full'>
          {/* <Link to='/captain-login' className='flex items-center justify-center bg-[#10b461] text-white px-5 py-2 text-lg font-medium rounded-xl shadow-lg lg:w-[35.9%] w-[86%] mx-auto mb-4'>Sign in as Captain</Link> */}
        </div>
      </div>
    </div>
  )
}

export default UserSignUp