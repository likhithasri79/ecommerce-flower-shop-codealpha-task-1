// src/components/FlowerCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const FlowerCard = ({ flower }) => {
    return (
        <div>
            <Link to={`/flower/${flower._id}`}>
                <img src={flower.image} alt={flower.name} />
                <h2>{flower.name}</h2>
                <p>${flower.price}</p>
            </Link>
        </div>
    );
};

export default FlowerCard;
