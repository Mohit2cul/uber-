import React from 'react'
import logo from '../../public/Uber_logo_2018.png'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
      <div className='h-screen w-full flex flex-col'>
        <img className='ml-5 lg:w-[10%] mt-6 h-[6%] w-[40%]' src={logo} alt="Uber Logo" />
        <div className='flex-1 flex items-center justify-center px-6'>
          <img
            className='w-full max-w-[600px] mt-4 h-[66vh] lg:h-[65vh] object-cover overflow-hidden rounded-xl '
            src="https://images.unsplash.com/photo-1527603815363-e79385e0747e?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww"
            alt="City traffic"
          />
        </div>
        <div className='py-2 px-8 lg:flex flex-col justify-center items-center pb-4 bg-white'>
          <h2 className='text-3xl font-bold mb-3 lg:ml-10'>Get started with Uber</h2>
          <Link to='/login' className='flex items-center justify-center lg:w-[18%] lg:ml-9 w-full py-2 bg-black rounded-md text-white text-xl font-semibold'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start
