'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let opts = {
  method: 'post',
  url: 'http://mzml.univs.cn:8081/user/addvote',
  form: {
    type: 1
  }
};

exports.default = (form, cks) => {
  return Promise.resolve().then(() => {
    let j = _requestPromise2.default.jar();
    let ck = _requestPromise2.default.cookie(`JSESSIONID=${ cks['JSESSIONID'] }`);
    j.setCookie(ck, 'http://mzml.univs.cn:8081');
    opts['jar'] = j;
    opts.form = form;
  }).then(() => {
    return (0, _requestPromise2.default)(opts);
  }).then(JSON.parse).catch(e => {
    console.error('vote:');
    console.error(e);
  });
};
//# sourceMappingURL=/Users/wyn/Documents/repo/vote/services/vote.js.map