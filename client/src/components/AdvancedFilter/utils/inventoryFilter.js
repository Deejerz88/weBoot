const inventoryFilter = ({filterGroup, totalInventory, constraint}) => {
  // console.log("filtering inventory", constraint || "no constraint");
  if (constraint === "instock") {
    return totalInventory > 0 && totalInventory <= filterGroup.max;
  } else if (constraint === "nostock") {
    return totalInventory === 0;
  } else {
    return (
      totalInventory >= filterGroup.min && totalInventory <= filterGroup.max
    );
  }
};

export default inventoryFilter;
