import { TabulatorFull as Tabulator } from "tabulator-tables";
import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import VariantCard from "./VariantCard";
// import { ImageSelect } from "../index.js";
import $ from "jquery";
// import axios from "axios";

// import { variants } from '../helpers/popSidenav.js'

export default function VariantTable({ id, title, variants, setTable }) {
  useEffect(() => {
    console.log("varTable mounted", variants);
    let varTable = new Tabulator("#variant-table", {
      data: variants,
      layout: "fitColumns",
      // selectable: true,
      selectableRangeMode: "click",
      printRowRange: "visible",
      printAsHtml: true,
      // reactiveData: true,
      responsiveLayout: "collapse",
      columnDefaults: {
        responsive: 0,
        visible:false,
        editor: "input",
        editable: (cell) => {
          return cell.getRow().isSelected();
        },
        // editable: false,
        headerFilter: true,
      },
      columns: [
        {
          formatter: "rowSelection",
          titleFormatter: "rowSelection",
          titleFormatterParams: {
            rowRange: "active",
          },
          headerHozAlign: "center",
          hozAlign: "center",
          vertAlign: "middle",
          headerSort: false,
          maxWidth: 50,
          editable: false,
          headerFilter: false,
        },
        {
          formatter: "responsiveCollapse",
          title: "",
          headerSort: false,
          maxWidth: 50,
          hozAlign: "center",
          headerHozAlign: "center",
          editable: false,
        },
        {
          title: "Image",
          field: "image",
          maxWidth: 100,
          hozAlign: "center",
          headerFilter: false,
          editable: false,
          formatter: (cell) => {
            let src = cell.getValue();
            src = !!src
              ? src
              : "https://seeklogo.com/images/P/playmakers-logo-B694A97CB5-seeklogo.com.gif";
            return `<img src="${src}" style="width:75px;height:75px">`;
          },
          cellClick: (e, cell) => {
            //do something
          },
        },
        { title: "Variant ID", field: "id", responsive: 1, editable: false },
        { title: "Title", field: "title" },
        {
          title: "Price",
          field: "price",
          maxWidth: 75,
          formatter: "money",
          formatterParams: {
            symbol: "$",
            precision: 2,
          },
          hozAlign: "center",
        },
        {
          title: "compareAtPrice",
          field: "compareAtPrice",
          maxWidth: 75,
          formatter: "money",
          hozAlign: "center",
        },
        { title: "Size", field: "size" },
        { title: "Color", field: "color" },
        {
          title: "UPC",
          field: "upc",
          hozAlign: "center",
          headerHozAlign: "center",
        },
        {
          title: "Inventory",
          field: "inventory",
          maxWidth: 100,
          editable: false,
          hozAlign: "center",
          headerHozAlign: "center",
        },
        { title: "Tax Code", field: "tax_code" },
      ],
      rowFormatter: (row) => {
        const data = row.getData();
        if (!data) return;
        const element = row.getElement();
        while (element.firstChild) element.removeChild(element.firstChild);
        const card = VariantCard(data);
        element.innerHTML = card;
      },
    });

    varTable.on("rowContext", (e, row) => {
      e.preventDefault();
      if (row.isSelected()) row.deselect();
      else row.select();
    });
    varTable.on("cellEdited", (cell) => {
      let val = cell.getValue();
      let col = cell.getColumn().getField();
      let rows = varTable.getSelectedRows();
      rows.forEach((row) => {
        row.getCell(col).setValue(val);
      });
      $("#submit-var-changes").removeClass("opacity-0").prop("disabled", false);
      $("#cancel-var-changes").removeClass("opacity-0").prop("disabled", false);
    });

    varTable.on("tableBuilt", () => {
      $("#print-var-table").on("click", () => {
        varTable.print(false, true);
      });
      $("#download-var-table").on("click", () => {
        varTable.download("xlsx", `${id}-${title}.xlsx`);
      });
      setTable(varTable);
    });
  }, [id, setTable, title, variants]);
  return (
    <Container fluid className="d-flex justify-content-center flex-column">
      <Row className="justify-content-start">
        <Col>
          <Button hidden id="print-var-table" className="btn btn-success m-2">
            <i className="bi bi-printer-fill"></i>
          </Button>
          <Button className="btn btn-success m-4" id="download-var-table">
            <i className="bi bi-download"></i>
          </Button>
        </Col>
      </Row>
      <div
        id="variant-table"
        className="striped compact myTable"
        // ref={(tabulator) => (this.tabulator = tabulator)}
        ref={(tabulator) => tabulator}
      />
    </Container>
  );
}
