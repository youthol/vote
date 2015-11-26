'use strict';

var _login = require('./services/login');

var _login2 = _interopRequireDefault(_login);

var _checkCode = require('./services/checkCode');

var _checkCode2 = _interopRequireDefault(_checkCode);

var _checkSSOLogin = require('./services/checkSSOLogin');

var _checkSSOLogin2 = _interopRequireDefault(_checkSSOLogin);

var _sigin = require('./services/sigin');

var _sigin2 = _interopRequireDefault(_sigin);

var _vote = require('./services/vote');

var _vote2 = _interopRequireDefault(_vote);

var _save = require('./services/save');

var _avoscloudSdk = require('avoscloud-sdk');

var _avoscloudSdk2 = _interopRequireDefault(_avoscloudSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, "next"); var callThrow = step.bind(null, "throw"); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

require('colors');

const flow = (function () {
  var ref = _asyncToGenerator(function* (auth) {
    try {
      // task1 login
      let task1 = yield (0, _login2.default)(auth);
      if (task1.code === 1) {
        throw new Error(`login: ${ task1.msg }`.red);
      }
      console.log('login'.blue + JSON.stringify(task1));

      // task2 checkcode
      let task2 = yield (0, _checkCode2.default)(task1.cookies); //subSiteId date checkout
      console.log('checkcode '.blue + JSON.stringify(task2));

      // task3 checkSSOLogin
      let task3 = yield (0, _checkSSOLogin2.default)(task2, task1.cookies);
      if (!task3) {
        throw new Error(`checkSSOLogin: 解析失败了`.red);
      }
      console.log('checkSSOLogin '.blue + JSON.stringify(task3));

      // task4 sigin
      var form = { token: task2.date, uid: task3.uId, checkcode: task3.checkCode };
      let task4 = yield (0, _sigin2.default)(form);
      if (task4.code === 1) {
        throw new Error(`sigin: ${ task4.msg }`.red);
      }
      console.log('sigin '.blue + JSON.stringify(task4));

      // task5 vote
      form = { type: 1, id: 309 };
      let task5 = yield (0, _vote2.default)(form, task4.cookies);
      console.log('vote '.blue + JSON.stringify(task5));

      // task6 save
      yield (0, _save.save)(auth, task5);
    } catch (e) {
      console.log(e.message);
      if (/您的帐号已经被注销/.test(e.message)) {
        // 屏蔽改账号 isAvailable
        yield (0, _save.deprecation)(auth);
      }
    }
  });

  return function flow(_x) {
    return ref.apply(this, arguments);
  };
})();

let auth = { user: '', pass: '******' };

// 获取今天未刷的账号
var query = new _avoscloudSdk2.default.Query(_avoscloudSdk2.default.User);
query.notEqualTo('today', true);
query.notEqualTo('isAvailable', false);
query.descending('createdAt');
query.limit(500); //这里修改一次性读取多少个账号
query.find().then(users => {
  if (users.length === 0) {
    console.log('没有可用账号,程序退出'.green);
    return;
  }
  let pause = 100; // 这里修改两次请求的间隔 ms
  users.forEach((user, i) => {
    setTimeout(() => {
      auth.user = user.get('email');
      console.log(auth);
      flow(auth);
    }, pause * i);
  });
}).catch(err => {
  console.log(err);
});

//flow(auth);
//# sourceMappingURL=/Users/wyn/Documents/repo/vote/index.js.map