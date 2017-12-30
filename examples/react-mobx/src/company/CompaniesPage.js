import React from 'react';
// import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Switch, Route } from 'react-router-dom';
import { CompaniesTable } from './CompaniesTable';

const CompaniesPageComponent = () => {
  return (
    <Switch>
      <Route exact path='/companies' component={CompaniesTable} />
      {/*<Route path='/company/:id' component={PlaceDetailsPage} />*/}
    </Switch>
  );
};

CompaniesPageComponent.propTypes = {};

export const CompaniesPage = inject()(observer(CompaniesPageComponent));