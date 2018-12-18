import * as util from './util.js';

// Gets the starting date of the first normal payment of the from column (start of FROM main block)
function getStartFromMainBlock(lease) {
  const startDateObj = util.getDateObj(lease.start_date);
  const startDayName = util.getDayOfTheWeek(startDateObj);
  const daysInLeadingPayment = util.daysBetwenTwoDayNames(startDayName, lease.payment_day);

  return util.addDaysToDate(daysInLeadingPayment, startDateObj);
};

// Generates the amount of normal payments (main block) given the lease info and a starting date.
export function generateMainBlock(lease, startDate) {
  // Convert start and end dates of lease to objects
  const startDateObj = util.getDateObj(lease.start_date);
  const endDateObj = util.getDateObj(lease.end_date);
  // Get the name of the start day
  const startDayName = util.getDayOfTheWeek(startDateObj);
  // Find the days in the leading payment block
  const daysInLeadingPayment = util.daysBetwenTwoDayNames(startDayName, lease.payment_day);
  // Find the frequency in days from the lease info
  const frequencyDays = util.daysInFrequency(lease.frequency);
  // Find the total full payments in the main block
  const totalFullPayments = Math.floor(util.daysBetweenDates(startDateObj, endDateObj)/frequencyDays);
  // Find the start date of the full payment blocks (main blocks)
  let nextDate = startDate;
  // The array starts with the starting date of the main full payment block
  let datesArray = [startDate];
  let i = 0;
  // Add 'i' frequency days where 'i' is the amount of total FULL payments
  while (i < totalFullPayments) {
    // Adding the days in the frequency specified to the prev date to get the next date to be added to datesArray
    nextDate = util.addDaysToDate(frequencyDays, nextDate);
    datesArray.push(nextDate);
    i++;
  }
  return datesArray;
};

// Combining start date with the FROM block
export function generateFromColumn(lease) {
  // The overall starting date of the FROM column i.e. the actual lease start_date
  const startDateObj = util.getDateObj(lease.start_date);

  // Initialise fromArray with the starting date object
  let fromArray = [startDateObj];

  let fromBlockStart = getStartFromMainBlock(lease);
  let mainFromBlock = generateMainBlock(lease, fromBlockStart);
  // add the main block to the fromArray which currently has the element start_date as an object
  fromArray = fromArray.concat(mainFromBlock);
  return fromArray;
};

// Combining end date with the TO block
export function generateToColumn(lease) {
  // The overall ending date of the TO column. i.e the actual lease end_date
  const endDateObj = util.getDateObj(lease.end_date);
  let fromBlockStart = getStartFromMainBlock(lease);
  // the start of the TO column is 1 day behind the start of the main FROM block i.e. the second overall payment in the FROM column.
  let toBlockStart = util.addDaysToDate(-1, fromBlockStart);
  // Generate the main TO block
  let mainToBlocks = generateMainBlock(lease, toBlockStart);
  let toArray = mainToBlocks;
  // Add the trailing final TO date i.e end_date of lease
  toArray.push(endDateObj);
  return toArray;
};
