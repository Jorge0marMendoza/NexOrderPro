import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/OrderCreation.css';

function OrderCreation() {

    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState({
        customerName: '',
        productId: '',
        quantity: 1
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        axios.get('/api/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const orderPayload = {
            productId: parseInt(order.productId, 10),
            customerName: order.customerName,
            quantity: parseInt(order.quantity, 10)
        };

        try {
            await axios.post('/api/orders', orderPayload);
            setSuccess('Order created successfully!');
            setOrder({ customerName: '', productId: '', quantity: 1 });
        } catch (error) {
            if (error.response && error.response.data) {
                console.error('Validation errors:', error.response.data.errors);
                setError('Failed to create order. Please check your input and try again.');
            } else {
                console.error('Error creating order:', error.message);
                setError('Failed to create order. Please try again.');
            }
        }
    };

    return (
        <div className="order-creation">
            <h2>Create New Order</h2>
            <form onSubmit={handleSubmit} className="order-form">
                {error && <div className="message error-message">{error}</div>}
                {success && <div className="message success-message">{success}</div>}
                <div className="form-group">
                    <label htmlFor="customerName">Customer Name</label>
                    <input
                        type="text"
                        id="customerName"
                        value={order.customerName}
                        onChange={(e) => setOrder({ ...order, customerName: e.target.value })}
                        required
                        placeholder="Enter customer name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="product">Product</label>
                    <select
                        id="product"
                        value={order.productId}
                        onChange={(e) => setOrder({ ...order, productId: e.target.value })}
                        required
                    >
                        <option value="">Select a product</option>
                        {products.map(product => (
                            <option key={product.productId} value={product.productId}>
                                {product.productName} - ${product.productPrice.toFixed(2)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        value={order.quantity}
                        onChange={(e) => setOrder({ ...order, quantity: Math.max(1, parseInt(e.target.value, 10)) })}
                        min="1"
                        required
                    />
                </div>
                <button className="create-button" type="submit">Create Order</button>
            </form>
        </div>
    );
}

export default OrderCreation;