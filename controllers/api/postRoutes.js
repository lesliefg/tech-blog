const router = require('express').Router();
const { Post } = require('../../models');

//Create new event
router.post('/new', async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      userId: req.session.id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Delete Post
router.delete('/:id', async (req, res) => {
  try {
      const postData = await Post.destroy({
          where: { id: req.params.id }
      });

      // if wrong id entered
      if (!postData) {
          res.status(404).json({message: 'no post found with this id'});
      } else {
          console.log(`\n Deleting post with id: ${req.params.id} \n`);
          res.status(200).json(postData);
      }

  } catch (err) {
      res.status(500).json(err);
  }
})

//Update Post
router.put('/:id', async (req, res) => {
  try {

      const postData = await Post.update(
          // set all attributes of blog posts to values passed in to req.body
          { title: req.body.postTitle,
            content: req.body.postContent,
            userId: req.body.userId },
            { where: {id: req.params.id} }
      )

      // if wrong id entered
      if (!postData) {
          res.status(404).json({message: 'no post found with this id'});
      } else {
          console.log(`\n Editing post record id: ${req.params.id} \n`)
          res.status(200).json(postData);
      }
      

  } catch (err) {
      res.status(400).json(err)
  }
});

module.exports = router;