import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import ProductCard from './components/ProductCard';
import ShoppingCart from './components/ShoppingCart';
import { FaShoppingCart } from 'react-icons/fa';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/categories/3/products');
        const data = await response.json();
        const formattedProducts = data.map(product => ({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.images[0],
          description: product.description
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container fluid>
          <Navbar.Brand href="#home">Tienda de Muebles</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#products">Productos</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Buscar productos..."
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-light">Buscar</Button>
            </Form>
            <Button 
              variant="outline-light" 
              className="ms-2"
              onClick={toggleCart}
            >
              <FaShoppingCart />
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid>
        <Row>
          <Col md={9}>
            {loading ? (
              <div className="text-center mt-5">
                <h3>Cargando productos...</h3>
              </div>
            ) : (
              <Row>
                {products.map(product => (
                  <Col key={product.id} sm={6} lg={4} className="mb-4">
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>
            )}
          </Col>
          <Col md={3} className={cartOpen ? 'd-block' : 'd-none d-md-block'}>
            <ShoppingCart />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;