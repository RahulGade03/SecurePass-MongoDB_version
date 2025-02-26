import React from 'react'

const About = () => {
  return (
    <div className='flex justify-center items-center h-[80vh] w-full text-center'>
      <span className='font-bold text-3xl max-w-[60vw]'><span className='text-green-500'>SecurePass</span> is a simple and secure web application designed to store and manage your website credentials, including website URLs, usernames, and passwords. The app utilizes your <span className='text-violet-500'>device's local</span> storage, ensuring that your sensitive data remains <span className='text-red-500'>private</span> and accessible <span className='text-yellow-500'>only to you</span>. <div className='text-red-600'><br/>This application purely is for testing purpose, do not use it as your primary password manager!</div>
      <div className='text-right'><br/>Regards, <span className='text-green-500'>Rahul Gade</span></div></span>
    </div>
  )
}

export default About
