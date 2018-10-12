import Loadable from 'react-loadable';
import * as inert from 'inert';
import ServerManager from "./ServerManager";
import ReactController from "./controllers/ReactController";
import AssetsController from "./controllers/AssetsController";
import ApiController from "./controllers/ApiController";

Loadable.preloadAll().then(async () => {
  const manager = new ServerManager();
  manager.registerController(new ApiController());
  manager.registerController(new AssetsController());
  manager.registerController(new ReactController());
  await manager.registerPlugin(inert);
  manager.start();
}).catch(err => {
  console.log(err);
});

