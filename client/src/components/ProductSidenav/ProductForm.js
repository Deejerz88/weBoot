import { Form, Row, Col, Button } from "react-bootstrap";
import { startCase, isEqual, forEach } from "lodash";
import React, { useState, useEffect } from "react";
import { BsCheck2Square } from "react-icons/bs/index.esm.js";
import { ImCancelCircle } from "react-icons/im/index.esm.js";
import $ from "jquery";
import axios from "axios";
import { toast } from "react-toastify";

export default function ProductForm({ product }) {
  const [fields, setFields] = useState([]);
  const [values, setValues] = useState([]);
  const [originalValues, setOriginalValues] = useState([]);

  const handleChanges = (e) => {
    e.stopPropagation();
    console.log(e.target, e.target.value);
    const { id, value } = e.target;
    setValues({ ...values, [id]: value });
  };

  const handleCancel = (e) => {
    // e.stopPropagation();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("submit", e.nativeEvent.submitter);
    const action = e.nativeEvent.submitter.id.split("-")[1];
    console.log("action:", action);
    if (action === "cancel") {
      console.log("cancel");
      forEach(originalValues, (value, key) => {
        $(`#${key}`).val(value);
      });
      setValues(originalValues);
    } else if (action === "submit") {
      $("body").css({ cursor: "progress" });
      console.log("values", values, "originalValues", originalValues);
      axios.put(`/products/update`, values).then((res) => {
        console.log("res:", res);
        $("body").css({ cursor: "default" });
        if (res) {
          toast.success(`${values.title} updated`);
          setOriginalValues(values);
        } else {
          toast.error(`${values.title} failed to update`);
        }
      });
    }
  };

  useEffect(() => {
    console.log("values", values, "originalValues", originalValues);
    if (!isEqual(values, originalValues)) {
      console.log("values changed");
      $("#form-submit").prop("disabled", false).removeClass("opacity-0");
      $("#form-cancel").prop("disabled", false).removeClass("opacity-0");
    } else {
      console.log("values unchanged");
      $("#form-submit").prop("disabled", true).addClass("opacity-0");
      $("#form-cancel").prop("disabled", true).addClass("opacity-0");
    }
  }, [values, originalValues]);

  useEffect(() => {
    const customerFields = [
      "price",
      "category",
      "description",
      // "reviews",
      "tags",
    ];
    console.log("product changed", product);
    const newFields = Object.keys(product).filter((key) =>
      customerFields.includes(key)
    );
    console.log("newFields", newFields);
    setFields(newFields);
    const newValues = {};
    newFields.map((field) => {
      return (newValues[field] = product[field]);
    });
    newValues.id = product.id;
    console.log("newValues", newValues);
    setValues(newValues);
    setOriginalValues(newValues);
  }, [product]);
  return (
    <Row className="justify-content-center">
      <Form
        id="product-form"
        className="customer-form"
        onChange={handleChanges}
        onSubmit={handleSubmit}
      >
        {fields.map((field, i) => {
          const value =
            field === "tags" ? product[field].join(", ") : product[field];
          return (
            <Row className="mb-3" key={`${field}-row`}>
              <Form.Group as={Row}>
                <Form.Label
                  className="product-label"
                  key={`${field}-label`}
                  column
                  sm="2"
                >
                  {startCase(field)}
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    id={field}
                    key={field}
                    defaultValue={value}
                    className="product-field"
                  />
                </Col>
              </Form.Group>
            </Row>
          );
        })}
        <Row className="justify-content-center f">
          <Button
            disabled
            variant="success"
            type="submit"
            id="form-submit"
            className="w-25 mx-3 opacity-0 fw-bold"
          >
            <BsCheck2Square className="mx-1" /> Submit
          </Button>
          <Button
            disabled
            variant="danger"
            id="form-cancel"
            className="w-25 mx-3 opacity-0 fw-bold"
            type="submit"
            onClick={handleCancel}
          >
            <ImCancelCircle className="fs-6" /> Cancel
          </Button>
        </Row>
      </Form>
    </Row>
  );
}
