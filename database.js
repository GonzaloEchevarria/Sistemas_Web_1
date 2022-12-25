const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('gacetilleros.db');

db.serialize(function() {
    db.all("SELECT * FROM usuarios", function(err, rows) {
        console.log(rows);
      });
    });


 

db.close();
module.exports=db;