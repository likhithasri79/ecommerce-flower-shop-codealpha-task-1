// src/components/Cart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Cart = ({setCurrentView}) => {
    const [cart, setCart] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                setCurrentView('login');
                navigate('/');
                return;
            }
            try {
                const response = await axios.post(`http://localhost:5000/api/cart/`,{
                    
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setCart(response.data);
            } catch (err) {
                console.error('Failed to fetch cart:', err);
            }
        };

        fetchCart();
    }, [navigate]);

    const handleQuantityChange = async (flowerId, quantity) => {
        if (quantity < 1) return;
        const userId = localStorage.getItem('userId');
        try {
            await axios.post('http://localhost:5000/api/cart/add', {
                userId,
                flowerId,
                quantity,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setCart(prevCart => {
                const updatedItems = prevCart.items.map(item => {
                    if (item.flower._id === flowerId) {
                        return { ...item, quantity };
                    }
                    return item;
                });
                const total = updatedItems.reduce((sum, item) => sum + item.flower.price * item.quantity, 0);
                return { ...prevCart, items: updatedItems, total };
            });
        } catch (err) {
            console.error('Failed to update cart:', err);
        }
    };

    const handleRemoveItem = async (flowerId) => {
        const userId = localStorage.getItem('userId');
        try {
            await axios.delete(`http://localhost:5000/api/cart/${userId}/flower/${flowerId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setCart(prevCart => {
                const updatedItems = prevCart.items.filter(item => item.flower._id !== flowerId);
                const total = updatedItems.reduce((sum, item) => sum + item.flower.price * item.quantity, 0);
                return { ...prevCart, items: updatedItems, total };
            });
        } catch (err) {
            console.error('Failed to remove item from cart:', err);
        }
    };

    const handleCheckout = () => {
        // Implement checkout logic
        console.log('Checkout button clicked');
    };

    if (!cart) {
        return <CartContainer>
            <h3>
                No Items added to cart yet...
            </h3>
             </CartContainer>;
    }

    return (
        <CartContainer>
            <ItemsContainer>
                {cart.items.map((item) => (
                    <Item key={item.flower._id}>
                        <ItemDetails>
                        <img src={item.flower.imageURL.replace('50x50', '100x100')} alt={item.flower.name} />
                            <h3>{item.flower.name}</h3>
                            <p>Quantity: {item.quantity}</p>
                            <Button onClick={() => handleQuantityChange(item.flower._id, item.quantity - 1)}>-</Button>
                            <Button onClick={() => handleQuantityChange(item.flower._id, item.quantity + 1)}>+</Button>
                            <Button onClick={() => handleRemoveItem(item.flower._id)}>Clear</Button>
                        </ItemDetails>
                        <ItemPrice>${item.flower.price * item.quantity}</ItemPrice>
                    </Item>
                ))}
            </ItemsContainer>
            <SummaryContainer>
                <h2>Order Summary</h2>
                {cart.items.map((item) => (
                    <SummaryItem key={item.flower._id}>
                        <span>{item.flower.name}</span>
                        <span>${item.flower.price * item.quantity}</span>
                    </SummaryItem>
                ))}
                <Total>
                    <span>Total</span>
                    <span>${cart.total}</span>
                </Total>
                <CheckoutButton onClick={handleCheckout}>Checkout</CheckoutButton>
            </SummaryContainer>
        </CartContainer>
    );
};

const CartContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    margin-top: 80px;
    background-color: white;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
`;

const ItemsContainer = styled.div`
    flex: 3;
    padding: 20px;
    border-right: 1px solid #ddd;
`;

const Item = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const ItemDetails = styled.div`
    flex: 1;

    h3 {
        font-size: 1.2rem;
        margin: 10px 0;
    }

    p {
        font-size: 1rem;
        margin: 5px 0;
    }
`;

const ItemPrice = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
`;

const Button = styled.button`
    margin: 5px;
    padding: 5px 10px;
    background: #ff6347;
    color: white;
    border: none;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
        background: #e5533d;
    }
`;

const SummaryContainer = styled.div`
    flex: 1;
    padding: 20px;

    h2 {
        font-size: 1.5rem;
        margin-bottom: 20px;
    }
`;

const SummaryItem = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    span {
        font-size: 1.2rem;
    }
`;

const Total = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 1.5rem;
    font-weight: bold;
`;

const CheckoutButton = styled.button`
    width: 100%;
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

export default Cart;
