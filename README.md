# vote
又是刷票机. =. =

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

- 定时任务: 凌晨自动刷新投票状态
