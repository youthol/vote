import AV from 'avoscloud-sdk'

AV.initialize('wzzbBstX9CDDyDw2qYkuFxBD', 'dvwgsuubVoB8k2fnXQyrXhGv');

const save = (auth, result)=> {

  AV.User.logIn(auth.user, auth.pass)
    .then((user) => {
      if (!user.get('today')) {
        user.set('today', true);
        user.save();
        console.log('保存成功!!!');
      } else {
        console.log('已经保存过了');
      }
    }).catch(function(err) {
      console.log('保存失败');
      console.error(err)
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
