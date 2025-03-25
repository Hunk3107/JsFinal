import { useState, useRef, useEffect, useCallback } from 'react';
import '../styles/Animation.css';

const ParallaxCard = ({ 
  children, 
  className = '', 
  tiltStrength = 30, 
  perspective = 1000,
  glareOpacity = 0.2,
  scale = 1.05
}) => {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || !isHovered) return;

    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate position relative to card center (from -1 to 1)
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    
    // Calculate tilt angles
    const tiltX = y * tiltStrength;
    const tiltY = -x * tiltStrength;
    
    // Calculate glare position (0-100%)
    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;
    
    setPosition({ x: tiltX, y: tiltY });
    setGlarePosition({ x: glareX, y: glareY });
  }, [isHovered, tiltStrength]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
    setGlarePosition({ x: 50, y: 50 });
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      if (card) {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [handleMouseEnter, handleMouseLeave]);

  // Tính toán transform style
  const transformStyle = useCallback(() => {
    return `perspective(${perspective}px) rotateX(${position.x}deg) rotateY(${position.y}deg) scale3d(${isHovered ? scale : 1}, ${isHovered ? scale : 1}, 1)`;
  }, [perspective, position.x, position.y, isHovered, scale]);

  return (
    <div 
      ref={cardRef}
      className={`parallax-card ${className} ${isHovered ? 'is-hovered' : ''}`}
      style={{
        transform: transformStyle(),
        '--glare-x': `${glarePosition.x}%`,
        '--glare-y': `${glarePosition.y}%`,
        '--glare-opacity': glareOpacity
      }}
      onMouseMove={handleMouseMove}
    >
      <div className="parallax-card-content">
        {children}
      </div>
      <div className="parallax-card-glare"></div>
    </div>
  );
};

export default ParallaxCard; 