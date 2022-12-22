import React from 'react';
import './App.css';
import Homepage from './pages/homepage';
import SignUp from './pages/signup.js';
import Bookings from './pages/bookings.js';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AuthContext from './authcontext';
import Settings from './pages/settings.js';
import Info from './pages/info.js';

function App() {
  return (
    <AuthContext>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/bookings' element={<Bookings />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/info' element={<Info />} />
        </Routes>
      </BrowserRouter>
    </AuthContext>
  );
}

export default App;
