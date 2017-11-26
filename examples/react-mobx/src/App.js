import React, { Component } from 'react';
import './App.css';
import { PlaceService } from './api/crudServices';

class App extends Component {
  componentDidMount() {
    const logResource = resource => {
      console.log(resource);
    };
    const logError = err => {
      console.log(err);
    };

    const testId = '_test_';
    const newPlace = { _id: testId, name: '_InitialName_', postalCode: '_test_' };
    const updatedPlace = Object.assign({}, newPlace, { name: '_NewName_' });

    const promises = [
      PlaceService.saveOrUpdateResource(updatedPlace),
      PlaceService.getAllResources(),
      PlaceService.getResourceById(testId),
      PlaceService.saveOrUpdateResource(newPlace),
      PlaceService.deleteResourceWithId(testId),
    ];

    Promise.all(promises).then(
      results => results.forEach(result => logResource(result)),
      err => logError(err)
    );
  }

  render() {
    return (
      <div className="App">
        <h1>Welcome to Company Registry</h1>
      </div>
    );
  }
}

export default App;
