import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Table } from '../common/Table';

class PlacesTableComponent extends Component {
  constructor() {
    super();
    this.handlePlaceRowClick = this.handlePlaceRowClick.bind(this);
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
  }

  componentDidMount() {
    this.props.placeStore.fetchPlaces();
  }

  handlePlaceRowClick(placeId) {
    this.props.history.push(`/places/${placeId}`);
  }

  handleAddButtonClick() {
    this.props.history.push('/places/new');
  }

  render() {
    const { placeStore } = this.props;

    if(placeStore.state.isLoading) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <Table tableStore={placeStore.state.tableStore} onClickRow={this.handlePlaceRowClick} />
        <hr />
        <button type="button" className="btn btn-info" onClick={this.handleAddButtonClick}>
          Add new place
        </button>
      </div>
    );
  }
}

PlacesTableComponent.propTypes = {};

export const PlacesTable = withRouter(inject('placeStore')(observer(PlacesTableComponent)));