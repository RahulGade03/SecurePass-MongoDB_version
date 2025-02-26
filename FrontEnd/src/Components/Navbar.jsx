import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <div className='flex justify-between bg-black pb-4'>
        <div className='flex justify-center w-1/3 pt-2'>
          <NavLink to={'/'}   // This
            className=''
          >
            <div>
              <span className='text-green-500 text-3xl font-bold'>&lt;</span>
              <span className='text-white text-3xl font-bold'>Secure</span>
              <span className='text-green-500 text-3xl font-bold'>Pass/&gt;</span>
            </div>
          </NavLink>
        </div>
        <div className='flex justify-end gap-5 w-2/3 pr-10 pt-4'>
          <NavLink to={'/'}   // This
            className={({ isActive, isPending }) =>
              `block py-2 pr-4 pl-3 ${isActive ? 'text-green-500' : 'text-white'} duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-green-500 lg:p-0`
            }
          >
            Home
          </NavLink>
          <NavLink to={'/about'}   // This
            className={({ isActive, isPending }) =>
              `block py-2 pr-4 pl-3 ${isActive ? 'text-green-500' : 'text-white'} duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-green-500 lg:p-0`
            }
          >
            About
          </NavLink>
          <NavLink to={'/contact'}   // This
            className={({ isActive, isPending }) =>
              `block py-2 pr-4 pl-3 ${isActive ? 'text-green-500' : 'text-white'} duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-green-500 lg:p-0`
            }
          >
            Contact Us
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
