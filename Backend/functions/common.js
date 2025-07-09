function getCurrentDate(param) {
  const date = param === null ? new Date() : param;
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${year}-${
    month.toString().length === 2 ? month : "0".concat(month)
  }-${day}`;
  console.log(currentDate);
  return currentDate;
}

function diffCurrentDate(dt1, dt2) {
  const date1 = new Date(dt1);
  const date2 = new Date(dt2);
  const diffTime = Math.abs(date1 - date2);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

module.exports = Object.freeze({
  getCurrentDate,
  diffCurrentDate,
});
