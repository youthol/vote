import AV from 'avoscloud-sdk'

AV.initialize('wzzbBstX9CDDyDw2qYkuFxBD', 'dvwgsuubVoB8k2fnXQyrXhGv');

const save = (auth, type, result)=> {

  AV.User.logIn(auth.user, auth.pass)
    .then((user) => {
      if (result.status || /限投一票/.test(result.message)) {
        user.set(type, true);
        return user.save();
      } else {
        console.log('没有啊:'.red + result);
      }
    }).catch(function(err) {
      console.error(err)
      return false;
    });
}

const deprecation = (auth) => {
  AV.User.logIn(auth.user, auth.pass)
    .then((user) => {
        user.set('isAvailable', false);
        user.save();
        console.log('账号被弃用!!!');
    }).catch(function(err) {
      console.log('保存失败');
      console.error(err)
    });
}

export { save, deprecation }
