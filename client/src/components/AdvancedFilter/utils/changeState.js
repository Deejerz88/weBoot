import resetDate from "./resetDate.js";
import { camelCase } from "lodash";
import { DateTime } from "luxon";
import $ from "jquery";

const changeState = (el, elType, event, filter) => {
  return new Promise((resolve, reject) => {
    const groups = ["inventory", "price", "missing", "created", "updated"];
    const group = groups[el.name[5] - 1];
    let constraint = el.value.toLowerCase().replace(/ /g, "");
    console.log(el, "group", group, "constraint", constraint, el.placeholder);
    let bound;
    if (
      filter[group].radio === constraint &&
      event === "click" &&
      elType === "radio"
    ) {
      //radio uncheck
      el.checked = false;
      filter[group].radio = null;
      constraint = null;
    } else if (
      constraint === "min" ||
      constraint === "max" ||
      constraint.includes("equal")
    ) {
      //non-missing checkbox
      bound = Number(el.parentNode.childNodes[1].childNodes[0].value);
      console.log(bound);
      if (!bound) return;
      const checked = document.getElementById(`${group}-${constraint}`).checked;
      if (!checked) {
        bound =
          constraint === "min" ? 0 : constraint === "max" ? 1000000 : null;
        filter[group][constraint] = bound;
      } else {
        filter[group][constraint] = bound;
      }
    } else if (constraint.includes("missing")) {
      //missing checkbox
      constraint = constraint.split("-")[1];
      filter[group][constraint] = !filter[group][constraint];
      bound = filter[group][constraint];
    } else if (elType === "radio") {
      //Radio
      filter[group].radio = constraint;
    } else if (constraint.toLowerCase().includes("active")) {
      //date checkbox
      console.log("date checkbox");
      constraint = camelCase(`${group} ${constraint}`);
      filter[group][constraint] = !filter[group][constraint];
      const checked = $(`#${group}-check`).prop("checked");
      console.log('date checked', checked);
      if (!checked && constraint.includes("Active")) {
        console.log('date unchecked, resetting date', constraint)
        filter[group].createdBefore = resetDate("before");
        filter[group].createdAfter = resetDate("after");
      }
    } else if (constraint.includes("-") || !constraint) {
      //date input
      console.log("date input");
      constraint = camelCase(el.id);
      if (!el.value) {
        bound = resetDate(constraint);
      } else {
        bound = DateTime.fromFormat(el.value, "yyyy-MM-dd").toISO();
      }
      console.log("bound", bound);
      filter[group][constraint] = bound;
    } else {
      //Min or Max input
      bound = Number(constraint);
      constraint = el.placeholder.toLowerCase().replace(/ /g, "");
      const checked = document.getElementById(`${group}-${constraint}`).checked;
      if (bound && checked) filter[group][constraint] = bound;
      else return;
    }
    resolve({ newFilter: filter, newUpdate: { group, constraint, bound } });
  });
};

export default changeState;
