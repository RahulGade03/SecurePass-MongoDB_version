import React, { useState, useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Passwords from './Passwords'
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const [form, setForm] = useState({ website: '', username: '', password: '', id: '' })
  const [passwords, setPasswords] = useState([])
  const webRef = useRef()
  const userRef = useRef()
  const passRef = useRef()

  useEffect(() => {
    async function run (){
      let pass = await fetch('https://securepass-backend.vercel.app/getData')
      pass = await pass.json()
      // console.log('Mongo_passwords: ',pass)
      if (pass) {
        setPasswords(pass)
      }
    }
    run ()
  }, [])

  useEffect(() => {
    async function run (){
      // console.log ('local_passwords: ',passwords)
    }
    run ()
  }, [passwords])



  async function savePassword() {
    if (!form.website) {
      toast.error('Please enter url!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (!form.username) {
      toast.error('Please enter username!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (!form.password) {
      toast.error('Please enter password!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (form.password && form.website && form.username) {
      const id = uuidv4()
      setPasswords([...passwords, {...form, id: id}])
      // console.log([...passwords, form])
      await fetch('https://securepass-backend.vercel.app/saveOne', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...form, id: id})
      });
      let data = fetch ('https://securepass-backend.vercel.app/getData')
      setForm({ username: '', website: '', password: '', id:''})
      toast.info('Your password has been saved!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <div className='h-[84vh] overflow-auto pb-4'>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className='felx flex-col justify-start'>
        <h1 className='flex flex-col items-center py-5'>
          <div>
            <span className='text-green-500 text-4xl font-bold'>&lt;</span>
            <span className='text-black text-4xl font-bold'>Secure</span>
            <span className='text-green-500 text-4xl font-bold'>Pass/&gt;</span>
          </div>
          <p className='font-bold'>Your own Password Manager!</p>
        </h1>
      </div>
      <div className='flex flex-col items-center gap-4'>
        <div className='flex flex-col items-center gap-4 w-1/2'>
          <div className='w-full'>
            <input ref={webRef} type="url" value={form.website} placeholder='Enter Website URL' className='w-full rounded-full border-2 border-green-500 p-3' name='website' onChange={(e) => { handleChange(e) }} />
          </div>
          <div className='w-full flex gap-4'>
            <input ref={userRef} type="text" name="username" value={form.username} id="" placeholder='Enter Username' className='w-1/2 rounded-full p-3 border-2 border-green-500' onChange={(e) => { handleChange(e) }} />
            <input ref={passRef} type="password" name="password" value={form.password} id="" placeholder='Enter Password' className='w-1/2 rounded-full p-3 border-2 border-green-500' onChange={(e) => { handleChange(e) }} />
          </div>
        </div>
        <button className='bg-green-500 transition-all ease-in-out duration-300 hover:bg-green-600 py-2 px-7 rounded-full flex gap-2 items-center justify-center' onClick={savePassword}>
          <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
          <span className='font-bold text-2xl'>Save</span></button>
      </div>
      {passwords.length == 0 && <div className='text-center font-bold mt-10'>No saved passwords yet</div>}
      {passwords.length > 0 && <Passwords passwords={passwords} setPasswords={setPasswords} form={form} setForm={setForm} webRef={webRef} userRef={userRef} passRef={passRef}/>}
    </div>
  )
}

export default Home