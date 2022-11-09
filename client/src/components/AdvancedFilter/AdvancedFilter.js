
import _ from "lodash";
import React, { useState, useEffect } from "react";
import { Form, Row, Container } from "react-bootstrap";
import { Tabulator } from "tabulator-tables";
import {
  changeState,
  inventoryFilter,
  priceFilter,
  missingFilter,
  dateFilter,
  setAdvFilters,
  InventorySearch,
  PriceSearch,
  MissingSearch,
  CreatedDate,
  UpdatedDate,
  beforeDate,
  afterDate,
} from "./index.js";
import "./style.css";

function AdvancedFilter() {
  const [filter, setFilter] = useState(null);
  const [table, setTable] = useState(null);
  const [update, setUpdate] = useState(null);

  const handleChanges = async (e) => {
    console.log("handleChanges", e);
    e.stopPropagation();
    const el = e.target;
    const event = e.type;
    const elType = el.type;
    console.log("el", el, "event", event, "elType", elType, "value", el.value);
    if (
      //form area click
      (event === "click" && elType !== "radio") ||
      //empty non-date
      (elType !== "date" && !el.value)
    )
      return;
    const { newFilter, newUpdate } = await changeState(
      el,
      elType,
      event,
      filter
    );
    console.log("stateChanged", newFilter, newUpdate);
    localStorage.setItem("advancedFilter", JSON.stringify(newFilter));

    setFilter(newFilter);
    const thisTable = Tabulator.findTable("#table")[0];
    const filters = thisTable.getFilters();
    console.log("filters", filters);

    setTable(thisTable);
    setUpdate(newUpdate);
  };

  useEffect(() => {
    console.log("filter useEffect", filter);
    // if (!filter) return;
  }, [filter]);

  useEffect(() => {
    console.log("AdvancedFilters mounted");
    const advFilters = JSON.parse(localStorage.getItem("advancedFilter")) || {
      inventory: { radio: null, min: 0, max: 10000 },
      price: {
        radio: null,
        min: 0,
        max: 10000,
        equals: null,
        notequal: null,
      },
      missing: {
        filtered: false,
        barcodes: false,
        taxcodes: false,
        images: false,
        description: false,
      },
      created: {
        createdActive: false,
        createdAfter: afterDate,
        createdBefore: beforeDate,
      },
      updated: {
        updatedActive: false,
        updatedAfter: afterDate,
        updatedBefore: beforeDate,
      },
    };
    console.log("advFilters", advFilters);
    setFilter(advFilters);
    setAdvFilters(advFilters);
  }, []);

  useEffect(() => {
    console.log(
      "variant filter update",
      filter || "no filter",
      update || "no update"
    );
    if (!update) return;
    const { group, constraint } = update;
    console.log("group", group, "constraint", constraint);
    const tableFilter = _.find(table.getFilters(), (f) => f.value === group);
    console.log("tableFilter", tableFilter);
    if (tableFilter) {
      const { field, type, value } = tableFilter;
      table.removeFilter(field, type, value);
      console.log("removed > new filters", table.getFilters());
    }
    const filterGroup = filter[group];
    table.addFilter(
      (row) => {
        // console.log('filtering', data)
        if (group === "inventory") {
          const { totalInventory } = row;
          return inventoryFilter({ filterGroup, totalInventory, constraint });
        } else if (group === "price") {
          const { minPrice, maxPrice, onSale, prices } = row;
          return priceFilter({
            filterGroup,
            minPrice,
            maxPrice,
            onSale,
            prices,
            constraint,
          });
        } else if (group === "missing") {
          const {
            missingBarcodes,
            missingTaxcodes,
            missingImages,
            missingDescription,
            handle,
          } = row;
          return missingFilter({
            update,
            filterGroup,
            missingBarcodes,
            missingTaxcodes,
            missingImages,
            missingDescription,
            handle,
          });
        } else if (
          group.toLowerCase().includes("created") ||
          group.toLowerCase().includes("updated")
        ) {
          const { created_at, updated_at } = row;
          console.log("created_at", created_at, "updated_at", updated_at);
          return dateFilter({
            update,
            filterGroup,
            created_at,
            updated_at,
          });
        }
      },
      "function",
      group
    );
    // table.redraw();
    const tableFilters = table.getFilters();
    console.log(" advanced table Filters", tableFilters);
    localStorage.setItem("tableFilters", JSON.stringify(tableFilters));
    setUpdate(null);
  }, [filter, table, update]);

  return (
    <Container id="advanced-filters" fluid className="">
      <h3>Advanced Filters</h3>
      <hr id="advanced-rule"></hr>
      <Form id="variant-filters" className="">
        <InventorySearch handleChanges={handleChanges} />
        <PriceSearch handleChanges={handleChanges} />
        <MissingSearch handleChanges={handleChanges} />
        <Row
          onChange={handleChanges}
          onClick={(e) => handleChanges}
          style={{ marginLeft: 3, marginRight: 3 }}
          id="date-row"
          className="justify-content-between"
        >
          <CreatedDate handleChanges={handleChanges} />
          <UpdatedDate handleChanges={handleChanges} />
        </Row>
      </Form>
    </Container>
  );
}

export default AdvancedFilter;
