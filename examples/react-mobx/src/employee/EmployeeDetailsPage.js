import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { EmployeeForm } from './EmployeeForm';

class EmployeeDetailsPageComponent extends Component {
  componentDidMount() {
    const { match, employeeStore } = this.props;
    const employeeId = match.params.id;

    if (employeeId === 'new') {
      employeeStore.selectEmployeeForAdd();
    } else {
      employeeStore.fetchEmployeeById(match.params.id);
    }
  }

  render() {
    const { match, employeeStore } = this.props;

    if (employeeStore.state.isLoading) {
      return <div>Loading employee {match.params.id}</div>
    } else if (employeeStore.state.isEmployeeSelected) {
      return (
        <div>
          <EmployeeForm />
        </div>
      );
    }

    return null;
  }
};

EmployeeDetailsPageComponent.propTypes = {};

export const EmployeeDetailsPage = inject('employeeStore')(observer(EmployeeDetailsPageComponent));