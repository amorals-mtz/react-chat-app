import React, { useEffect, useState, useRef } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

const ChatPage = ({ socket }) => {
    const [messages, setMessages] = useState([]);
    const lastMessageRef = useRef(null);

    useEffect(() => {
        // Listen for messages sent via the `messageResponse` event and spread
        // the data into the messages array to display to all users.
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
    }, [socket, messages]);

    useEffect(() => {
        // Scroll to bottom every time messages change.
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="chat">
            <ChatBar socket={socket} />
            <div className="chat__main">
                <ChatBody
                    messages={messages}
                    lastMessageRef={lastMessageRef} />
                <ChatFooter socket={socket} />
            </div>
        </div>
    );
};

export default ChatPage;
