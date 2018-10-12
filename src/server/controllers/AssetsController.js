/* eslint-disable no-undef */
import * as path from 'path';

class AssetsController {
  mapRoutes(server) {
    server.route({
      method: 'GET',
      path: '/public/{file*}',
      handler: (request, h) => {
        let filePath = path.resolve(__ASSETS_DIR__, `./${request.path}`);
        return h.file(filePath);
      },
    });

    server.route({
      method: 'GET',
      path: '/favicon.ico',
      handler: (request, h) => {
        let filePath = path.resolve(__PROJECT_DIR__, `./${request.path}`);
        return h.file(filePath);
      },
    });
  }
}

export default AssetsController;
