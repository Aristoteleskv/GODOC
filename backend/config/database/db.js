const mysql = require("mysql");
  
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'data',
  port     : '3306',
});

connection.connect((err) => {
  if (err);
  else console.log("Conectado ao MySQL");
});
 
module.exports = connection;
