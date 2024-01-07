// Import models
const User = require('./User');
const Cookbook = require('./Cookbook');
const Recipe = require('./Recipe');

// Users have many cookbooks
User.hasMany(Cookbook, {
    foreignKey: 'creator_id',
    onDelete: 'CASCADE'
});

Cookbook.belongsTo(User, {
    foreignKey: 'creator_id'
});

//Users have many recipes
User.hasMany(Recipe, {
    foreignKey: 'creator_id',
    onDelete: 'CASCADE'
});

Recipe.belongsTo(User, {
    foreignKey: 'creator_id'
});

// Cookbook.hasMany(Recipe, {
//     foreignKey: 'cookbook_id',
//     onDelete: 'CASCADE'
// });

Cookbook.belongsToMany(Recipe, {
    through: 'cookbook_recipe'
});

Recipe.belongsToMany(Cookbook, {
    // foreignKey: 'cookbook_id',
    through: 'cookbook_recipe'
});

module.exports = {
    User,
    Cookbook,
    Recipe
}

