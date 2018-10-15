import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'dva/router';
import Home from './Home';
import Course from './Course';

export default class Live extends Component {
  render() {
    return (
      <Switch>
        {/* 首页 */}
        <Route exact path="/live" render={() => <Redirect to="/live/home"/>}/>
        <Route exact path="/live/home" component={Home}/>
        <Route exact path="/live/course" component={Course}/>
      </Switch>
    );
  }
}
