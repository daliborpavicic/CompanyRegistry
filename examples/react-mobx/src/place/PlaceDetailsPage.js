import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

class PlaceDetailsPageComponent extends Component {
  componentDidMount() {
    const { match, placeStore } = this.props;

    placeStore.fetchPlaceById(match.params.id);
  }

  render() {
    const { match, placeStore } = this.props;

    if (placeStore.state.isLoading) {
      return <div>Loading place {match.params.id}</div>
    }

    const selectedPlace = placeStore.state.selectedPlace;

    return (
      <div>
        Place details for:<br/>
        <code>{JSON.stringify(selectedPlace, null, 2)}</code>
      </div>
    );
  }
};

PlaceDetailsPageComponent.propTypes = {};

export const PlaceDetailsPage = inject('placeStore')(observer(PlaceDetailsPageComponent));