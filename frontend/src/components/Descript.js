import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Descript = ()=>{
    const navigate = useNavigate();
    return(
        <Description>
            <WelcomeText>WELCOME TO FLORIST</WelcomeText>
            <Title>Let's Make Beautiful Flowers a Part of Your Life.</Title>
            <SubText>Explore a vibrant tapestry of blooms and arrangements that add color, fragrance, and elegance to your life. Discover the perfect floral expression for every moment and occasion.</SubText>
            <ShopButton onClick={()=>{navigate('/shop');}}>Shop Now</ShopButton>  
        </Description>
    )
};

const Description = styled.div`
    text-align: center;
    color: white;
    max-width: 700px;
    padding: 20px;
`;

const WelcomeText = styled.p`
    font-family: 'Sans-serif', Arial, sans-serif;
    font-size: 1.2rem;
    margin-bottom: 1rem;
`;

const Title = styled.h1`
    font-family: 'Times New Roman', Times, serif;
    font-size: 3rem; // Increased size
    letter-spacing: 2px; // Adjust letter spacing for spreading
    margin-bottom: 1rem;
`;

const SubText = styled.p`
    font-family: 'Calibri', Arial, sans-serif;
    font-size: 1.2rem;
    margin-bottom: 1rem;
`;

const ShopButton = styled.button`
    padding: 12px 24px;
    font-size: 1.1rem;
    color: white;
    background: #ff6347;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;

    &:hover {
        background: #e5533d;
        transform: scale(1.05);
    }

    &:active {
        transform: scale(1);
    }
`;


export default Descript;