import login from './services/login'
import checkCode from './services/checkCode'
import checkSSOLogin from './services/checkSSOLogin'
import signin from './services/sigin'
import vote from './services/vote'
import { save, deprecation } from './services/save'

import AV from 'avoscloud-sdk'

require('colors')


const flow = async function(auth) {
  try {
    // task1 login
    let task1 = await login(auth);
    if (task1.code === 1) {
      throw new Error(`login: ${task1.msg}`.red)
    }
    console.log('login'.blue + JSON.stringify(task1));

    // task2 checkcode
    let task2 = await checkCode(task1.cookies); //subSiteId date checkout
    console.log('checkcode '.blue + JSON.stringify(task2));

    // task3 checkSSOLogin
    let task3 = await checkSSOLogin(task2, task1.cookies);
    if (!task3) {
      throw new Error(`checkSSOLogin: 解析失败了`.red)
    }
    console.log('checkSSOLogin '.blue + JSON.stringify(task3));

    // task4 sigin
    var form = { token: task2.date, uid: task3.uId, checkcode: task3.checkCode }
    let task4 = await signin(form)
    if (task4.code === 1) {
      throw new Error(`sigin: ${task4.msg}`.red)
    }
    console.log('sigin '.blue + JSON.stringify(task4));

    // task5 vote
    form = { type: 1, id: 309 }
    let task5 = await vote(form, task4.cookies);
    console.log('vote '.blue + JSON.stringify(task5))

    // task6 save
    await save(auth, task5)


  } catch (e) {
    console.log(e.message)
    if (/您的帐号已经被注销/.test(e.message)) {
      // 屏蔽改账号 isAvailable
      await deprecation(auth);
    }
  }
}


 let auth = { user: '', pass: '******' }

// 获取今天未刷的账号
var query = new AV.Query(AV.User);
query.notEqualTo('today', true);
query.notEqualTo('isAvailable', false);
query.descending('createdAt');
query.limit(500);  //这里修改一次性读取多少个账号
query.find().then((users) => {
  if (users.length === 0) {
    console.log('没有可用账号,程序退出'.green);
    return;
  }
  let pause = 100;  // 这里修改两次请求的间隔 ms
  users.forEach((user, i) => {
     setTimeout(() => {
       auth.user = user.get('email');
       console.log(auth);
       flow(auth);
    }, pause * i);
  })
}).catch((err) => {
  console.log(err);
})

//flow(auth);
