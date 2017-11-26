import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { HomePage } from './core/HomePage';
import { SideNav } from './core/SideNav';
import { PlacesPage } from './place/PlacesPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome to Company Registry</h1>
        <SideNav/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/places' component={PlacesPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
