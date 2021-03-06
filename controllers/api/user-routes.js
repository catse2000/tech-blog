const router = require('express').Router(); // import express for server connectivity
const { User, Post, Comment } = require('../../models'); // import the User model to access it
const withAuth = require('../../utils/auth');

// GET route used to search for all entries in the USERS table
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => {
        req.session.save(() => { // store session cookie using user_id, username, and boolean loggedIn
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;
      
          res.json(dbUserData);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET route used to locate one entry in the USERS table using the primary key ID
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id // locate an entry based on the primary key ID
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_body', 'created_at']
            },
            {
                model: Comment, 
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post, 
                    attributes: ['title']
                }
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' }); // message shown if a user error is found
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err); // message shown if a server error is found
        res.status(500).json(err);
    })
});

// POST route used to add new entries to the USERS table
router.post('/', (req, res) => {
    User.create({
        username: req.body.username, // username defined in model, req.body.username is what we get from req.body, and later, the application
        email: req.body.email, 
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// POST route used to log a user into their account
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email address!' });
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            // declare session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    });
});

// POST route used to log a user out of their account
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

// PUT route used to update an entry in the USERS table using the primary key ID to define which entry to update
router.put('/:id', (req, res) => {
    User.update(req.body, { // req.body is added here as user will have the ability to update any of the items in req.body
        individualHooks: true, // used with bcrypt in the User model to hash an updated password
        where: { // used to locate the entry the user wishes to update
            id: req.params.id 
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// DELETE route used to delete an entry from the USERS table using the primary key ID to define which entry to delete
router.delete("/:id", withAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router; // export the results of the routes to be accessed by other parts of the application