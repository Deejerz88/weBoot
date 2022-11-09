const textFilter = ( row, value ) => {
  console.log("textFilter", row, value);
  if (!value) return true;
  const { handle, title, description, tags, vendor, type, variants } = row;
  let text = `${handle}${title}${description}${tags}${vendor}${type}`;
  variants.forEach((variant) => {
    const { title, sku, size, color } = variant;
    text += `${title}${sku}${size}${color}`;
  });
  console.log("text", text);
  text = text.replace(/ /g, "").toLowerCase();
  value = value.replace(/ /g, "").toLowerCase();
  console.log("value", value, "text", text);
  return text.includes(value);
};

export default textFilter;
