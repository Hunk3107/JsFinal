import axios from 'axios';

// Đường dẫn API thực tế
const API_URL = 'http://localhost/api/database.php';

// Lấy danh sách sneaker từ API
export const fetchSneakers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching sneakers:', error);
    throw error;
  }
};

// Lấy chi tiết một sneaker
export const fetchSneakerById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}?id=${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching sneaker with id ${id}:`, error);
    throw error;
  }
};

// Lọc sneaker theo thương hiệu
export const fetchSneakersByBrand = async (brand) => {
  try {
    const response = await axios.get(`${API_URL}?brand=${brand}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching sneakers by brand ${brand}:`, error);
    throw error;
  }
};

// Lọc sneaker theo danh mục
export const fetchSneakersByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_URL}?category=${category}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching sneakers by category ${category}:`, error);
    throw error;
  }
};

// Đăng nhập
export const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL, {
      action: 'login',
      username,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Đăng ký
export const register = async (username, password, email) => {
  try {
    const response = await axios.post(API_URL, {
      action: 'register',
      username,
      password,
      email
    });
    return response.data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};

// Đặt hàng
export const placeOrder = async (cart) => {
  try {
    const response = await axios.post(API_URL, {
      action: 'place_order',
      cart
    });
    return response.data;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};

// Thêm sneaker mới (chỉ admin)
export const addSneaker = async (sneakerData) => {
  try {
    const response = await axios.post(API_URL, {
      action: 'add_sneaker',
      ...sneakerData
    });
    return response.data;
  } catch (error) {
    console.error('Error adding sneaker:', error);
    throw error;
  }
}; 