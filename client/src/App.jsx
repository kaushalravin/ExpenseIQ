import { useState } from 'react'
import {Route,Routes,BrowserRouter} from "react-router-dom";
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Dashboard from './components/Dashboard.jsx';
import Filter from './components/Filter.jsx';

import './App.css'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/auth/login' element={<Login/>}></Route>
          <Route path='/auth/signup' element={<Signup/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/filter' element={<Filter/>}></Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
