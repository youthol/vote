import request from 'request-promise'
import ckParser from '../util/cookie'

let opts = {
  method: 'post',
  url: 'http://mzml.univs.cn:8081/user/addvote',
  form: {
    type: 1,
    id: 309
  }
}

export default (form, cks) => {
  return Promise.resolve()
    .then(() => {
      let j = request.jar();
      let ck = request.cookie(`JSESSIONID=${cks['JSESSIONID']}`);
      j.setCookie(ck, 'http://mzml.univs.cn:8081');
      opts['jar'] = j;
      opts['form'] = form;
    })
    .then(() => {
      return request(opts)
    })
    .then(JSON.parse)
    .catch((e) => {
      console.error('vote:');
       console.error(e);
    })
}
