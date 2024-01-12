// Import models
const User = require('./User');
const Cookbook = require('./Cookbook');
const Recipe = require('./Recipe');
const CookbookRecipe = require('./CookbookRecipe')
const UserCookbook = require('./UserCookbook')

// Users have many cookbooks
User.belongsToMany(Cookbook, {
    through: UserCookbook,
    foreignKey: 'user_id',
});

Cookbook.belongsToMany(User, {
    through: UserCookbook,
    foreignKey: 'cookbook_id'
});

//Users have many recipes
User.hasMany(Recipe, {
    foreignKey: 'creator_id',
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
    CookbookRecipe,
    UserCookbook
}

