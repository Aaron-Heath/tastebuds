const router = require('express').Router();
const { Recipe, CookbookRecipe } = require('../../models');

//The /api/recipe endpoint
// For creating new recipes
router.post('/', async (req, res) => {
    try {
        // Creates new recipe
        const newRecipe = await Recipe.create(
            {
                creator_id: req.session.user.id,
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
                cookbook_id: req.body.cookbook_id
            }
        )

        console.log('New Recipe Created')
        res.json(newRecipe);
    } catch (err) {
        res.status(500).json(err);
    };
});

// For updating recipes
// The /api/:recipe_id endpoint
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
});

// Delete the recipe
router.delete('/:recipe_id', async (req, res) => {
    try {
        const deleteRecipe = await Recipe.destroy(
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

        console.log('Recipe Deleted');
        res.json(deleteRecipe);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;