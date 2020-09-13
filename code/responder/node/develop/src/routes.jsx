 import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Login from './page/login/index.jsx';
import Home from './page/home/index.jsx';
import Result from './page/result/index.jsx';
import ResetPage from './page/reset/index.jsx';

class App extends React.Component{
  constructor(props) {
  	super(props);
  }

	render() {
		return (
			<div>
				{this.props.children}
			</div>
		)
	}
}

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Login} /> 
      <Route path="/home" component={Home} />
      <Route path="/result" component={Result} />
      <Route path="/login" component={Login} />
      <Route path="/reset" component={ResetPage} />
    </Route>
  </Router>
);

export default routes;