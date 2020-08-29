import moment from "moment";
import "moment-timezone";

export const timezoneFormatedDate = (givenDate) => {
  const timeZone = moment.tz.guess();
  let date = moment(new Date(givenDate));
  // date = date.tz(timeZone).format("HH:mm:ss a");
  date = date.tz(timeZone).format("HH:mm a");
  return date;
};

export const replaceItemAtIndex = (arr, index, newValue) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};