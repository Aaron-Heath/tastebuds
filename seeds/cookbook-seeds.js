const { Cookbook } = require('../models');

const cookbookData = [
    {
        creator_id: 1,
        title: 'TMNT Family Cookbook',
        description: 'A cookbook for Master Splinter and the Teenage Mutant Ninja Turtles to share recipes.',
        viewers: { 
            'TurtleTeacher': true, 
            'BlueTurtle': true,
            'RedTurtle': true,
            'PurpleTurtle': true,
            'OrangeTurtle': true
        },
        editors: {
            'TurtleTeacher': true, 
            'BlueTurtle': true,
            'RedTurtle': true,
            'PurpleTurtle': true,
            'OrangeTurtle': true
        }
    },
    {
        creator_id: 2,
        title: 'Turtle Brothers Cookbook',
        description: 'A cookbook for just the brothers to work on together. Might just be pizza.',
        viewers: {
            'TurtleTeacher': true, 
            'BlueTurtle': true,
            'RedTurtle': true,
            'PurpleTurtle': true,
            'OrangeTurtle': true
        },
        editors: {
            'TurtleTeacher': false, 
            'BlueTurtle': true,
            'RedTurtle': true,
            'PurpleTurtle': true,
            'OrangeTurtle': true
        }
    }
];

const seedCookbooks = () => Cookbook.bulkCreate(cookbookData);

module.exports = seedCookbooks;