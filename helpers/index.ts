import moment from "moment";

export const formatDate = (date: Date | string) => {
  return moment(date).format("DD-MM-YYYY");
};
export const formatDay = (date: Date | string) => {
  return moment(date).format("D");
};
export const formatMonth = (date: Date | string) => {
  return moment(date).format("M");
};
