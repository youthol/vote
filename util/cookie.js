class CookieParser {

  getObj(arr = []) {
    let cks = {}
    arr.forEach((str) => {
      let ck = str.split(';')[0];
      let split = ck.split('=');
      cks[split[0]] = split[1];
    })
    return cks
  }

  getArr(arr = []) {
    let cks = arr.map((str) => {
      return str.split(';')[0];
    })
    return cks;
  }
}

export default new CookieParser()
