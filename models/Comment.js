const { Model, DataTypes } = require('sequelize'); // import model and datatypes from sequelize
const sequelize = require('../config/connection'); // import config file connection as sequelize for database connection

// create our Comment model which inherits from the Model class
class Comment extends Model {};

// define table columns and configuration
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 1,
                max: 160
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);

// export user model so other parts of the application can use it
module.exports = Comment;