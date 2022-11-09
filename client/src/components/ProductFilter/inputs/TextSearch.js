import React from "react";
import { Form, InputGroup } from "react-bootstrap";

export default function TextSearch({ handleChanges }) {
  return (
    <InputGroup id='text-group' className="mb-3" onChange={handleChanges}>
      <InputGroup.Text id="basic-addon1">🔍</InputGroup.Text>
      <Form.Control
        id="text-search"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="basic-addon1"
      />
    </InputGroup>
  );
}
