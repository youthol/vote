'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;

_mongoose2.default.connect('mongodb://localhost/unvis');

const db = _mongoose2.default.connection;
db.on('error', () => {
  console.error('connect failed');
});

const UserSchema = new Schema({
  name: { type: String, unique: true },
  pass: { type: String, default: '******' },
  isAvailable: { type: Boolean, default: true },
  vote: {
    website: { type: Boolean, default: false },
    weichat: { type: Boolean, default: false },
    xinlingzhiyue: { type: Boolean, default: false }
  }
});
UserSchema.plugin(_mongooseTimestamp2.default);

const User = exports.User = _mongoose2.default.model('User', UserSchema);
//# sourceMappingURL=/Users/wyn/Documents/repo/vote/util/db.js.map