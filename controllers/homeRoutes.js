const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

//This router gets all posts and renders our homepage/dashboard
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((posts) => posts.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//This route gets and renders an individual post based on ID
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      //this JOINS with User and Comment
      include: [{ model: User }, { model: Comment }],
    });

    const post = postData.get({ plain: true });

    res.render('post', { post, loggedIn: req.session.loggedIn, });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

//This route will get and render the new post page if user is logged in
router.get('/newPost', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });
    console.log(user)
    res.render('newPost', {
      ...user,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });
    console.log(user)
    res.render('profile', {
      ...user,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/editPost/:id', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const postData = await Post.findByPk(req.params.id, {
            //this JOINS with User data
            include: [{ model: User }],
          });

    const user = userData.get({ plain: true });
    const post = postData.get({ plain: true });
    console.log(user)
    res.render('editPost', { post,
      ...user,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
