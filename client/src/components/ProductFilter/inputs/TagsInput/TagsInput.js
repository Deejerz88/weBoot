import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom/client";
import { matchSorter } from "match-sorter";
// import { Tabulator } from "tabulator-tables";
import { MultiDownshift, tags } from "./index.js";
// import { TbLeaf } from "react-icons/tb/index.esm.js";
import "./style.css";

export default function TagsInput({ handleChanges }) {
  const [allItems, setAllItems] = useState();
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  //Mount
  useEffect(() => {
    const allTags = tags.sort((a, b) => a - b);
    console.log("allTags", allTags);
    setAllItems(allTags);
    setItems(allTags);
    const prevTags = JSON.parse(localStorage.getItem("selectedTags"))?.split(
      ","
    );
    console.log("prevTags", prevTags);

    setSelectedItems(prevTags || []);
  }, []);

  const handleStateChange = (changes, downshiftState) => {
    if (changes.hasOwnProperty("selectedItem")) {
      console.log("changes selected item", changes.selectedItem);
      if (selectedItems.includes(changes.selectedItem)) return;
      setSelectedItems([...selectedItems, changes.selectedItem]);
    } else if (changes.hasOwnProperty("inputValue")) {
      setItems(getItems(changes.inputValue));
    }
  };

  const getItems = (value) => {
    return value ? matchSorter(allItems, value) : allItems;
  };

  const onItemAdd = (selectedItem) => {
    console.log("selected items", selectedItems);
    if (selectedItems.includes(selectedItem)) return;
    setSelectedItems([...selectedItems, selectedItem]);
  };

  useEffect(() => {
    console.log("selectedItems changed", selectedItems);
    // if (!selectedItems.length) return;
    handleChanges({ tags: selectedItems });
    // if (!selectedItems.length) {
    //   localStorage.removeItem("selectedTags");
    //   return;
    // }
    // const tags = selectedItems.join(",");
    // localStorage.setItem("selectedTags", JSON.stringify(tags));
    // const table = Tabulator.findTable("#table")[0];
    // const url = `/products?vendors=${vendors}`;
    // table.setData(url)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ selectedItems]);

  const onRemoveItem = (item) => {
    const copy = [...selectedItems];
    copy.splice(item.index, 1);
    console.log("copy", copy);
    setSelectedItems(copy);
    // const table = Tabulator.findTable("#table")[0];
    // const url = `/products?vendors=${copy.join(",")}`;
    // table.setData(url).then(() => {
    //   let numRows = table.getRows().length;
    //   const max = table.getPageSize();
    //   console.log("max", max);
    //   console.log({ numRows });
    //   numRows = numRows >= max ? max : numRows;
    //   const height = numRows * 40 + 100;
    //   console.log("height", height);
    //   table.setHeight(height);
    // });
  };

  const onItemChanged = (item) => {
    const copy = [...selectedItems];
    copy.splice(item.index, 1, item.value);
    setSelectedItems(copy);
  };

  const itemToString = (i) => {
    return i ? i.name : "";
  };

  return (
    <MultiDownshift
      id="tags-search"
      selectedItems={selectedItems}
      onChangedState={handleStateChange}
      onChange={onItemAdd}
      onItemChanged={onItemChanged}
      onRemoveItem={onRemoveItem}
      items={items}
      itemToString={itemToString}
    />
  );
}
