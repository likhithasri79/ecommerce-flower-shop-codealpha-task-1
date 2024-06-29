// src/components/ItemDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ItemDetails = ({setCurrentView}) => {
    const { id } = useParams();
    const [flower, setFlower] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFlower = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/flowers/${id}`);
                setFlower(response.data);
            } catch (err) {
                console.error('Failed to fetch flower:', err);
            }
        };

        fetchFlower();
    }, [id]);

    const handleAddToCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setCurrentView('login');
            navigate('/', { state: { from: `/flower/${id}` } });
            return;
        }

        try {
            const userId = localStorage.getItem('userId'); 
            // Assuming you store userId in localStorage after login
            console.log(userId);
            await axios.post('http://localhost:5000/api/cart/add', {
                userId,
                flowerId: id,
                quantity: Number(quantity),
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(`Added ${quantity} of ${flower.name} to cart`);
            toast.success('Quantity updated successfully!');

        } catch (err) {
            console.error('Failed to add to cart:', err);
        }
    };

    if (!flower) {
        return <div>Loading...</div>;
    }

    return (
        <DetailsContainer>
            <ToastContainer />
            <ImageWrapper>
                <img src={flower.imageURL.replace('100x100', '400x400')} alt={flower.name} />
            </ImageWrapper>
            <DetailsWrapper>
                <h2>{flower.name}</h2>
                <p>{flower.description}</p>
                <p><b>Price : </b>${flower.price}</p>
                <QuantityContainer>
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </QuantityContainer>
                <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
            </DetailsWrapper>
        </DetailsContainer>
    );
};

const DetailsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    margin-top: 180px; /* Adjust for navbar visibility */
    background-color: white;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
`;

const ImageWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 300px;
        height: auto;
        border-radius: 8px;
    }
`;

const DetailsWrapper = styled.div`
    flex: 2;
    padding: 20px;

    h2 {
        font-size: 2rem;
        margin: 20px 0;
    }

    p {
        font-size: 1.2rem;
        margin: 10px 0;
    }
`;

const QuantityContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0;

    label {
        font-size: 1.2rem;
        margin-right: 10px;
    }

    input {
        width: 60px;
        padding: 5px;
        font-size: 1.2rem;
        text-align: center;
    }
`;

const AddToCartButton = styled.button`
    padding: 10px 20px;
    font-size: 1.2rem;
    color: white;
    background: #ff6347;
    border: none;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
        background: #e5533d;
    }
`;

export default ItemDetails;
