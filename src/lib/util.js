// Function to obtain the amount of days in a month.
export function getDaysInMonth(month, year) {
  if (month % 2 !== 0) {
    return 31; // odd month
  } else if (month === 2 && year % 4 === 0) {
    return 29 // feb, leap year
  } else if (month === 2 && year % 4 !== 0) {
    return 28 // feb, not leap year
  } else {
    return 30 // even month
  }
};

// Convert the frequency string to the amount of days the frequency represents
export function daysInFrequency(frequency) {
  switch(frequency) {
    case 'weekly':
      return 7;
      break;
    case 'fortnightly':
      return 14;
      break;
    case 'monthly':
      return 28;
      break;
  }
}

// Subtract two dates which gives a millisecond value. Convert value to days.
// Details obtained in this Stack Overflow post: https://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript/543152#543152
export function daysBetweenDates(startDateObj, endDateObj) {
  // turn date objects back to string
  let first = new Date(startDateObj.year, startDateObj.month, startDateObj.day);
  let second = new Date(endDateObj.year, endDateObj.month, endDateObj.day);

  // Convert and return value in days.
  return Math.round((second-first)/(1000*60*60*24));
}

// Function to get the named day of the week given a date.
export function getDayOfTheWeek(dateObj) {
  let lastTwoDigitsYear = parseInt(dateObj.year.toString().slice(2));
  let century = parseInt(dateObj.year.toString().slice(0, 2));

  // Zeller's Rule
  let f = dateObj.day + Math.floor(((13 * dateObj.month) - 1) / 5) + lastTwoDigitsYear + Math.floor(lastTwoDigitsYear / 4) + Math.floor(century / 4) - (2 * century);
  let remainder = f % 7

  switch(remainder) {
    case 0:
      return 'sunday';
      break;
    case 1:
      return 'monday';
      break;
    case 2:
      return 'tuesday';
      break;
    case 3:
      return 'wednesday';
      break;
    case 4:
      return 'thursday';
      break;
    case 5:
      return 'friday';
      break;
    case 6:
      return 'saturday';
      break;
  } // switch(remainder)

}; // getDayOfTheWeek

// Convert the named day to a number
export function dayToNumber(day) {
  switch(day) {
  case 'sunday':
    return 0;
    break;
  case 'monday':
    return 1;
    break;
  case 'tuesday':
    return 2;
    break;
  case 'wednesday':
    return 3;
    break;
  case 'thursday':
    return 4;
    break;
  case 'friday':
    return 5;
    break;
  case 'saturday':
    return 6;
    break;
  }
};

// Gives the days between two named days e.g. Monday to Wednesday will return 3.
export function daysBetwenTwoDayNames(startDay, endDay) {
  return Math.abs(dayToNumber(endDay) - dayToNumber(startDay));
}

// Function to add days to a date object. Returns a new date object.
export function addDaysToDate(daysAdded, dateObj) {
  // Convert date to javascript date
  let date = new Date(dateObj.year, dateObj.month, dateObj.day);
  // add days to the date
  date.setDate(date.getDate() + daysAdded);
  // return the new date object with the new values
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let newDateObj = {day, month, year}
  return newDateObj;
}

// Small function to obtain the last element in an array
export function lastElement(array) {
  return array[array.length - 1];
}

// Function to get the named month given a month number
export function getMonthName(monthNumber) {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return monthNames[monthNumber - 1];
}

// Post from Stack Overflow: https://stackoverflow.com/a/13627586
// Returns the date with the appropriate suffix given the rules detailed here: https://en.wikipedia.org/wiki/Ordinal_indicator#Other_suffixes
export function dateWithSuffix(date) {
  const i = date % 10,
      j = date % 100;
  if (i == 1 && j != 11) {
      return date + "st";
  }
  if (i == 2 && j != 12) {
      return date + "nd";
  }
  if (i == 3 && j != 13) {
      return date + "rd";
  }
  return date + "th";
}

// Function to return a date object when given a date string
export function getDateObj(date) {
  const d = new Date(date);
  const day = d.getDate();
  // getMonth() method starts at 0. Add 1 to get the same as calendar number.
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  return {day, month, year}
}
