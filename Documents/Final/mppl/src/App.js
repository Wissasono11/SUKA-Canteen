import React from "react";
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import LoginMhs from './pages/LoginMhs';
import LoginOwn from './pages/LoginOwn';
import Menu from './pages/Menu';
import Order from './pages/Order';
import Pesenan from './pages/Pesenan';
import Profil from './pages/Profil';
import Toko from './pages/Toko';
import {BrowserRouter, Routes, Route, Router} from 'react-router-dom';

function App() {
    return (
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/profil' element={<Profil/>}/>
        <Route path='/Pesenan' element={<Pesenan/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/menu' element={<Menu/>}/>
        <Route path='/loginOwn' element={<LoginOwn/>}/>
        <Route path='/loginMhs' element={<LoginMhs/>}/>
        <Route path='/toko' element={<Toko/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
      </BrowserRouter>
    );
}

export default App;