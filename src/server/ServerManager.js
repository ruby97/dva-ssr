import * as Hapi from 'hapi';

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const NODE_ENV = process.env.NODE_ENV;

class ServerManager {

  _server;
  _isDevelopment;

  constructor(host = HOST, port = PORT) {
    this._server = new Hapi.Server({
      debug: {request: ['error']},
      host: host,
      port: port
    });
    this._isDevelopment = NODE_ENV === 'development';
  }

  getServer() {
    return this._server;
  }

  log() {
    console.info(`\n\nServer running in ${NODE_ENV} mode at: http://${HOST}:${PORT}\n`);
  }

  async registerPlugin(pluginConfig, callback = null) {
    if (callback) {
      await this._server.register(pluginConfig, callback);
    } else {
      await this._server.register(pluginConfig);
    }
  }

  registerController(controller) {
    controller.mapRoutes(this._server);
  }

  start() {
    // 初始化cookie
    this._server.state('account', {
      ttl: 86400 * 3000,
      isSecure: false,
      isHttpOnly: true,
      encoding: 'base64json',
      clearInvalid: false,
      strictHeader: false,
      path: '/',
    });

    let keys = ['ak'];
    keys.forEach((key) => {
      this._server.state(key, {
        ttl: 86400 * 3000,
        isSecure: false,
        isHttpOnly: false,
        encoding: 'none',
        clearInvalid: false, // remove invalid cookies
        strictHeader: false,// don't allow violations of RFC 6265
        path: '/',
      });
    });

    this._server.start((error) => {
      if (error) {
        throw error;
      }

      if (this._isDevelopment) {
        ServerManager.log();
      }
    });
  }

}

export default ServerManager;
