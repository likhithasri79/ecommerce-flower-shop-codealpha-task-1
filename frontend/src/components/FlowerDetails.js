// src/components/FlowerDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FlowerDetails = () => {
    const { id } = useParams();
    const [flower, setFlower] = useState(null);

    useEffect(() => {
        const fetchFlower = async () => {
            const { data } = await axios.get(`/api/flowers/${id}`);
            setFlower(data);
        };

        fetchFlower();
    }, [id]);

    const addToCart = () => {
        // Implement add to cart functionality
        console.log('Added to cart');
    };

    if (!flower) return <div>Loading...</div>;

    return (
        <div>
            <img src={flower.image} alt={flower.name} />
            <h1>{flower.name}</h1>
            <p>{flower.description}</p>
            <p>${flower.price}</p>
            <button onClick={addToCart}>Add to Cart</button>
        </div>
    );
};

export default FlowerDetails;
