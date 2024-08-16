import { CustomMessage } from "../../App"

const MessagesArea = ({ messages }: { messages: CustomMessage[] }) => {
    return (
        <div className='messageArea'>
            <ul>
                {messages.map((msg) => <li key={msg.msg + msg.color} style={{ color: msg.color }}>{msg.msg}</li>)}
            </ul>
        </div>
    )
}

export default MessagesArea