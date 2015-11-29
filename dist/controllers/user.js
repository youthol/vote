'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.list = undefined;

var _db = require('../util/db.js');

const list = function* () {
  let users = yield _db.User.find();

  yield this.render('list', { users: users });
};

const register = function* () {
  this.body = 'register page';
};

exports.list = list;
exports.register = register;
//# sourceMappingURL=/Users/wyn/Documents/repo/vote/controllers/user.js.map