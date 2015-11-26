'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deprecation = exports.save = undefined;

var _avoscloudSdk = require('avoscloud-sdk');

var _avoscloudSdk2 = _interopRequireDefault(_avoscloudSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_avoscloudSdk2.default.initialize('wzzbBstX9CDDyDw2qYkuFxBD', 'dvwgsuubVoB8k2fnXQyrXhGv');

const save = (auth, result) => {

  _avoscloudSdk2.default.User.logIn(auth.user, auth.pass).then(user => {
    if (!user.get('today')) {
      user.set('today', true);
      user.save();
      console.log('保存成功!!!');
    } else {
      console.log('已经保存过了');
    }
  }).catch(function (err) {
    console.log('保存失败');
    console.error(err);
  });
};

const deprecation = auth => {
  _avoscloudSdk2.default.User.logIn(auth.user, auth.pass).then(user => {
    user.set('isAvailable', false);
    user.save();
    console.log('账号被弃用!!!');
  }).catch(function (err) {
    console.log('保存失败');
    console.error(err);
  });
};

exports.save = save;
exports.deprecation = deprecation;
//# sourceMappingURL=/Users/wyn/Documents/repo/vote/services/save.js.map