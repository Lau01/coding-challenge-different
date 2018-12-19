import React, { Component } from 'react';
import './App.css';



class TenantButton extends Component {
  constructor() {
    super();
    this.state = {
      tenantArray: [],
    }

    this.handleTenantClick = this.handleTenantClick.bind(this);
  }

  handleTenantClick() {
    this.props.onClick(this.props.tenant, this.props.lease)
  }

  render() {

    return (
      <div>
        <button
        onClick={this.handleTenantClick}
        className="tenantButton"
        >
          <div>Tenant: {this.props.tenant}</div> <div>Lease: {this.props.lease}</div>
        </button>
      </div>
    );
  }
}

export default TenantButton;
