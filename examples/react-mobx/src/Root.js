import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import App from './App';
import { createPlaceStore } from './place/placeStore';
import { createCompanyStore } from './company/companyStore';

const placeStore = createPlaceStore();
const companyStore = createCompanyStore();
const stores = { placeStore, companyStore };

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