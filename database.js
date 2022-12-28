const bcrypt = require("bcrypt");
const { resolveInclude } = require("ejs");

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('gacetilleros.db');

db.serialize(function() {
    db.all("SELECT * FROM usuarios", function(err, rows) {
        console.log(rows);
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



db.generateHash = function(pass, callback){
  bcrypt.hash(pass, 10, callback);
}

db.register = function(username, pass, role, callback){
  if (db.isCreated(username, function(){
    console.log("comprobado");
  })===true){
    return false;
  }
  else{
    db.generateHash(pass, function(err, hash){
    const bbdd= new sqlite3.Database('gacetilleros.db');
     bbdd.run("INSERT INTO usuarios (username, password, rol) VALUES(?, ?, ?);",[username,hash,role]);
      if (callback) {
          callback();
      };
      bbdd.close();
  });
}}

db.isCreated = function(username,callback){
  const bbdd = new sqlite3.Database('gacetilleros.db');
  bbdd.all("SELECT COUNT(username) FROM usuarios WHERE username =?",[username], function(err, row){
    const { 'COUNT(username)': count } = row[0];
    console.log(count);
    if (callback) {
      callback();
  };
  bbdd.close();
  if (count === 1){
    console.log("true");
    return true;
  }
  else{
    return false;
  }
});
   
}

db.isCreated("hector", function(){
  console.log('hector correct');
 });

 db.isCreated("eche", function(){
  console.log('eche correct');
 });

//db.register('admin2', 'admin', "admin", function(){
 // console.log('BBDD correct');
//}); 

db.close();

module.exports=db;