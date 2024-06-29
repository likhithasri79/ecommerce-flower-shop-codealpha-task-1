// src/components/Register.js
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Register = ({ switchToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', { name, email, password });
            console.log('Registration successful:', response.data);
            // Handle successful registration (e.g., redirect user, show success message)
        } catch (err) {
            console.error('Registration failed:', err);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <FormContainer>
            <h2>Register</h2>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form onSubmit={handleSubmit}>
                <Label>Name:</Label>
                <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                <Label>Email:</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Label>Password:</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <Label>Confirm Password:</Label>
                <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                <Button type="submit">Register</Button>
            </Form>
            <SwitchLink onClick={switchToLogin}>Already have an account? Login</SwitchLink>
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

export default Register;
