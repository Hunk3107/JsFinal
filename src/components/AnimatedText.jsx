import { useState, useRef, useCallback } from 'react';
import '../styles/AnimatedText.css';

const AnimatedText = ({ text, color = "var(--primary-color)" }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Sử dụng useCallback để tối ưu hiệu suất
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePos({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 });
  }, []);

  // Đảm bảo text là string
  const safeText = typeof text === 'string' ? text : String(text || '');
  
  // Split text into individual characters for animation
  const characters = safeText.split('');

  return (
    <div 
      className="animated-text-container" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        '--mouse-x': `${mousePos.x}%`,
        '--mouse-y': `${mousePos.y}%`,
        '--highlight-color': color
      }}
    >
      <div className="animated-text">
        {characters.map((char, index) => (
          <span 
            key={index} 
            className="animated-char"
            style={{ 
              '--char-index': index,
              '--total-chars': characters.length
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
      <div className="animated-text animated-text-overlay">
        {characters.map((char, index) => (
          <span 
            key={index} 
            className="animated-char"
            style={{ 
              '--char-index': index,
              '--total-chars': characters.length
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnimatedText; 