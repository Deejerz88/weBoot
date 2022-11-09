import $ from "jquery";
import _ from "lodash";
import { DateTime } from "luxon";
import { beforeDate, afterDate } from "./index.js";

const setAdvFilters  = (filters) => {
  _.forEach(filters, (filterGroup, group) => {
    const {
      radio,
      min,
      max,
      equals,
      notequal,
      createdActive,
      createdAfter,
      createdBefore,
      updatedActive,
      updatedAfter,
      updatedBefore,
      filtered,
      barcodes,
      taxcodes,
      images,
      description,
    } = filterGroup;

    switch (group) {
      case "inventory":
        console.log(
          "inventory-mount -- radio:",
          radio,
          "min:",
          min,
          "max:",
          max
        );
        if (radio) {
          console.log("inventory-radio", radio, $(`#${radio}`));
          $(`#${radio}`).prop("checked", true);
          console.log($(`#${radio}`));
          
        }
        if (min > 0) {
          console.log("setting min", `#${group}-min`, min);
          const minEl = $(`#${group}-min[class='form-control']`);
          minEl.val(min);
          const minCheck = $(`#${group}-min[class='form-check-input']`);
          minCheck.prop("checked", true);
        }
        if (max < 10000) {
          console.log("setting max", `#${group}-max`, max);
          const maxEl = $(`#${group}-max[class='form-control']`);
          maxEl.val(max);
          const maxCheck = $(`#${group}-max[class='form-check-input']`);
          maxCheck.prop("checked", true);
        }
        break;
      case "price":
        console.log(
          "price-mount -- radio:",
          radio,
          "min:",
          min,
          "max:",
          max,
          "equals:",
          equals,
          "notequal:",
          notequal
        );
        if (radio) {
          console.log("price-radio", radio, $(`#${radio}`));
          $(`#${radio}`).prop("checked", true);
          console.log($(`#${radio}`));
        }
        if (min > 0) {
          console.log("setting min", `#${group}-min`, min);
          const minEl = $(`#${group}-min[class='form-control']`);
          minEl.val(min);
          const minCheck = $(`#${group}-min[class='form-check-input']`);
          minCheck.prop("checked", true);
        }
        if (max < 10000) {
          console.log("setting max", `#${group}-max`, max);
          const maxEl = $(`#${group}-max[class='form-control']`);
          maxEl.val(max);
          const maxCheck = $(`#${group}-max[class='form-check-input']`);
          maxCheck.prop("checked", true);
        }
        if (equals) {
          console.log("setting equals", `#${group}-equals`, equals);
          const equalsEl = $(`#${group}-equals[class='form-control']`);
          equalsEl.val(equals);
          const equalsCheck = $(`#${group}-equals[class='form-check-input']`);
          equalsCheck.prop("checked", true);
        }
        if (notequal) {
          console.log("setting notequal", `#${group}-notequal`, notequal);
          const notequalEl = $(`#${group}-notequal[class='form-control']`);
          notequalEl.val(notequal);
          const notequalCheck = $(
            `#${group}-notequal[class='form-check-input']`
          );
          notequalCheck.prop("checked", true);
        }
        break;
      case "missing":
        console.log(
          "missing-mount -- filtered:",
          filtered,
          "barcodes:",
          barcodes,
          "taxcodes:",
          taxcodes,
          "images:",
          images,
          "description:",
          description
        );
        if (barcodes) {
          $(`#missing-barcodes`).prop("checked", true);
        }
        if (taxcodes) {
          $(`#missing-taxcodes`).prop("checked", true);
        }
        if (images) {
          $(`#missing-images`).prop("checked", true);
        }
        if (description) {
          $(`#missing-description`).prop("checked", true);
        }
        break;
      case "created":
        console.log(
          "created-mount -- before:",
          createdBefore,
          "after:",
          createdAfter,
          "active:",
          createdActive,
          "afterDate",
          afterDate,
          "beforeDate",
          beforeDate
        );
        if (!createdActive) return;
        if (DateTime.fromISO(createdBefore) < DateTime.fromISO(beforeDate)) {
          console.log("setting before", `#${group}-before`, createdBefore);
          const beforeEl = $(`#${group}-before[type='date']`);
          const newDate = DateTime.fromISO(createdBefore)
            .plus({ hours: 12 })
            .toFormat("yyyy-MM-dd");
          console.log("newDate", newDate);
          beforeEl.val(newDate);
          const beforeCheck = $(`#${group}-check`);
          beforeCheck.prop("checked", true);
        }
        if (DateTime.fromISO(createdAfter) > DateTime.fromISO(afterDate)) {
          console.log("setting after", `#${group}-after`, createdAfter);
          const afterEl = $(`#${group}-after[type='date']`);
          const newDate = DateTime.fromISO(createdAfter)
            .plus({ hours: 12 })
            .toFormat("yyyy-MM-dd");
          console.log("newDate", newDate);
          afterEl.val(newDate);
          const afterCheck = $(`#${group}-check`);
          afterCheck.prop("checked", true);
        }
        break;
      case "updated":
        console.log(
          "updated-mount -- before:",
          updatedBefore,
          "after:",
          updatedAfter,
          "active:",
          updatedActive,
          "afterDate",
          afterDate,
          "beforeDate",
          beforeDate
        );
        if (!updatedActive) return;
        if (DateTime.fromISO(updatedBefore) < DateTime.fromISO(beforeDate)) {
          console.log("setting before", `#${group}-before`, updatedBefore);
          const beforeEl = $(`#${group}-before[type='date']`);
          const newDate = DateTime.fromISO(updatedBefore)
            .plus({ hours: 12 })
            .toFormat("yyyy-MM-dd");
          console.log("newDate", newDate);
          beforeEl.val(newDate);
          const beforeCheck = $(`#${group}-check`);
          beforeCheck.prop("checked", true);
        }
        if (DateTime.fromISO(updatedAfter) > DateTime.fromISO(afterDate)) {
          console.log("setting after", `#${group}-after`, updatedAfter);
          const afterEl = $(`#${group}-after[type='date']`);
          const newDate = DateTime.fromISO(updatedAfter)
            .plus({ hours: 12 })
            .toFormat("yyyy-MM-dd");
          console.log("newDate", newDate);
          afterEl.val(newDate);
          const afterCheck = $(`#${group}-check`);
          afterCheck.prop("checked", true);
        }
        break;
      default:
        console.log("default");
        return
    }
  });
};

export default setAdvFilters