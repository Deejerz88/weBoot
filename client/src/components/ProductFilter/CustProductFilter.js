import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import {
  PriceSearch,
  ColorSearch,
  TextSearch,
  CategoriesInput,
  RatingSearch,
  TagsInput,
  SizeSearch,
} from "./inputs/index.js";
import { BiCategoryAlt } from "react-icons/bi/index.esm.js";
import { BsRulers } from "react-icons/bs/index.esm.js";
import { Tabulator } from "tabulator-tables";
import { find } from "lodash";
import {
  colorFilter,
  textFilter,
  ratingFilter,
  tagsFilter,
  sizeFilter,
  priceFilter,
} from "./utils/index.js";

export default function CustProductFilter() {
  const [filter, setFilter] = useState({
    text: "",
    price: { radio: null, min: 0, max: 1000 },
    colors: [],
    categories: [],
    rating: 1,
    tags: [],
    sizes: [],
  });
  const [update, setUpdate] = useState(null);

  const handleChanges = (e) => {
    console.log(">>customer filter changed", e);

    const event = e.type;
    const elType = e.target?.type;
    const id = e.target ? e.target?.id : null;
    console.log("elType", elType, "id", id);
    if (event === "click" && elType !== "radio" && !id.includes("expand"))
      return;
    if (id === "text-search") {
      //text search
      setFilter({ ...filter, text: e.target.value });
      setUpdate({ field: "text", value: e.target.value });
    } else if (e.colors) {
      //color search
      setFilter({ ...filter, colors: e.colors });
      setUpdate({ field: "colors", value: e.colors });
    } else if (e.categories) {
      //categories search
      setFilter({ ...filter, categories: e.categories });
      setUpdate({ field: "categories", value: e.categories });
    } else if (e.tags) {
      //tags search
      setFilter({ ...filter, tags: e.tags });
      setUpdate({ field: "tags", value: e.tags });
    } else if (e.sizes) {
      //sizes search
      setFilter({ ...filter, sizes: e.sizes });
      setUpdate({ field: "sizes", value: e.sizes });
    } else if (id?.includes("price")) {
      //price search
      let { value, placeholder, type } = e.target;
      console.log("value", value, "placeholder", placeholder, "type", type);
      //radio click
      if (type === "radio") {
        const radio = filter.price.radio;
        if (radio === value && e.type === "click") {
          //radio unclick
          e.target.checked = false;
          value = null;
        }
        setFilter({ ...filter, price: { ...filter.price, radio: value } });
        setUpdate({
          field: "price-radio",
          value: { ...filter.price, radio: value },
        });
      } else if (type === "checkbox") {
        //checkbox click
        if (e.type === "click") return;
        const checked = e.target.checked;
        const field = e.target.id.split("-")[1];
        if (checked) {
          const newValue = Number(
            e.target.parentNode.childNodes[1].childNodes[0].value
          );
          if (!newValue) return;
          setFilter({
            ...filter,
            price: { ...filter.price, [field]: newValue },
          });
          setUpdate({
            field: `price-${field}`,
            value: { ...filter.price, [field]: newValue },
          });
        } else {
          //checkbox uncheck
          const newValue = field === "min" ? 0 : field === "max" ? 10000 : null;
          setFilter({
            ...filter,
            price: { ...filter.price, [field]: newValue },
          });
          setUpdate({
            field: `price-${field}`,
            value: newValue,
          });
        }
      } else if (placeholder === "Min") {
        //min input
        const checked = document.getElementById("price-min").checked;
        if (!value || !checked) return;
        value = Number(value);
        setFilter({ ...filter, price: { ...filter.price, min: value } });
        setUpdate({
          field: "price-min",
          value: { ...filter.price, min: value },
        });
      } else if (placeholder === "Max") {
        //max input
        const checked = document.getElementById("price-max").checked;
        if (!value || !checked) return;
        value = Number(value);
        setFilter({ ...filter, price: { ...filter.price, max: value } });
        setUpdate({
          field: "price-max",
          value: { ...filter.price, max: value },
        });
      }
    } else if (e.rating) {
      //rating search
      // console.log("rating search changed", e);
      setFilter({ ...filter, rating: e.rating });
      setUpdate({ field: "rating", value: e.rating });
    }
  };

  useEffect(() => {
    console.log("filter changed", update);
    if (!update) return;
    const { field, value } = update || {};
    const table = Tabulator.findTable("#product-table")[0];
    if (!table) return;
    const tableFilter = find(table.getFilters(), (f) => f.value === field);
    console.log("tableFilter", tableFilter);
    if (tableFilter) {
      const { field, type, value } = tableFilter;
      table.removeFilter(field, type, value);
      console.log("removed > new filters", table.getFilters());
    }
    console.log('tablerows', table.getRows())
    table.addFilter(
      (row) => {
        if (field === "text") {
          return textFilter(row, value);
        } else if (field === "colors") {
          console.log("color filter", row, value)
          return colorFilter(row, value);
        } else if (field === "categories") {
          const { category } = row;
          const categories = value;
          if (!categories.length) return true;
          return categories.includes(category);
        } else if (field === "rating") {
          return ratingFilter(row, value);
        } else if (field === "tags") {
          return tagsFilter(row, value);
        } else if (field === "sizes") {
          return sizeFilter(row, value);
        } else if (field.includes("price")) {
          console.log("price", row, value, field);
          return priceFilter(row, value, field);
        } else {
          return true;
        }
      },
      "function",
      field
    );
      console.log("updated > new filters", table.getFilters());

    setUpdate(null);
  }, [update]);

  return (
    <>
      <h1>Filters</h1>
      <TextSearch handleChanges={handleChanges} />
      <Accordion id="filter-accordian" defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h5>💸 Price</h5>
          </Accordion.Header>
          <Accordion.Body>
            <PriceSearch handleChanges={handleChanges} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <h5>🌈 Color</h5>
          </Accordion.Header>
          <Accordion.Body>
            <ColorSearch handleChanges={handleChanges} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <h5>
              <BiCategoryAlt color="blue" /> Category
            </h5>
          </Accordion.Header>
          <Accordion.Body>
            <CategoriesInput handleChanges={handleChanges} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <h5>⭐ Rating</h5>
          </Accordion.Header>
          <Accordion.Body>
            <RatingSearch handleChanges={handleChanges} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>
            <h5>🏷️ Tags</h5>
          </Accordion.Header>
          <Accordion.Body>
            <TagsInput handleChanges={handleChanges} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header>
            <h5>
              <BsRulers id="size-ruler" /> Sizes
            </h5>
          </Accordion.Header>
          <Accordion.Body>
            <SizeSearch handleChanges={handleChanges} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
