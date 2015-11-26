import request from 'request-promise'
import ckParser from '../util/cookie'

let opts = {  // 这三个值负责校验,必须一定算法对应, 去看它的js代码怎么写的
  method: 'post',
  url: 'http://mzml.univs.cn:8081/user/sigin',
  resolveWithFullResponse: true,
}

const sigin = (form) => {
  return Promise.resolve()
    .then(() => {
      opts['form'] = form
    })
    .then(() => {
      return request(opts)
    })
    .then(({ body, headers })=> {
      body = JSON.parse(body);
      if (!body.status) {
        return { code: 1, msg: body.message }
      }
      return {
        code: 0,
        msg: body.message,
        cookies:  ckParser.getObj(headers['set-cookie'])
      }
    })
    .catch((e) => {
      console.error('signin:');
       console.error(e);
    })
}

export default sigin;
