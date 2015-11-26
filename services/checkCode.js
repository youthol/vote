import request from 'request-promise'

let checkCodeOpts = {
  url: 'http://mzml.univs.cn:8081/common/checkcode',
  resolveWithFullResponse: false
}

const checkCode = (cks) => {
  return Promise.resolve()
    .then(() => {
      // 添加cookie
      let j = request.jar()
      cks.forEach((ckStr) => {
        var ck = request.cookie(ckStr)
        j.setCookie(ck, 'http://mzml.univs.cn:8081')
      })
      checkCodeOpts['jar'] = j;
      return checkCodeOpts
    })
    .then((opts) => {
      return request(opts)
    })
    .then(JSON.parse)
    .then((result) => {
      if (!result.status) {
        throw new Error('checkCode 失败');
      }
      return result.data;
    })
    .catch((e) => {
      console.error('checkCode:');
       console.error(e);
    })
}

export default checkCode;
