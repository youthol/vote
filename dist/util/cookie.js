'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class CookieParser {

  getObj() {
    let arr = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    let cks = {};
    arr.forEach(str => {
      let ck = str.split(';')[0];
      let split = ck.split('=');
      cks[split[0]] = split[1];
    });
    return cks;
  }

  getArr() {
    let arr = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    let cks = arr.map(str => {
      return str.split(';')[0];
    });
    return cks;
  }
}

exports.default = new CookieParser();
//# sourceMappingURL=/Users/wyn/Documents/repo/vote/util/cookie.js.map