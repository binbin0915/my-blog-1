import React from 'react';
import AllRoutes from './routes';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter, NavLink } from 'react-router-dom';

export default (props) => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/article/list" push />} />
            <Route path="/" render={() => <AllRoutes store={props.store} />} />
        </Switch>
    </Router>
)