import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/ProductList.css';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <div className="product-list">
            <h2>Our Products</h2>
            <div className="product-grid">
                {products.map(product => (
                    <div key={product.productId} className="product-card">
                        <h3>{product.productName}</h3>
                        <p>Category: {product.category}</p>
                        <p className="product-desc" >{product.description}</p>
                        <p className="product-price" >Price: ${product.productPrice.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;