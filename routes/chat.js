var express = require('express');
const { use } = require('.');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('chat', { title: 'Chat', user: req.session.user});
});

module.exports = router;