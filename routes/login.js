const express = require('express');
const router = express.Router();
const users = require('../users');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("0");
  res.render('login', { title: 'Login', user: req.session.user});
});

router.post('/', function(req, res, next){
    let user = req.body.user;
    console.log("post");
    if(users[user]){
        console.log("1");
        users.comparePass(req.body.pass, users[user].hash, function(err, result){
            if(result){
                console.log("2");
                req.session.user = users[user];
                req.session.message = "Welcome!"
                res.redirect("/restricted");
            } else {
                req.session.error = "Incorrect user or password";
                console.log("3");
                res.redirect("/");
            }
        });
    } else {
        console.log("4");
        req.session.error = ".";
        res.redirect("/");
    }
});

module.exports = router;
