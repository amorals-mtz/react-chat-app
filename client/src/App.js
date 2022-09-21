import { BrowserRouter, Routes, Route } from 'react-router-dom';
import socketIO from 'socket.io-client';

import './App.css';
import Home from './components/Home';
import ChatPage from './components/ChatPage';

const socket = socketIO.connect('http://localhost:4000');

function _App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className="App-title"> ¡Hello World! </p>
        <p> Lorem Ipsum... </p>
      </header>
    </div>
  );
}

// Assign routes for the pages of the application and passes
// the Socket.io library into the components.
function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
