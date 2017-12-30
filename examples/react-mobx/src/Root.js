import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import App from './App';
import { createPlaceStore } from './place/placeStore';
import { createCompanyStore } from './company/companyStore';
import { createEmployeeStore } from './employee/employeeStore';

const placeStore = createPlaceStore();
const companyStore = createCompanyStore();
const employeeStore = createEmployeeStore();
const stores = { placeStore, companyStore, employeeStore };

window.AppState = stores;

export class Root extends Component {
  render() {
    return (
      <HashRouter>
        <Provider {...stores}>
          <App />
        </Provider>
      </HashRouter>
    );
  }
}