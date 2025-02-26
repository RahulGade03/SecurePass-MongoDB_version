import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-black flex justify-center items-center gap-4 h-[49px] fixed bottom-0 w-full'>
        <NavLink to={'https://github.com/RahulGade03'} target='_blank' className='text-white'>
          Github
        </NavLink>
        <NavLink to={'https://linkedin.com/in/rahulgade2004'} target='_blank' className='text-white'>
          LinkedIn
        </NavLink>
    </footer>
  )
}

export default Footer
