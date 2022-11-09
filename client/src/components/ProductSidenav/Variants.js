import React from 'react';
import { Card, Col, Row, Container, Button } from 'react-bootstrap';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

const Variants = ({ variants }) => {
  // image, size, color
  const [state, dispatch] = useStoreContext();

  const { image, size, _id, color } = variants;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...variants, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...variants, purchaseQuantity: 1 });
    }
  };
  console.log('variants', variants);
  return (
    <Container>
      <Row className="justify-content-center">
        {variants.map((variant) => (
          <Col xs={3}>
            <Card className="variant-card">
              <div className="image-container d-flex">
                <Card.Img
                  className="variant-card-image"
                  variant="top"
                  src={variant.image}
                />
              </div>
              <Card.Body>
                <Card.Text>
                  <Row className="justify-content-between">
                    <Col>
                      <b>Size:</b> {variant.size}
                    </Col>
                    <Col className="text-end">
                      <b>Color:</b> {variant.color}
                    </Col>
                  </Row>
                </Card.Text>
                <Row>
                  <Button onClick={addToCart} variant="success">
                    Add to Cart
                  </Button>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Variants;
