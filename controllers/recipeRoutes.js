const router = require('express').Router();
const { Cookbook, Recipe } = require('../models')

// The /recipe route for getting the form to create a new recipe
router.get('/', async (req, res) => {
    try {
        const dbCookbookData = await Cookbook.findAll();

        // Pulls list of available cookbooks for dropdown menu
        const cookbooks = await dbCookbookData.map((cookbook) =>
            cookbook.get({ plain: true })
        );

        res.render('recipeCreate', { cookbooks });

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// The /recipe/:id route for looking at specific recipes
router.get('/:id', async (req, res) => {
    try {
        const dbRecipeData = await Recipe.findByPk(req.params.id);

        const recipe = dbRecipeData.get({ plain: true });

        res.render('recipe-test', { recipe });

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})
module.exports = router;