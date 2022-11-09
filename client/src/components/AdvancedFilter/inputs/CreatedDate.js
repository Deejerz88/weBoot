import { Form, Row, Col, InputGroup, FloatingLabel } from "react-bootstrap";

export default function DateRow() {
  return (
    <div className="date-filter">
      <Form.Check inline type={"checkbox"}>
        <Form.Check.Input
          type="checkbox"
          id="created-check"
          name="group4"
          value="active"
        />
        <Form.Check.Label className="date-label">Created:</Form.Check.Label>
      </Form.Check>
      <Row>
        <FloatingLabel label="After:" className="">
          <Form.Control
            id="created-after"
            type="date"
            name="group4"
            placeholder="after"
            className="w-75"
          />
        </FloatingLabel>
        <FloatingLabel label="Before:" className="">
          <Form.Control
            id="created-before"
            type="date"
            name="group4"
            placeholder="before"
            className="w-75"
          />
        </FloatingLabel>
      </Row>
    </div>
  );
}
