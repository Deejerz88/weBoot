import { Form, Row, Col, Button } from "react-bootstrap";
import React from "react";

export default function ProfileForm({
  handleInputChange,
  handleFormSubmit,
  userData,
  editing,
  setEditing,
  showPasswordConfirm,
  setShowPasswordConfirm,
  changed,
  setChanged,
}) {
  return (
    <Form
      id="profile-form"
      className="align-items-start"
      onChange={handleInputChange}
      onSubmit={handleFormSubmit}
    >
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            defaultValue={userData.firstName}
            name="firstName"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            defaultValue={userData.lastName}
            name="lastName"
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            defaultValue={userData.email}
            name="email"
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
          />
        </Form.Group>
      </Row>
      <Row className="mb-3" disabled={!editing} hidden={!showPasswordConfirm}>
        <Form.Group as={Col} controlId="formGridPasswordConfirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="passwordConfirm"
          />
        </Form.Group>
      </Row>
      <Button
        className="me-3"
        variant="success"
        type="submit"
        hidden={!changed}
        disabled={!changed}
      >
        Submit
      </Button>
      <Button
        variant="danger"
        type="reset"
        disabled={!changed}
        hidden={!changed}
        onClick={() => {
          setEditing(false);
          setShowPasswordConfirm(false);
          setChanged(false);
        }}
      >
        Cancel
      </Button>
    </Form>
  );
}
