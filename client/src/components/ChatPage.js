import React, { useEffect, useState } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

const ChatPage = ({ socket }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Listen for messages sent via the `messageResponse` event and spread
        // the data into the messages array to display to all users.
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
    }, [socket, messages]);

    return (
        <div className="chat">
            <ChatBar socket={socket} />
            <div className="chat__main">
                <ChatBody messages={messages} />
                <ChatFooter socket={socket} />
            </div>
        </div>
    );
};

export default ChatPage;
