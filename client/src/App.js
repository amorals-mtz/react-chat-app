import socketIO from 'socket.io-client';
import './App.css';

const socket = socketIO.connect('http://localhost:4000');

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className="App-title"> ¡Hello World! </p>
        <p> Lorem Ipsum... </p>
      </header>
    </div>
  );
}

export default App;
