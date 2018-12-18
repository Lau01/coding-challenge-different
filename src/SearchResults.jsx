import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { getMonthName, dateWithSuffix } from './lib/util.js';
import { generateFromColumn, generateToColumn } from './lib/date-columns.js';
import { generateDaysColumn } from './lib/days-column.js';
import { generateAmountColumn } from './lib/amount-column.js';


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
      })

      let fromArray = generateFromColumn(this.state.leaseInfo);
      let toArray = generateToColumn(this.state.leaseInfo);
      let daysArray = generateDaysColumn(this.state.leaseInfo, fromArray);
      let amountArray = generateAmountColumn(this.state.leaseInfo, daysArray)


      this.setState({
        fromColumnArray: fromArray,
        toColumnArray: toArray,
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
