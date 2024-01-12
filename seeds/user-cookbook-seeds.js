const { UserCookbook, User } = require('../models');

const userCookbookData = [
    {
        user_id: 1,
        cookbook_id: 1,
        permissions: 'editor'
    },
    {
        user_id: 2,
        cookbook_id: 1,
        permissions: 'editor'
    },
    {
        user_id: 3,
        cookbook_id: 1,
        permissions: 'editor'
    },
    {
        user_id: 4,
        cookbook_id: 1,
        permissions: 'editor'
    },
    {
        user_id: 5,
        cookbook_id: 1,
        permissions: 'editor'
    },
    {
        user_id: 1,
        cookbook_id: 2,
        permissions: 'viewer'
    },
    {
        user_id: 2,
        cookbook_id: 2,
        permissions: 'editor'
    },
    {
        user_id: 3,
        cookbook_id: 2,
        permissions: 'editor'
    },
    {
        user_id: 4,
        cookbook_id: 2,
        permissions: 'editor'
    },
    {
        user_id: 5,
        cookbook_id: 2,
        permissions: 'editor'
    },
];

const seedUserCookbooks = () => UserCookbook.bulkCreate(userCookbookData);

module.exports = seedUserCookbooks;