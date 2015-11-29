import koa from 'koa'
import path from 'path'
import json from 'koa-json'
import serve from 'koa-static'
import morgan from 'koa-morgan'
import nunjucks from 'koa-nunjucks-2'
import bodyparser from 'koa-bodyparser'
import routes from './routes/index.js'

const app = koa()

// middlewares
app.use(morgan.middleware('dev'))
app.use(serve(path.join(__dirname + '../public')))
app.use(json())
app.use(bodyparser())
app.context.render = nunjucks({
  ext: 'html',
  path: path.join(__dirname, '../views'),
  nunjucksConfig: {
    autoescape: true,
    watch: true
  }
});

routes(app)

console.log(__dirname);

//error
app.on('error', (err) => {
  console.log(err);
})
app.listen(8080, () => {
  console.log('server started on : http://localhost:8080');
})
