const express = require('express');
const db = require('../database');
const router = express.Router();


router.get('/', function(req, res, next) {
  res.render('tablon', { title: 'Tablón', user: req.session.user, rol:req.session.rol, publicaciones: db.allPublicaciones()});
});


module.exports = router;