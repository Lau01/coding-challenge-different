import * as util from './util.js';

function daysInFirstPayment(lease) {
  let startDayName = util.getDayOfTheWeek(util.getDateObj(lease.start_date));

  let daysInFirstCharge = util.daysBetwenTwoDayNames(startDayName, lease.payment_day);
  return daysInFirstCharge;
}

function daysInLastPayment(lease, fromArray) {
  const endDateObj = util.getDateObj(lease.end_date);
  let daysBetweenLastPayAndEnd = util.daysBetweenDates(util.lastElement(fromArray), endDateObj);
  return daysBetweenLastPayAndEnd;
}

// generate the amount of full payment days (frequency days) in the lease.
function generateDaysBlock(lease, array) {
  let daysBlockArray = Array(array.length - 2).fill(util.daysInFrequency(lease.frequency));
  return daysBlockArray;
}

// Combine first entry, middle block, and end entry in the days column
export function generateDaysColumn(lease, array) {
  let daysArray = [daysInFirstPayment(lease)];
  daysArray = daysArray.concat(generateDaysBlock(lease, array));
  daysArray.push(daysInLastPayment(lease, array));
  return daysArray;
};
