import React from 'react'
import logo from '../../public/Uber_logo_2018.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainLogin = () => {

  const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [captainData, setCaptainData] = useState({})
    const {captain, setCaptain} = React.useContext(CaptainDataContext)
  
    const submitHandler = async (e) => {
      e.preventDefault()
      const captain = {
        email: email,
        password: password
      }
      // console.log(captainData);
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

      if(response.status === 200){
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')
      }
      setEmail('')
      setPassword('')
    }
  return (
    <div className='bg-white'>
      <div>
        <img className='ml-5 lg:w-[10%] mt-6 h-[6%] w-[30%]' src={logo} alt="Uber Logo" />
        <form onSubmit={submitHandler} className='flex flex-col p-7 lg:w-[40%] w-full mx-auto bg-[#f7f7f7] '>
          <h3 className='text-2xl font-semibold mb-2 mt-8'>What's our Captain's Email?</h3>
          <input className='mb-4 py-2 px-3 rounded-md w-full text-lg border-[2px] solid black' type="email" placeholder="email@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <h3 className='text-2xl font-semibold mb-2'>Password</h3>
          <input className='mb-4 py-2 px-3  rounded-md w-full text-lg border-[2px] solid black' type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className='mt-2 bg-black text-white px-5 py-2 text-xl font-medium rounded-xl shadow-lg' type="submit">Login</button>

        </form>
        <div className='flex gap-2 text-center justify-center mb-6'>
          <p className='text-lg font-medium'>Join a fleet?</p> <Link to="/captain-signup" className='font-medium text-blue-800 text-lg'>Register as a captain</Link>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center w-full'>
        <Link to='/login' className='flex items-center justify-center bg-[#d5622d] text-white px-5 py-2 text-xl font-medium rounded-xl shadow-lg lg:w-[35.9%] w-[86%] mx-auto'>Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin