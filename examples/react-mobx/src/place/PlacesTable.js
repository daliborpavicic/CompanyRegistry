import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Table } from '../common/Table';

class PlacesTableComponent extends Component {
  componentDidMount() {
    this.props.placeStore.fetchPlaces();
  }

  render() {
    const { history, placeStore } = this.props;

    if(placeStore.state.isLoading) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <ul>
          {placeStore.state.places.map(place => (
            <li key={place._id}>
              <button onClick={() => { history.push('/places/' + place._id); }}>
                Place {place._id}
              </button>
            </li>
          ))}
        </ul>
        <Table tableStore={placeStore.state.tableStore} />
      </div>
    );
  }
}

PlacesTableComponent.propTypes = {};

export const PlacesTable = withRouter(inject('placeStore')(observer(PlacesTableComponent)));