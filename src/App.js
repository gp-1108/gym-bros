import React from 'react';
import './App.css';
import Homepage from './homepage';
import SignUp from './signup.js';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AuthContext from './authcontext';

function App() {
  return (
    <AuthContext>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </AuthContext>
  );
}

export default App;
