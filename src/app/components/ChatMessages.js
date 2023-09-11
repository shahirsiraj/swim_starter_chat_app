export default function ChatMessages({ messages, user, roomId }) {

    if (!messages) return null 

    return messages.map(message => {
        const isSender = message.uid === user.uid 
        
        return (
            <div key={user.id}  className={`chat__message ${isSender ? "chat__message--sender" : ""}`}>

                <span className="chat__name">{message.name}</span>
                <span className="chat__message--message">{message.message}</span>
                <span className="chat__timestamp">{message.time}</span> 
            </div>
        )


    })
    
}