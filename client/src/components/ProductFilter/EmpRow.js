import React, { useEffect } from "react";
import {Row, Col, Form } from "react-bootstrap";
import { RiDeleteBack2Line } from "react-icons/ri/index.esm.js";
export default function FilterRow({
  row,
  deleteRow,
  updateFilter,
  filter,
  numRows,
  newRow,
}) {
  const { field, type, value } = filter;
  console.log("filterRow", filter);
  useEffect(() => {
    // const filterRows = $("#filter-rows").children();
    // console.log("filterRows", filterRows);
    // filterRows.each(function (i) {
    //   if (++i % 2 === 0) {
    //     $(this).css("background-color", "#e4e4e4dc");
    //   } else {
    //     $(this).css("background-color", "");
    //   }
    // });
  }, [row, numRows]);

  function RowDelete({ row }) {
    return (
      <Col id={`delete-col-${row}`}>
        <RiDeleteBack2Line
          id={`delete-icon-${row}`}
          className="mt-2"
          onClick={(e) => {
            const parent = e.target.parentElement;
            const id = parent.id || parent.parentElement.id;
            const thisRow = Number(id.split("-")[2]);
            deleteRow(thisRow);
          }}
        />
      </Col>
    );
  }

  function Field({ row }) {
    return (
      <Form.Select
        id={`filter-field-${row}`}
        className="form-select"
        value={field}
        onChange={(e) => {}}
      >
        <option value="title">Title</option>
        <option value="id">Product ID</option>
        <option value="skus">SKUs</option>
        <option value="vendor">Vendor</option>
        <option value="handle">Handle</option>
        <option value="product_type">Type</option>
        <option value="tags">Tags</option>
      </Form.Select>
    );
  }

  function Type({ row }) {
    return (
      <Form.Select
        id={`filter-type-${row}`}
        // style = {{height}}
        className="form-select text-wrap"
        value={type}
        onChange={(e) => {}}
      >
        <option value="like">Contains</option>
        <option value="regex">Does Not Contain</option>
        {field !== "skus" ? (
          <>
            <option value="=">Equals</option>{" "}
            <option value="!=">Not equal</option>{" "}
            <option value="keyword">Keywords</option>
            <option value="starts">Starts with</option>
            <option value="ends">Ends with</option>
          </>
        ) : null}

        {/* <option value="<">Less than</option>
      <option value="<=">Less than or equal</option>
      <option value=">">Greater than</option>
      <option value=">=">Greater than or equal</option> */}
      </Form.Select>
    );
  }

  function Value({ row }) {
    return (
      <Form.Control
        id={`filter-value-${row}`}
        className="form-control text-wrap"
        placeholder="Enter value"
        defaultValue={value}
        onChange={(e) => {}}
      />
    );
  }

  return (
    <div className="rounded-1 filter-container">
      <Row
        id={`filter-row-${row}`}
        className={`filter-row flex-nowrap ${newRow}`}
        onChange={updateFilter}
      >
        <RowDelete row={row} key={`rowDelete-${row}`} />
        <Field row={row} key={`field-${row}`} />
        <Type row={row} key={`type-${row}`} />
        <Value row={row} key={`value-${row}`} />
      </Row>
    </div>
  );
}
