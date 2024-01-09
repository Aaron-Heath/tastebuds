const router = require('express').Router();
const { Recipe, CookbookRecipe } = require('../../models');

//The /api/recipe endpoint

// For creating new recipes
router.post('/', async (req, res) => {
    try {
        // Creates new recipe
        const newRecipe = await Recipe.create(
            {
                title: req.body.title,
                ingredients: req.body.ingredients,
                directions: req.body.directions,
            },
        );

        // Creates new CookbookRecipe model to link recipe with a cookbook
        await CookbookRecipe.create(
            {
                // The new Recipe id
                recipe_id: newRecipe.id,

                // Id of selected cookbook pulled from dropdown menu
                // Must be passed from front-end as 'cookbookId' in body request
                cookbook_id: req.body.cookbookId
            }
        )

        console.log('New Recipe Created')
        res.json(newRecipe);
    } catch (err) {
        res.status(500).json(err);
    };
});

// For updating recipes
// URL requires a valid recipe id
router.put('/:recipe_id', async (req, res) => {
    try {
        const updateRecipe = await Recipe.update(
            {
                title: req.body.title,
                ingredients: req.body.ingredients,
                directions: req.body.directions,
            },
            {
                where: {
                    id: req.params.recipe_id,
                },
            },
        );

        console.log('Recipe Updated');
        res.json(updateRecipe);
    } catch (err) {
        res.status(500).json(err);
    };
})

module.exports = router;