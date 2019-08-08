const path = require('path')
const fs = require('fs')
const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')
const mock = require('mockjs')
const config = require('./config')
const app = new express()
const mockDir = path.resolve('./data')

/**
 * 组件设置
 */
app.use(cookieParser())
app.use(session({
  saveUninitialized: true,
  secret: 'code',
  resave: true,
  name: 'mocksid'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(express.static('./public'))
app.set('json spaces', 2)

/**
 * 拦截所有请求
 */
app.all('*', (req, res) => {
  config.crossOrigin && res.header('Access-Control-Allow-Origin', '*')
  let file = mockDir + req.path + '.js'
  readAndEval(file, req, res)
})

/**
 * 读取文件并执行
 */
function readAndEval(file, req, res) {
  var respTime = config.delay ? mock.Random.integer(config.delay[0], config.delay[1]) : 0
  // 直接按url读取文件可以实现即时更新
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      res.json({
        file: file,
        fail: true,
        msg: 'mock数据不存在'
      })
      return
    }
    data = data.trim()

    // 是对象,直接返回
    if (data.indexOf('{') == 0 || data.indexOf('[') == 0) {
      setTimeout(() => {
        res.json(eval(`(${data})`))
      }, respTime)
      return
    }
    // 是文本返回
    if (data.match(/^(`|'|")/)) {
      setTimeout(() => {
        res.send(eval(data))
      }, respTime)
      return
    }
    // 是函数
    try {
      var resData = eval(`(${data})`)(req, res, mock)
      if (typeof resData == 'object') {
        setTimeout(() => {
          res.json(resData)
        }, respTime)
      } else if (resData !== undefined) {
        setTimeout(() => {
          res.send(resData)
        }, respTime)
      }
    } catch (e) {
      console.log(e)
      res.json({
        fail: true,
        file: file,
        msg: 'mock数据文件有语法错误'
      })
    }
  })
}

app.listen(config.port, config.host, () => {
  console.log('正在运行:  http://' + config.host + ':' + config.port)
})