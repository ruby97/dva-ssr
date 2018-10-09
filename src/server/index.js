import express from 'express'
import cors from 'cors'
import dva from 'dva';
import {renderToString} from "react-dom/server"
import React from 'react';
import {matchRoutes} from 'react-router-config';
import Loadable from 'react-loadable';
import {getBundles} from 'react-loadable/webpack'
import {createMemoryHistory} from 'history';
import router from "../router";
import getRoutes from "../routes";
import {clearModel, registerModel} from "../register";

const moduleDict = require('../../dist/react-loadable.json');
const app = express();

app.use(cors());

app.get('/public/:file', function (req, res) {
  let file = req.params.file;
  res.sendFile(file, {root: './dist/public'});
});

app.get('*.ico', function (req, res) {
  res.send("");
});

app.get('*', async (req, res, next) => {

  // Step1: 初始化DvaApp
  const history = createMemoryHistory();
  history.push(req.path);
  const initialState = {};

  const app = dva({history, initialState});
  app.router(router);
  const App = app.start();
  let routes = getRoutes(app);

  // Step2: 匹配路由，获取需要加载的Route组件（包含Loadable组件）
  const matchedComponents = matchRoutes(routes, req.path).map(({route}) => {
    if (!route.component.preload) {
      return route.component;
    } else {
      return route.component.preload().then(res => {
        if (res.default) {
          return res.default;
        } else {
          let result;
          for (let i in res) {
            if (res.hasOwnProperty(i)) {
              if (res[i].default.hasOwnProperty('namespace')) {
                registerModel(app, res[i]);
              } else {
                result = res[i].default;
              }
            }
          }
          return result;
        }
      })
    }
  });
  const loadedComponents = await Promise.all(matchedComponents);

  // Step3: 获取已经加载的Route组件中的初始化方法集合 actionsList
  // actionsList 的类型是 Array<Array<dispatch{type, payload}>>
  const actionsList = loadedComponents.map(component => {
    if (component.fetching) {
      return component.fetching({
        ...app._store,
        ...component.props,
        path: req.path
      });
    } else {
      return null;
    }
  });

  // Step4: 将actionsList 展开成一维数组，同时剔除为Null的元素，得到actionList: Array<dispatch{type, payload}>
  // 然后等待 dispatch 的action完成
  const actionList = [];
  actionsList.map((actions) => {
    (actions || []).map((action) => {
      actionList.push(action);
    });
  });
  await Promise.all(actionList);

  // Step5: Render Dva App。同时使用Loadable.Capture 捕捉本次渲染包含的Loadable组件集合Array<String>。
  const modules = [];
  const markup = renderToString(
    <Loadable.Capture report={module => modules.push(module)}>
      <App location={req.path} context={{}}/>
    </Loadable.Capture>
  );

  // Step6: 构造需要render的 script标签。其中利用了react-loadable的webpack插件在构建过程中生成的module字典
  let bundles = getBundles(moduleDict, modules);
  let scripts = bundles.filter(bundle => bundle.file.endsWith('.js'));
  let scriptMarkups = scripts.map(bundle => {
    return `<script src="/public/${bundle.file}"></script>`
  }).join('\n');

  // Step7: 得到初始化完成后的全局State树
  const preloadedState = app._store.getState();


  // Step8: 清除cached models。因为下一次SSR请求时将new DvaApp
  clearModel();

  // Step9: 服务端返回渲染内容
  res.send(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>React Server Side Demo With Dva</title>
                <link href="/public/style.css" rel="stylesheet">
              </head>

              <body>
                <div id="app">${markup}</div>
                <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\\u003c')}</script>
                <script src="/public/main.js"></script>
                ${scriptMarkups}
              </body>
            </html>
        `);
});

Loadable.preloadAll().then(() => {
  app.listen(3000, () => {
    console.log("server is running on port: 3000");
  });
}).catch(err => {
  console.log(err);
});

