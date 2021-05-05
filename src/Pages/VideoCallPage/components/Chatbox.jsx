import { Button, Container, TextField } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../../components/context/AuthContext'
import { db } from '../../../firebase'
import { firebaseLooper } from '../../../utils/tools'
import './Chatbox.css'
const Chatbox = ({call_id}) => {
    const [chat, setChat] = useState([])
    const {currentUser} = useAuth()
    const [userData, setUserData] = useState([])
    const [message, setMessage] = useState('')
    //  const [call_id, setCallId] = useState('')
    const url = userData.url
        const username = userData.username
        const email = userData.email
        const index = chat.length
        const messageEl = useRef(null);
    useEffect(() => {
        if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
        db.collection('users').where('email','==', `${currentUser.email}`).onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setUserData(data[0])
        })
        db.collection('CallMessages').onSnapshot(doc => {
            const data = firebaseLooper(doc)
            data.sort(function(a,b){
                return(a.index-b.index)
            })
            setChat(data)
            console.log(data)
        })
    }, [])
    const  getReply = (username,email,message,url,callId) => {
        if(callId === call_id){
            if(email != currentUser.email){
            return(
                <div class="chat-message">
                    <div class="flex m-2 items-end">
                         <img  class="w-6 h-6 rounded-full order-2" src={url}/>
                        <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                            
                        <div><span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">{message}</span></div>
                        </div>
                       
                    </div>
                </div>
            )
        }else if (email === currentUser.email){
             return(
                 <div class="chat-message">
         <div  class="flex m-2 items-end justify-end">
            <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
               <div><span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-yellow-900 text-white ">{message}</span></div>
            </div>
            <img src={url} alt="My profile" class="w-6 h-6 rounded-full order-2"/>
         </div>
      </div>
             ) 
        }
        }
        
    }

     function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }
   
    const handleSubmit = (e) => {
        e.preventDefault()
        if (message.length === 0 || message.trim().length === 0) return;
        const messageData = {url,username,email,message,index}
        db.collection('CallMessages').add({url,username,email,message,index,call_id})
        setMessage('')
    }
    return (
      <Container style={{backgroundColor: 'white', border: '2px solid gray',height: '100vh'}}>
          <div className="chat">
              <div className="chat__header">
                  <h1>ChatBox</h1>
              </div>
              <div className="chat__body" ref={messageEl}>
        {chat.filter((message) =>{
            if(message.call_id == call_id){
                return message
            }
        }

        ).map((message) => (
          <p
            className={`chat__message ${
              message.email === currentUser.email && "chat__receiver"
            }`}
          > 
          <div  class="flex m-2 items-end justify-end">
             
           <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">

               <div className='mx-auto '>
                    <span className="chat__name">{message.username}</span>
                   <span className="chat__messageText">{message.message}</span> </div>
            </div>
           
            <img src={message.url} alt="My profile" class="w-6 h-6 rounded-full order-2"/>
          </div>
          
            
          </p>
        ))}
        </div>
         <div className="chat__footer" >
            
                  <TextField
               fullWidth
               multiLine
               variant='outlined'
            type="text"
            value={message}
            id="chatInput"
            onKeyPress={handleKeyDown}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
          />
          <Button type="submit" onClick={handleSubmit}>
            Send
          </Button>
                
            
          
        
         </div>
        
      
          </div>
         
	
        </Container>
    )
}

export default Chatbox
