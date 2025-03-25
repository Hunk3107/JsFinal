import React, { useState, useEffect } from 'react';
import '../styles/Browse.css'

const Browse = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from an API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch('http://localhost/api/database.php');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle search input changes - Fixed to ensure string comparison
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => {
        // Convert all fields to strings before checking includes
        const nameMatch = String(product.name).toLowerCase().includes(term);
        const descMatch = String(product.description).toLowerCase().includes(term);
        const brandMatch = String(product.brand).toLowerCase().includes(term);
        const colorwayMatch = String(product.colorway).toLowerCase().includes(term);
        const categoryMatch = String(product.category).toLowerCase().includes(term);
        
        return nameMatch || descMatch || brandMatch || colorwayMatch || categoryMatch;
      });
      setFilteredProducts(filtered);
    }
  };

  // For demonstration, here's the sneaker data you provided
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && !products.length) {
      const sneakerProducts = [
        {
          "id": "1",
          "name": "Air Jordan 1 Retro High OG",
          "brand": "Nike",
          "price": "170.00",
          "release_date": "2023-05-15",
          "colorway": "University Blue/White-Black",
          "description": "The Air Jordan 1 Retro High OG 'University Blue' features a University Blue leather upper with black and white accents throughout the shoe.",
          "image": "https://images.unsplash.com/photo-1597045566677-8cf032ed6634",
          "thumbnail": "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=400",
          "retail": "170.00",
          "resell_price": "320.00",
          "popularity": "98",
          "category": "Basketball",
          "condition": "New",
          "style": "555088-134"
        },
        {
          "id": "2",
          "name": "Air Jordan 4 Retro",
          "brand": "Nike",
          "price": "210.00",
          "release_date": "2023-04-22",
          "colorway": "Thunder",
          "description": "The Air Jordan 4 Retro 'Thunder' 2023 brings back a coveted colorway first released in 2006.",
          "image": "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b",
          "thumbnail": "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=400",
          "retail": "210.00",
          "resell_price": "290.00",
          "popularity": "94",
          "category": "Basketball",
          "condition": "New",
          "style": "DH6927-017"
        },
        {
          "id": "3",
          "name": "Nike Dunk Low",
          "brand": "Nike",
          "price": "110.00",
          "release_date": "2023-02-10",
          "colorway": "Panda",
          "description": "The Nike Dunk Low 'Panda' features a clean black and white color scheme.",
          "image": "https://images.unsplash.com/photo-1605348532760-6753d2c43329",
          "thumbnail": "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400",
          "retail": "110.00",
          "resell_price": "160.00",
          "popularity": "97",
          "category": "Skateboarding",
          "condition": "New",
          "style": "DD1391-100"
        },
        {
          "id": "4",
          "name": "Nike Air Force 1 Low",
          "brand": "Nike",
          "price": "100.00",
          "release_date": "2023-01-01",
          "colorway": "White",
          "description": "The Nike Air Force 1 Low 'White' is a clean and classic sneaker.",
          "image": "https://images.unsplash.com/photo-1600269452121-4f2416e55c28",
          "thumbnail": "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400",
          "retail": "100.00",
          "resell_price": "100.00",
          "popularity": "96",
          "category": "Lifestyle",
          "condition": "New",
          "style": "315122-111"
        },
        {
          "id": "5",
          "name": "Nike Air Max 90",
          "brand": "Nike",
          "price": "130.00",
          "release_date": "2023-03-26",
          "colorway": "Infrared",
          "description": "The Nike Air Max 90 'Infrared' is an iconic colorway.",
          "image": "https://images.unsplash.com/photo-1543508282-6319a3e2621f",
          "thumbnail": "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=400",
          "retail": "130.00",
          "resell_price": "150.00",
          "popularity": "91",
          "category": "Running",
          "condition": "New",
          "style": "DJ0639-100"
        },
        {
          "id": "6",
          "name": "Nike Air Max 95",
          "brand": "Nike",
          "price": "175.00",
          "release_date": "2023-06-15",
          "colorway": "Neon",
          "description": "The Nike Air Max 95 'Neon' features the iconic gradient design.",
          "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
          "thumbnail": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
          "retail": "175.00",
          "resell_price": "200.00",
          "popularity": "89",
          "category": "Running",
          "condition": "New",
          "style": "DM9104-002"
        }
      ];
      
      // Ensure products are loaded and immediately set for display
      setProducts(sneakerProducts);
      setFilteredProducts(sneakerProducts);
      setLoading(false);
    }
  }, []);

  return (
    <div className="browse-page">
      <h1>Browse Sneakers</h1>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name, brand, colorway, or category..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      
      {loading && <div className="loading-message">Loading sneakers...</div>}
      
      {error && <div className="error-message">Error: {error}</div>}
      
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="error-message">No sneakers found matching your search.</div>
      )}
      
      <div className="product-grid">
        {filteredProducts.map(product => (
          <div className="product-card" key={product.id}>
            <img 
              src={product.thumbnail || product.image} 
              alt={product.name}
              onError={(e) => {
                e.target.src = "/api/placeholder/250/200";
                e.target.alt = "Sneaker image placeholder";
              }}
            />
            <p>{product.name}</p>
            <div style={{ padding: '0 1rem 1rem', textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold', color: '#007BFF', marginBottom: '0.5rem' }}>${product.price}</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>{product.brand} • {product.colorway}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Browse;