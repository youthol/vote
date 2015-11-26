'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _cookie = require('../util/cookie');

var _cookie2 = _interopRequireDefault(_cookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let opts = { // 这三个值负责校验,必须一定算法对应, 去看它的js代码怎么写的
  method: 'post',
  url: 'http://mzml.univs.cn:8081/user/sigin',
  resolveWithFullResponse: true
};

const sigin = form => {
  return Promise.resolve().then(() => {
    opts['form'] = form;
  }).then(() => {
    return (0, _requestPromise2.default)(opts);
  }).then(_ref => {
    let body = _ref.body;
    let headers = _ref.headers;

    body = JSON.parse(body);
    if (!body.status) {
      return { code: 1, msg: body.message };
    }
    return {
      code: 0,
      msg: body.message,
      cookies: _cookie2.default.getObj(headers['set-cookie'])
    };
  }).catch(e => {
    console.error('signin:');
    console.error(e);
  });
};

exports.default = sigin;
//# sourceMappingURL=/Users/wyn/Documents/repo/vote/services/sigin.js.map