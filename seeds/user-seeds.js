const { User } = require('../models');
const { uuid } = require('uuidv4');

const userData = [
    {
        uuid: uuid(),
        firstName: 'Master',
        lastName: 'Splinter',
        username: 'TurtleTeacher',
        email: 'turtleteacher@tmnt.com',
        password: 'turtleturtle'
    },
    {
        uuid: uuid(),
        firstName: 'Leonardo',
        lastName: 'Turtle',
        username: 'BlueTurtle',
        email: 'blueturtle@tmnt.com',
        password: 'turtleturtle'
    },
    {
        uuid: uuid(),
        firstName: 'Raphael',
        lastName: 'Turtle',
        username: 'RedTurtle',
        email: 'redturtle@tmnt.com',
        password: 'turtleturtle'
    },
    {
        uuid: uuid(),
        firstName: 'Donatello',
        lastName: 'Turtle',
        username: 'PurpleTurtle',
        email: 'purpleturtle@tmnt.com',
        password: 'turtleturtle'
    },
    {
        uuid: uuid(),
        firstName: 'Michelangelo',
        lastName: 'Turtle',
        username: 'OrangeTurtle',
        email: 'orangeturtle@tmnt.com',
        password: 'turtleturtle'
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;