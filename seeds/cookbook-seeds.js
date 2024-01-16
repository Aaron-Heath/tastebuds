const { Cookbook } = require('../models');

const cookbookData = [
    {
        creator_id: 1,
        title: 'TMNT Family Cookbook',
        description: 'A cookbook for Master Splinter and the Teenage Mutant Ninja Turtles to share recipes.',
    },
    {
        creator_id: 2,
        title: 'Turtle Brothers Cookbook',
        description: 'A cookbook for just the brothers to work on together. Might just be pizza.',
    }
];

const seedCookbooks = () => Cookbook.bulkCreate(cookbookData);

module.exports = seedCookbooks;