import { Form, Row, Col } from "react-bootstrap";

export default function PriceSearch({ handleChanges }) {
  return (
    <Row
      onChange={(e) => {
        handleChanges(e);
      }}
      onClick={(e) => {
        handleChanges(e);
      }}
    >
      <div className="filter-label">
        <Col>
          <Form.Label className="">💸 Price:</Form.Label>
        </Col>
      </div>
      <Col>
        <Row>
          <div className="col-one">
            <Form.Check
              inline
              value="sale"
              id="price-sale"
              label="On Sale"
              name="group2"
              type={"radio"}
            />
          </div>
          <div className="col-two">
            <Form.Check
              inline
              value="regular"
              id="price-regular"
              label="Regular"
              name="group2"
              type={"radio"}
            />
          </div>
        </Row>
        <Row>
          <Col>
            <Row className="flex-nowrap">
              <div className="col-one">
                <Form.Check
                  inline
                  value="min"
                  id="price-min"
                  label={
                    <Form.Control
                      placeholder="Min"
                      name="group2"
                    ></Form.Control>
                  }
                  name="group2"
                  type={"checkbox"}
                />
              </div>
              <div className="col-one">
                <Form.Check
                  inline
                  value="max"
                  id="price-max"
                  label={
                    <Form.Control
                      name="group2"
                      placeholder="Max"
                    ></Form.Control>
                  }
                  name="group2"
                  type={"checkbox"}
                />
              </div>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
