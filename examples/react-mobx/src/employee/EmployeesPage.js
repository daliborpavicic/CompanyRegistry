import React from 'react';
// import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Switch, Route } from 'react-router-dom';
import { EmployeesTable } from './EmployeesTable';
import { EmployeeDetailsPage } from './EmployeeDetailsPage';

const EmployeesPageComponent = () => {
  return (
    <Switch>
      <Route exact path='/employees' component={EmployeesTable} />
      <Route path='/employees/:id' component={EmployeeDetailsPage} />
    </Switch>
  );
};

EmployeesPageComponent.propTypes = {};

export const EmployeesPage = inject()(observer(EmployeesPageComponent));