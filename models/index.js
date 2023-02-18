const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//A user can have many posts
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

//A user can have many comments
User.hasMany(Comment, {
  foreignKey: 'userId',
  onDelete: 'cascade',
});

//A post can only belong to one user
Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

//A post can have many comments
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'cascade',
});

//A comment can only belong to one user
Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'cascade',
});

//A comment can only belong to one post
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'cascade',
});

module.exports = { User, Post, Comment };
