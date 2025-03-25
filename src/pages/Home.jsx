import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import SneakerCard from '../components/SneakerCard';
import AnimatedText from '../components/AnimatedText';
import MagneticButton from '../components/MagneticButton';
import { fetchSneakers, fetchSneakersByBrand, fetchSneakersByCategory } from '../services/api';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useAppContext();
  const [sneakers, setSneakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  
  // Refs cho dropdowns
  const brandDropdownRef = useRef(null);
  const categoryDropdownRef = useRef(null);
  
  // Cải thiện state cho filters
  const [activeFilters, setActiveFilters] = useState({
    brand: null,
    category: null
  });
  
  // State cho dropdown filters
  const [brandDropdownActive, setBrandDropdownActive] = useState(false);
  const [categoryDropdownActive, setCategoryDropdownActive] = useState(false);

  // Xử lý click bên ngoài để đóng dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (brandDropdownRef.current && !brandDropdownRef.current.contains(event.target)) {
        setBrandDropdownActive(false);
      }
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setCategoryDropdownActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Sử dụng useCallback để tránh tạo lại hàm mỗi khi render
  const loadSneakers = useCallback(async () => {
    try {
      setLoading(true);
      let data = await fetchSneakers();
      
      // Lọc dữ liệu dựa trên các filter đã chọn
      if (activeFilters.brand) {
        data = data.filter(sneaker => sneaker.brand === activeFilters.brand);
      }
      
      if (activeFilters.category) {
        data = data.filter(sneaker => sneaker.category === activeFilters.category);
      }
      
      setSneakers(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load sneakers. Please try again later.');
      setLoading(false);
    }
  }, [activeFilters]);

  useEffect(() => {
    loadSneakers();
  }, [loadSneakers]);

  // Cập nhật hàm xử lý filter
  const handleFilterChange = useCallback((type, value) => {
    setActiveFilters(prev => {
      // Nếu filter đã được chọn và giá trị giống nhau, hủy chọn filter
      if (prev[type] === value) {
        const newFilters = { ...prev };
        newFilters[type] = null;
        return newFilters;
      }
      
      return { ...prev, [type]: value };
    });
    
    // Không đóng dropdown sau khi chọn để người dùng có thể chọn tiếp
    // if (type === 'brand') setBrandDropdownActive(false);
    // if (type === 'category') setCategoryDropdownActive(false);
  }, []);

  // Xử lý reset tất cả filters
  const handleResetFilters = useCallback(() => {
    setActiveFilters({
      brand: null,
      category: null
    });
  }, []);

  // Xử lý xóa một filter cụ thể
  const handleRemoveFilter = useCallback((type) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      newFilters[type] = null;
      return newFilters;
    });
  }, []);

  const handleSortChange = useCallback((e) => {
    setSortBy(e.target.value);
  }, []);

  // Xử lý click vào sản phẩm để chuyển đến trang chi tiết
  const handleSneakerClick = useCallback((sneakerId) => {
    navigate(`/product/${sneakerId}`);
  }, [navigate]);

  // Sử dụng useMemo để tránh sắp xếp lại mảng mỗi khi render
  const sortedSneakers = useMemo(() => {
    return [...sneakers].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'price-low') {
        return parseFloat(a.price) - parseFloat(b.price);
      } else if (sortBy === 'price-high') {
        return parseFloat(b.price) - parseFloat(a.price);
      } else if (sortBy === 'newest') {
        return new Date(b.release_date) - new Date(a.release_date);
      }
      return 0;
    });
  }, [sneakers, sortBy]);

  // Extract unique brands and categories for filters
  const brands = useMemo(() => 
    [...new Set(sneakers.map(sneaker => sneaker.brand))],
    [sneakers]
  );
  
  const categories = useMemo(() => 
    [...new Set(sneakers.map(sneaker => sneaker.category).filter(Boolean))],
    [sneakers]
  );

  // Kiểm tra xem có filter nào đang active không
  const hasActiveFilters = useMemo(() => {
    return Object.values(activeFilters).some(filter => filter !== null);
  }, [activeFilters]);

  return (
    <div className="home-page">
      {/* Banner Section */}
      <div className="banner">
        <img 
          src="https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
          alt="Premium Sneakers" 
          className="banner-image"
        />
        <div className="banner-content">
          <h1 className="banner-title">Premium Sneaker Collection</h1>
          <p className="banner-subtitle">Discover the latest and greatest in sneaker culture</p>
          <button className="banner-button">Shop Now</button>
        </div>
      </div>
      
      <div className="filter-bar">
        <div className="filter-options">
          <div className="filter-section">
            <div className="filter-section-title">
              <i className="fas fa-filter"></i>
              <span>Filter By</span>
            </div>
            <div className="filter-group">
              <MagneticButton 
                className={`filter-option ${!hasActiveFilters ? 'active' : ''}`}
                onClick={handleResetFilters}
                strength={20}
                isFilter={true}
              >
                All Sneakers
              </MagneticButton>
            </div>
          </div>
          
          <div className="filter-section">
            <div className="filter-section-title">
              <i className="fas fa-tag"></i>
              <span>Brands</span>
            </div>
            <div 
              ref={brandDropdownRef}
              className={`filter-dropdown ${brandDropdownActive ? 'active' : ''}`}
            >
              <div 
                className="filter-dropdown-header"
                onClick={(e) => {
                  e.stopPropagation();
                  setBrandDropdownActive(!brandDropdownActive);
                  if (brandDropdownActive) {
                    setCategoryDropdownActive(false);
                  }
                }}
              >
                <span>{activeFilters.brand || 'Select Brand'}</span>
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className={`filter-dropdown-content ${brandDropdownActive ? 'active' : ''}`}>
                {brands.map(brand => (
                  <div 
                    key={brand}
                    className={`filter-dropdown-item ${activeFilters.brand === brand ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation(); // Ngăn sự kiện click lan truyền
                      handleFilterChange('brand', brand);
                    }}
                  >
                    {brand}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="filter-section">
            <div className="filter-section-title">
              <i className="fas fa-list"></i>
              <span>Categories</span>
            </div>
            <div 
              ref={categoryDropdownRef}
              className={`filter-dropdown ${categoryDropdownActive ? 'active' : ''}`}
            >
              <div 
                className="filter-dropdown-header"
                onClick={(e) => {
                  e.stopPropagation();
                  setCategoryDropdownActive(!categoryDropdownActive);
                  if (categoryDropdownActive) {
                    setBrandDropdownActive(false);
                  }
                }}
              >
                <span>{activeFilters.category || 'Select Category'}</span>
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className={`filter-dropdown-content ${categoryDropdownActive ? 'active' : ''}`}>
                {categories.map(category => (
                  <div 
                    key={category}
                    className={`filter-dropdown-item ${activeFilters.category === category ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation(); // Ngăn sự kiện click lan truyền
                      handleFilterChange('category', category);
                    }}
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="filter-section">
            <div className="filter-section-title">
              <i className="fas fa-sort"></i>
              <span>Sort By</span>
            </div>
            <div className="sort-options">
              <select 
                value={sortBy} 
                onChange={handleSortChange}
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Hiển thị các filter đã chọn */}
        {hasActiveFilters && (
          <div className="active-filters">
            {activeFilters.brand && (
              <div className="active-filter-tag">
                Brand: {activeFilters.brand}
                <i className="fas fa-times" onClick={() => handleRemoveFilter('brand')}></i>
              </div>
            )}
            {activeFilters.category && (
              <div className="active-filter-tag">
                Category: {activeFilters.category}
                <i className="fas fa-times" onClick={() => handleRemoveFilter('category')}></i>
              </div>
            )}
            <button className="reset-filters-btn" onClick={handleResetFilters}>
              <i className="fas fa-undo"></i>
              Reset All
            </button>
          </div>
        )}
      </div>
      
      {loading ? (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading sneakers...</p>
        </div>
      ) : error ? (
        <div className="error">
          <i className="fas fa-exclamation-circle"></i>
          <p>{error}</p>
        </div>
      ) : sortedSneakers.length === 0 ? (
        <div className="no-results">
          <i className="fas fa-search"></i>
          <p>No sneakers found. Try a different filter.</p>
        </div>
      ) : (
        <div className="sneaker-grid">
          {sortedSneakers.map(sneaker => (
            <SneakerCard 
              key={sneaker.id} 
              sneaker={sneaker} 
              addToCart={addToCart}
              onClick={() => handleSneakerClick(sneaker.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home; 