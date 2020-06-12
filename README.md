# mock-server数据模拟服务简介

## 介绍
一个小巧、快速、高性能的mock数据模拟服务，可以快速生成需要的数据，并可以实时修改生效  

## 安装运行
启动之前，打开 config.js 进行参数配置。  
```js
// 安装依赖
npm install
// 启动服务
node index
```

## 使用说明
- 模拟数据目录放在 ./data下面，请求的路径按目录进行划分，如 /api/getUser,则在data下面建api目录，在api目录下建getUser.js文件即可，可实时添加修改，即时生效。
- 模板数据生效规则可参考 mockjs 语法，在./data目录下有常见的实例，还可以生成验证码哦。
- 在数据js文件中，req,res为express的请求和响应对象，可以通过 req.query,req.body获取常见的请求参数。
- 可使用 req.cookies,res.cookie() 处理cookie，req.session.name 处理session哦。

