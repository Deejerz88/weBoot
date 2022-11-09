import React, { useEffect, useState } from "react";

import { Form } from "react-bootstrap";

export default function SizeSearch({ handleChanges }) {
  const [sizes, setSizes] = useState([]);

  const handleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSizes([...sizes, value]);
    } else {
      setSizes(sizes.filter((size) => size !== value));
    }
  };

  useEffect(() => {
    handleChanges({ sizes });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sizes]);

  return (
    <Form id="size-search" onChange={handleChange}>
      {["XS", "S", "M", "L", "XL", "XXL"].map((value) => (
        <Form.Check
          value={value}
          id={value}
          label={value}
          key={value}
          name="group1"
          className="size-checkbox"
          type={"checkbox"}
        />
      ))}
    </Form>
  );
}
