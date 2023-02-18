const { Post } = require('../models');

const postData = [
  {
    postTitle: 'Test post title',
    postContent: 'Test post',
    user_id: 1,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
