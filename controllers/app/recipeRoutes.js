const router = require('express').Router();
const { Cookbook, Recipe } = require('../../models')

// The /app/recipe endpoint for getting the form to create a new recipe
router.get('/', async (req, res) => {
    try {
        const dbCookbookData = await Cookbook.findAll();

        // Pulls list of available cookbooks for dropdown menu
        const cookbooks = await dbCookbookData.map((cookbook) =>
            cookbook.get({ plain: true })
        );

        res.render('app-recipe-create', { cookbooks, logged_in: req.session.logged_in });

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/:id', async (req,res) => {
    // Temporary Recipe for data purposes
    const recipe = {
        title: "Popcorn",
        creator_id: 1,
        ingredients: [
            "5oz popcorn kernels",
            "Heat"
        ],
        directions: [
            {
                step: 1,
                direction: "Put bag in microwave."
            },
            {
                step: 2,
                direction: "Pop the corn."
            },
            {
                step: 3,
                direction: "Stop it before it burns."
            },
            
        ]
    }
    res.render("app-recipe", { recipe });
});

// The /app/recipe/update/:id endpoint for looking at specific recipes
router.get('/update/:id', async (req, res) => {
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