import _ from 'lodash'

const priceFilter = ({
  filterGroup,
  minPrice,
  maxPrice,
  onSale,
  prices,
  constraint,
}) => {
  console.log("filter price", constraint || "no constraint");
  if (constraint === "sale") {
    return onSale;
  } else if (constraint === "regular") {
    return !onSale;
  } else if (constraint?.includes("equal")) {
    const match = constraint === "equals";
    if ((match && !filterGroup.equals) || (!match && !filterGroup.notequal))
      return true;
    const equals = _.some(prices || [], (p) => {
      return Number(p) === filterGroup[constraint];
    });
    if (match) {
      return equals;
    } else {
      return !equals;
    }
  } else {
    return minPrice >= filterGroup.min && maxPrice <= filterGroup.max;
  }
};

export default priceFilter;
