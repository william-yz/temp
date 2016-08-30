import './index.html';
import './index.less';
import ReactDOM from 'react-dom';
import React from 'react';
import { browserHistory } from 'react-router';
import App from '../components/App';
import Routes from '../routes/index';

ReactDOM.render(<Routes history={browserHistory} />, document.getElementById('root'));
var socket = io.connect('http://localhost:3001');
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });

import Cookies from 'js-cookie'

// Cookies.remove('user')
