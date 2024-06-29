// src/components/FlowerList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlowerCard from './FlowerCard';

const FlowerList = ({ limit }) => {
    const [flowers, setFlowers] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchFlowers = async () => {
            const { data } = await axios.get('/api/flowers');
            setFlowers(data);
        };

        fetchFlowers();
    }, []);

    return (
        <div>
            {flowers.slice(0, showAll ? flowers.length : limit).map(flower => (
                <FlowerCard key={flower._id} flower={flower} />
            ))}
            {!showAll && flowers.length > limit && (
                <button onClick={() => setShowAll(true)}>Show All</button>
            )}
        </div>
    );
};

export default FlowerList;
