import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import {getDaysInMonth, daysInFrequency, daysBetweenDates, getDayOfTheWeek, dayToNumber, daysBetwenTwoDayNames, addDaysToDate, getPayAmount, lastElement, getMonthName, dateWithSuffix} from './lib/util.js'


class SearchResults extends Component {
  constructor() {
    super();
    this.state = {
      leaseInfo: {},
      startDayNum: null,
      startMonthNum: null,
      startYear: null,
      endDayNum: null,
      endMonthNum: null,
      endYear: null,
      startNormalPayDate: null,
      endNormalPayDate: null,
      fromColumnArray: [],
      toColumnArray: [],
      daysColumnArray: [],
      amountColumnArray: []
    }
  }

  componentDidMount () {
    let paramsString = window.location.search
    let searchParams = new URLSearchParams(paramsString);

    let leaseId = searchParams.get("leaseId");

    axios.get(`https://hiring-task-api.herokuapp.com/v1/leases/${leaseId}`)
    .then(res => {
      let startDateArray = res.data.start_date.split("-");
      let endDateArray = res.data.end_date.split("-");
      this.setState({
        leaseInfo: res.data,
        startDayNum: parseInt(startDateArray[2]),
        startMonthNum: parseInt(startDateArray[1]),
        startYear: parseInt(startDateArray[0]),
        endDayNum: parseInt(endDateArray[2]),
        endMonthNum: parseInt(endDateArray[1]),
        endYear: parseInt(endDateArray[0]),
      })

      const {
        leaseInfo,
        startDayNum,
        startMonthNum,
        startYear,
        endDayNum,
        endMonthNum,
        endYear,
      } = this.state

      let startDayName = getDayOfTheWeek(startDayNum, startMonthNum, startYear);
      // console.log('starting day number:', startDayNum)

      // lease starting day to starting normal payment day
      let daysInFirstCharge = daysBetwenTwoDayNames(startDayName, leaseInfo.payment_day);

      // The amount of days in the payment frequency.
      let frequencyDays = daysInFrequency(leaseInfo.frequency);

      // Start date for FROM: column. Only includes the payment blocks with full payments.
      let fromColumnDates = addDaysToDate(daysInFirstCharge, startDayNum, startMonthNum, startYear);

      // Start date for TO: column. Only includes the payment blocks with full payments.
      let toColumnDates = addDaysToDate(frequencyDays - 1, fromColumnDates.day, fromColumnDates.month, fromColumnDates.year);

      let totalFullPayments = Math.floor(daysBetweenDates(fromColumnDates.day, fromColumnDates.month, endDayNum, endMonthNum)/frequencyDays);

      //////////////
      let nextFromDate = fromColumnDates;
      let nextToDate = toColumnDates;

      let fromDatesArray = [];
      let toDatesArray = [];

      let daysArray = [];
      let amountArray = [];
      let i = 0;
      while (i < totalFullPayments - 1) {
        nextFromDate = addDaysToDate(frequencyDays, nextFromDate.day, nextFromDate.month, nextFromDate.year);
        fromDatesArray.push(nextFromDate);

        nextToDate = addDaysToDate(frequencyDays - 1, nextFromDate.day, nextFromDate.month, nextFromDate.year);
        toDatesArray.push(nextToDate);

        daysArray.push(frequencyDays);
        amountArray.push(leaseInfo.rent);
        i++;
      }

      let startDateObj = {
        day: startDayNum,
        month: startMonthNum,
        year: startYear
      };

      let endDateObj = {
        day: endDayNum,
        month: endMonthNum,
        year: endYear
      }

      // Add first and last dates for the lease
      fromDatesArray.unshift(startDateObj)

      toDatesArray.unshift(addDaysToDate(daysInFirstCharge - 1, startDateObj.day, startDateObj.month, startDateObj.year));

      fromDatesArray.push(addDaysToDate(1, lastElement(toDatesArray).day, lastElement(toDatesArray).month, lastElement(toDatesArray).year))

      toDatesArray.push(endDateObj)

      // Add first and last day amounts for the lease
      let daysBetweenLastPayAndEnd = daysBetweenDates(lastElement(fromDatesArray).day, lastElement(fromDatesArray).month, endDateObj.day, endDateObj.month);

      daysArray.unshift(daysInFirstCharge);
      daysArray.push(daysBetweenLastPayAndEnd);

      // Add first and last payment amounts for the lease
      let firstPaymentAmount = getPayAmount(daysArray[0], frequencyDays, leaseInfo.rent);
      let lastPaymentAmount = getPayAmount(lastElement(daysArray), frequencyDays, leaseInfo.rent);

      amountArray.unshift(firstPaymentAmount);
      amountArray.push(lastPaymentAmount);

      this.setState({
        fromColumnArray: fromDatesArray,
        toColumnArray: toDatesArray,
        daysColumnArray: daysArray,
        amountColumnArray: amountArray
      })
    })
    .catch(err => {
      console.warn(err)
    })
  }

  render() {
    const {
      id,
      start_date,
      end_date,
      rent,
      frequency,
      payment_day,
    } = this.state.leaseInfo

    const {
      fromColumnArray,
      toColumnArray,
      daysColumnArray,
      amountColumnArray
    } = this.state

    return (
      <div className="container">
        <ul className="column">
          <h4>FROM:</h4>
          {fromColumnArray.map(payment =>
            <li>
              <span> {getMonthName(payment.month)}, {dateWithSuffix(payment.day)} {payment.year} </span>
            </li>
          )}
        </ul>
        <ul className="column">
          <h4>TO:</h4>
          {toColumnArray.map(payment =>
            <li>
              <span> {getMonthName(payment.month)}, {dateWithSuffix(payment.day)} {payment.year} </span>
            </li>
          )}
        </ul>

        <ul className="column">
          <h4>DAYS:</h4>
          {daysColumnArray.map(days =>
            <li>
              <span> {days} </span>
            </li>
          )}
        </ul>

        <ul className="column">
          <h4>AMOUNT:</h4>
          {amountColumnArray.map(amount =>
            <li>
              <span> ${amount} </span>
            </li>
          )}
        </ul>


      </div>
    );
  };
};

export default SearchResults;
