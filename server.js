const express = require('express'); //import the express server
const routes = require('./controllers'); // import the routes folder
const sequelize = require('./config/connection'); // import the connection file for the database
const path = require('path'); //import public folder to access javascript and stylesheets
const exphbs = require('express-handlebars')// import express-handlebars as the website engine
const hbs = exphbs.create({});

const app = express(); // initialize the express server
const PORT = process.env.PORT || 3001; // if port 3001 is not available use one provided by the service hosting the application

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // points express to the public folder

// turn on routes
app.use(routes);

// set up handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => { // make sure database is started first before starting up the server. ".then" makes this a promise!
    app.listen(PORT, () => console.log('Now listening')); // start up the server
})