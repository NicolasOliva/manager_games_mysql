const mysql = require('mysql');
let db;

require('dotenv').config();

const config = {
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME
}

//singleton
const connectDB = () => {
    if (!db) {
        db = mysql.createConnection(config);
        db.connect((err) => {
            if(err) {
              console.log('Error connecting database!', err);
            } else {
              console.log('Database is connected!');
            }
        });
    }
    return db;
}

module.exports = connectDB();