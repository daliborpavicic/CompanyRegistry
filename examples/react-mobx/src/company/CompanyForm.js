import React from 'react';
// import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Form } from '../common/Form';
import { TextInput } from '../common/TextInput';

const CompanyFormComponent = ({ companyStore, history }) => {
  const { state: { companyForm } } = companyStore;

  const navigateToCompanies = () => history.push('/companies');

  const handleSave = () => {
    companyStore.saveSelectedCompany().then(() => {
      navigateToCompanies();
    });
  };

  const handleDelete = () => {
    companyStore.deleteSelectedCompany().then(() => {
      navigateToCompanies();
    });
  };

  const formProps = {
    form: companyForm,
    onSave: handleSave,
    onBack: navigateToCompanies,
    onDelete: handleDelete,
  };

  return (
    <Form {...formProps} isEdit={companyStore.isExistingCompanySelected()}>
      <TextInput formField={companyForm.getField('pib')} />
      <TextInput formField={companyForm.getField('name')} />
      <TextInput formField={companyForm.getField('phoneNumber')} />
      <TextInput formField={companyForm.getField('email')} />
    </Form>
  );
};

CompanyFormComponent.propTypes = {};

export const CompanyForm = withRouter(inject('companyStore')(observer(CompanyFormComponent)));