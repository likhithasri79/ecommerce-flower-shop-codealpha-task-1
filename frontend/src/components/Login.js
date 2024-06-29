// src/components/Login.js
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = ({ switchToRegister, onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
            console.log('Login successful:', response.data);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data._id);
            onLoginSuccess();
            const from = location.state?.from || '/';
            navigate(from); 
        } catch (err) {
            console.error('Login failed:', err);
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <FormContainer>
            <h2>Login</h2>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form onSubmit={handleSubmit}>
                <Label>Email:</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Label>Password:</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <Button type="submit">Login</Button>
            </Form>
            <SwitchLink onClick={switchToRegister}>Don't have an account? Register</SwitchLink>
        </FormContainer>
    );
};

const FormContainer = styled.div`
    background: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 400px;
    text-align: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    margin: 10px 0 5px;
`;

const Input = styled.input`
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #ff6347;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
        background-color: #e5533d;
    }
`;

const ErrorMessage = styled.div`
    color: red;
    margin-bottom: 15px;
`;

const SwitchLink = styled.div`
    margin-top: 15px;
    color: #007bff;
    cursor: pointer;
`;

export default Login;
