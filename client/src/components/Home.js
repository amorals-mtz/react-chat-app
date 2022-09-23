import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Home page for the chat application that accepts the username
 * and saves it to the local storage for identification.
 */
const Home = ({ socket }) => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('userName', userName);
        // Sends the username and socket ID to the server.
        socket.emit('newUser', { userName, socketID: socket.id });
        navigate('/chat');
    };
    return (
        <form className="home__container" onSubmit={handleSubmit}>
            <h2 className="home__header"> Sign in to Open Chat </h2>
            <label htmlFor="username"> Username </label>
            <input
                id="username"
                type="text"
                className="username__input"
                minLength={6}
                name="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <button className="home__cta"> SIGN IN </button>
        </form>
    );
};

export default Home;
