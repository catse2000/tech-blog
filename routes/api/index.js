const router = require('express').Router(); // import the express server

const userRoutes = require('./user-routes.js'); // import the user-routes

router.use('/users', userRoutes); // use the user-routes and adds the prefix /users to those routes

module.exports = router; // export for other parts of the application to see and use