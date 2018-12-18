import { daysInFrequency, lastElement } from './util.js';

function getPayAmount(days, frequency, rent) {
  return (days/frequency * rent).toFixed(1);
};

function getFirstPayment(lease, daysArray) {
  const frequencyDays = daysInFrequency(lease.frequency);
  let firstPaymentAmount = getPayAmount(daysArray[0], frequencyDays, lease.rent);
  return firstPaymentAmount;
};

function getLastPayment(lease, daysArray) {
  const frequencyDays = daysInFrequency(lease.frequency);
  let lastPaymentAmount = getPayAmount(lastElement(daysArray), frequencyDays, lease.rent);
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
