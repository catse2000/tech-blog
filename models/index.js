const User = require('./User'); // import the User model from the "models" folder
const Post = require('./Post'); // import the Post model from the "models" folder
const Comment = require('./Comment'); // import the Comment model from the "models" folder

// create associations between models
User.hasMany(Post, { // this relationship shows that one User can have many Posts
    foreignKey: 'user_id' // links relationship between User's "id" and Post's "user_id"
});

Post.belongsTo(User, { // this relationship shows that a Post can only have one User
    foreignKey: 'user_id' // links relationship between User's "id" and Post's "user_id"
});

Comment.belongsTo(User, { // this relationship shows that a Comment can only have on User
    foreignKey: 'user_id' // links relationship between User's "id" and Comment's "user_id"
});

Comment.belongsTo(Post, { // this relationship shows that a Comment can only belong to on Post
    foreignKey: 'post_id' // links relationship between Post's "id" and Comment's "post_id"
});

User.hasMany(Comment, { // this relationship shows that a User can create many Comments
    foreignKey: 'user_id' // links relationship between User's "id" and Comment's "user_id"
});

Post.hasMany(Comment, { // this relationship shows that a Post can have many comments
    foreignKey: 'post_id' // links relationship between Post's "id" and Comment's "post_id"
});

module.exports = { User, Post, Comment }; // export models so other parts of the application can access them