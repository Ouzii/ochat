import { FormEvent, useState } from "react";
import { CirclePicker } from "react-color";

interface Props {
    sendMessage: Function;
    connected: boolean;
}
const InputArea = ({ sendMessage, connected }: Props) => {
    const [message, setMessage] = useState<string>('');
    const [username, setUsername] = useState<string>('Anon');
    const [color, setColor] = useState<string>('#2196f3');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        sendMessage(username, color, message);
        setMessage('');
    }
    return (
        <form className='inputArea' onSubmit={handleSubmit}>
            <label>Username</label>
            <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}></input>
            <CirclePicker color={color} onChange={(c) => setColor(c.hex)} />
            <label>Message</label>
            <textarea value={message} rows={6} cols={24} onChange={(e) => setMessage(e.target.value)}></textarea>
            <input type='submit' value='Send' disabled={!connected}></input>
        </form>
    );
}

export default InputArea;