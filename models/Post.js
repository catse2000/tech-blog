const { Model, DataTypes } = require('sequelize'); // import model and datatypes from sequelize
const sequelize = require('../config/connection'); // import config file connection as sequelize for database connection

// create our Post Model which inherits from the Model class
class Post extends Model {};

// create fields/columns for Post model
Post.init(
    {
        // id used as the primary key for the table
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            primaryKey: true, 
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_body: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                max: 160
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,  // pass in our imported sequelize connection (the direct connection to our database)
        freezeTableName: true, 
        underscored: true,
        modelName: 'post'
    }
);

// export post model so other parts of the application can use it
module.exports = Post;