const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const postRouter = require('./post')
const rateLimit = require('express-rate-limit')
const axios = require('axios')
const app = express()

const limiter = rateLimit({
  windowMs: 10000, // 10 second
  max: 10, // limit each IP to 10 requests 10 second
})

// Prevent Heroku from sleeping
function wakeup() {
  axios
    .get('https://power-lists.herokuapp.com/today')
    .then((res) => {
      console.log('Woke up!')
    })
    .catch((err) => {
      throw  err
    })
  setTimeout(wakeup, 1700000)//28min
}

//Allow CORS
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})
app.use(limiter)
app.use(logger('dev'))
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))
app.use('/post', postRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send('error')
})

module.exports = app
