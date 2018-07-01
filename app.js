// var createError = require('http-errors');
var path = require('path');
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer=require('multer');
var mongoose= require('mongoose');
var session = require('express-session');

//项目的路由设置
var router = require('./routes/index');
var usersRouter = require('./routes/users');

//mongodb设置
global.dbHandel=require('./database/dbHandel')
global.db=mongoose.connect("mongodb://localhost:27017/nodedb");
var app = express();
app.use(session({
    secret: 'secret',
    cookie:{
        maxAge: 1000*60*30
    }
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("html",require("ejs").__express); // or   app.engine("html",require("ejs").renderFile);
//app.set("view engine","ejs");
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//这里将views暴露出去的话
// 会使http://localhost:3000这样访问的index.html文件
//而我们配置的app.use('/',router);无效了
// app.use(express.static(path.join(__dirname, 'views')));

app.use(function(req, res, next) {
    res.locals.user = req.session.user;   // 从session 获取 user对象
    var err = req.session.error;   //获取错误信息
    delete req.session.error;
    res.locals.message = "";;   // 展示的信息 message
    if(err){
        res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>';
    }
    next();  //中间件传递
});

app.use('/',router);
app.use('/users', usersRouter);
app.use('/login',router);// 即为为路径 /login 设置路由
app.use('/register',router);// 即为为路径 /register 设置路由
app.use('/home',router);// 即为为路径 /home 设置路由
app.use('/logout',router);// 即为为路径 /logout 设置路由
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
