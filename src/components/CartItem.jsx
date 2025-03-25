import { useAppContext } from '../context/AppContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useAppContext();
  
  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p className="cart-item-brand">{item.brand}</p>
        <p className="cart-item-colorway">{item.colorway}</p>
        <p className="cart-item-style">Style: {item.style}</p>
        <p className="cart-item-price">${item.price}</p>
      </div>
      <div className="cart-item-quantity">
        <button 
          className="quantity-btn"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button 
          className="quantity-btn"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          +
        </button>
      </div>
      <div className="cart-item-total">
        <p>${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <button 
        className="remove-btn"
        onClick={() => removeFromCart(item.id)}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem; 