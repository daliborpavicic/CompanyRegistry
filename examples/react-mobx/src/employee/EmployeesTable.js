import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Table } from '../common/Table';

class EmployeesTableComponent extends Component {
  constructor() {
    super();
    this.handleEmployeeRowClick = this.handleEmployeeRowClick.bind(this);
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
  }

  componentDidMount() {
    this.props.employeeStore.fetchEmployees();
  }

  handleEmployeeRowClick(employeeId) {
    this.props.history.push(`/employees/${employeeId}`);
  }

  handleAddButtonClick() {
    this.props.history.push('/employees/new');
  }

  render() {
    const { employeeStore } = this.props;

    if(employeeStore.state.isLoading) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <Table tableStore={employeeStore.state.tableStore} onClickRow={this.handleEmployeeRowClick} />
        <hr />
        <button type="button" className="btn btn-info" onClick={this.handleAddButtonClick}>
          Add new employee
        </button>
      </div>
    );
  }
}

EmployeesTableComponent.propTypes = {};

export const EmployeesTable = withRouter(inject('employeeStore')(observer(EmployeesTableComponent)));