import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { HomePage } from './core/HomePage';
import { SideNav } from './core/SideNav';
import { PlacesPage } from './place/PlacesPage';
import { CompaniesPage } from './company/CompaniesPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-2">
              <SideNav />
            </div>
            <div className="col-sm-10">
              <Switch>
                <Route exact path='/' component={HomePage} />
                <Route path='/places' component={PlacesPage} />
                <Route path='/companies' component={CompaniesPage} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
