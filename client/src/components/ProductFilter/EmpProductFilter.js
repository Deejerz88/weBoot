import React, { useState, useEffect } from "react";
import { Tabulator } from "tabulator-tables";
import FilterRow from "./EmpRow.js";
import { remove, map } from "lodash";
import { Container, Row, Col } from "react-bootstrap";
import { MdOutlineDeleteSweep } from "react-icons/md/index.esm.js";
import { FcAddRow } from "react-icons/fc/index.esm.js";
import $ from "jquery";
import "./style.css";

function EmpProductFilter() {
  const [filter, setFilter] = useState(
    JSON.parse(localStorage.getItem("empProductFilter")) || [
      { field: "title", type: "like", value: "", row: 1 },
    ]
  );
  const [update, setUpdate] = useState(null);
  const [numRows, setNumRows] = useState(1);
  const [rows, setRows] = useState(null);

  const updateFilter = (e) => {
    e.stopPropagation();
    let change = e.target.id.split("-")[1];
    // change = change === "value" ? null : change
    const thisRow = Number(e.target.id.split("-")[2]);
    const value = e.target.value;
    const field = $(`#filter-field-${thisRow}`).val();
    const type = $(`#filter-type-${thisRow}`).val();
    setUpdate({ change, thisRow, value });
    console.log(
      "updating filter",
      "change",
      change,
      "thisRow",
      thisRow,
      "field",
      field,
      "type",
      type,
      "value",
      value,
      "original filter",
      filter
    );
    let newFilter = [...filter];
    map(newFilter, (f) => {
      if (f.row === thisRow) {
        console.log("change", change, type);
        if (change === "value" && type === "regex") {
          const valStr = value.trim().replace(/ {2}/g, " ").replace(/ /g, "|");
          console.log("valStr", valStr);
          const regex =
            value !== "" ? new RegExp(`^(?!.*(${valStr})).*$`, "i") : "";
          console.log("regex", regex);
          f.value = regex;
          return;
        }
        f[change] = value;
      }
    });
    console.log("filter updated", newFilter);
    setFilter(newFilter);
  };

  const deleteRow = (thisRow) => {
    console.log(filter);
    let newFilter = [...filter];
    remove(newFilter, (filter) => filter.row === thisRow);
    console.log("deleteRow", thisRow);
    console.log("newFilter", newFilter, newFilter.length);
    const row = $(`#filter-row-${thisRow}`);
    if (newFilter.length === 0) {
      console.log("last row");
      row.css({ backgroundColor: "red", opacity: 50 });
      setTimeout(() => {
        $(`#filter-field-${thisRow}`).val("title");
        $(`#filter-type-${thisRow}`).val("like");
        $(`#filter-value-${thisRow}`).val("");
        newFilter = [{ field: "title", type: "like", value: "", row: thisRow }];
        row.css({ backgroundColor: "rgb(247, 247, 247)", opacity: 1 });
        setFilter(newFilter);

        setNumRows(1);
      }, 100);
      return;
    }
    newFilter = newFilter || [
      { field: "title", type: "like", value: "", row: thisRow },
    ];
    console.log("row", row);
    row
      .css({ backgroundColor: "red", opacity: 0 })
      .css({ marginLeft: "2000px" });
    setTimeout(() => {
      setFilter(newFilter);
      setNumRows(newFilter.length);
    }, 300);
  };

  useEffect(() => {
    console.log("EmpProductFilter mounted");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      $(".new-row").css({
        marginLeft: "0px",
        backgroundColor: "rgb(247, 247, 247)",
        opacity: 1,
      });
    }, 0);
  }, [rows]);

  useEffect(() => {
    // console.log("filtering table", filter, numRows, rows, update);
    // setProdFilter(filter);
    localStorage.setItem("empProductFilter", JSON.stringify(filter));
    if (update?.change !== "value") {
      const newRows = filter?.map((f, i) => {
        console.log("adding row", f);
        const newRow = i !== 0 && i === filter.length - 1 ? "new-row" : "";
        return (
          <FilterRow
            row={f.row}
            key={f.row}
            filter={f}
            numRows={numRows}
            deleteRow={deleteRow}
            updateFilter={updateFilter}
            newRow={newRow}
          />
        );
      });
      console.log("newRows", newRows);

      setRows(newRows);
    } else {
      setUpdate(null);
    }
    const table = Tabulator.findTable("#table")[0];
    if (!table.getData().length) return;
    let tableFilters = table.getFilters();
    tableFilters = tableFilters.filter((f) => {
      return f.type === "function";
    });
    let newFilter = tableFilters.concat(filter);
    console.log("newFilter", newFilter);
    table.setFilter(newFilter);
    table.refreshFilter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const clearFilter = () => {
    // console.log("clear all filters");
    // ${}
    setFilter([{ field: "title", type: "like", value: "", row: 1 }]);
    setNumRows(1);
  };

  const addRow = () => {
    console.log("adding row", "curent filter", filter);
    const row = Math.round(Math.random() * 10000);
    setNumRows(numRows + 1);
    let newFilter = [...filter];
    newFilter.push({ field: "title", type: "like", value: "", row });
    console.log("added Row", row, newFilter);
    setFilter(newFilter);
  };

  return (
    <Container fluid id="product-filters" className="border">
      <Row className="justify-content-between">
        <Col>
          <h3>Product Filters</h3>
        </Col>
        <Col className="text-end">
          <MdOutlineDeleteSweep
            onClick={clearFilter}
            id="clear-product-filters"
          />
        </Col>
      </Row>
      <hr></hr>
      <Row className="">
        <Col id="filter-rows">
          {rows?.map((row, i) => {
            console.log("adding row", row);
            return row;
          })}
        </Col>
      </Row>
      <FcAddRow
        id="add-filter"
        onClick={(e) => {
          addRow();
        }}
      />
    </Container>
  );
}

export default EmpProductFilter;
