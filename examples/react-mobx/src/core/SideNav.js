import React from 'react';
// import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Link, withRouter } from 'react-router-dom';

const SideNavComponent = () => {
  return (
    <ul className="nav nav-sidebar">
      <li className="nav-item">
        <Link to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link to="/places">Places</Link>
      </li>
      <li className="nav-item">
        <Link to="/companies">Companies</Link>
      </li>
      <li className="nav-item">
        <Link to="/employees">Employees</Link>
      </li>
    </ul>
  );
};

SideNavComponent.propTypes = {};

export const SideNav = withRouter(inject()(observer(SideNavComponent)))