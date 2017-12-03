import React from 'react';
// import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Form } from '../common/Form';
import { TextInput } from '../common/TextInput';

const PlaceFormComponent = ({ placeStore, history }) => {
  const { state: { placeForm } } = placeStore;

  const navigateToPlaces = () => history.push('/places');

  const handleSave = () => {
    placeStore.saveSelectedPlace().then(() => {
      navigateToPlaces();
    });
  };

  const handleDelete = () => {
    placeStore.deleteSelectedPlace().then(() => {
      navigateToPlaces();
    });
  };

  const formProps = {
    form: placeForm,
    onSave: handleSave,
    onBack: navigateToPlaces,
    onDelete: handleDelete,
  };

  return (
    <Form {...formProps} isEdit={placeStore.isExistingPlaceSelected()}>
      <TextInput formField={placeForm.getField('postalCode')} />
      <TextInput formField={placeForm.getField('name')} />
    </Form>
  );
};

PlaceFormComponent.propTypes = {};

export const PlaceForm = withRouter(inject('placeStore')(observer(PlaceFormComponent)));