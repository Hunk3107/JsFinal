import { useState, useRef, useEffect, useCallback } from 'react';
import '../styles/MagneticButton.css';

const MagneticButton = ({ children, className = '', onClick, strength = 50, isFilter = false }) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Giảm độ mạnh của hiệu ứng từ tính
  const actualStrength = isFilter ? strength * 0.3 : strength * 0.5;

  const handleMouseMove = useCallback((e) => {
    if (!buttonRef.current || !isHovered) return;

    const rect = buttonRef.current.getBoundingClientRect();
    
    // Calculate center of the button
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from mouse to center
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Calculate movement (stronger when closer to center)
    const moveX = (distanceX / rect.width) * actualStrength;
    const moveY = (distanceY / rect.height) * actualStrength;
    
    setPosition({ x: moveX, y: moveY });
  }, [isHovered, actualStrength]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (isFilter) return; // Không cần event listener toàn cục cho các nút filter
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered, handleMouseMove, isFilter]);

  return (
    <button
      ref={buttonRef}
      className={`magnetic-button ${isFilter ? 'filter-magnetic-button' : ''} ${className}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={isFilter ? handleMouseMove : undefined}
      style={{
        transform: isHovered ? `translate(${position.x}px, ${position.y}px)` : 'translate(0, 0)'
      }}
    >
      <span 
        className="magnetic-button-content"
        style={{
          transform: isHovered ? `translate(${position.x * 0.3}px, ${position.y * 0.3}px)` : 'translate(0, 0)'
        }}
      >
        {children}
      </span>
    </button>
  );
};

export default MagneticButton; 