'use client'


// import { useAuthState } from 'react-firebase-hooks/auth'
// import { useCollectionData } from 'react-firebase-hooks/firestore'

import Login from './components/Login'
import useAuth from './hooks/authHook'
import Sidebar from './components/Sidebar'
import Chat from './components/ChatRoom'

export default function Home() {
  const user = useAuth()

  if (!user) return <Login/>

  
  return (
    <main className="app">
      <div className="app__body">
        <Sidebar user={user} />
        <Chat user={user} />
      </div>
    </main>
  )
}
