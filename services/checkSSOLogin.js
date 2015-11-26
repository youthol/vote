import request from 'request-promise'
import qs from 'querystring'

let opts = {
  url: 'http://uzone.univs.cn/checkSSOLogin.action',
  followRedirect: false,
  resolveWithFullResponse: true,
  simple: false
}

export default  (data, cks) => {
  return Promise.resolve()
    .then(() => {
      // 添加cookie
      let j = request.jar()
      cks.forEach((ckStr) => {
        var ck = request.cookie(ckStr)
        j.setCookie(ck, 'http://uzone.univs.cn')
      })
      //添加query param
      let query = {
        token: data.date,
        subSiteId: data.subSiteId,
        checkCode: data.checkout,
        returnUrl: 'http://mzml.univs.cn:8081/land.html'
      }
      opts['jar'] = j;
      opts['qs'] = query;
      return opts;
    })
    .then((opts) => {
      return request(opts);
    })
    .then(({ headers }) => {
      let string = headers.location.split('?')[1];
      return qs.parse(string);
    })
    .catch((e) => {
      console.error('checkSSOLogin:');
      console.error(e);
      return null;
    })
}
