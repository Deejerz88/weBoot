import { Card } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";

const Orders = ({ orders }) => {
  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    if (orders) {
      setOrderData(orders);
    }
    console.log("orders", orders);
  }, [orders]);
  return (
    <>
      {orderData.length === 0 && (
        <Card className="my-3 order-card mx-4 p-3 rounded order-card">
          <Card.Header as="h5">No Orders Yet</Card.Header>
        </Card>
      )}
      {orderData.map((order) => (
        <Card
          key={order._id || order.id}
          className="my-3 mx-4 p-3 rounded order-card"
        >
          <Card.Header as="h5">
            {DateTime.fromMillis(Number(order.purchaseDate)).toLocaleString(
              DateTime.DATE_MED
            )}
          </Card.Header>
          <Card.Body className='order-body'>
            <Card.Title>
              Order Total: $
              {order.products
                .reduce((acc, item) => acc + item.price, 0)
                .toFixed(2)}
            </Card.Title>
            {order.products.map((product) => (
              <span
                key={`${order._id || order.id}-${product._id || product.id}`}
                className="d-block m-3"
              >
                <hr />
                {product.title} - ${product.price}
              </span>
            ))}
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default Orders;
