const router = require('express').Router();
const { User } = require('../../models');

//need to fix/update some routes once i render the pages so i can see what does and doesn't work 😪

// Create new user upon submission in user registration form
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // save logged_in to session
    req.session.save(() => {
      req.session.logged_in = true;
      res.status(200).json(dbUserData);
    });

    // render homepage if valid credentials are given
    res.render('home');
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//Login route
router.post('/login', async (req, res) => {
  try {
    // validating username
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    //validating password based on user credentials
    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    // render homepage if valid credentials given by user
    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//Logout route
router.post('/logout', (req, res) => {
  console.log(`\n Logged in: ${req.session.logged_in}  \n`);

  if (req.session.logged_in) {
    res.render('login');
  }
});

module.exports = router;
