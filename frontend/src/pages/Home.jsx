import React from 'react'
import logo from '../../public/Uber_logo_2018.png'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <div className='h-screen w-full flex justify-between flex-col' style={{backgroundImage: 'url(https://images.unsplash.com/photo-1527603815363-e79385e0747e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <img className='ml-5 lg:w-[10%] mt-6 h-[6%] w-[40%]' src={logo} alt="Uber Logo" />
            <div className='py-2 px-8 lg:flex flex-col justify-center items-center pb-4 bg-white'>
                <h2 className='text-3xl font-bold mb-3 lg:ml-10'>Get started with Uber</h2>
                <Link to='/login' className='flex items-center justify-center lg:w-[18%] lg:ml-9 w-full py-2 bg-black rounded-md text-white text-xl font-semibold'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Home
