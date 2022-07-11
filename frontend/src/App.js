import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Genre from './pages/Genre';
import { Account, AccountContext } from './context/Account';
import Confirm from './pages/Confirm';

function App() {
  return (
    <BrowserRouter>
      {/* Wrap our Routes with our Account Provider */}
      <Account>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="/genre" element={<Genre />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="*"
            element={
              <main style={{ padding: '1rem' }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </Account>
    </BrowserRouter>
  );
}

export default App;
