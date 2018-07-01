var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//登陆界面渲染
router.route("/login").get(function (req,res) {
  //到达此路径则渲染login文件，并且传出title值供login.html使用
    res.render("login",{title:'User Login'});
})//登陆请求
    .post(function (req,res) {//从此路径检测到post方法则进行post数据的处理操作
    var User= global.dbHandel.getModel("user");
    var username= req.body.uname;
    User.findOne({name:username},function (err,doc) {
        if (err){
          res.sendStatus(500)
            console.log(err)
        } else if(!doc){
          req.session.error='用户名不存在';
          res.sendStatus(404);
            //    res.redirect("/login");
        }else{
          if (req.body.upwd!=doc.password){
              //查询到匹配用户名的信息，但相应的password属性不匹配
            req.session.error='密码错误';
            res.sendStatus(400);
          } else{
              // 信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
            req.session.user=doc._doc;
            res.sendStatus(200)
          }
        }
    })
})
//注册界面渲染
router.route('/register').get(function (req,res) {
    res.render('register',{title:"User register"});
})//注册请求
    .post(function (req,res) {
    let User = global.dbHandel.getModel('user');
    let uname = req.body.uname;
    let upwd = req.body.upwd;
    User.findOne({name:uname},function (err,doc) {
        if (err){
            res.sendStatus(500)
            req.session.error='网络异常错误';
            console.log(err)
        } else if (doc){
            req.session.error='用户已存在！';
            res.sendStatus(500)
        } else{
            User.create({name:uname,password:upwd},function (err,doc) {
                if (err){
                    res.sendStatus(500);
                    console.log(err)
                } else{
                    req.session.error='用户创建成功！'
                    res.sendStatus(200);
                }
            })
        }

    })
})
router.get('/home',function (req,res) {
    if (!req.session.user){ //到达/home路径首先判断是否已经登录
        req.session.error='请先登陆'
        res.redirect('login')  //未登录则重定向到 /login 路径
    }
    res.render("home",{title:'Home'}); //已登录则渲染home页面
})
/* GET logout page. */
router.get("/logout",function(req,res){    // 到达 /logout 路径则登出， session中user,error对象置空，并重定向到根路径
    req.session.user = null;
    req.session.error = null;
    res.redirect("/");
});
module.exports = router;
