const { Post } = require('../models');

const postData = [
    {
        title: 'Test post title',
        content: 'Test post',
        user_id: 1
    }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
