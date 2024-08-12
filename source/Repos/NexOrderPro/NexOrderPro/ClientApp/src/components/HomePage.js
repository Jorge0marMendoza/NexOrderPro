import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import '../assets/css/HomePage.css';
import carWaxImage from '../assets/images/car-wax.jpg';
import microFiberClothImage from '../assets/images/microfiber-cloth.jpg';
import ceramicCoatingImage from '../assets/images/ceramic-coating.jpg';

const featuredProducts = [
    { id: 1, name: 'Premium Car Wax', price: 24.99, image: carWaxImage },
    { id: 2, name: 'Microfiber Cloth Set', price: 15.99, image: microFiberClothImage },
    { id: 3, name: 'Ceramic Coating Kit', price: 79.99, image: ceramicCoatingImage },
];

function HomePage() {

    const [email, setEmail] = useState('');
    const [subscriptionMessage, setSubscriptionMessage] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        //console.log('Subscribing email:', email);
        setSubscriptionMessage('Thank you for subscribing!');
        setEmail('');
        setTimeout(() => setSubscriptionMessage(''), 3000);
    };

    return (
        <div className="home-page">
            <section className="hero">
                <h1>Welcome to Car Clean Co.</h1>
                <p>Your one-stop shop for premium car detailing products</p>
                <Link to="/create-order" className="cta-button">Shop Now</Link>
            </section>
            <section className="featured-products">
                <h2 className="home-header-h2">Featured Products</h2>
                <div className="home-product-grid">
                    {featuredProducts.map(product => (
                        <div key={product.id} className="home-product-card">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>${product.price.toFixed(2)}</p>
                            {/*<Link to={`/product/${product.id}`} className="product-link">View Details</Link>*/}
                            <Link to={`/product/${product.id}`} className="product-link" onClick={(e) => e.preventDefault()}>View Details</Link>
                        </div>
                    ))}
                </div>
            </section>
            <section className="about-us">
                <h2 className="home-header-h2">Why Choose Car Clean Co.?</h2>
                <div className="features">
                    <div className="feature">
                        <i className="fas fa-star"></i>
                        <h3>Premium Quality</h3>
                        <p>We offer only the best car detailing products on the market.</p>
                    </div>
                    <div className="feature">
                        <i className="fas fa-truck"></i>
                        <h3>Fast Shipping</h3>
                        <p>Get your products delivered quickly to your doorstep.</p>
                    </div>
                    <div className="feature">
                        <i className="fas fa-user-shield"></i>
                        <h3>Expert Advice</h3>
                        <p>Our team is here to help you choose the right products for your needs.</p>
                    </div>
                </div>
            </section>
            <section className="newsletter">
                <h2 className="home-header-h2">Stay Updated</h2>
                <p className="subscribe-text">Subscribe to our newsletter for the latest products and exclusive offers.</p>
                <form className="newsletter-form" onSubmit={handleSubscribe}>
                    <input type="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button type="submit">Subscribe</button>
                </form>
                {subscriptionMessage && <p className="subscription-message">{subscriptionMessage}</p>}
            </section>
        </div>
    );
}

export default HomePage;