import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Rows = ({ passwords, setPasswords, setForm }) => {
    function setCopy(e) {
        navigator.clipboard.writeText(e)
        toast('Copied to Clipboard!', {
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

    async function deleteItem (id) {
        await fetch('https://secure-pass-backend.vercel.app/deleteOne', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id})
        })
        setPasswords(passwords.filter((e) => {return e._id !== id}))
        toast.warning('Password deleted!', {
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
    async function editItem (id) {
        let index = passwords.findIndex((item) => {return item._id === id})
        let form1 = passwords[index]
        setForm({website: form1.website, username: form1.username, password: form1.password, _id: form1._id, user: form1.user})
        await fetch ('https://secure-pass-backend.vercel.app/editOne', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
            ,
            body: JSON.stringify({ id: form1._id })
        })
        setPasswords(passwords.filter((e) => {return e._id !== id}))
    }

    return passwords.map((item) => {
        return (
            <>
                <tr className='bg-green-100 border-2 border-white' key={uuidv4()}>
                    <td className='w-[300px] text-center py-2 underline' key={uuidv4()}>
                        <a href={item.website} target='_blank'>{item.website}</a>
                    </td>
                    <td className='w-[300px] text-center py-2 relative' key={uuidv4()}>
                        {item.username}
                        <lord-icon
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover" onClick={() => { setCopy(item.username) }} className='absolute right-0 h-[23px]'></lord-icon>
                    </td>
                    <td className='w-[300px] text-center py-2 relative' key={uuidv4()}>
                        ********
                        <lord-icon
                            src="https://cdn.lordicon.com/depeqmsz.json" onClick={() => { setCopy(item.password) }}
                            trigger="hover" className='absolute right-0 h-[23px]'></lord-icon>

                    </td>
                    <td className='w-[100px] text-center py-2 relative' key={uuidv4()}>
                        <lord-icon
                            src="https://cdn.lordicon.com/wkvacbiw.json"
                            trigger="hover" className='h-[23px]' onClick={() => editItem(item._id)}>
                        </lord-icon>
                        <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover" className='h-[23px]' onClick={() => deleteItem(item._id)}>
                        </lord-icon>

                    </td>
                </tr>
            </>
        )
    })
}

const Passwords = ({ passwords, setPasswords, form, setForm, webRef, userRef, passRef }) => {
    return (
        <div className='flex flex-col items-center'>
            <h2 className='w-[1000px] mt-7 font-bold text-2xl'>Your Passwords</h2>
            <table className='overflow-hidden rounded-2xl'>
                <thead>
                    <tr className='bg-green-500'>
                        <th className='w-[300px] text-center py-2' key={uuidv4()}>Website</th>
                        <th className='w-[300px] text-center py-2' key={uuidv4()}>UserID</th>
                        <th className='w-[300px] text-center py-2' key={uuidv4()}>Password</th>
                        <th className='w-[100px]'></th>
                    </tr>
                </thead>
                <tbody>
                    <Rows passwords={passwords} setPasswords={setPasswords} form={form} setForm={setForm}  webRef={webRef} userRef={userRef} passRef={passRef}/>
                </tbody>
            </table>
        </div>
    )
}

export default Passwords