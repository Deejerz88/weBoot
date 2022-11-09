const sizeFilter = (row, sizes) => {
  console.log("sizeFilter", row, sizes);
  if (!sizes.length) return true;
  const { variants } = row;
  let size = false;
  variants.forEach((variant) => {
    console.log("variant size", variant.size, variant.inventory);
    if (variant.size === "OSFM" && variant.inventory > 0) {
      size = true;
      return;
    }
    if (sizes.includes(variant.size) && variant.inventory > 0) {
      size = true;
      return;
    }
  });
  return size;
};

export default sizeFilter;
