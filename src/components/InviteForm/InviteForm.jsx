import React, { useState } from 'react'
import emailjs from 'emailjs-com';
import { v4 as uuidv4 } from 'uuid';
const InviteForm = () => {
    const [toEmail, setToEmail] = useState('')
    const [message, setMessage] = useState('')
    const [disabled, setDisabled] = useState(false)

     function sendEmail(e) {
         
    e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it
        emailjs.send("gmail","template_3a12ff8",{
        to_name: `${toEmail}` ,
        from_name: "Arizon",
        message: `You have been invited to join the video call : https://lyodata.web.app/video-call/${uuidv4()}`,
        reply_to: "jyothiranands@gmail.com",
        to_email: toEmail,
        }, "user_gqmHsTLEHxh06fhWlDnqq").then(() => {
            setMessage('Invited Successfully')
            setDisabled(true)
            setToEmail('')
        })
   
  }
    return (
       
    <section className="w-full max-w-2xl px-6 py-4 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white">Invite Participants </h2>
        <p className="mt-3 text-center text-gray-600 dark:text-gray-400">Invite partcipants by entering their Email</p>
        
        
        
        <div className="mt-6 ">
            <div className="items-center -mx-2 md:flex">
               
                <div className="w-full mx-2 mt-4 md:mt-0">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">E-mail</label>

                    <input value={toEmail} onChange={(e) =>setToEmail(e.target.value)} className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="email"/>
                </div>
            </div>

            <div className="flex justify-center mt-6">
                <button disabled={disabled} onClick={sendEmail} className="px-4 py-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Send Invite</button>
            </div>
             {message && <p className="mt-3 text-center text-green-600 dark:text-gray-400">{message}</p>}
        </div>
    </section>
    )
}

export default InviteForm
