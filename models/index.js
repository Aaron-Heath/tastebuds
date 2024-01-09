// Import models
const User = require('./User');
const Cookbook = require('./Cookbook');
const Recipe = require('./Recipe');
const CookbookRecipe = require('./CookbookRecipe')

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

// Cookbook belongsToMany Recipes (through CookbookRecipe)
Cookbook.belongsToMany(Recipe, {
    through: CookbookRecipe,
    foreignKey: 'cookbook_id'
});

// Recipe belongsToMany Cookbooks (through CookbookRecipe)
Recipe.belongsToMany(Cookbook, {
    through: CookbookRecipe,
    foreignKey: 'recipe_id'
});

module.exports = {
    User,
    Cookbook,
    Recipe,
    CookbookRecipe
}

