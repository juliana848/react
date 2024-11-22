import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../redux/actions';
import { ListGroup, Button, Badge } from 'react-bootstrap';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './ShoppingCart.css';

const ShoppingCart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    Swal.fire({
      title: '¿Eliminar producto?',
      text: "Se eliminará del carrito",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromCart(id));
      }
    });
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="shopping-cart">
      <h3>
        Carrito de Compras 
        <Badge bg="secondary" className="ms-2">{cart.length}</Badge>
      </h3>
      
      <ListGroup>
        {cart.map(item => (
          <ListGroup.Item key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} className="cart-item-image" />
            <div className="cart-item-details">
              <h6>{item.title}</h6>
              <p>${item.price * item.quantity}</p>
            </div>
            <div className="cart-item-actions">
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={() => dispatch(decrementQuantity(item.id))}
              >
                <FaMinus />
              </Button>
              <span className="quantity">{item.quantity}</span>
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={() => dispatch(incrementQuantity(item.id))}
              >
                <FaPlus />
              </Button>
              <Button 
                variant="danger" 
                size="sm"
                onClick={() => handleRemove(item.id)}
              >
                <FaTrash />
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {cart.length > 0 && (
        <div className="cart-total">
          <h4>Total: ${total.toFixed(2)}</h4>
          <Button variant="success">Proceder al pago</Button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;