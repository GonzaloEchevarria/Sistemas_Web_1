const express = require('express');
const db = require('../database');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();


router.get('/', function(req, res, next) {
  res.render('publicacion', { title: 'Publicar', user: req.session.user, rol:req.session.rol});
});



module.exports = router;