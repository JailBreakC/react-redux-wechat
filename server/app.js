const app = require('koa')()
const serve = require('koa-static')
const koa = require('koa-router')()
const path = require('path')
const co = require('co')
const logger = require('koa-logger')
const json = require('koa-json')
const bluebird = require('bluebird')
const onerror = require('koa-onerror')

const db = require('./models/db-mongo')
const Online = require('./models/online-mongo')
const Room = require('./models/room-mongo')
const User = require('./models/user-mongo')
const History = require('./models/history-mongo')
const message = require('./controllers/message')
const crConfig = require('./config/cr-config')
const config = require('./config/config')

co(function*() {
  let initRoom = yield Room.findOne({ name: crConfig.INIT_ROOM })
  if (!initRoom) {
    let room = new Room({
      info: crConfig.INIT_ROOM_INFO,
      name: crConfig.INIT_ROOM
    })
    room.save()
  } else {
    console.log('初始房间已存在')
  }
  yield Online.removeAll()
}).catch((err) => {
  console.log(err)
})

app.use(function*(next) {
  if (!this.config) {
    this.config = config
  }
  yield next
})

app.use(require('koa-bodyparser')())
app.use(json())
app.use(logger())

app.use(function*(next) {
  var start = new Date
  yield next
  var ms = new Date - start
  console.log('%s %s - %s', this.method, this.url, ms)
})

app.use(serve(path.join(__dirname, '../build')));

// login(app,koa)
app.use(koa.routes())
onerror(app)
app.on('error', function(err, ctx) {
  console.log('err message:', err.message)
    // logger.error('server error', err, ctx)
})

module.exports = app
