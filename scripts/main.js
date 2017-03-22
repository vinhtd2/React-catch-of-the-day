import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Navigation, History, browserHistory } from 'react-router';
//import CSSTransitionGroup from 'react-addons-css-transition-group';
//import createBrowserHistory from 'history/lib/createBrowserHistory';
import history from './history';
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';
import App from './components/App';



var routes = (
  <Router history={history}>
    <Route path="/" component={StorePicker} />
    <Route path="/store/:storeId" component={App} />
    <Route path="*" component={NotFound}/>
  </Router>
)

ReactDOM.render(routes,document.getElementById('main'));
