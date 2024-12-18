/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/

import Button from '@mui/material/Button';
//import Navbar from './Components/AppBar'
import SideBar from './Admin_Components/SideBar'
//import { BrowserRouter, Routes, Route, Navigate, Router } from 'react-router-dom';
//import Request from './Components/Request'

function App() {
  return (
    <div className="App">
      <SideBar />
    </div>
  );
}

export default App;
