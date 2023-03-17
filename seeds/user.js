const { User } = require('../models');

const userData = [
  {
    'name': 'Akali',
    'username': 'BladeKali',
    'email': 'akaliTheBest@hotmail.com',
    'password': 'BestKDAmember1!'
  },
  {
    'name': 'Eren',
    'username': 'Yeagermister',
    'email': 'tatakae@hotmail.com',
    'password': 'F1ghtT0W1n!'
  }
];

const seedUsers = () =>
  User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

module.exports = seedUsers;
