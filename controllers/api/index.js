const router = require('express').Router(); // import the express server

const userRoutes = require('./user-routes.js'); // import the user-routes
const postRoutes = require('./post-routes.js'); // import the post-routes
const commentRoutes = require('./comment-routes.js'); //import the comment-routes

router.use('/users', userRoutes); // use the user-routes and adds the prefix /users to those routes
router.use('/posts', postRoutes); // use the post-routes and adds the prefix /posts to those routes
router.use('/comments', commentRoutes); // use the comment-routes and adds the prefix /comments to those routes

module.exports = router; // export for other parts of the application to see and use