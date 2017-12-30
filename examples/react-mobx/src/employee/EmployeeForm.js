import React from 'react';
// import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Form } from '../common/Form';
import { TextInput } from '../common/TextInput';

const EmployeeFormComponent = ({ employeeStore, history }) => {
  const { state: { employeeForm } } = employeeStore;

  const navigateToEmployees = () => history.push('/employees');

  const handleSave = () => {
    employeeStore.saveSelectedEmployee().then(() => {
      navigateToEmployees();
    });
  };

  const handleDelete = () => {
    employeeStore.deleteSelectedEmployee().then(() => {
      navigateToEmployees();
    });
  };

  const formProps = {
    form: employeeForm,
    onSave: handleSave,
    onBack: navigateToEmployees,
    onDelete: handleDelete,
  };

  return (
    <Form {...formProps} isEdit={employeeStore.isExistingEmployeeSelected()}>
      <TextInput formField={employeeForm.getField('jmbg')} />
      <TextInput formField={employeeForm.getField('name')} />
      <TextInput formField={employeeForm.getField('surname')} />
      <TextInput formField={employeeForm.getField('email')} />
      <TextInput formField={employeeForm.getField('placeOfBirth')} />
    </Form>
  );
};

EmployeeFormComponent.propTypes = {};

export const EmployeeForm = withRouter(inject('employeeStore')(observer(EmployeeFormComponent)));