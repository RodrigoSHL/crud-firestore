import React from 'react'
import Task from './components/Task';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Login } from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="task" element={<Task />} />
          </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;

