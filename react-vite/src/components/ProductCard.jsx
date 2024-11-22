import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions';
import { FaShoppingCart } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    Swal.fire({
      title: '¡Producto agregado!',
      text: 'Se agregó al carrito exitosamente',
      icon: 'success',
      timer: 1500
    });
  };

  return (
    <Card className="product-card">
      <Card.Img 
        variant="top" 
        src={product.image} 
        className="product-image"
      />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text className="price">${product.price}</Card.Text>
        <Button 
          variant="primary" 
          onClick={handleAddToCart}
          className="add-to-cart-btn"
        >
          <FaShoppingCart className="me-2" />
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;