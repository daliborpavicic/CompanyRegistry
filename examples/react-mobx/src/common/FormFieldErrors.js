import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { FormFieldShape } from './formHelpers';

const FormFieldErrorsComponent = ({ formField }) => {
  return (
    <div>
      {formField.getErrors().map((error, idx) => (
        <div key={`${idx}_${error}`} className="help-block">{error}</div>
      ))}
    </div>
  );
};

FormFieldErrorsComponent.propTypes = {
  formField: PropTypes.shape(FormFieldShape).isRequired,
};

export const FormFieldErrors = inject()(observer(FormFieldErrorsComponent));