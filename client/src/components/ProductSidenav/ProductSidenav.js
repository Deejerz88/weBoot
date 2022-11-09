/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Offcanvas, Button, Row, Col } from "react-bootstrap";
import { uniq, pick } from "lodash";
import {
  Carousel,
  ProductForm,
  VariantTable,
  Variants,
  // ContentLoading,
} from "./index.js";
import $ from "jquery";
import "react-toastify/dist/ReactToastify.css";
import { BsCheck2Square } from "react-icons/bs/index.esm.js";
import { ImCancelCircle } from "react-icons/im/index.esm.js";
import {
  TbArrowBigLeftLines,
  TbArrowBigRightLines,
} from "react-icons/tb/index.esm.js";
import { FaWindowClose } from "react-icons/fa/index.esm.js";
import "./style.css";

export default function ProductSidenav({
  product,
  show,
  setShow,
  loading,
  setLoading,
  variants,
  setVariants,
}) {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [table, setTable] = useState(null);
  // const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    if (!show || !product.id) return;
    console.log("sideNav product", product);
    setVariants(product.variants);
    setTitle(product.title);
    setId(product.id);
    setLoading(false)
  }, [show, product]);

  useEffect(() => {
    console.log("variants", variants);
    if (!variants) return;
    const imgArr = uniq(variants.map((v) => v.image)).filter((image) => image);
    console.log(imgArr);
    setVariants(product.variants)
    setImages(imgArr);
    setLoading(false);
    // const data = variants;
    // setOriginalData(data);
  }, [variants]);

  // useEffect(() => {
  //   console.log("loading", loading);
  //   if (loading) {
  //     $("#content-loading").show();
  //     $("#sidenav-body").hide();
  //   } else {
  //     $("#content-loading").fadeOut(250);
  //     $("#sidenav-body").fadeIn(400);
  //   }
  // }, [loading]);

  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   const action = e.target.id.split("-")[0];
  //   console.log("action:", action);
  //   if (action === "cancel") {
  //     console.log("cancel");
  //     table.setData(`/variants/${id}`);
  //     $("#submit-var-changes").prop("disabled", true).addClass("opacity-0");
  //     $("#cancel-var-changes").prop("disabled", true).addClass("opacity-0");
  //   } else if (action === "submit") {
  //     const rows = table.getSelectedRows();
  //     const dataFields = ["id", "name", "size", "color", "inventory"];
  //     // let updated = 0
  //     rows.forEach(async (row) => {
  //       const data = row.getData();
  //       const update = pick(data, dataFields);
  //       console.log("update:", update);
  //       const res = await axios.put(`/variants/update`, update);
  //       console.log("res:", res);
  //       row.deselect();
  //       $("#submit-var-changes").addClass("opacity-0");
  //       if (res) {
  //         toast.success(`${data.sku} / ${data.title} updated`);
  //         $("#submit-var-changes").prop("disabled", true).addClass("opacity-0");
  //         $("#cancel-var-changes").prop("disabled", true).addClass("opacity-0");
  //       } else {
  //         toast.error(`${data.sku} / ${data.title} failed to update`);
  //       }
  //     });
  //   }
  // };

  return (
    <Offcanvas
      id="product-sidenav"
      className=""
      placement="end"
      show={show}
      onHide={() => {
        setShow(false);
        setLoading(false);
        setVariants([]);
        setTitle("");
        setId("");
        setImages([]);
      }}
    >
      <Offcanvas.Header>
        <Col
          className="align-items-start d-flex flex-column"
          // onClick={handleClick}
        >
          <FaWindowClose
            id="close-filters"
            onClick={() => {
              setShow(false);
              setLoading(false);
              setVariants([]);
              setTitle("");
              setId("");
              setImages([]);
            }}
          />
          <div>
            <TbArrowBigLeftLines
              className="resize"
              onClick={() => {
                const currentWidth = $("#product-sidenav").width();
                $("#product-sidenav").width(currentWidth + 300);
              }}
            />
            <TbArrowBigRightLines
              className="resize"
              onClick={() => {
                const currentWidth = $("#product-sidenav").width();
                $("#product-sidenav").width(currentWidth - 300);
              }}
            />
          </div>
          <div>
            <Button
              disabled
              variant="success"
              type="submit"
              id="submit-var-changes"
              className="m-3 opacity-0 fw-bold"
            >
              <BsCheck2Square className="mx-1" /> Submit
            </Button>
            <Button
              disabled
              variant="danger"
              id="cancel-var-changes"
              className="m-3 opacity-0 fw-bold"
              type="submit"
            >
              <ImCancelCircle className="fs-6" /> Cancel
            </Button>
          </div>
        </Col>
        <Offcanvas.Title className="">{`${title}`}</Offcanvas.Title>{" "}
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Row id="sidenav-body" className="">
          <Carousel images={images} show={show} />
          <ProductForm product={product} />
          <Variants variants={variants} />
          {/* <VariantTable
            id={id}
            title={title}
            variants={variants}
            setTable={setTable}
          /> */}
        </Row>
        {/* <Row>
          <ContentLoading className="p-0" />
        </Row> */}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
