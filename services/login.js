import request from 'request-promise'
import iconv from 'iconv-lite'
import ckParser from '../util/cookie'

let opts = {
  url: 'http://uzone.univs.cn/sso.action',
  method: 'post',
  encoding: null,
  resolveWithFullResponse: true
}


const LoginPromise = (auth) => {
  return Promise.resolve()
    .then(() => {
      let form = {
        'gUser.loginName': auth.user,
        'gUser.password': auth.pass
      }
      opts['form'] = form;
    })
    .then(() => {
      return request(opts)
    })
    .then((res) => {
      let str = iconv.decode(res.body, 'gbk')
      let match = str.match(/!\[CDATA\[(.*?)\]\]>/)
      if (!match) throw new Error('返回字符串为空!!')
      if (/操作成功/.test(match[1])) {
        let cks = ckParser.getArr(res.headers['set-cookie'])
        return { code: 0, msg: match[1], cookies: cks }
      } else {
        return { code: 1, msg: match[1] }
      }
    })
    .catch((e) => {
      console.error('login:');
      console.error(e);
    })
}

export default LoginPromise;
