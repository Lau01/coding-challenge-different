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
export function daysBetweenDates(startDay, startMonth, endDay, endMonth) {
  let year = 2018;
  let totalDays = 0;

  if (startMonth === endMonth) {
    console.log('util', totalDays)
    return totalDays = endDay - startDay;
  }

  let daysInStartMonth = getDaysInMonth(startMonth, year);
  let daysToEndOfStartMonth = daysInStartMonth - startDay;

  // add days to the end of current month
  totalDays += daysToEndOfStartMonth;
  // add days for the months to the start of the end month
  for (let i = parseInt(startMonth) + 1; i < parseInt(endMonth); i++) {
    totalDays += getDaysInMonth(i, year);
  }

  // add the rest of the days left in the last month

  return totalDays += endDay;
}

export function getDayOfTheWeek(day, month, year) {
  let lastTwoDigitsYear = parseInt(year.toString().slice(2));
  let century = parseInt(year.toString().slice(0, 2));

  // Zeller's Rule
  let f = day + Math.floor(((13 * month) - 1) / 5) + lastTwoDigitsYear + Math.floor(lastTwoDigitsYear / 4) + Math.floor(century / 4) - (2 * century);
  console.log('f value:', f);
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

export function addDaysToDate(daysAdded, day, month, year) {
  let daysInMonth = getDaysInMonth(month, year);
  let endDay = day + daysAdded;
  let endMonth = month;
  if (endDay > daysInMonth) {
    endDay = endDay - daysInMonth;
    endMonth += 1;
  } else if (endDay < 0) {
    // prev month
    endDay = getDaysInMonth(month - 1) + endDay;
    endMonth -= 1;
  }

  return {
    day: endDay,
    month: endMonth,
    year: year
  };
}
