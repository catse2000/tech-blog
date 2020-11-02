const User = require('./User'); // import the User model from the "models" folder
const Post = require('./Post'); // import the Post model from the "models" folder

// create associations between models
User.hasMany(Post, { // this relationship shows that one User can have many Posts
    foreignKey: 'user_id' // links relationship between User's "id" and Post's "user_id"
});

Post.belongsTo(User, { // this relationship shows that a Post can only have one User
    foreignKey: 'user_id' // links relationship between User's "id" and Post's "user_id"
});

module.exports = { User, Post }; // export models so other parts of the application can access them