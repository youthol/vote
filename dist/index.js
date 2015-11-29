'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _koaJson = require('koa-json');

var _koaJson2 = _interopRequireDefault(_koaJson);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaMorgan = require('koa-morgan');

var _koaMorgan2 = _interopRequireDefault(_koaMorgan);

var _koaNunjucks = require('koa-nunjucks-2');

var _koaNunjucks2 = _interopRequireDefault(_koaNunjucks);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _index = require('./routes/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _koa2.default)();

// middlewares
app.use(_koaMorgan2.default.middleware('dev'));
app.use((0, _koaStatic2.default)(_path2.default.join(__dirname + '../public')));
app.use((0, _koaJson2.default)());
app.use((0, _koaBodyparser2.default)());
app.context.render = (0, _koaNunjucks2.default)({
  ext: 'html',
  path: _path2.default.join(__dirname, '../views'),
  nunjucksConfig: {
    autoescape: true,
    watch: true
  }
});

(0, _index2.default)(app);

console.log(__dirname);

//error
app.on('error', err => {
  console.log(err);
});
app.listen(8080, () => {
  console.log('server started on : http://localhost:8080');
});
//# sourceMappingURL=/Users/wyn/Documents/repo/vote/index.js.map