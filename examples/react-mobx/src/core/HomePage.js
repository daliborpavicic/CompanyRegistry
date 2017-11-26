import React from 'react';
// import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

const HomePageComponent = () => {
  return (
    <div>
      <h1>Welcome to Company Registry</h1>
    </div>
  );
};

HomePageComponent.propTypes = {};

export const HomePage = inject()(observer(HomePageComponent));