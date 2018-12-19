import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import TenantButton from './TenantButton';
import SearchResults from './SearchResults'
import { BarLoader } from 'react-spinners';



class ShowTenants extends Component {
  constructor() {
    super();
    this.state = {
      tenantArray: [],
      leaseClicked: null,
      tenant: null,
      loading: false
    }

    this.onClickTenant = this.onClickTenant.bind(this);
  }

  componentDidMount () {
    this.setState({loading: true}, () => {
      axios.get('https://hiring-task-api.herokuapp.com/v1/leases')
      .then(res => {
        this.setState({
          tenantArray: res.data,
          loading: false,
        })
      })
      .catch(err => {
        console.warn(err);
      })
    })
  }

  onClickTenant(tenant, lease) {
    this.props.history.push(`/lease/${lease}`)
  }

  render() {
    const {
      tenantArray,
      loading
    } = this.state
    
    return (
      <div>
        <h2>List of Tenants</h2>
        {this.state.loading ?
          <BarLoader
          width="150"
          color={'#89dbd1'}
          />
          :
          <div>
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
        }

      </div>
    );
  }
}

export default ShowTenants;
