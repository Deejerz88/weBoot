import { Form, Row, FloatingLabel } from "react-bootstrap";

export default function DateRow() {
  return (
    <div className="date-filter">
      <Form.Check inline type={"checkbox"}>
        <Form.Check.Input
          type="checkbox"
          id="updated-check"
          name="group5"
          value="active"
        />
        <Form.Check.Label className="date-label">Updated:</Form.Check.Label>
      </Form.Check>
      <Row>
        <FloatingLabel label="After:" className="">
          <Form.Control
            id="updated-after"
            type="date"
            name="group5"
            placeholder="after"
            className="w-75"
          />
        </FloatingLabel>
        <FloatingLabel label="Before:" className="">
          <Form.Control
            id="updated-before"
            type="date"
            name="group5"
            placeholder="before"
            className="w-75"
          />
        </FloatingLabel>
      </Row>
    </div>
  );
}
