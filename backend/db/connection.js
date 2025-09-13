const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'sh012.hostgator.in',
  user: 'putaiv9v_library_usr',
  password: 'n75.pFE@3!#%V5k',

  database: 'putaiv9v_library'

});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

module.exports = connection;
