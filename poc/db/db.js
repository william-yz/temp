const mysql = require('mysql');

var connection = mysql.createConnection({
  host : '146.222.94.71',
  user : 'itas_admin',
  password : 'Password1',
  database : 'information_schema'
});

connection.connect();
module.exports = connection;
// connection.connect();

// connection.query(`select * from columns where table_name = 'course' and table_schema = 'itas'`, function(err, rows, fields) {
//   if (err) throw err;

//   // console.log(rows);
//   console.log(rows);
// });

// connection.end();