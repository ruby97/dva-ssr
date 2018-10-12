const getUUID = require('uuid/v4');

class ApiController {

  static auth(request, callback) {
    if (request.state.account) {
      callback(true);
    } else {
      callback(false);
    }
  }

  mapRoutes(server) {
    server.route({
      method: 'POST',
      path: '/api/auth/login',
      handler: (request, h) => {
        if (!request.payload.mobile || !request.payload.captcha) {
          return h.response({code: 500, msg: "Login Error"});
        } else {
          const params = {
            mobile: request.payload.mobile,
            captcha: request.payload.captcha,
            ak: getUUID(),
          };
          return h.response({code: 0, data: params}).state('account', params).state('ak', params.ak);
        }
      },
    });

    server.route({
      method: 'POST',
      path: '/api/auth/logout',
      handler: (request, h) => {
        return h.response({code: 0, data: "已退出"}).unstate('account').unstate('ak');
      },
    });
  }
}

export default ApiController;
