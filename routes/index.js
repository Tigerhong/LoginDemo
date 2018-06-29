var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.route("/login").get(function (req,res) {
  //到达此路径则渲染login文件，并且传出title值供login.html使用
    res.render("login",{title:'User Login'});
}).post(function (req,res) {//从此路径检测到post方法则进行post数据的处理操作
    var User= global.dbHandel.getModel("user");
    var username= req.body.uname;
    User.findOne({name:username},function (err,doc) {
        if (err){
          res.send(500)
            console.log(err)
        } else if(!doc){
          req.session.error='用户名不存在';
          res.send(404);
            //    res.redirect("/login");
        }else{
          if (req.body.upwd!=doc.password){
              //查询到匹配用户名的信息，但相应的password属性不匹配
            req.session.error='密码错误';
            res.send(400);
          } else{
              // 信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
            req.session.user=doc;
            res.send(200)
          }
        }
    })
})

module.exports = router;
