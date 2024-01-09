// Import all seed methods
const seedCookbooks = require('./cookbook-seeds');
const seedUsers = require('./user-seeds');
const seedRecipes = require('./recipe-seeds');
const seedCookbookRecipes = require('./cookbook-recipe-seeds')

const sequelize = require('../config/connection');

// Seeds all tables with test data
const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('Database Synced');

    await seedUsers();
    console.log('Users Seeded');

    await seedCookbooks();
    console.log('Cookbooks Seeded');

    await seedRecipes();
    console.log('Recipes Seeded');

    await seedCookbookRecipes();
    console.log('Cookbook Recipes Seeded')

    // Ends process
    process.exit(0);
};

seedAll();