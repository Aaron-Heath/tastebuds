const { CookbookRecipe } = require('../models');

const cookbookRecipeData = [
    {
        cookbook_id: 1,
        recipe_id: 2
    },
    {
        cookbook_id: 2,
        recipe_id: 1
    }
];

const seedCookbookRecipes = () => CookbookRecipe.bulkCreate(cookbookRecipeData);

module.exports = seedCookbookRecipes;