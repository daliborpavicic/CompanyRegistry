import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { expr } from 'mobx';
import { observer, inject } from 'mobx-react';
import { FormFieldShape } from './formHelpers';
import { FormFieldErrors } from './FormFieldErrors';

class TextInputComponent extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.formField.setValue(event.target.value);
  }

  render() {
    const { formField } = this.props;
    const isTouched = expr(() => formField.isTouched());
    const hasErrors = expr(() => formField.hasErrors());
    const showErrors = expr(() => isTouched && hasErrors);
    const label = formField.getLabel();

    return (
      <div className={`form-group ${showErrors ? "has-error" : ""}`}>
        <label className="control-label col-sm-2">{label}</label>
        <div className="col-sm-6 col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder={`${label}...`}
            name={formField.getName()}
            disabled={formField.isDisabled()}
            value={formField.getValue()}
            onChange={this.handleChange}
          />
          {showErrors && <FormFieldErrors formField={formField} />}
        </div>
      </div>
    );
  }
}

TextInputComponent.propTypes = {
  formField: PropTypes.shape(FormFieldShape).isRequired,
};

export const TextInput = inject()(observer(TextInputComponent));