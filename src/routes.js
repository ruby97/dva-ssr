import React from 'react'
import Loadable from 'react-loadable';
import Loading from './Loading';
import {registerModel} from "./register";

let routes = [
  {
    path: '/',
    exact: true,
    component: (app) => {
      return Loadable.Map({
        loader: {
          Home: () => import('./routes/Home.js'),
        },
        delay: 200,
        timeout: 1000,
        loading: Loading,
        render(loaded, props) {
          let Home = loaded["Home"].default;
          return <Home {...props} />;
        },
      });
    }
  },
  {
    path: '/popular/:id',
    component: (app) => {
      return Loadable.Map({
        loader: {
          Grid: () => import('./routes/Grid.js'),
          grid: () => import('./models/grid.js'),
        },
        delay: 200,
        timeout: 1000,
        loading: Loading,
        render(loaded, props) {
          let Grid = loaded["Grid"].default;
          let grid = loaded["grid"].default;
          registerModel(app, grid);
          return <Grid {...props} />;
        },
      });
    }
  },
  {
    path: '/topic',
    component: (app) => {
      return Loadable.Map({
        loader: {
          Topic: () => import('./routes/Topic.js'),
        },
        delay: 200,
        timeout: 1000,
        loading: Loading,
        render(loaded, props) {
          let Topic = loaded["Topic"].default;
          return <Topic {...props} />;
        },
      });
    }

  },
];

const getRoutes = (app) => {
  return routes.map((route) => {
    let componentName = route.component.name;
    if (componentName !== 'Connect') {
      try {
        route.component = route.component(app);
      } catch (e) {
      }
    }
    return route;
  });
};

export default getRoutes;

