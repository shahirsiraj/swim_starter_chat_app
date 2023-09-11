import { ExitToApp, SearchOutlined, Add, Home, Message, PeopleAlt} from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import { useState } from 'react'
import SidebarTab from './SidebarTab'
import SidebarList from './SidebarList'
            import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRouter } from 'next/navigation'
import { db, auth } from '../utils/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import useRooms from '../hooks/useRooms'
import useUsers from '../hooks/useUsers'
import useChats from '../hooks/useChats'


const tabs = [
    {
        id: 1,
        icon: <Home/>
    }, 
    {
        id: 2,
        icon: <Message/>
    }, 
    {
        id: 3,
        icon: <PeopleAlt/>
    }
]

export default function Sidebar({ user }) {
    const [menuSelection, setMenuSelection] = useState(0)

    const [roomName, setRoomName] = useState('')

    const [ isCreatingRoom, setCreatingRoom] = useState(false)

    const [openDialog, setOpenDialog] = useState(false);
    
    const router = useRouter()

    const rooms = useRooms()

    const users = useUsers(user)

    const chats = useChats(user)

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
    const data = [{
        id: 1,
        name: 'John Doe', 
        photo:'https://1h3.googleusercontent.com/a/AGNmyxYVe3ui1366LWIBwSz_'
    }]

    async function createRoom() {
        if (roomName?.trim) {
            const roomsRef = collection(db, "rooms")
            const newDoc= await addDoc(roomsRef, {
                name: roomName,
                timestamp: serverTimestamp()
            })
            setCreatingRoom(false)
            setRoomName('')
            setMenuSelection(2)
            router.push(`/?roomId=${newDoc.id}`)
        }
    }

    // async function searchUsersAndRooms(e) {
    //     e, preventDefault()
    //     const searchValue = event.target.elements.seach
    // }

    return (
        <div className='sidebar'>
            <div className="sidebar__header">
                <div className="sidebar__header--left">
                    <Avatar src={user?.photo} alt={user?.displayName} />
                    <h4>{user?.displayName}</h4>
                </div>
                <div className='sidebar__header--right'>
                    <IconButton onClick={()=> auth.signOut()}>
                        <ExitToApp/>
                    </IconButton>
                </div>
            </div>
            <div className='sidebar__search'>
                <form className='sidebar__search--container'>
                    <SearchOutlined />
                    <input
                        type="text"
                        id='search'
                        placeholder='Search for users'
                    />
                </form>
            </div>

<div className='sidebar_menu'>
    {tabs.map(tab => (
        <SidebarTab
            key={tab.id} // Use 'tab.id' instead of 'tabs.id'
            onClick={() => setMenuSelection(tab.id)}
            isActive={tab.id === menuSelection}
        > 
            <div className='sidebar__menu--home'>
                {tab.icon} 
                <div className='sidebar__menu--line'></div>
            </div>
        </SidebarTab>
    ))}
</div>


    {menuSelection === 1 ? (
            <SidebarList title="Chats" data={chats}/>
            ) : menuSelection === 2 ? (
            <SidebarList title='Rooms' data={rooms}/>
        ) : menuSelection === 3 ? (
            <SidebarList title="Users" data={users}/>
        ) : menuSelection === 4 ? (
        <SidebarList title='Search' data = {data}/>
            ) : null }


            <div className='sidebar__chat--addRoom'>
                <IconButton onClick={handleClickOpen}>
                    <Add/>
                </IconButton>
            </div>
    
  
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Create New Group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Type the name of your public room. Every user will have access to this room.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="Group Name"
            label="Group Name"
                        type="text"
                        value={roomName}
                        onChange={(e)=>setRoomName(e.target.value)}
            fullWidth
                        variant="filled"
                        style={{marginTop:20}}
                        
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>Cancel</Button>
          <Button color="success" onClick={createRoom}>Submit</Button>
        </DialogActions>
      </Dialog>
    



    </div>
)
}