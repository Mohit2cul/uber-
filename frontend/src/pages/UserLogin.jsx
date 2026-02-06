import React, { useState, useContext } from 'react'
import logo from '../../public/Uber_logo_2018.png'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext.jsx'
import axios from 'axios'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault()
    const userData = {
      email: email,
      password: password
    }
    // setUserData({
    //   email: email,
    //   password: password
    // })
    // console.log(userData);
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)
    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/home');
    }
    setEmail('')
    setPassword('')
  }

  return (
    <div className='bg-white'>
      <div>
        <img className='ml-5 lg:w-[10%] mt-6 h-[6%] w-[30%]' src={logo} alt="Uber Logo" />
        <form onSubmit={submitHandler} className='flex flex-col p-7 lg:w-[40%] w-full mx-auto bg-[#f7f7f7] '>
          <h3 className='text-2xl font-semibold mb-2 mt-8'>What's your Email?</h3>
          <input className='mb-4 py-2 px-3 rounded-md w-full text-lg border-[2px] solid black' type="email" placeholder="email@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <h3 className='text-2xl font-semibold mb-2'>Password</h3>
          <input className='mb-4 py-2 px-3  rounded-md w-full text-lg border-[2px] solid black' type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className='mt-2 bg-black text-white px-5 py-2 text-xl font-medium rounded-xl shadow-lg' type="submit">Login</button>
          
        </form>
        <div className='flex gap-2 text-center justify-center mb-6'>
            <p className='text-lg font-medium'>New here?</p> <Link to="/signup" className='font-medium text-blue-800 text-lg'>Create new account</Link>
          </div>
      </div>
      <div className='flex flex-col items-center justify-center w-full'>
        <Link to='/captain-login' className='flex items-center justify-center bg-[#10b461] text-white px-5 py-2 text-xl font-medium rounded-xl shadow-lg lg:w-[35.9%] w-[86%] mx-auto'>Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin