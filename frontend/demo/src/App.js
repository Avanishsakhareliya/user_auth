import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import CustomerRegistration from './component/CustomerRegistration';
import AdminRegistration from './component/AdminRegistration';
import Home from './component/Home';
import LoginForm from './component/LoginComponent/LoginForm';
import Notify from './Notify';
import Dashboard from './component/Dashboard';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route exact path="/" element={<Home/>} />
    <Route exact path='/dashboard' element={<Dashboard/>}/>
    <Route exact path="/customer-registration" element={<CustomerRegistration/>} />
    <Route exact path="/admin-registration" element={<AdminRegistration/>} />
    <Route path="/admin-login" element={<LoginForm userType="admin" />} />
    <Route path="/customer-login" element={<LoginForm userType="customer" />} />
    </Routes>
    <Notify/>
  </BrowserRouter>
  );
}

export default App;
