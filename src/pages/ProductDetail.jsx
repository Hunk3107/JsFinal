import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import MagneticButton from '../components/MagneticButton';
import { fetchSneakerById } from '../services/api';
import '../styles/ProductDetail.css';

// Danh sách các size giày phổ biến
const SHOE_SIZES = [
  '36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5', '40', 
  '40.5', '41', '41.5', '42', '42.5', '43', '43.5', '44', '44.5', '45'
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useAppContext();
  const [sneaker, setSneaker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [sizeError, setSizeError] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const loadSneaker = async () => {
      try {
        setLoading(true);
        const data = await fetchSneakerById(id);
        setSneaker(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load sneaker details. Please try again later.');
        setLoading(false);
      }
    };

    loadSneaker();
  }, [id]);

  const handleQuantityChange = useCallback((value) => {
    setQuantity(prev => {
      const newValue = prev + value;
      return newValue < 1 ? 1 : newValue;
    });
  }, []);

  const handleSizeSelect = useCallback((size) => {
    setSelectedSize(size);
    setSizeError(false);
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }

    if (sneaker) {
      // Thêm size và số lượng vào đối tượng sneaker
      const sneakerWithDetails = { 
        ...sneaker, 
        quantity,
        size: selectedSize
      };
      addToCart(sneakerWithDetails);
      // Hiển thị thông báo thành công
      alert(`Added to cart successfully! Size: ${selectedSize}, Quantity: ${quantity}`);
    }
  }, [sneaker, quantity, selectedSize, addToCart]);

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !sneaker) {
    return (
      <div className="product-detail-page">
        <div className="error">
          <i className="fas fa-exclamation-circle"></i>
          <p>{error || 'Product not found'}</p>
          <button className="back-button" onClick={handleGoBack}>
            <i className="fas fa-arrow-left"></i> Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <button className="back-button" onClick={handleGoBack}>
        <i className="fas fa-arrow-left"></i> Back to Products
      </button>

      <div className="product-detail-container">
        <div className="product-images">
          <div className="main-image">
            <img src={sneaker.image} alt={sneaker.name} />
          </div>
          <div className="image-thumbnails">
            <div className="thumbnail active">
              <img src={sneaker.image} alt={sneaker.name} />
            </div>
            {sneaker.thumbnail && (
              <div className="thumbnail">
                <img src={sneaker.thumbnail} alt={sneaker.name} />
              </div>
            )}
          </div>
        </div>

        <div className="product-info">
          <div className="product-brand">{sneaker.brand}</div>
          <h1 className="product-name">{sneaker.name}</h1>
          
          {sneaker.colorway && (
            <div className="product-colorway">
              <span className="info-label">Colorway:</span> {sneaker.colorway}
            </div>
          )}
          
          {sneaker.style && (
            <div className="product-style">
              <span className="info-label">Style:</span> {sneaker.style}
            </div>
          )}
          
          <div className="product-price-container">
            <div className="product-price">${parseFloat(sneaker.price).toFixed(2)}</div>
            {sneaker.retail && parseFloat(sneaker.retail) > 0 && parseFloat(sneaker.price) > parseFloat(sneaker.retail) && (
              <div className="product-retail-price">${parseFloat(sneaker.retail).toFixed(2)}</div>
            )}
          </div>
          
          {/* Size Selection */}
          <div className="size-selection">
            <div className="size-header">
              <h3>Select Size</h3>
              {sizeError && <span className="size-error">Please select a size</span>}
            </div>
            <div className="size-options">
              {SHOE_SIZES.map(size => (
                <div 
                  key={size} 
                  className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>
          
          <div className="product-actions">
            <div className="quantity-selector">
              <button 
                className="quantity-btn" 
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <i className="fas fa-minus"></i>
              </button>
              <span className="quantity">{quantity}</span>
              <button 
                className="quantity-btn" 
                onClick={() => handleQuantityChange(1)}
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
            
            <MagneticButton 
              className="add-to-cart-btn-large" 
              onClick={handleAddToCart}
            >
              <i className="fas fa-shopping-cart"></i> Add to Cart
            </MagneticButton>
          </div>
          
          <div className="product-tabs">
            <div className="tab-headers">
              <div 
                className={`tab-header ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </div>
              <div 
                className={`tab-header ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                Details
              </div>
              <div 
                className={`tab-header ${activeTab === 'shipping' ? 'active' : ''}`}
                onClick={() => setActiveTab('shipping')}
              >
                Shipping
              </div>
            </div>
            
            <div className="tab-content">
              {activeTab === 'description' && (
                <div className="tab-pane">
                  <p>{sneaker.description || 'No description available for this product.'}</p>
                </div>
              )}
              
              {activeTab === 'details' && (
                <div className="tab-pane">
                  <div className="product-details-grid">
                    <div className="detail-item">
                      <span className="detail-label">Brand:</span>
                      <span className="detail-value">{sneaker.brand}</span>
                    </div>
                    {sneaker.release_date && (
                      <div className="detail-item">
                        <span className="detail-label">Release Date:</span>
                        <span className="detail-value">{new Date(sneaker.release_date).toLocaleDateString()}</span>
                      </div>
                    )}
                    {sneaker.colorway && (
                      <div className="detail-item">
                        <span className="detail-label">Colorway:</span>
                        <span className="detail-value">{sneaker.colorway}</span>
                      </div>
                    )}
                    {sneaker.style && (
                      <div className="detail-item">
                        <span className="detail-label">Style Code:</span>
                        <span className="detail-value">{sneaker.style}</span>
                      </div>
                    )}
                    {sneaker.category && (
                      <div className="detail-item">
                        <span className="detail-label">Category:</span>
                        <span className="detail-value">{sneaker.category}</span>
                      </div>
                    )}
                    {sneaker.condition && (
                      <div className="detail-item">
                        <span className="detail-label">Condition:</span>
                        <span className="detail-value">{sneaker.condition}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {activeTab === 'shipping' && (
                <div className="tab-pane">
                  <h4>Shipping Information</h4>
                  <p>Free standard shipping on all orders over $100.</p>
                  <p>Standard shipping: 3-5 business days</p>
                  <p>Express shipping: 1-2 business days (additional fee)</p>
                  <p>International shipping available to select countries.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 