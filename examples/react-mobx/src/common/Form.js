import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

class FormComponent extends Component {
  constructor() {
    super();
    this.resetForm = this.resetForm.bind(this);
  }

  resetForm() {
    this.props.form.reset();
  }

  render() {
    const { form, isEdit, children, onSave, onDelete, onBack } = this.props;

    return (
      <form className="form-horizontal">
        {children}
        <div className="col-sm-offset-2">
          <button
            type="button"
            className="btn btn-primary"
            disabled={!form.isValid()}
            onClick={onSave}>
            Save
          </button>
          <button type="button" className="btn btn-default" onClick={onBack}>
            <i className="fa fa-chevron-left" /> Back
          </button>
          {isEdit &&
          <button type="button" className="btn btn-warning" onClick={this.resetForm}>Revert</button>
          }
          {isEdit &&
          <button type="button" className="btn btn-danger" onClick={onDelete}>Delete</button>
          }
        </div>
      </form>
    );
  }
}

FormComponent.propTypes = {
  form: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  onBack: PropTypes.func,
};

export const Form = inject()(observer(FormComponent));