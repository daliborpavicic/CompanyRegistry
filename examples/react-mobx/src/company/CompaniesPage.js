import React from 'react';
// import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Switch, Route } from 'react-router-dom';
import { CompaniesTable } from './CompaniesTable';
import { CompanyDetailsPage } from './CompanyDetailsPage';

const CompaniesPageComponent = () => {
  return (
    <Switch>
      <Route exact path='/companies' component={CompaniesTable} />
      <Route path='/companies/:id' component={CompanyDetailsPage} />
    </Switch>
  );
};

CompaniesPageComponent.propTypes = {};

export const CompaniesPage = inject()(observer(CompaniesPageComponent));