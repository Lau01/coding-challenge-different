import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import TenantButton from './TenantButton';
import SearchResults from './SearchResults'



class ShowTenants extends Component {
  constructor() {
    super();
    this.state = {
      tenantArray: [],
      leaseClicked: null,
      tenant: null
    }

    this.onClickTenant = this.onClickTenant.bind(this);
  }

  componentDidMount () {
    axios.get('https://hiring-task-api.herokuapp.com/v1/leases')
    .then(res => {
      this.setState({
        tenantArray: res.data,
      })
    })
    .catch(err => {
      console.warn(err);
    })
  }

  onClickTenant(tenant, lease) {
    this.props.history.push(`/lease/${lease}`)
  }

  render() {

    return (
      <div>
        <h2>List of Tenants</h2>
        <ul className="tenantList">
          {this.state.tenantArray.map(tenant =>
            <li>
              <TenantButton
              tenant={tenant.tenant}
              lease={tenant.id}
              onClick={this.onClickTenant}
              />
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default ShowTenants;
