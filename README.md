# vote
中国大学生在线自动投票器 **v3**

## 运行环境

 - Node5.0
 - babel

## 说明

- 由于用了es7中部分特性, 所以使用babel预编译, 编译代码在dist目录. 
- 需要在Node5.0下运行, 低版本nodejs不支持
- 账号和投票数据保存在leancloud, 可以通过 http://42.96.201.176:3000/ 查看

## 部署

```javascript
 npm install -g babel eslint babel-eslint
 npm install
 node dist/index.js
```

## TODO

- [x] 数据库由leancloud改为mongodb
- [ ] 修改注册账号逻辑, 无需邮箱激活验证, 直接保存到数据库
- [ ] 把注册页面合并到repo中
- [ ] 编写脚本, 一键刷新投票状态
- [ ] 采用opencv做验证码识别
