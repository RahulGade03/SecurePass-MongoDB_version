import React from 'react'

const About = () => {
  return (
    <div className='flex justify-center items-center h-[80vh] w-full text-center'>
      <span className='font-bold text-3xl max-w-[60vw]'>
        <span className='bg-black text-white px-3 pb-1 rounded-3xl'>Secure<span className='text-green-500'>Pass</span></span> is a simple and secure web application designed to store and manage your website credentials, including website URLs, usernames, and passwords. The app utilizes <span className='text-violet-500'>mongoDB</span> to store your data ensuring that your sensitive data remains <span className='text-red-500'>private</span> and accessible <span className='text-yellow-500'>only to you</span>. <div className='text-red-600'><br/>This application purely is for testing purpose, do not use it as your primary password manager!</div>
      <div className='text-right'><br/>Regards, <span className='text-green-500'>Rahul Gade</span></div></span>
    </div>
  )
}

export default About
