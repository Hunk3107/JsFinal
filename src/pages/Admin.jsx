import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addSneaker } from '../services/api';
import { useAppContext } from '../context/AppContext';

const Admin = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [image, setImage] = useState('');
  const [colorway, setColorway] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [style, setStyle] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { user } = useAppContext();
  const navigate = useNavigate();
  
  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !price || !brand || !image) {
      setError('Please fill in all required fields (name, price, brand, image)');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      const response = await addSneaker({
        name,
        price: parseFloat(price),
        brand,
        image,
        colorway,
        release_date: releaseDate,
        description,
        category,
        style,
        retail: parseFloat(price),
        resell_price: parseFloat(price),
        popularity: 80,
        condition: 'New'
      });
      
      if (response.success) {
        setSuccess('Sneaker added successfully!');
        // Clear form
        setName('');
        setPrice('');
        setBrand('');
        setImage('');
        setColorway('');
        setReleaseDate('');
        setDescription('');
        setCategory('');
        setStyle('');
      } else {
        setError(response.error || 'Failed to add sneaker. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <div className="admin-section">
        <h2>Add New Sneaker</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSubmit} className="add-sneaker-form">
          <div className="form-group">
            <label htmlFor="name">Sneaker Name *</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price ($) *</label>
            <input
              type="number"
              id="price"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="brand">Brand *</label>
            <input
              type="text"
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="colorway">Colorway</label>
            <input
              type="text"
              id="colorway"
              value={colorway}
              onChange={(e) => setColorway(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="releaseDate">Release Date</label>
            <input
              type="date"
              id="releaseDate"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={loading}
            >
              <option value="">Select Category</option>
              <option value="Basketball">Basketball</option>
              <option value="Running">Running</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Skateboarding">Skateboarding</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="style">Style Code</label>
            <input
              type="text"
              id="style"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              rows="4"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="image">Image URL *</label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <button 
            type="submit" 
            className="add-sneaker-btn"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Sneaker'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin; 