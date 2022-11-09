import _ from "lodash";

const missingFilter = ({
  missingBarcodes,
  missingTaxcodes,
  missingImages,
  missingDescription,
  filterGroup,
}) => {
  console.log("filtering missing", {
    filterGroup,
    missingBarcodes,
    missingTaxcodes,
    missingImages,
    missingDescription,
  });

  const filtered = _.keys(_.pickBy(filterGroup));
  console.log("filtered", filtered);
  if (filtered.length === 0) return true;
  let show = false;
  filtered.forEach((filter) => {
    switch (filter) {
      case "barcodes":
        show = missingBarcodes
        break
      case "taxcodes":
        show = missingTaxcodes
        break
      case "images":
        show = missingImages
        break
      case "description":
        show = missingDescription
        break
      default:
        show = true
    }
  });
  console.log("show", show);
  return show;
}
export default missingFilter;
