'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let opts = {
  url: 'http://uzone.univs.cn/checkSSOLogin.action',
  followRedirect: false,
  resolveWithFullResponse: true,
  simple: false
};

exports.default = (data, cks) => {
  return Promise.resolve().then(() => {
    // 添加cookie
    let j = _requestPromise2.default.jar();
    cks.forEach(ckStr => {
      var ck = _requestPromise2.default.cookie(ckStr);
      j.setCookie(ck, 'http://uzone.univs.cn');
    });
    //添加query param
    let query = {
      token: data.date,
      subSiteId: data.subSiteId,
      checkCode: data.checkout,
      returnUrl: 'http://mzml.univs.cn:8081/land.html'
    };
    opts['jar'] = j;
    opts['qs'] = query;
    return opts;
  }).then(opts => {
    return (0, _requestPromise2.default)(opts);
  }).then(_ref => {
    let headers = _ref.headers;

    let string = headers.location.split('?')[1];
    return _querystring2.default.parse(string);
  }).catch(e => {
    console.error('checkSSOLogin:');
    console.error(e);
    return null;
  });
};
//# sourceMappingURL=/Users/wyn/Documents/repo/vote/services/checkSSOLogin.js.map