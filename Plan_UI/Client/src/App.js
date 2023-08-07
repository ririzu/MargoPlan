import { Routes, Route } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navigation/Navbar.js';
import Home from './components/Home/Home.js';
import Database from './components/Database/Database.js';
import Layout from './components/Layout/Layout.js';
import MargoCart from './components/MargoCart/MargoCart.js';
import Login from './components/Access/Login.js';
import Register from './components/Access/Register.js';
import Profile from './components/Access/Profile';

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route key='home' path="/" element={<Home />} />
        <Route key='database' path="/database" element={<Database />} />
        <Route key='layoout' path="/layout" element={<Layout />} />
        <Route key='margocart' path="/margocart" element={<MargoCart />} />
        <Route key='login' path="/login" element={<Login />} />
        <Route key='register' path="/register" element={<Register />} />
        <Route key='profile' path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

