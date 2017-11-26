import React from 'react';
// import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Switch, Route } from 'react-router-dom';
import { PlacesTable } from './PlacesTable';
import { PlaceDetailsPage } from './PlaceDetailsPage';

const PlacesPageComponent = () => {
  return (
    <Switch>
      <Route exact path='/places' component={PlacesTable} />
      <Route path='/places/:id' component={PlaceDetailsPage} />
    </Switch>
  );
};

PlacesPageComponent.propTypes = {};

export const PlacesPage = inject()(observer(PlacesPageComponent));