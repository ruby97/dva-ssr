import React from 'react';
import {Router, Route, Switch, Redirect} from 'dva/router';
import Navbar from "./routes/Navbar";
import routes from "./routes";
import NoMatch from "./routes/NoMatch";
import cookie from 'js-cookie';

const PrivateRoute = ({component: C, ...rest}) => (
  <Route {...rest} render={(props) => (
    cookie.get("ak")
      ? <C {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: {from: props.location}
      }}/>
  )}/>
);

function RouterConfig({history, app}) {

  const routeList = routes(app);

  return (
    <Router history={history}>
      <div>
        <Navbar/>
        <Switch>
          {routeList.map(({path, exact, auth, component: C, ...rest}) => {
            if (!auth) {
              return (
                <Route key={path}
                       path={path}
                       exact={exact}
                       render={(props) => (
                         <C {...props} {...rest} />
                       )}
                />
              );
            } else {
              return (
                <PrivateRoute key={path}
                              path={path}
                              exact={exact}
                              component={C}
                              {...rest}
                />
              );
            }
          })}
          <Route render={(props) => <NoMatch {...props} />}/>
        </Switch>
      </div>
    </Router>
  );
}

export default RouterConfig;
