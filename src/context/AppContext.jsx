import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Calculate cart total
    const total = cart.reduce((sum, item) => {
      return sum + (parseFloat(item.price) * item.quantity);
    }, 0);
    setCartTotal(total);
  }, [cart]);

  const addToCart = (sneaker) => {
    // Kiểm tra xem sản phẩm với size này đã có trong giỏ hàng chưa
    const existingItemIndex = cart.findIndex(
      item => item.id === sneaker.id && item.size === sneaker.size
    );

    if (existingItemIndex !== -1) {
      // Nếu đã có, tăng số lượng
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += sneaker.quantity || 1;
      setCart(updatedCart);
    } else {
      // Nếu chưa có, thêm mới
      setCart([...cart, { ...sneaker, quantity: sneaker.quantity || 1 }]);
    }
  };

  const removeFromCart = (id, size) => {
    if (size) {
      // Nếu có size, chỉ xóa sản phẩm với size cụ thể
      setCart(cart.filter(item => !(item.id === id && item.size === size)));
    } else {
      // Nếu không có size, xóa tất cả sản phẩm có id này
      setCart(cart.filter(item => item.id !== id));
    }
  };

  const updateQuantity = (id, quantity, size) => {
    const updatedCart = cart.map(item => {
      if (size) {
        // Nếu có size, chỉ cập nhật sản phẩm với size cụ thể
        if (item.id === id && item.size === size) {
          return { ...item, quantity };
        }
      } else {
        // Nếu không có size, cập nhật tất cả sản phẩm có id này
        if (item.id === id) {
          return { ...item, quantity };
        }
      }
      return item;
    });
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        cart,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        login,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext; 