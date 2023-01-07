const express = require('express');
const db = require('../database');
const router = express.Router();



router.get('/', function(req, res, next) {
    db.allPublicacionesDeX(req.session.user,function(publicaciones){
        res.render('modificar', { title: 'Modificar', user: req.session.user, rol:req.session.rol, publicaciones:publicaciones});
    });
});

module.exports = router;