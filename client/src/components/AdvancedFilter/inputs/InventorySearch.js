import { Form, Row, Col } from "react-bootstrap";

export default function InventorySearch({  handleChanges }) {
  return (
    <Row
      onChange={(e) => {
        handleChanges(e);
      }}
      onClick={(e) => {
        handleChanges(e);
      }}
      className=""
    >
      <div className="filter-label">
        <Form.Label className="d-flex flex-nowrap">
          <i style={{ color: "brown" }} className="bi m-0 bi-box-seam me-2"></i>{" "}
          Inventory:
        </Form.Label>
      </div>
      <Col>
        <Row className="flex-nowrap ">
          <div className="col-one">
            <Form.Check
              inline
              id="instock"
              value="in stock"
              label="In Stock"
              name="group1"
              type={"radio"}
            />
          </div>
          <div className="col-two">
            <Form.Check
              inline
              id="nostock"
              value="no stock"
              label="Out of Stock"
              name="group1"
              type={"radio"}
            />
          </div>
        </Row>
        <Col>
          <Row className="flex-nowrap">
            <div className="col-one">
              <Form.Check
                inline
                value="min"
                id="inventory-min"
                label={
                  <Form.Control placeholder="Min" name="group1"></Form.Control>
                }
                name="group1"
                type={"checkbox"}
              />
            </div>
            <div className="col-two">
              <Form.Check
                inline
                value="max"
                id="inventory-max"
                label={
                  <Form.Control name="group1" placeholder="Max"></Form.Control>
                }
                name="group1"
                type={"checkbox"}
              />
            </div>
          </Row>
        </Col>
      </Col>
    </Row>
  );
}
