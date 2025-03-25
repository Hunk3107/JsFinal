import { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedText from './AnimatedText';
import MagneticButton from './MagneticButton';
import '../styles/Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <AnimatedText text="SNEAKER SHOP" color="var(--primary-light)" />
          <p className="footer-tagline">
            Premium sneakers for collectors and enthusiasts.
          </p>
          <div className="social-links">
            <a href="#" className="social-link">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-pinterest"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Shop</h3>
          <ul>
            <li><Link to="/">All Sneakers</Link></li>
            <li><Link to="/">New Releases</Link></li>
            <li><Link to="/">Best Sellers</Link></li>
            <li><Link to="/">Upcoming</Link></li>
            <li><Link to="/">Sale</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Help</h3>
          <ul>
            <li><Link to="/">Shipping & Delivery</Link></li>
            <li><Link to="/">Returns & Exchanges</Link></li>
            <li><Link to="/">FAQ</Link></li>
            <li><Link to="/">Contact Us</Link></li>
            <li><Link to="/">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Newsletter</h3>
          <p>Subscribe to get special offers, free giveaways, and new releases.</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <MagneticButton type="submit" className="subscribe-btn">
              {subscribed ? 'Subscribed!' : 'Subscribe'}
            </MagneticButton>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Sneaker Shop. All rights reserved.</p>
        <div className="payment-methods">
          <span className="payment-icon">
            <i className="fab fa-cc-visa"></i>
          </span>
          <span className="payment-icon">
            <i className="fab fa-cc-mastercard"></i>
          </span>
          <span className="payment-icon">
            <i className="fab fa-cc-amex"></i>
          </span>
          <span className="payment-icon">
            <i className="fab fa-cc-paypal"></i>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 