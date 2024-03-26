// Function to add suffix to the date (e.g., "st", "nd", "rd", "th")
const addDateSuffix = (date) => {
  let dateStr = date.toString();

  // get last char of date string
  const lastChar = dateStr.charAt(dateStr.length - 1);

  // Add suffix based on last character of date string and exceptions for 11, 12, and 13
  if (lastChar === "1" && dateStr !== "11") {
    dateStr = `${dateStr}st`;
  } else if (lastChar === "2" && dateStr !== "12") {
    dateStr = `${dateStr}nd`;
  } else if (lastChar === "3" && dateStr !== "13") {
    dateStr = `${dateStr}rd`;
  } else {
    dateStr = `${dateStr}th`;
  }

  return dateStr; // Return date string with suffix
};

// Export a function for formatting timestamps
module.exports = (
  timestamp,
  { monthLength = "short", dateSuffix = true } = {} // Default options for formatting
) => {
  // Object containing month names
  const months = {
    0: monthLength === "short" ? "Jan" : "January", // January
    1: monthLength === "short" ? "Feb" : "February", // February
    2: monthLength === "short" ? "Mar" : "March", // March
    3: monthLength === "short" ? "Apr" : "April", // April
    4: monthLength === "short" ? "May" : "May", // May
    5: monthLength === "short" ? "Jun" : "June", // June
    6: monthLength === "short" ? "Jul" : "July", // July
    7: monthLength === "short" ? "Aug" : "August", // August
    8: monthLength === "short" ? "Sep" : "September", // September
    9: monthLength === "short" ? "Oct" : "October", // October
    10: monthLength === "short" ? "Nov" : "November", // November
    11: monthLength === "short" ? "Dec" : "December", // December
  };

  // Create Date object from timestamp
  const dateObj = new Date(timestamp);

  // Get formatted month name from months object based on month index
  const formattedMonth = months[dateObj.getMonth()];

  // Get day of month with or without suffix based on dateSuffix option
  const dayOfMonth = dateSuffix
    ? addDateSuffix(dateObj.getDate()) // Add suffix
    : dateObj.getDate(); // Do not add suffix

  // Get year from date object
  const year = dateObj.getFullYear();

  // Get hour from date object, converting to 12-hour format
  let hour =
    dateObj.getHours() > 12
      ? Math.floor(dateObj.getHours() - 12)
      : dateObj.getHours();

  // if hour is 0 (12:00am), change it to 12
  if (hour === 0) {
    hour = 12;
  }

  // Get minutes from date object, adding leading zero if necessary
  const minutes = (dateObj.getMinutes() < 10 ? "0" : "") + dateObj.getMinutes();

  // Determine if it's AM or PM
  const periodOfDay = dateObj.getHours() >= 12 ? "pm" : "am";

  // Construct formatted timestamp string
  const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;

  return formattedTimeStamp; // Return formatted timestamp string
};
