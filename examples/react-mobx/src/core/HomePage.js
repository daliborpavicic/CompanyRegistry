import React from 'react';
// import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

const HomePageComponent = () => {
  return (
    <div>Home page</div>
  );
};

HomePageComponent.propTypes = {};

export const HomePage = inject()(observer(HomePageComponent));