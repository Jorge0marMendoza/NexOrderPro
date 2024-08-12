import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/css/OrderDetails.css';
function OrderDetails() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (orderId) {
            fetchOrderDetails(orderId);
        }
    }, [orderId]);

    const fetchOrderDetails = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/orders/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch order details');
            }
            const data = await response.json();
            setOrder(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching order details:', error);
            setError('Failed to load order details. Please try again.');
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error-message">{error}</div>
            </div>
        );
    }

    if (!order) {
        return <div className="error-container">No order found with ID {orderId}</div>;
    }

    return (
        <div className="order-details-container">
            <h2 className="order-details-title">Order Details</h2>
            <div className="order-info">
                <p><strong>Order ID:</strong> <span>{order.orderId}</span></p>
                <p><strong>Customer:</strong> <span>{order.customerName}</span></p>
                <p><strong>Product:</strong> <span>{order.product.productName}</span></p>
                <p><strong>Description:</strong> <span>{order.product.description}</span></p>
                <p><strong>Quantity:</strong> <span>{order.quantity}</span></p>
                <p><strong>Unit Price:</strong> <span>${order.product.productPrice.toFixed(2)}</span></p>
                <p className="highlight"><strong>Total:</strong> <span>${(order.quantity * order.product.productPrice).toFixed(2)}</span></p>
                <p><strong>Order Date:</strong> <span>{new Date(order.orderDate).toLocaleDateString()}</span></p>
            </div>
            <div className="receipt-footer">
                Thank you for your purchase!
            </div>
        </div>
    );
}

export default OrderDetails;