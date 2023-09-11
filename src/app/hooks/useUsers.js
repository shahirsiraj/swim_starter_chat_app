import {useCollection} from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from 'firebase/firestore'
import {db} from '../utils/firebase'


export default function useUsers(user) {
    const [snapshot] = useCollection(
        query(collection(db, "users"),orderBy('timestamp','desc'))
    )
    

    const users = []
        
    snapshot?.docs.forEach(doc => {
        const id = doc.id > user.uid? `${doc.id}${user.uid}` : `${user.uid}${doc.id}`
   
   
        if (doc.id !== users.uid) {
       users.push({id, ...doc.data()})
   }
   
    })
    
    return users

}