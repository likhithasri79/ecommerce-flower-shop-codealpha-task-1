// src/components/Navbar.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaShoppingCart, FaUser, FaSignInAlt,FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setCurrentView, isLoggedIn, setIsLoggedIn }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setIsLoggedIn(false);
    };
    const navigate = useNavigate();
    return (
        <Nav>
            <NavContainer>
                <Logo onClick={()=>{setCurrentView('home'); navigate('/');}}>Flower Shop</Logo>
                <NavLinks>
                    <NavLink onClick={()=>setCurrentView('home')}>Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/shop" onClick={()=>{navigate('/shop');}} >Shop</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                </NavLinks>
                {/* <Icons>
                    <CartIcon>
                        <FaShoppingCart />
                    </CartIcon>
                    <UserIcon onClick={handleLoginClick}>
                        {isLoggedIn ? <FaUser /> : <FaSignInAlt />}
                        {showDropdown && (
                            <DropdownMenu>
                                {isLoggedIn ? (
                                    <DropdownItem onClick={() => { setIsLoggedIn(false); setCurrentView('home'); }}>Logout</DropdownItem>
                                ) : (
                                    <>
                                        <DropdownItem onClick={() => setCurrentView('login')}>Login</DropdownItem>
                                        <DropdownItem onClick={() => setCurrentView('register')>Register</DropdownItem>
                                    </>
                                )}
                            </DropdownMenu>
                        )}
                    </UserIcon>
                </Icons> */}
                <NavRight>
                <CartIcon>
                    <FaShoppingCart size={24} onClick={()=>{ navigate('/cart');}} />
                </CartIcon>
                {isLoggedIn ? (
                    <ProfileIcon>
                        <FaSignOutAlt size={24} title="Logout" />
                        <Dropdown>
                            <DropdownItem onClick={() => { logout(); }}>Logout</DropdownItem>
                        </Dropdown>
                    </ProfileIcon>
                ) : (
                    <ProfileIcon>
                        <FaUser size={24} title="Login/Register" />
                        <Dropdown>
                            <DropdownItem onClick={() => setCurrentView('login')}>Login</DropdownItem>
                            <DropdownItem onClick={() => setCurrentView('register')}>Register</DropdownItem>
                        </Dropdown>
                    </ProfileIcon>
                )}
            </NavRight>
            </NavContainer>
        </Nav>
    );
};

const Nav = styled.nav`
    width: 100%;
    background: transparent;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
`;

const NavContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
`;

const Logo = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
    cursor: pointer;
`;

const NavLinks = styled.div`
    display: flex;
    align-items: center;
`;

const NavLink = styled.div`
    color: white;
    font-size: 1.2rem;
    margin: 0 15px;
    text-decoration: none;
    transition: color 0.3s;
    cursor: pointer;

    &:hover {
        color: #ff6347;
    }
`;

const Icons = styled.div`
    display: flex;
    align-items: center;
`;

// const CartIcon = styled.div`
//     font-size: 1.5rem;
//     color: white;
//     margin-right: 15px;
//     cursor: pointer;
// `;

// const UserIcon = styled.div`
//     font-size: 1.5rem;
//     color: white;
//     position: relative;
//     cursor: pointer;
// `;

// const DropdownMenu = styled.div`
//     position: absolute;
//     top: 35px;
//     right: 0;
//     background: white;
//     border-radius: 5px;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//     overflow: hidden;
//     z-index: 1001;
//     width: 150px;
// `;

// const DropdownItem = styled.div`
//     padding: 8px 12px;
//     cursor: pointer;
//     color: black;
//     transition: background 0.3s;
//     font-size: 1rem;
//     &:hover {
//         background: #f1f1f1;
//     }

//     &:not(:last-child) {
//         border-bottom: 1px solid #ddd;
//     }
// `;

const NavRight = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
`;

const CartIcon = styled.div`
    cursor: pointer;
`;

const ProfileIcon = styled.div`
    position: relative;
    cursor: pointer;
    &:hover > div {
        display: block;
    }
`;

const Dropdown = styled.div`
    display: none;
    position: absolute;
    top: 30px;
    right: 0;
    background: white;
    color: black;
    border: 1px solid #ccc;
    border-radius: 4px;
    z-index: 1000;
`;

const DropdownItem = styled.div`
    padding: 10px;
    cursor: pointer;
    &:hover {
        background: #f0f0f0;
    }
`;

export default Navbar;
