import React, { useEffect, useState } from 'react'
import Task from './components/Task';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Login } from './components/Login';
import Admin from './components/Admin';
import { auth } from './firebase';

function App() {

  const [firebaseUser, setFirebaseUser] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log('user', user)
    });
  }, [])

  return (
    <BrowserRouter>
      <Navbar/>
      <div className="container mt-3">
          <Routes>
            <Route path="task" element={<Task />} />
            <Route path="admin" element={<Admin />} />
            <Route path="login" element={<Login />} />
            <Route path="/" element={<Admin/>} />

          </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;

