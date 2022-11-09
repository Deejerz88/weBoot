const tagsFilter = (row, tags) => {
  console.log("tagsFilter", row, !tags.length);
  if (!tags.length) return true;
  const { tags: productTags } = row;
  let tag = false;
  productTags.forEach((productTag) => {
    if (tags.includes(productTag)) {
      tag = true;
      return;
    }
  });
  return tag;
}
 
export default tagsFilter;