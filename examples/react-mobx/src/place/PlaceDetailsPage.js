import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { PlaceForm } from './PlaceForm';

class PlaceDetailsPageComponent extends Component {
  componentDidMount() {
    const { match, placeStore } = this.props;
    const placeId = match.params.id;

    if (placeId === 'new') {
      placeStore.selectPlaceForAdd();
    } else {
      placeStore.fetchPlaceById(match.params.id);
    }
  }

  render() {
    const { match, placeStore } = this.props;

    if (placeStore.state.isLoading) {
      return <div>Loading place {match.params.id}</div>
    } else if (placeStore.state.isCompanySelected) {
      return (
        <div>
          <PlaceForm />
        </div>
      );
    }

    return null;
  }
};

PlaceDetailsPageComponent.propTypes = {};

export const PlaceDetailsPage = inject('placeStore')(observer(PlaceDetailsPageComponent));