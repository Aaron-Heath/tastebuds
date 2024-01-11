const router = require('express').Router();
const { Cookbook, Recipe } = require('../../models')

// The /app/recipe route for getting the form to create a new recipe
router.get('/', async (req, res) => {
    try {
        const dbCookbookData = await Cookbook.findAll();

        // Pulls list of available cookbooks for dropdown menu
        const cookbooks = await dbCookbookData.map((cookbook) =>
            cookbook.get({ plain: true })
        );

        res.render('app-recipe-create', { cookbooks });

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// The /app/update-recipe/:id route for looking at specific recipes
router.get('/:id', async (req, res) => {
    try {
        const dbRecipeData = await Recipe.findByPk(req.params.id);

        const recipe = dbRecipeData.get({ plain: true });
        console.log(recipe)

        res.render('app-recipe-update', { recipe });

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})
module.exports = router;