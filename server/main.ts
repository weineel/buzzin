import { Server } from 'socket.io'
import { getRanking, push2answer, reset, start } from './database'

const bodyParser = require('body-parser')

const express = require('express')
const path = require('path')
const cors = require('cors')
const ip = require('ip').address()
const http = require('http')

const app = express()
const port = 9527

const httpServe = http.createServer(app)
// ws 服务
const io = new Server(httpServe, { cors: { origin: '*' } });

let ws: any
io.on('connection', (socket) => {
  ws = socket
})

// 解析 application/json
app.use(bodyParser.json())
app.use(cors({
  origin: '*',
}))

app.use(express.static(path.resolve(__dirname, '../dist')))

// 设置开始抢答
app.post('/api/start', (req, res) => {
  start()
  return res.json({
    code: 0,
  })
})

// 设置重置抢答
app.post('/api/reset', (req, res) => {
  reset()
  return res.json({
    code: 0,
  })
})

// 客户端抢答
app.post('/api/push2answer', (req, res) => {
  const { name } = req.body
  try {
    const data = push2answer(name)
    // 通知 ranking 页面更新
    ws.emit('update-ranking', { data: getRanking() })
    return res.json({
      code: 0,
      data,
    })
  } catch (e) {
    return res.json({
      code: 1,
      message: e.message,
    })
  }
})

// 获取抢答排行榜
app.get('/api/ranking', (req, res) => {
  const ranking = getRanking()
  return res.json({
    code: 0,
    data: ranking,
  })
})

app.set('port', port)
httpServe.listen(port, () => {
  console.log(`打开抢答页面: http://${ip}:${8080}/ranking`)
})
