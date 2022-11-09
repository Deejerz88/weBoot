import _ from "lodash";
import { DateTime } from "luxon";

const dateFilter = ({ update, filterGroup, created_at, updated_at }) => {
  console.log('dateFilter', update, filterGroup, created_at, updated_at)
  if (update.group.includes("created")) {
    console.log('filtering created')
    let { createdBefore, createdAfter, createdActive } = filterGroup;
    createdBefore = DateTime.fromISO(createdBefore);
    createdAfter = DateTime.fromISO(createdAfter);
    if (!createdActive) return true;
    const createdDate = DateTime.fromISO(created_at);
    console.log(
      "createdBefore:",
      createdBefore.toLocaleString(),
      "createdAfter:",
      createdAfter.toLocaleString(),
      "createdDate:",
      createdDate.toLocaleString()
    );
    console.log('created filter', createdDate <= createdBefore && createdDate >= createdAfter);
    return createdDate <= createdBefore && createdDate >= createdAfter;
  } else if (update.group.toLowerCase().includes("updated")) {
    let { updatedBefore, updatedAfter, updatedActive } = filterGroup;
    updatedBefore = DateTime.fromISO(updatedBefore);
    updatedAfter = DateTime.fromISO(updatedAfter);
    if (!updatedActive) return true;
    const updatedDate = DateTime.fromISO(updated_at);
    console.log(
      "updatedBefore",
      updatedBefore.toLocaleString(),
      "updatedAfter",
      updatedAfter.toLocaleString(),
      "updatedDate",
      updatedDate.toLocaleString()
    );
    return updatedDate <= updatedBefore && updatedDate >= updatedAfter;
  }
};

export default dateFilter;
