const { Cookbook } = require('../models');

const cookbookData = [
    {
        creator_id: 1,
        title: 'TMNT Family Cookbook',
        description: 'A cookbook for Master Splinter and the Teenage Mutant Ninja Turtles to share recipes.',
        // Array of user ids
        viewers: { 
            editors: [0,1,2,3,4]
        },
        // Array of user ids
        editors: {
            editors: [0,1,2,3,4]
        }
    },
    {
        creator_id: 2,
        title: 'Turtle Brothers Cookbook',
        description: 'A cookbook for just the brothers to work on together. Might just be pizza.',
        // Array of user ids
        viewers: {
            viewers: [0,1,2,3,4]
        },
        // Array of user ids
        editors: {
            editors: [1,2,3,4]
        }
    }
];

const seedCookbooks = () => Cookbook.bulkCreate(cookbookData);

module.exports = seedCookbooks;