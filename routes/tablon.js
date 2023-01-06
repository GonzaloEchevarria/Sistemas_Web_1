const { response } = require('express');
const express = require('express');
const db = require('../database');
const router = express.Router();
const publicaciones2 = db.allPublicaciones(function(response){
  console.log("+++++++++++++++++++++"+response[0].id);
})

router.get('/', function(req, res, next) {
  res.render('tablon', { title: 'Tablón', user: req.session.user, rol:req.session.rol, publicaciones1: publicaciones2});
});


module.exports = router;