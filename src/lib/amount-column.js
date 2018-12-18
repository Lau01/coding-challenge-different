import * as util from './util.js';

// amountArray.push(leaseInfo.rent);

// // Add first and last payment amounts for the lease
// let firstPaymentAmount = util.getPayAmount(daysArray[0], frequencyDays, leaseInfo.rent);
// let lastPaymentAmount = util.getPayAmount(util.lastElement(daysArray), frequencyDays, leaseInfo.rent);
function getPayAmount(days, frequency, rent) {
  return (days/frequency * rent).toFixed(1);
};

function getFirstPayment(lease, daysArray) {
  const frequencyDays = util.daysInFrequency(lease.frequency);
  let firstPaymentAmount = getPayAmount(daysArray[0], frequencyDays, lease.rent);
  return firstPaymentAmount;
};

function getLastPayment(lease, daysArray) {
  const frequencyDays = util.daysInFrequency(lease.frequency);
  let lastPaymentAmount = getPayAmount(util.lastElement(daysArray), frequencyDays, lease.rent);
  if (lastPaymentAmount === 0) {
    return 'N/A'
  } else {
    return lastPaymentAmount;
  }
};

function getPaymentBlock(lease, array) {
  let paymentBlockArray = Array(array.length - 2).fill(lease.rent);
  return paymentBlockArray;
};

export function generateAmountColumn(lease, array) {
  let amountArray = [getFirstPayment(lease, array)];
  amountArray = amountArray.concat(getPaymentBlock(lease, array));
  amountArray.push(getLastPayment(lease, array));
  return amountArray;
};
