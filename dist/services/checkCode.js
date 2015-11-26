'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let checkCodeOpts = {
  url: 'http://mzml.univs.cn:8081/common/checkcode',
  resolveWithFullResponse: false
};

const checkCode = cks => {
  return Promise.resolve().then(() => {
    // 添加cookie
    let j = _requestPromise2.default.jar();
    cks.forEach(ckStr => {
      var ck = _requestPromise2.default.cookie(ckStr);
      j.setCookie(ck, 'http://mzml.univs.cn:8081');
    });
    checkCodeOpts['jar'] = j;
    return checkCodeOpts;
  }).then(opts => {
    return (0, _requestPromise2.default)(opts);
  }).then(JSON.parse).then(result => {
    if (!result.status) {
      throw new Error('checkCode 失败');
    }
    return result.data;
  }).catch(e => {
    console.error('checkCode:');
    console.error(e);
  });
};

exports.default = checkCode;
//# sourceMappingURL=/Users/wyn/Documents/repo/vote/services/checkCode.js.map