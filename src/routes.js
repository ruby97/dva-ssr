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
    {
    path: '/login',
  
  
    component: (app) => {
  return Loadable.Map({
  loader: {
    Login: () => import('./routes/Login.js'),
    user: () => import('./models/user.js'),
  },
  delay: 200,
  timeout: 1000,
  loading: Loading,
  render(loaded, props) {
    let Login = loaded["Login"].default;
    let user = loaded["user"].default;
    registerModel(app, user);
    return <Login {...props} />;
  },
});
}

  },
    {
    path: '/admin',
  
  
    auth: true,
  
    component: (app) => {
  return Loadable.Map({
  loader: {
    Admin: () => import('./routes/Admin.js'),
    user: () => import('./models/user.js'),
  },
  delay: 200,
  timeout: 1000,
  loading: Loading,
  render(loaded, props) {
    let Admin = loaded["Admin"].default;
    let user = loaded["user"].default;
    registerModel(app, user);
    return <Admin {...props} />;
  },
});
}

  },
    {
    path: '/live',
  
  
    component: (app) => {
  return Loadable.Map({
  loader: {
    Index: () => import('./routes/Live/index.js'),
  },
  delay: 200,
  timeout: 1000,
  loading: Loading,
  render(loaded, props) {
    let Index = loaded["Index"].default;
    return <Index {...props} />;
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

