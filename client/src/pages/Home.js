import React, { useEffect, useState } from "react";

import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator_bootstrap5.min.css";
import { Row } from "react-bootstrap";
import {
  ProductCard,
  // eslint-disable-next-line no-unused-vars
  EmpProductFilter,
  ProductSidenav,
} from "../components/index.js";
import { FilterSidenav as Filters } from "../components/index.js";

import "../App.css";
import "bootstrap";
import { ToastContainer } from "react-toastify";
import Cart from "../components/Cart";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";

function ProductTable() {
  // eslint-disable-next-line no-unused-vars
  // const [products, setProducts] = useState([
  //   {
  //     id: 1,
  //     images: ['/assets/images/send-help.png'],
  //     title: 'Send Help',
  //     description: 'Send Help',
  //     category: 'Shirts',
  //     price: 25,
  //     compareAtPrice: null,
  //     vendor: 'weBoot',
  //     tags: ['Funny', 'Shirts', 'Cotton', 'Top', 'Graphic'],
  //     reviews: [{ rating: 3, body: 'This is a great shirt!' }],
  //     upc: Math.floor(Math.random() * 1000000000),
  //     variants: [
  //       {
  //         id: 1,
  //         size: 'S',
  //         color: 'Black',
  //         inventory: 0,
  //         image: '/assets/images/send-help.png',
  //       },
  //       {
  //         id: 2,
  //         size: 'M',
  //         color: 'Black',
  //         inventory: 15,
  //         image: '/assets/images/send-help.png',
  //       },
  //       {
  //         id: 3,
  //         size: 'L',
  //         color: 'Black',
  //         inventory: 12,
  //         image: '/assets/images/send-help.png',
  //       },
  //       {
  //         id: 4,
  //         size: 'XL',
  //         color: 'Black',
  //         inventory: 7,
  //         image: '/assets/images/send-help.png',
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     images: ['/assets/images/mim-hat.png'],
  //     title: 'Mim Hat',
  //     sku: 'MH-001',
  //     description: 'Imitation is the sincerest form of flattery',
  //     category: 'Hats',
  //     price: 100,
  //     compareAtPrice: 120,
  //     vendor: 'weBoot',
  //     tags: ['Hats', 'Headwear', 'Straw', 'Summer', 'Beach', 'Garden'],
  //     reviews: [{ rating: 4, body: 'This is a great hat!' }],
  //     upc: Math.floor(Math.random() * 1000000000),
  //     variants: [
  //       {
  //         id: 1,
  //         size: 'OSFM',
  //         color: 'Red',
  //         inventory: 100,
  //         image: '/assets/images/mim-hat.png',
  //       },
  //     ],
  //   },
  // ]);
  const [product, setProduct] = useState([]);
  const [showProduct, setShowProduct] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [variants, setVariants] = useState([]);

  let table;

  useEffect(() => {
    if (showProduct) setShowFilters(false);
  }, [showProduct]);

  const { data } = useQuery(QUERY_PRODUCTS);
  useEffect(() => {
    if (!data) return;
    console.log("products", data.products);
    const { products } = data;
    let newProducts = [];
    products.forEach((product) => {
      const { variants } = product;
      const newVariants = [];
      variants.forEach((variant) => {
        const { id, size, color, inventory, image } = variant;
        newVariants.push({ id, size, color, inventory, image });
      });
      const {
        id,
        images,
        title,
        description,
        category,
        price,
        compareAtPrice,
        vendor,
        tags,
        reviews,
        upc,
      } = product;
      newProducts.push({
        id,
        images,
        title,
        description,
        category,
        price,
        compareAtPrice,
        vendor,
        tags,
        reviews,
        upc,
        variants: newVariants,
      });
    });
    const table = Tabulator.findTable("#product-table")[0];
    console.log("data table", table);
    table.setData(newProducts);
    
  }, [data]);

  useEffect(() => {
    const productTable = new Tabulator("#product-table", {
      data: [],
      // reactiveData: true,
      layout: "fitColumns",
      placeholder: "Nothing to see here...",
      height: "100%",
      columnDefaults: {
        visible: false,
      },
      columns: [
        {
          title: "weBoot",
          field: "weboot",
          visible: true,
          headerHozAlign: "center",
          headerSort: false,
          titleFormatter: function () {
            return `
            <img src="/assets/images/orb.gif" height=75px;"/>
            <img src="/assets/images/logo_noBG.png" height=40px;"/>`;
          },
        },
      ],
      rowFormatter: (row) => {
        const data = row.getData();
        if (!data) return;
        const element = row.getElement();
        while (element.firstChild) element.removeChild(element.firstChild);
        const card = ProductCard(data);
        element.innerHTML = card;
      },
    });
    productTable.on("tableBuilt", function () {});
    productTable.on("rowClick", function (e, row) {
      console.log("row click", row.getData());
      setProduct(row.getData());
      setVariants(row.getData().variants);
      setShowProduct(true);
      setLoading(true);
    });
  }, []);

  return (
    <>
      <ProductSidenav
        show={showProduct}
        setShow={setShowProduct}
        product={product}
        loading={loading}
        setLoading={setLoading}
        variants={variants}
        setVariants={setVariants}
      />
      <Filters table={table} show={showFilters} setShow={setShowFilters} />
      <ToastContainer />
      <Row id="product-table" className="compact" />
      <Cart />
    </>
  );
}

export default ProductTable;
