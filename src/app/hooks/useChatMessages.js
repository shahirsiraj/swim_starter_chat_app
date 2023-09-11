import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../utils/firebase'

export default function useChatMessages(roomId) {

    console.log(roomId)
    const [snapshot, loading, error] = useCollection(
        roomId 
            ? query(
                collection(db, `rooms/${roomId}/messages`), 
                orderBy("timestamp", "asc")
            )
            : null 
    );

    if (loading) {
        console.log("Loading messages...");
        return [];
    }

    if (error) {
        console.error("Error loading messages:", error);
        return [];
    }

    if (!snapshot || snapshot.empty) {
        console.log("No messages found.");
        return [];
    }

    const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));

    console.log("Messages:", messages);
    return messages;
}
