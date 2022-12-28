const bcrypt = require("bcrypt");
const { resolveInclude } = require("ejs");

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('gacetilleros.db');
const users={}


db.serialize(function() {
    db.all("SELECT * FROM usuarios", function(err, rows) {
        console.log(rows)
     
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
   bcrypt.compare(pass, passwordBbdd, callback);
  }); 
   };

db.login('admin','admin',function(){
  console.log('hecho');
});

function registroExiste(username) {
  return new Promise((resolve, reject) => {
    const bbdd = new sqlite3.Database('gacetilleros.db');

    const sql = 'SELECT username FROM usuarios WHERE username = ?';
    const params = [username];

    bbdd.get(sql, params, (error, row) => {
      if (error) {
        reject(error);
      } else {
        resolve(!!row);
      }
      bbdd.close();
    });
  });
}



db.generateHash = function(pass, callback){
  bcrypt.hash(pass, 10, callback);
}

db.register = function(username, pass, role, callback){
  if (users[username]){
    return false;
  } 
    else{
    db.generateHash(pass, function(err, hash){
    const bbdd= new sqlite3.Database('gacetilleros.db');
     bbdd.run("INSERT INTO usuarios (username, password, rol) VALUES(?, ?, ?);",[username,hash,role]);
     users[username] = {username, role};
     bbdd.close();
     if (callback) {
          callback();
      };
      
  });
}}





//db.register('admin2', 'admin', "admin", function(){
 // console.log('BBDD correct');
//}); 

db.close();

module.exports=db;