import { useState, useCallback, useMemo } from 'react';
import MagneticButton from './MagneticButton';
import '../styles/SneakerCard.css';

const SneakerCard = ({ sneaker, addToCart, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleAddToCart = useCallback((e) => {
    e.stopPropagation();
    // Chuyển hướng đến trang chi tiết để chọn size
    if (onClick) {
      onClick(sneaker.id);
    }
  }, [onClick, sneaker.id]);

  const handleCardClick = useCallback(() => {
    if (onClick) {
      onClick(sneaker.id);
    }
  }, [onClick, sneaker.id]);

  // Đảm bảo price là số - sử dụng useMemo để tránh tính toán lại mỗi khi render
  const formatPrice = useCallback((price) => {
    if (price === undefined || price === null) return '0.00';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
  }, []);

  // Chuyển đổi giá trị thành số để so sánh
  const getNumericPrice = useCallback((price) => {
    if (price === undefined || price === null) return 0;
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return isNaN(numPrice) ? 0 : numPrice;
  }, []);

  // Tính toán giá trị một lần và lưu trữ
  const priceValue = useMemo(() => getNumericPrice(sneaker.price), [getNumericPrice, sneaker.price]);
  const retailValue = useMemo(() => getNumericPrice(sneaker.retail), [getNumericPrice, sneaker.retail]);
  
  // Tính toán giá đã định dạng
  const formattedPrice = useMemo(() => formatPrice(sneaker.price), [formatPrice, sneaker.price]);
  const formattedRetail = useMemo(() => formatPrice(sneaker.retail), [formatPrice, sneaker.retail]);

  // Kiểm tra xem có hiển thị giá retail không
  const showRetail = useMemo(() => 
    sneaker.retail && retailValue > 0 && priceValue > retailValue,
    [sneaker.retail, retailValue, priceValue]
  );

  return (
    <div 
      className="sneaker-card-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
    >
      <div className="sneaker-card">
        <div className="sneaker-image">
          <img src={sneaker.image} alt={sneaker.name} />
          <div className="sneaker-brand">{sneaker.brand}</div>
          {sneaker.release_date && (
            <div className="sneaker-release">
              {new Date(sneaker.release_date).toLocaleDateString()}
            </div>
          )}
        </div>
        
        <div className="sneaker-info">
          <h3>{sneaker.name}</h3>
          
          {sneaker.colorway && (
            <div className="sneaker-colorway">{sneaker.colorway}</div>
          )}
          
          <div className="price-container">
            <div className="sneaker-price">${formattedPrice}</div>
            {showRetail && (
              <div className="retail-price">${formattedRetail}</div>
            )}
          </div>
          
          <div className={`sneaker-details ${isHovered ? 'visible' : ''}`}>
            {sneaker.description && (
              <p className="sneaker-description">{sneaker.description.substring(0, 60)}...</p>
            )}
            
            <div className="sneaker-meta">
              {sneaker.category && (
                <span className="sneaker-category">{sneaker.category}</span>
              )}
              {sneaker.condition && (
                <span className="sneaker-condition">{sneaker.condition}</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="card-actions">
          <MagneticButton 
            className="add-to-cart-btn" 
            onClick={handleAddToCart}
            strength={20}
          >
            Select Size
          </MagneticButton>
        </div>
      </div>
    </div>
  );
};

export default SneakerCard; 