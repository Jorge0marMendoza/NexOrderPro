import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/OrderList.css';
import { Link } from 'react-router-dom';

function OrderList() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('/api/orders')
            .then(response => setOrders(response.data))
            .catch(error => console.error('Error fetching orders:', error));
    }, []);

    return (
        <div className="order-list">
            <h2>Order List</h2>
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer Name</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Order Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.orderId}>
                            <td>{order.orderId}</td>
                            <td>{order.customerName}</td>
                            <td>{order.product.productName}</td>
                            <td>{order.quantity}</td>
                            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                            <td className="actions-cell">
                                <Link to={`/order-details/${order.orderId}`} className="order-details-link">
                                    <button className="icon-button" aria-label="View Order Details">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                            <circle cx="12" cy="5" r="2" />
                                            <circle cx="12" cy="12" r="2" />
                                            <circle cx="12" cy="19" r="2" />
                                        </svg>
                                        <span className="button-text">Details</span>
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default OrderList;