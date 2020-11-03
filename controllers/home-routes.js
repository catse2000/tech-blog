const router = require('express').Router(); // import the express server
const sequelize = require('../config/connection'); // import the server configuration file to connect to database
const { Post, User, Comment } = require('../models'); // import the models

router.get('/', (req, res) => { // automatically render homepage when called
  Post.findAll({
    attributes: [
      'id', 
      'title',
      'post_body', 
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User, 
          attributes: ['username']
        }
      },
      {
        model: User, 
        attributes: ['username']
      }
    ]
  })
  .then(dbPostData => {
    // create array with values mapped from the dbPostData object
    const posts = dbPostData.map(post => post.get({ plain: true }));

    // pass an array into an object, and pass the object to the template
    res.render('homepage', { 
      posts,
      loggedIn: req.session.loggedIn 
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/', (req, res) => {
  console.log(req.session);
});

router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'post_body',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router; // export so other parts of the application can use this