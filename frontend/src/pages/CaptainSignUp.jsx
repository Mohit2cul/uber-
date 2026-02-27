import React, { useState } from 'react'
import logo from '../../public/Uber_logo_2018.png'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainSignUp = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  // const [userData, setUserData] = useState({})

  const { captain, setCaptain } = React.useContext(CaptainDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    const captainData = {
      fullname:{
      firstname: firstName,
      lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

    if(response.status === 201){
      const data = response.data 
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    // console.log(userData);
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
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
            <input className='mb-3 py-2 px-3  rounded-md w-full text-md font-medium border-[2px] solid black' type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <h3 className='text-xl font-semibold mb-2 mt-4'>Vehicle Information</h3>
            <input className='mb-3 py-2 px-3 rounded-md w-full text-md font-medium border-[2px] solid black' type="text" placeholder="Vehicle Color" required value={vehicleColor} onChange={(e) => setVehicleColor(e.target.value)} />
            <input className='mb-3 py-2 px-3 rounded-md w-full text-md font-medium border-[2px] solid black' type="text" placeholder="Vehicle Plate" required value={vehiclePlate} onChange={(e) => setVehiclePlate(e.target.value)} />
            <input className='mb-3 py-2 px-3 rounded-md w-full text-md font-medium border-[2px] solid black' type="number" placeholder="Vehicle Capacity" required value={vehicleCapacity} onChange={(e) => setVehicleCapacity(e.target.value)} />
            <select className='mb-3 py-2 px-3 rounded-md w-full text-md font-medium border-[2px] solid black' required value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
              <option value="">Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="bike">Bike</option>
            </select>
            <button className='mt-2 bg-black text-white px-5 py-2 text-lg font-medium rounded-xl shadow-lg' type="submit">Create Captain Account</button>

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



