import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Table } from '../common/Table';

class CompaniesTableComponent extends Component {
  constructor() {
    super();
    this.handleCompanyRowClick = this.handleCompanyRowClick.bind(this);
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
  }

  componentDidMount() {
    this.props.companyStore.fetchCompanies();
  }

  handleCompanyRowClick(companyId) {
    this.props.history.push(`/companies/${companyId}`);
  }

  handleAddButtonClick() {
    this.props.history.push('/companies/new');
  }

  render() {
    const { companyStore } = this.props;

    if(companyStore.state.isLoading) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <Table tableStore={companyStore.state.tableStore} onClickRow={this.handleCompanyRowClick} />
        <hr />
        <button type="button" className="btn btn-info" onClick={this.handleAddButtonClick}>
          Add new company
        </button>
      </div>
    );
  }
}

CompaniesTableComponent.propTypes = {};

export const CompaniesTable = withRouter(inject('companyStore')(observer(CompaniesTableComponent)));