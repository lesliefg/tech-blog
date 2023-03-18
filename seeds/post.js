const { Post } = require('../models');

const postData = [
  {
    postTitle: 'Why Proper Indenting Is Important',
    postContent: 'Proper indenting in code is important for a lot of reason. The primary reason being readability. It makes it much easier to read code when everything is properly indented so you can see where things start and end. It\'s also important just to look clean. You don\'t want code that looks messy.',
    user_id: 1,
  },
  {
    postTitle: 'Post With No Comments',
    postContent: 'This is a post to show what it looks like with no comments',
    user_id: 2,
  },
  {
    postTitle: 'Post With Comments',
    postContent: 'This is a post to show what it looks like with comments added. Added comments from user 1 and 2 to display multiple users comments.',
    user_id: 3,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
