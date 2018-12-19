import { daysInFrequency, lastElement } from './util.js';

// Function to get the amount to be payed if it is a partial payment (not covering full frequency days)
function getPayAmount(days, frequency, rent) {
  return (days/frequency * rent).toFixed(1);
};

// Get the first payment of the lease
function getFirstPayment(lease, daysArray) {
  const frequencyDays = daysInFrequency(lease.frequency);
  let firstPaymentAmount = getPayAmount(daysArray[0], frequencyDays, lease.rent);
  return firstPaymentAmount;
};

// Get the last payment of the lease
function getLastPayment(lease, daysArray) {
  const frequencyDays = daysInFrequency(lease.frequency);
  let lastPaymentAmount = getPayAmount(lastElement(daysArray), frequencyDays, lease.rent);
  if (lastPaymentAmount === 0) {
    return 'N/A'
  } else {
    return lastPaymentAmount;
  }
};

// Get middle payment block
function getPaymentBlock(lease, array) {
  let paymentBlockArray = Array(array.length - 2).fill(lease.rent);
  return paymentBlockArray;
};

// Combine the first payment, middle block and last payment. Returns an array of the payments.
export function generateAmountColumn(lease, array) {
  let amountArray = [getFirstPayment(lease, array)];
  amountArray = amountArray.concat(getPaymentBlock(lease, array));
  amountArray.push(getLastPayment(lease, array));
  return amountArray;
};
