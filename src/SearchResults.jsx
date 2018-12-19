import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { getMonthName, dateWithSuffix } from './lib/util.js';
import { generateFromColumn, generateToColumn } from './lib/date-columns.js';
import { generateDaysColumn } from './lib/days-column.js';
import { generateAmountColumn } from './lib/amount-column.js';
import { BarLoader } from 'react-spinners';


class SearchResults extends Component {
  constructor() {
    super();
    this.state = {
      leaseInfo: {},
      fromColumnArray: [],
      toColumnArray: [],
      daysColumnArray: [],
      amountColumnArray: [],
      loading: false
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {

      this.setState({loading: true}, () => {
        axios.get(`https://hiring-task-api.herokuapp.com/v1/leases/${this.props.match.params.id}`)
        .then(res => {
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
            amountColumnArray: amountArray,
            loading: false
          })
        }) // .then
        .catch(err => {
          console.warn(err)
        });
      }); // loading: true
    }; // prevProps
  };

  componentDidMount () {

    this.setState({loading: true}, () => {
      axios.get(`https://hiring-task-api.herokuapp.com/v1/leases/${this.props.match.params.id}`)
      .then(res => {
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
          amountColumnArray: amountArray,
          loading: false
        })
      }) // .then
      .catch(err => {
        console.warn(err)
      });
    }); // loading: true
  };

  render() {

    const {
      fromColumnArray,
      toColumnArray,
      daysColumnArray,
      amountColumnArray
    } = this.state

    return (
      <div>
        <h2>ID: {this.props.match.params.id}</h2>
        {this.state.loading ?
          <BarLoader
          width="150"
          color={'#89dbd1'}
          />
        :
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
        }
      </div>
    );
  };
};

export default SearchResults;
