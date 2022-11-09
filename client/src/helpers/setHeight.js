const setHeight = (table, numRows) => {
  const max = table.getPageSize();
  numRows = numRows ? numRows : table.getRows().length
  numRows = numRows >= max ? max : numRows;
  const height = numRows * table.rowHeight + 105;
  console.log('height', height);
  table.setHeight(height);
  return height;
};

export default setHeight;
