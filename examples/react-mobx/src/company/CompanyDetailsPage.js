import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { CompanyForm } from './CompanyForm';

class CompanyDetailsPageComponent extends Component {
  componentDidMount() {
    const { match, companyStore } = this.props;
    const companyId = match.params.id;

    if (companyId === 'new') {
      companyStore.selectCompanyForAdd();
    } else {
      companyStore.fetchCompanyById(match.params.id);
    }
  }

  render() {
    const { match, companyStore } = this.props;

    if (companyStore.state.isLoading) {
      return <div>Loading company {match.params.id}</div>
    } else if (companyStore.state.isCompanySelected) {
      return (
        <div>
          <CompanyForm />
        </div>
      );
    }

    return null;
  }
};

CompanyDetailsPageComponent.propTypes = {};

export const CompanyDetailsPage = inject('companyStore')(observer(CompanyDetailsPageComponent));