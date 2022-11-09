import { DateTime } from "luxon";

const beforeDate = DateTime.now()
  .set({
    year: 2099,
    hour: 23,
    minute: 59,
    second: 59,
    millisecond: 999,
  })
  .toISO();

const afterDate = DateTime.now()
  .set({ year: 1900, hour: 0, minute: 0, second: 0, millisecond: 0 })
  .toISO();

const resetDate = (constraint) => {
  console.log("resetting dates", constraint || "no constraint");
  return constraint.toLowerCase().includes("before") ? beforeDate : afterDate;
};

export { beforeDate, afterDate };
export default resetDate;
