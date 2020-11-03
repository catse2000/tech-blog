const express = require('express'); //import the express server
const routes = require('./controllers'); // import the routes folder
const sequelize = require('./config/connection'); // import the connection file for the database
const path = require('path'); //import public folder to access javascript and stylesheets
const exphbs = require('express-handlebars')// import express-handlebars as the website engine
const helpers = require('./utils/helpers'); // import jest tested helpers file
const hbs = exphbs.create({ helpers }); //create new handlebars engine

const app = express(); // initialize the express server
const PORT = process.env.PORT || 3001; // if port 3001 is not available use one provided by the service hosting the application

const session = require('express-session'); // import connection to create and save sessions in browser
const SequelizeStore = require('connect-session-sequelize')(session.Store); // stores the sessions created by express-session into our database

const sess = { // creates a cookie and and stores it in the database
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true, 
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess)); // stores the cookie in the browser and starts a session

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // points express to the public folder

// turn on routes
app.use(routes);

// set up handlebars
app.engine('handlebars', hbs.engine); // use handlebars
app.set('view engine', 'handlebars'); // set up engine


// turn on connection to db and server
sequelize.sync({ force: false }).then(() => { // make sure database is started first before starting up the server. ".then" makes this a promise!
    app.listen(PORT, () => console.log('Now listening')); // start up the server
})