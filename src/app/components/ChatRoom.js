'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import useRoom from '../hooks/useRoom'
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material'
import { AddPhotoAlternate, MoreVert, Send } from '@mui/icons-material'
import ChatFooter from './ChatFooter'
import { useState } from 'react'
import { serverTimestamp, setDoc, doc, getDoc, addDoc, collection, orderBy, query} from 'firebase/firestore'
import ChatMessages from './ChatMessages'
import useChatMessages from '../hooks/useChatMessages'
// import {useCollection} from 'react-firebase-hooks/firestore'
// import { collection, orderBy, query } from 'firebase/firestore'
import {db} from '../utils/firebase'



export default function ChatRoom({ user }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [image, setImage] = useState(null)
    const [ input, setInput] = useState('')
    const [src, setSrc] = useState('')
    const roomId = searchParams.get('roomId') ?? ""
    const userId = user.uid
    const room = useRoom(roomId, userId)
    console.log(roomId)
    console.log(input)
    const messages = useChatMessages(roomId)
    console.log(messages)

    if (!room) return null 

// ...

async function sendMessage(e) {
  e.preventDefault();

    

  // Create the new message object with user input
  const newMessage = {
    name: user.displayName,
    message: input,
    uid: user.uid,
    timestamp: serverTimestamp(),
    time: new Date().toUTCString(),
  };

    
    console.log(newMessage)
  // Clear the input field
  setInput('');

  try {
    // First, update the user's chat document (if needed)
    // Replace 'users' with the correct collection name
    await setDoc(doc(db, `users/${userId}/chats/${roomId}`), {
      name: room.name,
      photoURL: room.photoURL || null,
      timestamp: serverTimestamp(),
    });

    // Then, add the new message to the room's messages collection
    // Replace 'rooms' with the correct collection name
    await addDoc(collection(db, `rooms/${roomId}/messages`), newMessage);
  } catch (error) {
    // Handle any potential errors here
    console.error('Error sending message:', error);
  }
}




    return (
        <div className='chat'>
            <div className='chat__background'> 
                
                <div className='chat__header'>
                    <div className='avatar__container'>
                        <Avatar src={room.photoURL} alt={room.name}/>
                    </div>
                    <div className='chat__header--info'>
                        <h3>{room.name}</h3>
                    </div>
                    <div className='chat__header--right'>
                        <input
                            id="image"
                            style={{ display: 'none' }}
                            accept='image/*'
                            type="file"
                            // onChange={showPreview  }
                        />
                        <IconButton>
                            <label style={{ cursor: "pointer", height: 24 }} htmlFor='image'> 
                                <AddPhotoAlternate/>
                            </label>
                        </IconButton>
                        <IconButton>
                            <MoreVert/>
                        </IconButton>
                        <Menu id="menu" keepMounted>
                            <MenuItem>Delete Room</MenuItem>
                        </Menu>


                    </div>
                </div>

            </div>
            {/* <MediaPreview src={src} */}
            <div className='chat__body--container'>
                <div className='chat__body'>
                    <ChatMessages messages ={messages} user={user} roomId={roomId}/>
                </div>
            </div>
            
            <div className='chat__footer'>
            <form onSubmit={sendMessage}>
                <input
                    value={input}
                    onChange={e=>setInput(e.target.value)}
                    placeholder='Type a message' />
                <button type="submit" className='send__btn'>
                <Send style = {{width: 20, height: 20, color: 'white'}}/>
                </button>
            </form>

        </div>
        </div>
    )
}