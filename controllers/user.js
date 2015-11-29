import { User } from '../util/db.js'

const list = function*() {
  let users = yield User.find();

  yield this.render('list', { users: users });
}

const register = function*() {
  this.body = 'register page'
}

export { list, register }
