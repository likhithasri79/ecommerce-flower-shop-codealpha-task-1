// src/components/Shop.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Shop = () => {
    const [flowers, setFlowers] = useState([]);

    useEffect(() => {
        const fetchFlowers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/flowers');
                setFlowers(response.data);
                console.log(flowers);
            } catch (err) {
                console.error('Failed to fetch flowers:', err);
            }
        };

        fetchFlowers();
    }, []);

    return (
        <ShopContainer>
            {flowers.map((flower) => (
                <FlowerCard key={flower._id}>
                    <ImageWrapper>
                        <img src={flower.imageURL.replace('100x100', '400x400')} alt={flower.name} />
                    </ImageWrapper>
                    <h3>{flower.name}</h3>
                    <p>${flower.price}</p>
                    <Link to={`/flower/${flower._id}`}>View Details</Link>
                </FlowerCard>
            ))}
        </ShopContainer>
    );
};

const ShopContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center; /* Center the container */
    padding: 20px;
    background-color: rgb(255,229,204);
    margin-top: 80px; /* Push the container down for navbar visibility */
    max-width: 1010px; /* Restrict the width of the container */
    margin-left: auto;
    margin-right: auto;
    border: 2px solid rgb(255,178,102);
    border-radius: 8px;
`;

const FlowerCard = styled.div`
    border: 1px solid black;
    border-radius: 8px;
    padding: 5px; /* Add padding inside the card */
    margin: 5px;
    
    text-align: center;
    width: 300px; /* Fixed width for the card */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;

    img {
        width: 150px; /* Fixed width for images */
        height: auto;
        border-radius: 8px;
    }

    h3 {
        font-size: 1.2rem;
        margin: 10px 0;
    }

    p {
        font-size: 1rem;
        margin: 5px 0 20px; /* Ensure margin at bottom for button alignment */
    }

    a {
        display: inline-block;
        padding: 10px 20px;
        background: #ff6347;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        transition: background 0.3s;

        &:hover {
            background: #e5533d;
        }
    }
`;

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
    margin-bottom: 10px;
`;

export default Shop;
