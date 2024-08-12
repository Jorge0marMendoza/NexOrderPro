import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductList from './components/ProductList';
import OrderCreation from './components/OrderCreation';
import OrderList from './components/OrderList';
import OrderDetails from './components/OrderDetails';
import './assets/css/App.css';
import logo from './assets/images/Black-car-cleaning-sponge.jpg';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

function App() {
    const location = useLocation();
    return (
            <div className="App">
                <div className="image-container">
                    <img src={logo} alt="Logo" className="logo-image" />
                    <h1 className="company-title">Car Clean Co.</h1>
                </div>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                        <NavLink to="/product-list" className={({ isActive }) => isActive ? "active-link" : ""}>
                                Products
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/create-order" className={({ isActive }) => isActive ? "active-link" : ""}>
                                Create Order
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/orders" className={({ isActive }) => isActive ? "active-link" : ""}>
                                Orders
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <SwitchTransition>
                    <CSSTransition key={location.pathname} classNames="page" timeout={300} >
                        <Routes location={location}>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/product-list" element={<ProductList />} />
                            <Route path="/create-order" element={<OrderCreation />} />
                            <Route path="/orders" element={<OrderList />} />
                            <Route path="/order-details/:orderId" element={<OrderDetails />} />
                        </Routes>
                    </CSSTransition>
                </SwitchTransition>
            </div>
    );
}

export default function WrappedApp() {
    return (
        <Router>
            <App />
        </Router>
    );
}