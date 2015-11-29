'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = routes;

var _koaRoute = require('koa-route');

var _koaRoute2 = _interopRequireDefault(_koaRoute);

var _user = require('../controllers/user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function routes(app) {

  app.use(_koaRoute2.default.get('/list', _user.list));

  app.use(_koaRoute2.default.get('/reg', _user.register));
}
//# sourceMappingURL=/Users/wyn/Documents/repo/vote/routes/index.js.map