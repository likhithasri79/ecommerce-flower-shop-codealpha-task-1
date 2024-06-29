// src/pages/HomePage.js
import React, {useState} from 'react';
import styled from 'styled-components';
import Descript from '../components/Descript';
import Login from '../components/Login';
import Register from '../components/Register';
import Navbar from '../components/Navbar';

const HomePage = ({currentView, setCurrentView, isLoggedIn, setIsLoggedIn}) => {
    // const [currentView, setCurrentView] = useState('home');
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    
    
    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setCurrentView('home');
    };

    return (
        <HomeContainer>
            {/* <Navbar setCurrentView={setCurrentView} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/> */}
            <Overlay>
            {currentView === 'home' && <Descript />}
                {currentView === 'login' && <Login  onLoginSuccess={handleLoginSuccess} />}
                {currentView === 'register' && <Register/>}
            </Overlay>
        </HomeContainer>
    );
};

const HomeContainer = styled.div`
    height: 100vh;
    width: 100vw;
    background: url('https://images.pexels.com/photos/5410042/pexels-photo-5410042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1') no-repeat center center/cover;
    margin: 0;  // Remove any margin around the container
    padding: 0;  // Remove any padding around the container
`;

const Overlay = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
`;



export default HomePage;
