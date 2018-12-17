import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import {getDaysInMonth, daysInFrequency, daysBetweenDates, getDayOfTheWeek, dayToNumber, daysBetwenTwoDayNames, addDaysToDate} from './lib/util.js'


// const dayToNumber = function(day) {
//   switch(day) {
//   case 'sunday':
//     return 0;
//     break;
//   case 'monday':
//     return 1;
//     break;
//   case 'tuesday':
//     return 2;
//     break;
//   case 'wednesday':
//     return 3;
//     break;
//   case 'thursday':
//     return 4;
//     break;
//   case 'friday':
//     return 5;
//     break;
//   case 'saturday':
//     return 6;
//     break;
//   }
// };
//
// const daysBetwenTwoDayNames = function(startDay, endDay) {
//   return Math.abs(dayToNumber(endDay) - dayToNumber(startDay));
// }
//
// const addDaysToDate = function(daysAdded, day, month, year) {
//   let daysInMonth = getDaysInMonth(month, year);
//   let endDay = day + daysAdded;
//   let endMonth = month;
//
//   if (endDay > daysInMonth) {
//     endDay = endDay - daysInMonth;
//     endMonth += 1;
//   } else if (endDay < 0) {
//     // prev month
//     endDay = getDaysInMonth(month - 1) + endDay;
//     endMonth -= 1;
//   }
//   return {
//     day: endDay,
//     month: endMonth,
//     year: year
//   };
// }

class SearchForm extends Component {
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

      console.log(leaseInfo)

      let startDayName = getDayOfTheWeek(startDayNum, startMonthNum, startYear);
      // console.log('starting day number:', startDayNum)

      // lease starting day to starting normal payment day
      let daysBetweenStartAndPay = daysBetwenTwoDayNames(startDayName, leaseInfo.payment_day);

      ////////
      let frequencyDays = daysInFrequency(leaseInfo.frequency);
      // start date for FROM: column
      let startFromPayDate = addDaysToDate(daysBetweenStartAndPay, startDayNum, startMonthNum, startYear);
      // start date for TO: column
      let startToPayDate = addDaysToDate(frequencyDays - 1, startFromPayDate.day, startFromPayDate.month, startFromPayDate.year);

      let totalFullPayments = daysBetweenDates(startFromPayDate.day, startFromPayDate.month, endDayNum, endMonthNum);

      //////////////
      let nextFromDate = startFromPayDate;
      let nextToDate = startToPayDate;

      let fromDatesArray = [startFromPayDate];
      let toDatesArray = [nextToDate];

      let daysArray = [frequencyDays];
      let amountArray = [leaseInfo.rent];
      while ((nextFromDate.month < endMonthNum) || (nextFromDate.day < endDayNum)) {
        nextFromDate = addDaysToDate(frequencyDays, nextFromDate.day, nextFromDate.month, nextFromDate.year);
        fromDatesArray.push(nextFromDate);
        nextToDate = addDaysToDate(frequencyDays - 1, nextFromDate.day, nextFromDate.month, nextFromDate.year);
        toDatesArray.push(nextToDate);

        daysArray.push(frequencyDays);
        amountArray.push(leaseInfo.rent)
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


      fromDatesArray.unshift(startDateObj)
      // fromDatesArray.push(addDaysToDate(3, startDateObj.day, startDateObj.month, startDateObj.year));

      let daysBetweenLastPayAndEnd = daysBetweenDates(fromDatesArray[fromDatesArray.length - 1].day, fromDatesArray[fromDatesArray.length - 1].month, endDateObj.day, endDateObj.month);


      toDatesArray.unshift(addDaysToDate(daysBetweenStartAndPay - 1, startDateObj.day, startDateObj.month, startDateObj.year));

      fromDatesArray.push(addDaysToDate(1, toDatesArray[toDatesArray.length - 1].day, toDatesArray[toDatesArray.length - 1].month, toDatesArray[toDatesArray.length - 1].year))
      toDatesArray.push(endDateObj)



      daysArray.unshift(daysBetweenStartAndPay);
      daysArray.push(daysBetweenLastPayAndEnd);
      amountArray.push()

      console.log('==============================')

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
          FROM:
          {fromColumnArray.map(payment =>
            <li>
              <span> {payment.day}-{payment.month}-{payment.year} </span>
            </li>
          )}
        </ul>
        <ul className="column">
          TO:
          {toColumnArray.map(payment =>
            <li>
              <span> {payment.day}-{payment.month}-{payment.year} </span>
            </li>
          )}
        </ul>

        <ul className="column">
          DAYS:
          {daysColumnArray.map(days =>
            <li>
              <span> {days} </span>
            </li>
          )}
        </ul>

        {/* <ul className="column">
          AMOUNT:
          {amountColumnArray.map(payment =>
            <li>
              <span> ${rent} </span>
            </li>
          )}
        </ul> */}


      </div>
    );
  };
};

export default SearchForm;
