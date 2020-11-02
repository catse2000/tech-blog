const { Model, DataTypes } = require('sequelize'); // import model and datatypes from sequelize
const sequelize = require('../config/connection'); // import config file connection as sequelize for database connection
const bcrypt = require('bcrypt'); // node file used to hash information that needs to be kept confidential, like passwords

// create our User model which inherits from the Model class
class User extends Model {
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    };
};

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
        hooks: { // used with bcrpt to hash the password
            // set up beforeCreate lifecycle "hook" functionality
            async beforeCreate(newUserData) { //userData is the current userData from above
                newUserData.password = await bcrypt.hash(newUserData.password, 10); // 10 is salt round that hashes password. newUserData is the new data with a hashed password that is passed back to the model. 
                return newUserData;
                
            },
            // set up beforeUPdate lifecycle "hook" functionality
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        sequelize, // pass in our imported sequelize connection (the direct connection to our database)
        timestamps: false,
        freezeTableName: true, 
        underscored: true,
        modelName: 'user'
    }
);

// export user model so other parts of the application can use it
module.exports = User;