const { Model, DataTypes, STRING } = require('sequelize'); // import model and datatypes from sequelize
const sequelize = require('../config/connection'); // import config file connection as sequelize for database connection

// create our User model which inherits from the Model class
class User extends Model {};

// define table columns and configuration
User.init( // initialize the model
    {
        // id used as the primary key for the table
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true // so that application can create it's own id numbers as values are added
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, 
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6] // password must be at least 6 characters long
            }
        }
    },
    {
        // table configuration options go here

        sequelize, // pass in our imported sequelize connection (the direct connection to our database)
        timestamps: false,
        freezeTableName: true, 
        underscored: true,
        modelName: 'user'
    }
);

// export user model so other parts of the application can use it
module.exports = User;