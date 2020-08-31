import moment from "moment";
import "moment-timezone";
import env from "../config/env";

export const timezoneFormatedDate = (givenDate) => {
  const timeZone = moment.tz.guess();
  let date = moment(new Date(givenDate));
  date = date.tz(timeZone).format("MM/DD/YY/HH:mm");
  return date;
};

export const replaceItemAtIndex = (arr, index, newValue) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

export const ApiHelper = (url, method = "GET", data = {}) => {
  const bearer = `Bearer ${env.GOREST_API_TOKEN}`;
  let aditional;
  method === "POST"
    ? (aditional = { body: JSON.stringify(data) })
    : (aditional = {});
  return fetch(url, {
    ...aditional,
    method: method,
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "X-FP-API-KEY": "chaptoken",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(
      (result) => {
        return result;
      },
      (error) => {
        error = error;
      }
    );
};
