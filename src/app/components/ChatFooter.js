import { Send } from '@mui/icons-material'

export default function ChatFooter({
    input,
    onChange,
    image, 
    user, 
    room, 
    roomId,
    sendMessage
}) {

    console.log(input)

    return (
        <div className='chat__footer'>
            <form onSubmit={sendMessage}>
                <input
                    value={input}
                    onChange={onChange}
                    placeholder='Type a message' />
                <button type="submit" className='send__btn'>
                <Send style = {{width: 20, height: 20, color: 'white'}}/>
                </button>
            </form>

        </div>
    )
}