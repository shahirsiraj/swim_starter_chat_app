'use client'
import { useEffect } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import {doc, getDoc, setDoc,  serverTimestamp} from 'firebase/firestore'

export default function useAuth() {
    const [user] = useAuthState(auth)

    useEffect(() => {
        if (user) {
    const userReference = doc(db, `users/${user.uid}`)
            getDoc(userReference).then(snapshot => {
                if (!snapshot.exists()) {
                    setDoc(snapshot.ref, {
                        name: user.displayName,
                        photo: user.photoURL,
                        timestamp:serverTimestamp()
            })
        }
    } )
}
        
    }, [user])

    return user
}