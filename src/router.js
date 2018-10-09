import React from 'react';
import {Router, Route, Switch} from 'dva/router';
import Navbar from "./routes/Navbar";
import routes from "./routes";
import NoMatch from "./routes/NoMatch";

function RouterConfig({history, app}) {

  const routeList = routes(app);

  return (
    <Router history={history}>
      <div>
        <Navbar/>
        <Switch>
          {routeList.map(({path, exact, component: C, ...rest}) => (
            <Route key={path}
                   path={path}
                   exact={exact}
                   render={(props) => (
                     <C {...props} {...rest} />
                   )}
            />
          ))}
          <Route render={(props) => <NoMatch {...props} />}/>
        </Switch>
      </div>
    </Router>
  );
}

export default RouterConfig;
