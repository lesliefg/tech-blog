const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

//create new post if logged in
router.post('/', withAuth, async (req, res) => {
    try {
      const newProject = await Project.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newProject);
    } catch (err) {
      res.status(400).json(err);
    }
    res.render('newPost');
  });



//delete a post based on ID and if logged in user matches post user id
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
    res.render('post');
  });



//edit post based on id and if logged in user id matches post user id
router.put('/:id', async (req, res) => {
    try {
        const postData = await Post.update(
            {title: req.body.title,
             content: req.body.content,
             user_id: req.body.user_id },
             { where: {id: req.params.id} }
        );
    
        if (!postData) {
          res.status(404).json({ message: 'No post found with this id!' });
          return;
        }
    
        res.status(200).json(postData);
      } catch (err) {
        res.status(500).json(err);
      }
      res.render('updatePost');
});

module.exports = router;