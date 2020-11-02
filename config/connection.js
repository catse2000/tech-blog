// import the Sequelize constructor from the library
const Sequelize = require('sequelize');

// import username and password from local file .env
require('dotenv').config();

let sequelize; //initialize sequelize to be used with JawsDB

// Use JAWSDB to set up a remote database. Create connection to the database, pass in MySQL log in information for username and password from .env
if(process.env.JAWSDB_URL){ //if on Heroku or online, use JAWSDB
    sequelize = new Sequelize(process.env.JAWSDB_URL);
}
else{ //if local, use this to connect to database
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql', 
        port: 3306
    });
};

// export this module for connection by other parts of the application that need access to the database
module.exports = sequelize;