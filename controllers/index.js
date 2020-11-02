const router = require('express').Router(); // import the express server

const apiRoutes = require('./api'); // import the apiRoutes folder
const homeRoutes = require('./home-routes.js'); // import the home-routes file

router.use('/api', apiRoutes); // use apiRoutes folder and add "/api" prefix to routes
router.use('/', homeRoutes); // use the homeRoutes file and add "/" prefix to routes

router.use((req, res) => { // if the application makes a request to an endpoint that doesn't exist, show user error
    res.status(404).end();
});

module.exports = router;