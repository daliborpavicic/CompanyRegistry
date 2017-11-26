import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import './index.css';
import App from './App';
import { createPlaceStore } from './place/placeStore';

const placeStore = createPlaceStore();
const stores = { placeStore };

ReactDOM.render(
  <HashRouter>
    <Provider {...stores}>
      <App />
    </Provider>
  </HashRouter>
, document.getElementById('root'));