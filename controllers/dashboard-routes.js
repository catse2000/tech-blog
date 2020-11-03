const router = require('express').Router(); // import the express server
const sequelize = require('../config/connection'); // import the server configuration file to connect to database
const { Post, User, Comment } = require('../models'); // import the models
const withAuth = require('../utils/auth'); // import utils/auth which will be used to prevent users from bypassing login to get to the dashboard

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            // use the ID from the session
            user_id: req.session.user_id
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
            // serialize data before passing to template
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/edit/:id', withAuth, (req, res) => {
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
          res.render('edit-post', { 
              post,
              loggedIn: true
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

module.exports = router; // export so other parts of the application can use this