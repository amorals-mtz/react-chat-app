import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatBody = ({ messages, lastMessageRef }) => {
    const navigate = useNavigate();

    const handleLeaveChat = () => {
        localStorage.removeItem('userName');
        navigate('/');
        window.location.reload();
    };

    return (
        <>
            <header className="chat__mainHeader">
                <p> Hangout with Colleagues </p>
                <button className="leaveChat__btn" onClick={handleLeaveChat}>
                    LEAVE CHAT
                </button>
            </header>

            <div className="message__container">
                {messages.map((msg) =>
                    msg.name === localStorage.getItem('userName') ? (
                        // Shows messages sent from you.
                        <div className="message__chats" key={msg.id}>
                            <p className="sender__name"> You </p>
                            <div className="message__sender">
                                <p>{msg.text}</p>
                            </div>
                        </div>
                    ) : (
                        // Shows messages received by you.
                        <div className="message__chats" key={msg.id}>
                            <p>{msg.name}</p>
                            <div className="message__recipient">
                                <p>{msg.text}</p>
                            </div>
                        </div>
                    )
                )}
                {/*This is triggered when a user is typing*/}
                <div className="message__status">
                    <p> Someone is typing... </p>
                </div>

                {/*--- At the bottom of the JSX element ----*/}
                <div ref={lastMessageRef} />
            </div>
        </>
    );
};

export default ChatBody;
