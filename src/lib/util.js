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

// Assumes start and end years are the same at the moment
export function daysBetweenDates(startDateObj, endDateObj) {
  let year = 2018;
  let totalDays = 0;

  if (startDateObj.month === endDateObj.month) {
    return totalDays = endDateObj.day - startDateObj.day;
  }

  let daysInStartMonth = getDaysInMonth(startDateObj.month, year);
  let daysToEndOfStartMonth = daysInStartMonth - startDateObj.day;

  // add days to the end of current month
  totalDays += daysToEndOfStartMonth;

  // add days for the months to the start of the end month
  for (let i = startDateObj.month + 1; i < endDateObj.month; i++) {
    totalDays += getDaysInMonth(i, year);
  }

  // add the rest of the days left in the last month

  return totalDays += endDateObj.day;
}

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

export function daysBetwenTwoDayNames(startDay, endDay) {
  return Math.abs(dayToNumber(endDay) - dayToNumber(startDay));
}

export function addDaysToDate(daysAdded, dateObj) {
  let daysInMonth = getDaysInMonth(dateObj.month, dateObj.year);
  let endDay = dateObj.day + daysAdded;
  let endMonth = dateObj.month;
  if (endDay > daysInMonth) {
    endDay = endDay - daysInMonth;
    endMonth += 1;
  } else if (endDay < 0) {
    // prev month
    endDay = getDaysInMonth(dateObj.month - 1) + endDay;
    endMonth -= 1;
  }

  return {
    day: endDay,
    month: endMonth,
    year: dateObj.year
  };
}

export function lastElement(array) {
  return array[array.length - 1];
}

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

export function getDateObj(date) {
  const d = new Date(date);
  const day = d.getDate();
  // getMonth() method starts at 0. Add 1 to get the same as calendar number.
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  return {day, month, year}
}
