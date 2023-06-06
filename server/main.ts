const express = require('express')
const path = require('path')
const cors = require('cors')
const ip = require('ip').address()

const app = express()
const port = 8080

app.use(cors({
  origin: '*',
}))

app.use(express.static(path.resolve(__dirname, '../dist')))

app.get('/api/start-push2answer', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`打开抢答页面: http://${ip}:${port}/ranking`)
})
