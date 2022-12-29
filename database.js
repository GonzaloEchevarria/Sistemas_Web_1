const bcrypt = require("bcrypt");
const { resolveInclude } = require("ejs");
const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('gacetilleros.db');
const array= []; //ARRAY DE USUARIOS



db.serialize(function() {
    db.all("SELECT * FROM usuarios", function(err, rows) {
        console.log(rows);
        //RELLENAMOS EL ARRAY DE USUARIOS
        for (let i = 0; i < rows.length; i++) {
          array.push(rows[i]);
        }
     
      });
     
    });

db.comparePass = function(pass, hash, callback){
  bcrypt.compare(pass, hash, callback);
}

db.login=function(username, pass, callback){
  const bbdd= new sqlite3.Database('gacetilleros.db'); //abrir conexión
  bbdd.get("SELECT password FROM usuarios WHERE username =?",[username], function(err, row) {
   let passwordBbdd= row.password;
   bbdd.close();
   //ABRIMOS SESION ROL
   //for (let i = 0; i < array.length; i++) {
    //if (array[i].username==username){
      //req.session.rol= array[i].rol;
   // }
  //}
   bcrypt.compare(pass, passwordBbdd, callback); }); 
   };

db.obtenerRol=function(username,callback){
  const bbdd = new sqlite3.Database('gacetilleros.db');
  const sql = 'SELECT rol FROM usuarios WHERE username = ?';
  const params = [username];
  bbdd.get(sql, params, (error, row) => {
    if(row){
      //{ row: admin} 
      let rol= row.rol;
      if (callback){
        return callback(rol);
      }
    }
  })
};
db.registroExiste =function(username,callback) {
    const bbdd = new sqlite3.Database('gacetilleros.db');
    const sql = 'SELECT username FROM usuarios WHERE username = ?';
    const params = [username];
    bbdd.get(sql, params, (error, row) => {
      let response;
      if (row) {
        response= true;
      } else {
        response=  false;
      }
      bbdd.close();
      if (callback){
        return callback(response);
      }
    });}











db.generateHash = function(pass, callback){
  bcrypt.hash(pass, 10, callback);
}

db.register = function(username, pass, role, callback){
   
    db.generateHash(pass, function(err, hash){
    const bbdd= new sqlite3.Database('gacetilleros.db');
     bbdd.run("INSERT INTO usuarios (username, password, rol) VALUES(?, ?, ?);",[username,hash,role]);
     array.push({username,pass,role});

     bbdd.close();
     if (callback) {
          callback();
      };
      
  });
}





//db.register('admin2', 'admin', "admin", function(){
 // console.log('BBDD correct');
//}); 

db.close();

module.exports=db;
