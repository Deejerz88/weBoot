import { Form, Row, Col } from "react-bootstrap";
import { MdOutlineSearchOff } from "react-icons/md/index.esm.js";
import { IconContext } from "react-icons";

export default function MissingSearch({ handleChanges }) {
  return (
    <Row
      onChange={(e) => {
        handleChanges(e);
      }}
      onClick={(e) => {
        handleChanges(e);
      }}
    >
      <div className="filter-label">
        <Form.Label className="">
          <IconContext.Provider value={{ size: "1.0em", color: "red" }}>
            <MdOutlineSearchOff className="mx-1" />
          </IconContext.Provider>
          Missing:
        </Form.Label>
      </div>
      <Col>
        <Row className="flex-nowrap">
          <div className="col-one">
              <Form.Check
                inline
              value="missing-barcodes"
              id="missing-barcodes"
                label="Barcode ║█║▌"
                name="group3"
                type={"checkbox"}
              />
          </div>
            <div className="col-two">
              <Form.Check
                inline
              value="missing-taxcodes"
              id="missing-taxcodes"
                label="Tax Code ⚖️"
                name="group3"
                type={"checkbox"}
              />
          </div>
        </Row>
        <Row className="">
            <div className="col-one">
              <Form.Check
                inline
              value="missing-images"
              id="missing-images"
                label="Image 🖼️"
                name="group3"
                type={"checkbox"}
              />
            </div>
            <div className="col-two">
              <Form.Check
                inline
              value="missing-description"
              id="missing-description"
                label="Description 📝"
                name="group3"
                type={"checkbox"}
              />
            </div>
        </Row>
      </Col>
    </Row>
  );
}
