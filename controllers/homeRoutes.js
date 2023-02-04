const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

//need to fix/update some routes once i render the pages so i can see what does and doesn't work 😪

//Get all posts for homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: Post,
          attributes: ['postTitle', 'postContent', 'dateCreated', 'userId']
        },
      ],
    });

    const post = dbPostData.map((post) => post.get({ plain: true }));

    res.render('homepage', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//render single post page
router.get('/post/:id', withAuth, async (req, res) => {
    try {
      const dbPostData = await Post.findByPk(req.params.id);
  
      const post = dbPostData.get({ plain: true });
  
      res.render('post', { post, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

//create new post
router.get('/newPost', async (req, res) => {
  try {
      res.render('newPost');
  } catch (err) {
      res.status(500).json(err);
  }
});

//reroute to homepage if logged in, else render login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

module.exports = router;