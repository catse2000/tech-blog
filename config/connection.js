// import the Sequelize constructor from the library
const Sequelize = require('sequelize');

// import username and password from local file .env
require('dotenv').config();

// create connection to the database, pass in MySQL log in information for username and password from .env
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql', 
    port: 3306
});

// export this module for connection by other parts of the application that need access to the database
module.exports = sequelize;