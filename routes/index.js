import route from 'koa-route'
import { list, register } from '../controllers/user'

export default function routes(app) {

  app.use(route.get('/list', list))

  app.use(route.get('/reg', register))

}
