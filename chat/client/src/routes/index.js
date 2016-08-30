import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import App from '../components/App';
import NotFound from '../components/NotFound';
import Cookies from 'js-cookie'

const requireLogin = (nextState, replace) => {
  if (!Cookies.get('user')) {
    replace('/signIn');
  }
}
const Routes = ({ history }) =>
  <Router history={history}>
    <Route path="/index" onEnter={requireLogin}>
      <IndexRoute component={App}/>
      <Route path="completed" component={App} />
      <Route path="*" component={NotFound}/>
    </Route>
    <Route path="/signIn" component={App} />
  </Router>;

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
