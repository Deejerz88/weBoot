const priceFilter = (row, value, field) => {
  const onSale = row.compareAtPrice;
  field = field.split("-")[1];
  const { price } = row;
  const { radio, min, max } = value;
  if (field === "radio") {
    if (!radio) return true;
    if (radio === "sale") {
      return onSale;
    } else if (radio === "regular") {
      return !onSale;
    }
  } else if (value === 0 || value === 10000 || !value) {
    return true;
  } else {
    return price >= min && price <= max;
  }
};

export default priceFilter;
