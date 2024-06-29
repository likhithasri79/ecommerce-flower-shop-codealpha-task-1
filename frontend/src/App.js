// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Descript from './components/Descript';
import Login from './components/Login';
import Register from './components/Register';
import GlobalStyle from './GlobalStyle';
import Shop from './components/Shop';
import ItemDetails from './components/ItemDetails';
import Cart from './components/Cart';

const App = () => {
    const [currentView, setCurrentView] = useState('home');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    

    return (
        <>
            <GlobalStyle />
            <Router>
            <Navbar setCurrentView={setCurrentView} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                <Routes>
                    <Route path="/" element={<HomePage currentView={currentView} setCurrentView={setCurrentView} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
                    <Route path="/about" element={<div>About Page</div>} />
                    <Route path="/contact" element={<div>Contact Page</div>} />
                    <Route path="/cart" element={<Cart setCurrentView={setCurrentView}/>} />
                    <Route path="/login" element={<div>Login Page</div>} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/flower/:id" element={<ItemDetails setCurrentView={setCurrentView}/>} />
                </Routes>
                
                {/* {currentView === 'home' && <Descript />}
                {currentView === 'login' && <Login switchToRegister={showRegister} />}
                {currentView === 'register' && <Register switchToLogin={showLogin} />} */}
            </Router>
        </>
    );
};

export default App;
