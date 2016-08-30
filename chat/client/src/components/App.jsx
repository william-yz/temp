import React, { Component, PropTypes } from 'react';
import MainLayout from '../layouts/MainLayout/MainLayout';
import SignInPage from './SignInPage'

const App = ({ location }) => {
  if (location.pathname === '/signIn') {
    return (
      <SignInPage />
    )
  } else {
    return (
      <MainLayout />
    )
  }
};

App.propTypes = {
}

export default App
